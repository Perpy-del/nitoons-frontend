import * as React from 'react'
import {
  useNitoonsStoreState,
  useNitoonsStoreActions,
} from '../store/NitoonsStore'
import * as io from 'socket.io-client'
import { Newspaper } from 'lucide-react'
import { JSONContent } from '@tiptap/core'
const MySocketUrlV1 = 'ws://localhost:8080'

// import {useCanvasSocket}  from '@/services/api-requests/api-request'

export default function useNitoonsHook() {
    const completionNitoonsApi = useNitoonsStoreState(
      state => state.completionNitoonsApi,
    )
    const setCompletionNitoonsApi = useNitoonsStoreActions(
      actions => actions.setCompletionNitoonsApi,
    )
    const activeChapter = useNitoonsStoreState(
      state => state.activeChapter
    )
    const setActiveChapter = useNitoonsStoreActions(
      actions => actions.setActiveChapter
    )
    const argument = useNitoonsStoreState(
      state => state.argument
    )
    const setArgument = useNitoonsStoreActions(
      actions => actions.setArgument,
    )
    const chapterContent = useNitoonsStoreState(
      state => state.chapterContent
    )
    const setChapterContent =  useNitoonsStoreActions(
      actions => actions.setChapterContent,
    )
    const  contentSaved = useNitoonsStoreState(
      state => state.contentSaved
    )
    const setContentSaved = useNitoonsStoreActions(
      actions => actions.setContentSaved,
    )
    const showRegularEditor = useNitoonsStoreState(
      state => state.showRegularEditor,
    )
    const setShowRegularEditor = useNitoonsStoreActions(
      actions => actions.setShowRegularEditor
    )
    const showScreenplayEditor = useNitoonsStoreState(
      state => state.showScreenplayEditor,
    )
    const setShowScreenplayEditor = useNitoonsStoreActions(
      actions => actions.setShowScreenplayEditor
    )
    const scriptTitle = useNitoonsStoreState(
      state => state.scriptTitle
    )
    const setScriptTitle = useNitoonsStoreActions(
      state => state.setScriptTitle
    )
    const wordCount = useNitoonsStoreState(
      state => state.wordCount
    )
    const setWordCount = useNitoonsStoreActions(
      state => state.setWordCount
    )
    const characterCount = useNitoonsStoreState(
      state => state.characterCount
    )
    const setCharacterCount = useNitoonsStoreActions(
      state => state.setCharacterCount
    )
    const isEditing = useNitoonsStoreState(
      state => state.isEditing
    )
    const setIsEditing = useNitoonsStoreActions(
      state => state.setIsEditing
    )
    const filmCut = useNitoonsStoreState(
      state => state.filmCut
    )
    const setFilmCut = useNitoonsStoreActions(
      state => state.setFilmCut
    )


    function useCanvasSocket() {
      const socket = io.connect(MySocketUrlV1, {
        // path: '/api/v1/chapters',
        transports: ['websocket', 'polling'],
        // reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        // randomizationFactor: 0.5,
        // query: {
        //     token: GetUserAuthToken()
        // }
      })


    socket.on('connect_error', error => {
      // console.error('Socket connection error:', error)
    })

    socket.on('connect', async () => {
      console.log('Canvas connection established successfully')
    })

    socket.emit('hello2', { key: 'value' }, (responseData: any) => {
      // console.log('hello sent successfully', responseData)
    })

    socket.on('new-chapter', (arg) => {
      const newChapterId = arg?.chapter?._id
      setActiveChapter(newChapterId)
      setArgument(arg) 
    })

    socket.on('fetched-chapter', (content) => {
      const updatedChapter = content?.fetchedChapter?.content
      // console.log('FETCH_CHAP_CONTENT: ', updatedChapter)
      setChapterContent(updatedChapter)
      // console.log("updated-chapter: ",  updatedChapter)
    });

    const fetchChapterContent = (chapter_id: string) => {
      // console.log("FETCHCHAPID: ", chapter_id)
      socket.emit('fetch-chapter', { chapter_id})
    }

    const handleCreateChapter = (scriptId: any) => {
      socket.emit('create-chapter', { 'scriptId': scriptId })
    };
    const handleUpdateChapter = (chapter_id: string, scriptId: string, userId: string, newContent: JSONContent[] | undefined) => {
      // console.log("UI-Update-ID: ", chapter_id)
      // console.log("UI-Update-ID: ", newContent)
      socket.emit('update-chapter', { chapter_id, scriptId, userId, newContent })
    };

    return {
      handleCreateChapter,
      handleUpdateChapter,
      fetchChapterContent
    }
  }

  // const connectSocket = useCanvasSocket()

  return {
    completionNitoonsApi,
    setCompletionNitoonsApi,
    activeChapter,
    setActiveChapter,
    argument,
    chapterContent,
    contentSaved,
    setContentSaved,
    showRegularEditor,
    setShowRegularEditor,
    showScreenplayEditor,
    setShowScreenplayEditor,
    scriptTitle,
    setScriptTitle,
    wordCount,
    setWordCount,
    characterCount ,
    setCharacterCount,
    isEditing,
    setIsEditing,
    filmCut,
    setFilmCut,
    useCanvasSocket
    // connectSocket
  }
}
