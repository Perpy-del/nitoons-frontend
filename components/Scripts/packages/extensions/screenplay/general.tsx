import { Extension } from '@tiptap/core'


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      general: {
        general: () => ReturnType,
      }
    }
  }

export const General = Extension.create({
    name: 'general',
  
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
            general: {
              default: this.options.defaultIndentLevel,
              renderHTML: attributes => ({
                style: `margin-left: ${attributes.indent}px!important;`
              }),
              parseHTML: element => ({
                general: parseInt(element.style.marginLeft) || this.options.defaultIndentLevel,
              }),
            },
          },
        },
      ]
    },
  
    addCommands() {
      return {
        general: () => ({ tr, state, dispatch }) => {
            console.log("transaction: ", tr)
            console.log("state: ", state)
            console.log("dispatch: ", dispatch)
          const { selection } = state
        //   tr = tr.setSelection(selection)
        //   tr = updateIndentLevel(tr, IndentProps.more)
  
        //   if (tr.docChanged) {
        //     dispatch && dispatch(tr)
        //     return true
        //   }
  
          return false
        },
      }
    },
  
  })
  
  export default General;