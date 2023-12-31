import { Command, Extension, Mark } from '@tiptap/core';
import { Node } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
// import Bold from '@tiptap/extension-bold';
import { TextSelection, AllSelection, Transaction } from 'prosemirror-state';

type IndentOptions = {
  types: string[];
  indentLevels: number[];
  defaultIndentLevel: number;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
      character: () => ReturnType;
    };
  }
}

export function clamp(val: number, min: number, max: number): number {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

export enum IndentProps {
  min = 0,
  max = 300,

  more = 30,
  less = -30,
}

export function isBulletListNode(node: Node): boolean {
  return node.type.name === 'bullet_list';
}

export function isOrderedListNode(node: Node): boolean {
  return node.type.name === 'order_list';
}

export function isTodoListNode(node: Node): boolean {
  return node.type.name === 'todo_list';
}

export function isListNode(node: Node): boolean {
  return (
    isBulletListNode(node) || isOrderedListNode(node) || isTodoListNode(node)
  );
}

export function setNodeIndentMarkup(
  tr: Transaction,
  pos: number,
  delta: number
): Transaction {
  if (!tr.doc) return tr;

  const node = tr.doc.nodeAt(pos);
  if (!node) return tr;

  const minIndent = IndentProps.min;
  const maxIndent = IndentProps.max;

  let indent = 0;

  if (node.type.name === 'paragraph' || node.type.name === 'heading') {
    indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent);
  }

  if (indent === node.attrs.indent) return tr;

  const nodeAttrs = {
    ...node.attrs,
    indent,
  };

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}

function updateIndentLevel(tr: Transaction, delta: number): Transaction {
  const { doc, selection } = tr;

  if (!doc || !selection) return tr;

  if (
    !(selection instanceof TextSelection || selection instanceof AllSelection)
  ) {
    return tr;
  }

  const { from, to } = selection;

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type;

    if (nodeType.name === 'paragraph' || nodeType.name === 'heading') {
      tr = setNodeIndentMarkup(tr, pos, delta);
      return false;
    }
    if (isListNode(node)) {
      return false;
    }
    return true;
  });

  return tr;
}

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  defaultOptions: {
    types: ['heading', 'paragraph'],
    indentLevels: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
    defaultIndentLevel: 0,
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: this.options.defaultIndentLevel,
            renderHTML: attributes => ({
              style: `margin-left: ${attributes.indent}px!important;`,
            }),
            parseHTML: element => ({
              indent:
                parseInt(element.style.marginLeft) ||
                this.options.defaultIndentLevel,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);
          tr = updateIndentLevel(tr, IndentProps.more);

          if (tr.docChanged) {
            dispatch && dispatch(tr);
            return true;
          }

          return false;
        },
      outdent:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);
          tr = updateIndentLevel(tr, IndentProps.less);

          if (tr.docChanged) {
            dispatch && dispatch(tr);
            return true;
          }

          return false;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (
          !(
            this.editor.isActive('bulletList') ||
            this.editor.isActive('orderedList')
          )
        )
          return this.editor.commands.indent();
        return this.editor.commands.sinkListItem('listItem');
      },

      'Shift-Tab': () => {
        if (
          !(
            this.editor.isActive('bulletList') ||
            this.editor.isActive('orderedList')
          )
        )
          return this.editor.commands.outdent();
        return this.editor.commands.sinkListItem('listItem');
      },
    };
  },
});

export default Indent;
