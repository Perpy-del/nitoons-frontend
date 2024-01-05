import { Mark, Node } from '@tiptap/core';


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      int: {
        toggleInt: () => ReturnType,
      }
    }
  }

export const IntMark = Node.create({
    name: 'int',

    addOptions() {
      return {
        HTMLAttributes: {},
      }
    },
  
      // addGlobalAttributes() {
      //   return [
      //     {
      //       types: this.options.types,
      //       attributes: {
      //         int: {
      //           default: this.options.defaultText,
      //           renderHTML: (attributes) => ({
      //             style: `font-size: ${attributes.fontSize || this.options.fontSize}; font-weight: ${attributes.fontWeight || this.options.fontWeight};`,
      //           }),
      //           parseHTML: (element) => {
      //             return {
      //               int: element.dataset.int || this.options.defaultText,
      //             };
      //           },
      //         },
      //       },
      //     },
      //   ]
      // },

      // addCommands() {
      //   return {
      //     toggleInt: () => ({ commands, editor }) => {
      //       console.log('commands works!!! : ', commands.insertContent('INT'))
            
      //       return  commands.toggleNode(this.name, 'int');
            
      //     },
      //   };
      // },

      addKeyboardShortcuts() {
        return {
          '/': () => {
            console.log('Scene heading commands');
            // console.log('commands works!!! : ', this.editor.commands.insertContent('INT'))
            return this.editor.commands.toggleNode(this.name, 'int');
          },
        };
      },
      
      
})

export default IntMark;
