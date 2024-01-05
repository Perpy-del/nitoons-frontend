import { Extension, Mark, Node } from '@tiptap/core';
import { AllSelection, TextSelection, Transaction } from '@tiptap/pm/state';
import { isListNode, setNodeIndentMarkup } from '../indent-command';


declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    scene: {
      toggleScene: () => ReturnType,
      setScene: () => ReturnType,
      unsetScene: () => ReturnType,
    }
  }
}

export const Scene = Mark.create({
  name: 'scene',

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
          scene: {
            default: this.options.defaultIndentLevel,
            renderHTML: attributes => ({
              style: `margin-left: ${attributes.indent}px!important;`,
            }),
            parseHTML: element => ({
              scene:
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
      setScene:
        () =>
        ({ tr, state, dispatch, commands }) => {
          const { selection } = state;

          if (
            selection instanceof TextSelection ||
            selection instanceof AllSelection
          ) {
            const { from, to } = selection;

            tr = tr.setSelection(selection);

            tr.doc.nodesBetween(from, to, (node, pos) => {
              const nodeType = node.type;

              if (
                nodeType.name === 'paragraph' ||
                nodeType.name === 'heading'
              ) {
                tr = setNodeIndentMarkup(tr, pos, -node.attrs.indent);
              } else if (isListNode(node)) {
                return false;
              }

              return true;
            });
          }

          if (tr.docChanged) {
            dispatch && dispatch(tr);
            return true;
          }
          return false;
        },
        unsetScene: () => ({ tr, state, dispatch, commands }) => {
          return commands.unsetMark('scene');

        },
        toggleScene: () => ({ tr, state, dispatch, commands }) => {
          return commands.toggleMark('scene');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
        'Enter': () => {
          if(this.editor?.isActive('scene')) {
            // console.log('Scene heading commands')
            return this.editor.commands.toggleScene()
          }
          return  false

        }
    };
  },
});




