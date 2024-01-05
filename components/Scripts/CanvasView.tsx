/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CanvasTopBar from './CanvasTopBar'
import CanvasLeftDrawer from './CanvasLeftDrawer'
import CanvasEditorView from './CanvasEditorView'
import CanvasRightDrawer from './CanvasRightDrawer'
import CanvasEditorNavBar from './CanvasEditorNavBar'
import { Box, Container } from '@mui/material'
// import styles from '@/styles/canvas.module.css'
import { useEditor, Editor } from '@tiptap/react'
import { useRouter } from 'next/router';
import { GetUserAuthToken } from '@/services/config'
import { defaultExtensions, defaultEditorProps } from './packages/extensions'
import { fetchAllParagraphs } from '@/services/api-requests/api-request'
import useNitoonsHook from '@/hooks/useNitoonsHook'

const CharacterLimit: number = 20;

const CanvasView = () => {
  const editor = useEditor({
    extensions: [...defaultExtensions],
    editorProps: { 
      ...defaultEditorProps 
    },
  })
  
  const createEditor = () => {
    return editor
  }

  const [editorInstances, setEditorInstances] = React.useState([createEditor()])

  const addEditorInstance = () => {
    setEditorInstances((prevInstances) => [...prevInstances, createEditor()])
  }

  React.useEffect(() => {
    const currentEditor = editorInstances[editorInstances.length - 1];
    currentEditor?.on('transaction', () => {
      const jsonString = JSON.stringify(currentEditor.getJSON());
      const characterCount = jsonString.length;
      if (characterCount >= CharacterLimit) {
        addEditorInstance();
      }
    })
  }, [editorInstances]);

 const nitoonsHook = useNitoonsHook()
 const activeChapterId = nitoonsHook.activeChapter
 const chapterContent = nitoonsHook.chapterContent
//  const [initialLenth, setInitialLength] = React.useState(0);

//  console.log("Active Chapter: ", activeChapterId)
  React.useEffect(() => {
    setChapterContent({editor});
    const { words, characters } = getCountsFromEditor();
      nitoonsHook.setWordCount(words)
      nitoonsHook.setCharacterCount(characters)
  }, [chapterContent])

  const setChapterContent = (props:{editor: Editor | null}) => {
    try {
      props.editor?.commands.setContent(chapterContent);
    } catch (err) {
      console.log(err)
    }
  }

  function getCountsFromEditor() {
    const state = editor?.state;
    const doc = state?.doc;
  
    // Calculate word count
    const words = doc?.textContent.split(/\s+/).filter(Boolean).length;
  
    // Calculate character count
    const characters = doc?.textContent.length;
  
    return {words, characters};
  }

//   const handleSceneHeading = () => {
//     setSceneHeading((prev) => !prev)
//   }
//  console.log('SCENE-HEADING-CLICKED: ', sceneHeading)

  return (
    <>
      <CanvasTopBar />
      <Box sx={{ display: 'flex' }}>
        <CanvasLeftDrawer editor={editor} />
        <Container 
        disableGutters
        sx = {{
            overflowX:"hidden"
        }}
        >
          <CanvasEditorNavBar editor={editor} />
          <Box sx={{ display: 'flex'}}>
            <CanvasEditorView editor={editor} instances={editorInstances} />
            <CanvasRightDrawer />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default CanvasView