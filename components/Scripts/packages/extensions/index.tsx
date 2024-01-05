import { EditorProps } from '@tiptap/pm/view'
import {  Editor } from '@tiptap/react'
// import { startImageUpload } from '../plugins/upload-images'
import styles from '@/styles/canvas.module.css'
// import { Markdown } from "tiptap-markdown"
import { InputRule } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TiptapLink from '@tiptap/extension-link'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import FontFamily from '@tiptap/extension-font-family'
import { Color } from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Heading from '@tiptap/extension-heading'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import SlashCommand from './slash-command'
import Indent from './indent-command'
import {Scene} from './screenplay/scene-heading'
import IntMark from './screenplay/int'
import Action from './screenplay/action'
import Character from './screenplay/character'
import Parenthetical from './screenplay/parenthetical'
import Dialogue from './screenplay/dialogue'
import Transition from './screenplay/transition'
import General from './screenplay/general'
import Script from './screenplay/script'
import Renumber from './screenplay/renumber'
import Dual from './screenplay/dual'
import UpdatedImage from './update-image'
import CustomKeymap from './custom-keymap'
import DragAndDrop from './drag-and-drop'
import FontSize from './font-size'
import LineSpacing from './line-spacing'
import Doc from '@tiptap/extension-document';

const CharacterLimit = 2000;

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: styles.bullerList,
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: styles.orderedList,
      },
    },
    listItem: {
      HTMLAttributes: {
        class: styles.listItem,
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: styles.blockquote,
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: styles.codeBlock,
      },
    },
    code: {
      HTMLAttributes: {
        class: styles.code,
        spellcheck: 'false',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {}

            const { tr } = state
            const start = range.from
            let end = range.to

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end),
            )
          },
        }),
      ]
    },
  }).configure({
    HTMLAttributes: {
      class: styles.horizontalRule,
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class: styles.taskItem,
    },
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: styles.taskList,
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: styles.taskItem,
    },
    nested: true,
  }),
  // Markdown.configure({
  //     html: false,
  //     transformCopiedText: true,
  //     transformPastedText: true,
  // }),
  CharacterCount.configure({
    limit: 2000
  }),
  Highlight.configure({
    multicolor: true,
  }),
  UpdatedImage.configure({
    HTMLAttributes: {
      class: styles.updateImage,
    },
  }),
  Link.configure({
    openOnClick: false,
  }),
  SlashCommand,
  Indent,
  FontSize,
  LineSpacing,
  // Scene,
  Action,
  Character,
  Parenthetical,
  Dialogue,
  Transition,
  General,
  Script,
  Renumber,
  Dual,
  IntMark,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  FontFamily,
  Color,
  Document,
  Paragraph,
  Subscript,
  Text.configure({
    placeholder: 'Type something...',
    maxLength: CharacterLimit,
  }),
  Doc,
  Bold,
  Italic,
  Underline,
  Strike,
  CharacterCount.configure({
    limit: 2000
  }),
  // Heading.configure({
  //   levels: [1, 2, 3],
  // }),
  Placeholder.configure({
    emptyEditorClass: styles.editorEmpty,
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`
      }
      return "Press '/' for commands, or '++' for AI autocomplete..."
    },
    includeChildren: true,
  }),
  CustomKeymap,
  DragAndDrop,
]

export const defaultEditorProps: EditorProps = {
  attributes: {
    class: styles.editorProps,
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
        const slashCommand = document.querySelector('#slash-command')
        if (slashCommand) {
          return true
        }
      }
    },
  },
  handlePaste: (view, event) => {
    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files[0]
    ) {
      event.preventDefault()
      const file = event.clipboardData.files[0]
      const pos = view.state.selection.from

      // startImageUpload(file, view, pos)
      return true
    }
    return false
  },
  handleDrop: (view, event, _slice, moved) => {
    if (
      !moved &&
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files[0]
    ) {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      const coordinates = view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      })
      // here we deduct 1 from the pos or else the image will create an extra node
      // startImageUpload(file, view, coordinates?.pos || 0 - 1)
      return true
    }
    return false
  },
}