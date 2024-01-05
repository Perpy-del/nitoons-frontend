/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { EditorContent, Editor, JSONContent } from '@tiptap/react'
import { EditorBubbleMenu } from "./bubble-menu";
// import { Editor } from 'novel'
import { Container } from '@mui/material'
import useNitoonsHook from '@/hooks/useNitoonsHook'
import { useRouter } from 'next/router';
import { GetUserAuthToken } from '@/services/config';

const CanvasEditor = (props: { editor: Editor }) => {
    const [userId, setUserId] = React.useState('');
    const [scriptId, setScriptId] = React.useState<string>('');
    
    
    const nitoonsHook = useNitoonsHook()
    const activeChapterId = nitoonsHook.activeChapter
    const router = useRouter();
    const token = GetUserAuthToken();
  
    React.useEffect(() => {
      const id = localStorage.getItem('user_id') as string;
      typeof id === 'string' && setUserId(id);
      const scriptId = router.query?.canvas_id;
      typeof scriptId === 'string' && setScriptId(scriptId);
      console.log('SCRIPT_ID: ', scriptId);
      const token = GetUserAuthToken();
    }, []);

    React.useEffect(() => {
      console.log("filmcut: ", nitoonsHook.filmCut)
    }, [nitoonsHook.filmCut])

  React.useEffect(() => {
      
    let saveTimeout: any;
  
    const saveContent = () => {
      // console.log("active-chapter: ", activeChapterId)
      // console.log("saving ...");
      nitoonsHook.setContentSaved(false)
      saveTimeout = setTimeout(() => {
        const jsonContent = props.editor.getJSON().content
        // console.log("ContentSaved: ",jsonContent)
        onSave(jsonContent);
        // console.log("saved");
        nitoonsHook.setContentSaved(true)
        clearTimeout(saveTimeout);
      }, 2000);
    };

    const listener = (props:{editor: any}) => {
      clearTimeout(saveTimeout);
      const { words, characters } = getCountsFromEditor();
      nitoonsHook.setWordCount(words)
      nitoonsHook.setCharacterCount(characters)
      // console.log('WORD COUNT: ', words,' Character count: ', characters) 
      saveContent(); 
    };
  
    props.editor?.on("update", listener);
  
    return () => {
      props.editor?.off("update", listener);
      clearTimeout(saveTimeout); 
    };
  }, [activeChapterId]);

  const onSave = (content: JSONContent[] | undefined) => {
    // console.log("HOOK: ", nitoonsHook)
    // console.log('Auto-saving content:', content, activeChapterId);
    nitoonsHook.useCanvasSocket().handleUpdateChapter(activeChapterId,scriptId, userId, content)
  }

  function getCountsFromEditor() {
    const state = props.editor?.state;
    const doc = state?.doc;
  
    // Calculate word count
    const words = doc?.textContent.split(/\s+/).filter(Boolean).length;
  
    // Calculate character count
    const characters = doc?.textContent.length;
  
    return {words, characters};
  }
 
  // console.log('Active Scene: ', props.editor?.state.tr.storedMarks?.[1]?.type.name)
  // console.log('Added Mark: ',  props.editor?.state.tr)
 const sceneActive = props.editor?.isActive('scene')
 
  return (
    <Container
      // sx={{ maxHeight: '100vh' }}
      onClick={() => {
        props.editor?.chain().focus().run()
      }}
    >
      {/* {nitoonsHook.filmCut
      && 
      // <EditorBubbleMenu editor={props.editor}/>
      <div style={{background:"blue", width:"200px", height:"300px", position:"relative", zIndex:"10px", top:"430px"}}>helooooo</div>
      } */}
      
      <EditorContent
        style={{
          backgroundColor: '#FFF',
          height: '100vh',
          border: '1px solid white',
          marginTop: '30px',
          fontFamily: 'Courier Prime, monospace',
          // fontSize: '16px',
        }}
        editor={props.editor}
      />
      {/* <Editor /> */}
    </Container>
  )
}


export default CanvasEditor