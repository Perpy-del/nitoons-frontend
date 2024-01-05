import { Extension } from '@tiptap/core';

type fontSizeOptions = {
  types: string[];
  fontSize: number[];
  // defaultFontSize: number;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      fontSize: (options?: { fontSize: number }) => ReturnType;
    };
  }
}

export const FontSize = Extension.create<fontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['heading', 'paragraph'],
      fontSize: [10, 11, 12, 13, 14, 16, 18, 24, 30, 36, 48, 60],
      // defaultFontSize: 11,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            // default: this.options.defaultFontSize,
            renderHTML: attributes => ({
              style: `font-size: ${attributes.fontSize}px!important;`,
            }),
            parseHTML: element => ({
              fontSize:
                parseInt(element.style.fontSize)
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      fontSize:
        (options?: { fontSize: number }) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          if (from === to) {
            const $pos = tr.doc.resolve(from);

            tr = tr.setNodeMarkup($pos.before($pos.depth), null, {
              fontSize: options?.fontSize
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

export default FontSize;
