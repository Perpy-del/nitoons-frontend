import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react'
import tippy from 'tippy.js'
import { ReactRenderer } from '@tiptap/react'
import { Editor, Range, Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
// import Image from '@tiptap/extension-image'
import { getPrevText } from '../lib/editor'
// import { startImageUpload } from '../plugins/upload-images'
// import styles from '@/styles/slash.module.css'
import { toast } from 'sonner'
// import va from '@vercel/analytics'
// import clx from 'classnames'
// import { CldImage } from 'next-cloudinary'

// import { useDebouncedCallback } from 'use-debounce';
import { useCompletion } from 'ai/react'

// Icons Import
import FilmCutIcon from '../../ScriptEditorIcons/FilmCutIcon'
import ActionIcon from '../../ScriptEditorIcons/ActionIcon'
import CharacterIcon from '../../ScriptEditorIcons/CharacterIcon'
import Parenthetical from '../../ScriptEditorIcons/Parenthetical'
import DialogueIcon from '../../ScriptEditorIcons/DialogueIcon'
import TransitionIcon from '../../ScriptEditorIcons/TransitionIcon'
import GeneralIcon from '../../ScriptEditorIcons/GeneralIcon'
import ScriptNotes from '../../ScriptEditorIcons/ScriptNotes'
import RenumberIcon from '../../ScriptEditorIcons/RenumberIcon'
import CommentsIcon from '../../ScriptEditorIcons/CommentsIcon'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import NotesIcon from '@mui/icons-material/Notes'
import ChecklistIcon from '@mui/icons-material/Checklist'
import { LuHeading1, LuHeading2, LuHeading3, LuTextQuote } from 'react-icons/lu'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import CodeIcon from '@mui/icons-material/Code'
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack'

import useNitoonsHook from '@/hooks/useNitoonsHook'
import { Button, CircularProgress, Paper, Typography } from '@mui/material'
import { EditorState, Transaction } from '@tiptap/pm/state'

interface CommandItemProps {
  title: string
  description: string
  icon: ReactNode
}

interface CommandProps {
  editor: Editor
  range: Range
}

const Command = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor
          range: Range
          props: any
        }) => {
          props.command({ editor, range })
        },
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: 'Continue writing',
      id: 'continue-writing',
      description: 'Use AI to expand your thoughts.',
      searchTerms: ['gpt'],
      icon: <AutoFixHighIcon style={{ color: '#353538' }} />,
    },
    // {
    //   title: "Send Feedback",
    //   description: "Let us know how we can improve.",
    //   // icon: <MessageSquarePlus size={18} />,
    //   command: ({ editor, range }: CommandProps) => {
    //     editor.chain().focus().deleteRange(range).run();
    //     window.open("/feedback", "_blank");
    //   },
    // },
    {
      title: 'Scene heading',
      id: 'scene-heading',
      description: 'When and where.',
      searchTerms: ['scene'],
      icon: <FilmCutIcon />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .scene().toggleBold()
          .run();
      },
    },
    {
      title: 'Action',
      id: 'action',
      description: 'Action scene.',
      searchTerms: ['ac', 'action'],
      icon: <ActionIcon />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .scene()
          .run();
      },
    },
    {
      title: 'Character',
      id: 'character',
      description: 'Set character name.',
      searchTerms: ['char'],
      icon: <CharacterIcon />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .character()
          .run();
      },
    },
    {
      title: 'Parenthetical',
      id: 'parens',
      description: 'Short performance notes.',
      searchTerms: ['par', 'paren'],
      icon: <Parenthetical />,
    },
    {
      title: 'Dialogue',
      id: 'dialogue',
      description: 'Set dialogue for character.',
      searchTerms: ['dia', 'dialogue'],
      icon: <DialogueIcon />,
    },
    {
      title: 'Transition',
      id: 'transition',
      description: 'Select transition.',
      searchTerms: ['trans', 'transition'],
      icon: <TransitionIcon />,
    },
    {
      title: 'General',
      id: 'general',
      description: 'Take notes.',
      searchTerms: ['gen'],
      icon: <GeneralIcon />,
    },
    {
      title: 'Script note',
      id: 'scriptnote',
      description: 'Use AI to expand your thoughts.',
      searchTerms: ['script'],
      icon: <ScriptNotes />,
    },
    {
      title: 'Renumber',
      id: 'renumber',
      description: 'Use AI to expand your thoughts.',
      searchTerms: ['re', 'renumber'],
      icon: <RenumberIcon />,
    },
    {
      title: 'Dual Dialogue',
      id: 'dualDialogue',
      description: 'Use AI to expand your thoughts.',
      searchTerms: ['dual'],
      icon: <CommentsIcon />,
    },
    {
      title: 'Text',
      id: 'text',
      description: 'Just start typing with plain text.',
      searchTerms: ['p', 'paragraph'],
      icon: <NotesIcon />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .run()
      },
    },
    {
      title: 'To-do List',
      id: 'todo',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: <ChecklistIcon />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
    },
    {
      title: 'Heading 1',
      id: 'heading-one',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      icon: <LuHeading1 style={{ fontSize: '24px', color: '#353538' }} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run()
      },
    },
    {
      title: 'Heading 2',
      id: 'heading-two',
      description: 'Medium section heading.',
      searchTerms: ['subtitle', 'medium'],
      icon: <LuHeading2 style={{ fontSize: '24px', color: '#353538' }} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run()
      },
    },
    {
      title: 'Heading 3',
      id: 'heading-three',
      description: 'Small section heading.',
      searchTerms: ['subtitle', 'small'],
      icon: <LuHeading3 style={{ fontSize: '24px', color: '#353538' }} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run()
      },
    },
    {
      title: 'Bullet List',
      id: 'bullet-list',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: <FormatListBulletedIcon />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
    },
    {
      title: 'Numbered List',
      id: 'numberedList',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered'],
      icon: <FormatListNumberedIcon />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      },
    },
    {
      title: 'Quote',
      id: 'quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote'],
      icon: <LuTextQuote style={{ fontSize: '24px', color: '#353538' }} />,
      command: ({ editor, range }: CommandProps) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
    },
    {
      title: 'Code',
      id: 'code',
      description: 'Capture a code snippet.',
      searchTerms: ['codeblock'],
      icon: <CodeIcon />,
      command: ({ editor, range }: CommandProps) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: 'Image',
      id: 'image',
      description: 'Upload an image.',
      searchTerms: ['photo', 'picture', 'media'],
      icon: <PhotoCameraBackIcon />,
      command: async ({ editor, range }: CommandProps) => {
        // Open a file picker or use your existing logic to get the selected file
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();
        
        fileInput.onchange = async () => {
          if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'nitoons');
        
            try {
              const response = await fetch('https://api.cloudinary.com/v1_1/dondeickl/upload', {
                method: 'POST',
                body: formData,
              });
        
              if (response.ok) {
                const data = await response.json();
                const imageUrl = data.secure_url;
                console.log(imageUrl);        
                // Insert the image into the editor
                editor.chain().focus().deleteRange(range).setImage({ src: imageUrl }).run();
              }
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          }
        };  
      },
    },
  ].filter(item => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase()
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms &&
          item.searchTerms.some((term: string) => term.includes(search)))
      )
    }
    return true
  })
}

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight
  const itemHeight = item ? item.offsetHeight : 0

  const top = item.offsetTop
  const bottom = top + itemHeight

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5
  }
}

const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[]
  command: any
  editor: any
  range: any
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const completionApi = useNitoonsHook()
  const completionApiRoute = completionApi.completionNitoonsApi
  // console.log('completion: ', completionApi.completionNitoonsApi)
  // const { completionApi } = useContext(NovelContext);

  const { complete, isLoading } = useCompletion({
    id: 'nitoons',
    api: '/api/useCompletion',
    onResponse: response => {
      console.log(response)
      if (response.status === 429) {
        toast.error('You have reached your request limit for the day.')
        // va.track('Rate Limit Reached')
        return
      }
      editor.chain().focus().deleteRange(range).run()
      // editor.chain().focus().aiComplete(options: TextOptions).run()
    },
    onFinish: (_prompt, completion) => {
      // highlight the generated text
      editor.commands.setTextSelection({
        from: range.from,
        to: range.from + completion.length,
      })
    },
    onError: e => {
      toast.error(e.message)
    },
  })

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index]
      if (item) {
        if (item.title === 'Continue writing') {
          if (isLoading) return
          complete(
            getPrevText(editor, {
              chars: 5000,
              offset: 1,
            }),
          )
          console.log('continue writing')
        } else {
          command(item)
        }
      }
    },
    [command, complete, editor, isLoading, items],
  )

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault()
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length)
          return true
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length)
          return true
        }
        if (e.key === 'Enter') {
          selectItem(selectedIndex)
          return true
        }
        return false
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [items, selectItem, selectedIndex, setSelectedIndex])

  useEffect(() => {
    setSelectedIndex(0)
  }, [items])

  const commandListContainer = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = commandListContainer?.current

    const item = container?.children[selectedIndex] as HTMLElement

    if (item && container) updateScrollView(container, item)
  }, [selectedIndex])

  return items.length > 0 ? (
    <Paper
      elevation={0}
      id="slash-command"
      ref={commandListContainer}
      style={{
        backgroundColor: '#FFF',
        boxShadow: '0px 2px 14px 0px rgba(0, 0, 0, 0.16)',
        overflowY: 'auto',
        maxHeight: '400px',
        width: '220px',
        // zIndex: -50
      }}
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <Button
            // className={clx(
            //   styles.slashCommandButton,
            //   index === selectedIndex ? styles.slashCommandButtonSelected : '',
            // )}
            sx={{
              backgroundColor: '#FFF',
              textTransform: 'capitalize',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
              gap: '10px',
              '&:hover': {
                backgroundColor: 'rgb(252, 240, 247)',
              },
            }}
            key={index}
            onClick={() => selectItem(index)}
          >
            <Paper elevation={0} sx={{ backgroundColor: 'transparent' }}>
              {item.title === 'Continue writing' && isLoading ? (
                <CircularProgress size={20} />
              ) : (
                item.icon
              )}
            </Paper>
            <Paper
              elevation={0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              <Typography
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#353538',
                }}
              >
                {item.title}
              </Typography>
              <Typography
                style={{
                  fontSize: '10px',
                  color: '#353538',
                  justifySelf: 'left',
                  alignSelf: 'left',
                }}
              >
                {item.description}
              </Typography>
            </Paper>
          </Button>
        )
      })}
    </Paper>
  ) : null
}

const renderItems = () => {
  let component: ReactRenderer | null = null
  let popup: any | null = null

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      })

      // @ts-ignore
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props)

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide()

        return true
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props)
    },
    onExit: () => {
      popup?.[0].destroy()
      component?.destroy()
    },
  }
}

const SlashCommand = Command.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
})

export default SlashCommand
// function useCompletion(arg0: { id: string; api: any; onResponse: (response: any) => void; onFinish: (_prompt: any, completion: any) => void; onError: (e: any) => void }): { complete: any; isLoading: any } {
//   throw new Error('Function not implemented.')
// }