import { Extension } from '@tiptap/core'
import { TextSelection } from '@tiptap/pm/state'


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      character: {
        character: () => ReturnType,
      }
    }
  }

export const Character = Extension.create({
    name: 'character',
  
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
            character: {
              default: this.options.defaultIndentLevel,
              renderHTML: attributes => ({
                style: `margin-left: ${attributes.indent}px!important;`
              }),
              parseHTML: element => ({
                character: parseInt(element.style.marginLeft) || this.options.defaultIndentLevel,
              }),
            },
          },
        },
      ]
    },
  
    addCommands() {
      return {
        character: 
        () => ({ tr, state, dispatch }) => {
          const { selection } = state;
        
          if (selection instanceof TextSelection) {
            const { $from } = selection;
        
            // Get the resolved position of the current cursor position
            const resolvedPos = tr.doc.resolve($from.pos);
        
            const lineStart = resolvedPos.start(-1);
            const lineEnd = resolvedPos.end(-1);
        
            const middlePos = lineStart + Math.floor((lineEnd - lineStart) / 2);
            tr = tr.setSelection(TextSelection.near(tr.doc.resolve(middlePos)));
          }
        
          if (tr.docChanged) {
            dispatch && dispatch(tr);
            return true;
          }
        
          return false;
        }
      }
    },
  
  })
  
  export default Character;