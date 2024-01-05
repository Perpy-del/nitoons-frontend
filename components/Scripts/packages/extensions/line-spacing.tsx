import { Extension } from '@tiptap/core';

type LineSpacingOptions = {
  types: string[];
  lineSpacing: number[];
  defaultLineSpacing: number;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineSpacing: {
      lineSpacing: (options?: { lineSpacing: number }) => ReturnType;
    };
  }
}

const LineSpacing = Extension.create<LineSpacingOptions>({
  name: 'lineSpacing',

  addOptions() {
    return {
      types: ['heading', 'paragraph'],
      lineSpacing: [1.0, 1.2, 1.5, 1.6, 1.8, 2.0, 2.4, 2.8, 3.0, 4.0, 5.0],
      defaultLineSpacing: 1.0,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineSpacing: {
            default: this.options.defaultLineSpacing,
            renderHTML: attributes => ({
              style: `line-height: ${attributes.lineSpacing}!important;`,
            }),
            parseHTML: element => ({
              lineSpacing:
                parseFloat(element.style.lineHeight) ||
                this.options.defaultLineSpacing,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      lineSpacing:
        (options?: { lineSpacing: number }) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          tr = tr.setSelection(selection);

          if (from === to) {
            const $pos = tr.doc.resolve(from);

            // Set the line spacing attribute on the whole paragraph (or other container)
            tr = tr.setNodeMarkup($pos.before($pos.depth), null, {
              lineSpacing:
                options?.lineSpacing || this.options.defaultLineSpacing,
            });
          } else {
            // Iterate over the selected content and apply the lineSpacing attribute
            tr.doc.nodesBetween(from, to, (node, pos) => {
              if (node.isTextblock) {
                tr = tr.setNodeMarkup(pos, null, {
                  lineSpacing:
                    options?.lineSpacing || this.options.defaultLineSpacing,
                });
              }
            });
          }

          if (tr.docChanged) {
            dispatch && dispatch(tr);
            return true;
          }

          return false;
        },
    };
  },
});

export default LineSpacing;
