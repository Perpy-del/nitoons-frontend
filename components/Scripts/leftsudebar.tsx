/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
  Box,
  Divider,
  Container,
  MenuItem,
  Menu 
} from '@mui/material'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import styles from '@/styles/canvasnavbar.module.css'
import { useRouter } from 'next/router'
import { GetUserAuthToken } from '@/services/config'
import { styled } from '@mui/material/styles'
// import { createNewChapter } from '@/services/api-requests/api-request'
import PopUpIcon from './ScriptEditorIcons/PopUpIcon'
import DropdownIcon from './ScriptEditorIcons/DropdownIcon'
import ChapterIcon from './ScriptEditorIcons/ChapterIcon'
import { fetchAllChapter, handleRenameRequest, fetchScript } from '@/services/api-requests/api-request'
import useNitoonsHook from '@/hooks/useNitoonsHook'
import EditableText from '@/components/EditableText/Editabletext'

const drawerWidth = 290

const CanvasLeftDrawer = (props: { num?: number, scriptId?: string }) => {
  const [isActive, setIsActive] = React.useState(false)
  const [selectChapter, setSelectChapter] =React.useState<React.ReactNode | null>(null)
  const [isEditing, setEditing] = React.useState(false);
  const [hoveredChapter, setHoveredChapter] = React.useState('')
  const [isHovered, setIsHovered] = React.useState(false)
  const [userId, setUserId] = React.useState('');
  const [scriptId, setScriptId] = React.useState<string>('');
  const [scriptTitle, setScriptTitle] = React.useState<string>('');
  const [isChapterHovered, setIsChapterHovered] = React.useState(false)
  const [chapters, setChapters] = React.useState([])
  const [showChapters, setShowChapters] = React.useState(true)
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [scriptAnchorEl, setScriptAnchorEl] = React.useState<any>({
    element: null,
    script_Id: null,
  });
  const [chapterAnchorEl, setChapterAnchorEl] = React.useState<any>({
    element: null,
    chapter_Id: null,
  });

    
    const router = useRouter();
    const nitoonsHook = useNitoonsHook()

    React.useEffect(() => {
      const id = localStorage.getItem('user_id') as string;
      typeof id === 'string' && setUserId(id);
      const scriptId  = router.query?.canvas_id ;
      typeof scriptId === 'string' && setScriptId(scriptId)
      console.log("SCRIPT_ID: ", scriptId)
      const token = GetUserAuthToken();
      fetchScriptById({scriptId, token})
      fetchedChapters({scriptId, token});
    }, [nitoonsHook.argument])

    const handleDoubleClick = () => {
      setEditing(true);
    };


    const handleChapterClick = (
      event: React.MouseEvent<HTMLElement>,
      chapter_Id: any
    ) => {
      setChapterAnchorEl({ element: event.currentTarget, chapter_Id});
    };

    const handleChapterClose = () => {
      setChapterAnchorEl({
        element: null,
        chapter_Id: null,
      });
    };

    const handleScriptClick = (
      event: React.MouseEvent<HTMLElement>,
      script_Id: any
    ) => {
      setScriptAnchorEl({ element: event.currentTarget, script_Id});
    };
  
    const handleScriptClose = () => {
      setScriptAnchorEl({
        element: null,
        script_Id: null,
      });
    };

    const fetchedChapters = async (props:{ scriptId: any, token: any }) => {
      try {
        if (!props.token) {
          console.error('Error: No valid token available')
          return
        }
        const allChapters = await fetchAllChapter({scriptId: props.scriptId, token: props.token})
        const allFetchedChapters = allChapters?.data?.data
        const activeChapter_id = allFetchedChapters[allFetchedChapters.length - 1]._id
        console.log("ACTIVE_CHAP: ", activeChapter_id)
        nitoonsHook.setActiveChapter(activeChapter_id)
        nitoonsHook.useCanvasSocket().fetchChapterContent(activeChapter_id)
        setChapters(allFetchedChapters)
      } catch (err) {
        console.log(err)
      }
    }
    
  const handleShowChapters = () => {
    setShowChapters(prev => !prev)
  }

  const handleChapterCreate = () => {
    nitoonsHook.useCanvasSocket().handleCreateChapter(scriptId)
  }

  const handleClick = (index: number, chapter_id: string) => {
    setActiveIndex(index)
    nitoonsHook.setActiveChapter(chapter_id)
    nitoonsHook.useCanvasSocket().fetchChapterContent(chapter_id)
  }

  const CustomizedMenu = styled(Menu)`
  .MuiMenu-paper {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.16); !important;
  }
`

async function fetchScriptById(props: { scriptId: any, token: any }) {
  try {
    if (!props.token) {
      console.error('Error: No valid token available')
      return
    }
    const response = await fetchScript({ token: props.token, scriptId: props.scriptId })
    const script_title = response?.data?.data?.title
    setScriptTitle(script_title)
  } catch (error) {
    console.error('Error:', error)
  }
}

const handleScriptSave = async (id:any, newName:any) => {
      const title = newName;
      const scriptId = id;
      const token = GetUserAuthToken();
      try {
        if (!token) {
          console.error('Error: No valid token available');
          return;
        }
    
        const response = await handleRenameRequest({
          userId,
          scriptId,
          title,
          token,
        });
       fetchScriptById({scriptId , token});
      } catch (error) {
        console.error('Error:', error);
      }
};

const handleSave = (id:any, newName:any) => {
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          // maxHeight: '100vh',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: '10px',
              marginTop:"24px",
              marginBottom:"10px"
            }}
            onMouseEnter={(e) => {
              e.preventDefault()
              setIsHovered(true)
            }}
            onMouseLeave={(e) => {
              e.preventDefault()
              setIsHovered(false)
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                marginLeft: '24px',
              }}
            >
              <Image
                src="/bx_file.svg"
                alt="script icon"
                width="24"
                height="24"
              />
              <Typography style={{ fontSize: '18px', fontWeight: '600' }}>
              <EditableText
                // key={}
                id={scriptId}
                initialValue={scriptTitle}
                onSave={handleScriptSave}
                isEditing={isEditing}
                setEditing={setEditing}
                handleDoubleClick={handleDoubleClick}
              />
              </Typography>
            </div>
            {
              isHovered &&
            <IconButton onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              handleScriptClick(e, scriptId)
              }}
            >
              <Image
                src="/pencil_dots-x.svg"
                alt="script icon"
                width="20"
                height="20"
              />
            </IconButton>
            }
            <CustomizedMenu
                anchorEl={scriptAnchorEl.element}
                open={Boolean(scriptAnchorEl.script_Id === scriptId)}
                onClose={handleScriptClose}
              >
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px'
                  }}
                  onClick={() => {
                    handleDoubleClick()
                    handleScriptClose()
                  }}
                >
                  <Image
                    src="/la_pen-alTi.svg"
                    alt="Logo"
                    width='20' 
                    height='20'
                  />
                  <Typography>Rename</Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onClick={() => {
                    handleChapterCreate()
                    handleScriptClose()
                  }}
                >
                  <Image
                    src="/carbon_add2.svg"
                    alt="Logo"
                    width='20' 
                    height='20' 
                    style={{
                      color: '#353538'
                    }}
                  />
                  <Typography>Add chapter</Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px'
                  }}
                  onClick={() => {
                    // props.setTrashScriptId(props.script._id)
                    // props.setTrashOneScript(true)
                    handleScriptClose()
                  }}
                >
                  <Image
                    src="/solar_trash-bin-trash-linear.svg"
                    alt="Logo"
                    width='20' 
                    height='20' 
                  />
                  <Typography>Delete</Typography>
                </MenuItem>
            </CustomizedMenu>
            <button
              className={styles.headingButton}
              onClick={handleShowChapters}
            >
              {showChapters ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
          </Paper>
          {showChapters && (
            <Container
              disableGutters
              style={{
                marginBottom: '10px',
              }}
            >
              {chapters.map((chapter: any, index: number) => (
                <>
                  <Paper
                    elevation={0}
                    style={{
                      display: 'flex',
                      cursor: 'pointer',
                      alignItems: 'center',
                      padding: '10px 55px',
                      height: '45px',
                      gap: 10,
                      color: (activeIndex === index || nitoonsHook.activeChapter === chapter._id) ? '#DB1372' : '#353538',
                      background: (activeIndex === index || nitoonsHook.activeChapter === chapter._id) ? '#EEEEF2' : '#FFF',
                      transition: 'transform 5s ease-in-out',
                    }}
                    onMouseEnter={() => {
                      setIsChapterHovered(true) 
                      // setHoveredChapter(chapter._id)
                    }}
                    // onMouseLeave={() => setIsChapterHovered(false)}
                  >
                    <div
                    onClick={() => {
                      handleClick(index, chapter._id)
                    }}
                    >
                      {(activeIndex === index || nitoonsHook.activeChapter === chapter._id) ? (
                        <ChapterIcon
                        active={true} 
                        />
                      ) : (
                        <ChapterIcon 
                        active={false} 
                        
                        />
                      )}
                    </div>

                    <Typography
                      style={{
                        fontSize: '18px',
                      }}
                      onClick={() => {
                        handleClick(index, chapter._id)
                      }}
                    >
                      s
                        {/* <EditableText
                          key={chapter._id}
                          id={chapter._id}
                          initialValue={chapter.title}
                          onSave={handleSave}
                          isEditing={isEditing}
                          setEditing={setEditing}
                          handleDoubleClick={handleDoubleClick}
                        /> */}
                    </Typography>
                    {
                      isChapterHovered && hoveredChapter === chapter._id &&
                      <IconButton onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        handleChapterClick(e, chapter._id)
                        }}
                      >
                        {
                          nitoonsHook.activeChapter === chapter._id ?
                          <Image
                            src="/icon-button-active.svg"
                            alt="script icon"
                            width="20"
                            height="20"
                          />
                          :
                          <Image
                            src="/icon-button.svg"
                            alt="script icon"
                            width="20"
                            height="20"
                          />
                        }
                      </IconButton>
                    }
                      <CustomizedMenu
                        anchorEl={chapterAnchorEl.element}
                        open={Boolean(chapterAnchorEl.chapter_Id === chapter._id)}
                        onClose={handleChapterClose}
                      >
                        <MenuItem
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '140px',
                            marginTop: '10px'
                          }}
                          onClick={() => {
                            handleChapterClose()
                          }}
                        >
                          <Image
                            src="/la_pen-alTi.svg"
                            alt="Logo"
                            width='20' 
                            height='20'
                          />
                          <Typography>Rename</Typography>
                        </MenuItem>
                        <MenuItem
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px'
                          }}
                          onClick={() => {
                            // props.setTrashScriptId(props.script._id)
                            // props.setTrashOneScript(true)
                            handleChapterClose()
                          }}
                        >
                          <Image
                            src="/solar_trash-bin-trash-linear.svg"
                            alt="Logo"
                            width='20' 
                            height='20' 
                          />
                          <Typography>Delete</Typography>
                        </MenuItem>
                      </CustomizedMenu>
                  </Paper>
                </>
              ))}
            </Container>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginLeft: '52px',
              cursor: 'pointer',
            }}

            onClick={() => handleChapterCreate()}
          >
            <Image
              src="/carbon_add.svg"
              alt="add icon"
              width="20"
              height="20"
            />
            <Typography style={{ color: '#D90368', fontSize: '15px' }}>
              Add chapter
            </Typography>
          </div>
        </Box>
        <Paper
          elevation={0}
          sx={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
        >
          <Divider />
          <Typography
            style={{
              color: '#5D5D5F',
              fontSize: '13px',
              margin: '25px 0 10px 25px',
            }}
          >
            Words: 0
          </Typography>
          <Typography
            style={{
              color: '#5D5D5F',
              fontSize: '13px',
              margin: '0 0 10px 25px',
            }}
          >
            Characters: 0
          </Typography>
        </Paper>
      </Drawer>
    </div>
  )
}

// export default CanvasLeftDrawer

// const PaperWithIconButton = ({
//   userId,
//   scriptId,
//   showChapters,
//   handleShowChapters,
//   handleChapterCreate
// }: {
//   userId: string
//   scriptId: string,
//   showChapters: any,
//   handleShowChapters: any
//   handleChapterCreate: any
//   // children: React.ReactNode;
// }) => {
//   const [isEditing, setEditing] = React.useState(false);
//   const [isHovered, setIsHovered] = React.useState(false);
//   const [scriptTitle, setScriptTitle] = React.useState<string>('');
//   const [scriptAnchorEl, setScriptAnchorEl] = React.useState<any>({
//     element: null,
//     script_Id: null,
//   });

//   async function fetchScriptById(props: { scriptId: any, token: any }) {
//     try {
//       if (!props.token) {
//         console.error('Error: No valid token available')
//         return
//       }
//       const response = await fetchScript({ token: props.token, scriptId: props.scriptId })
//       const script_title = response?.data?.data?.title
//       setScriptTitle(script_title)
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }

//   const handleScriptSave = async (id:any, newName:any) => {
//     const title = newName;
//     const scriptId = id;
//     const token = GetUserAuthToken();
//     try {
//       if (!token) {
//         console.error('Error: No valid token available');
//         return;
//       }
  
//       const response = await handleRenameRequest({
//         userId,
//         scriptId,
//         title,
//         token,
//       });
//      fetchScriptById({scriptId , token});
//     } catch (error) {
//       console.error('Error:', error);
//     }
// };

//   const handleDoubleClick = () => {
//     setEditing(true);
//   };

//   const handleScriptClick = (
//     event: React.MouseEvent<HTMLElement>,
//     script_Id: any
//   ) => {
//     setScriptAnchorEl({ element: event.currentTarget, script_Id});
//   };

//   const handleScriptClose = () => {
//     setScriptAnchorEl({
//       element: null,
//       script_Id: null,
//     });
//   };

//   const CustomizedMenu = styled(Menu)`
//   .MuiMenu-paper {
//     box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.16); !important;
//   }
// `

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginRight: '10px',
//         marginTop: '24px',
//         marginBottom: '10px',
//       }}
//       onMouseEnter={(e) => {
//         e.preventDefault();
//         setIsHovered(true);
//       }}
//       onMouseLeave={(e) => {
//         e.preventDefault();
//         setIsHovered(false);
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           gap: 10,
//           alignItems: 'center',
//           marginLeft: '24px',
//         }}
//       >
//         <Image
//           src="/bx_file.svg"
//           alt="script icon"
//           width="24"
//           height="24"
//         />
//         <Typography style={{ fontSize: '18px', fontWeight: '600' }}>
//         <EditableText
//           // key={}
//           id={scriptId}
//           initialValue={scriptTitle}
//           onSave={handleScriptSave}
//           isEditing={isEditing}
//           setEditing={setEditing}
//           handleDoubleClick={handleDoubleClick}
//         />
//         </Typography>
//       </div>
//       {isHovered && (
//         <IconButton onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
//           handleScriptClick(e, scriptId)
//         }}>
//           <Image
//             src="/pencil_dots-x.svg"
//             alt="script icon"
//             width="20"
//             height="20"
//           />
//         </IconButton>
//       )}
//       <CustomizedMenu
//           anchorEl={scriptAnchorEl.element}
//           open={Boolean(scriptAnchorEl.script_Id === scriptId)}
//           onClose={handleScriptClose}
//         >
//           <MenuItem
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               marginTop: '10px'
//             }}
//             onClick={() => {
//               handleDoubleClick()
//               handleScriptClose()
//             }}
//           >
//             <Image
//               src="/la_pen-alTi.svg"
//               alt="Logo"
//               width='20' 
//               height='20'
//             />
//             <Typography>Rename</Typography>
//           </MenuItem>
//           <MenuItem
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//             }}
//             onClick={() => {
//               handleChapterCreate()
//               handleScriptClose()
//             }}
//           >
//             <Image
//               src="/carbon_add2.svg"
//               alt="Logo"
//               width='20' 
//               height='20' 
//               style={{
//                 color: '#353538'
//               }}
//             />
//             <Typography>Add chapter</Typography>
//           </MenuItem>
//           <MenuItem
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               marginBottom: '10px'
//             }}
//             onClick={() => {
//               // props.setTrashScriptId(props.script._id)
//               // props.setTrashOneScript(true)
//               handleScriptClose()
//             }}
//           >
//             <Image
//               src="/solar_trash-bin-trash-linear.svg"
//               alt="Logo"
//               width='20' 
//               height='20' 
//             />
//             <Typography>Delete</Typography>
//           </MenuItem>
//       </CustomizedMenu>
//        <button
//           className={styles.headingButton}
//           onClick={handleShowChapters}
//         >
//           {showChapters ? (
//             <KeyboardArrowUpIcon />
//           ) : (
//             <KeyboardArrowDownIcon />
//           )}
//         </button>
//     </Paper>
//   );
// };