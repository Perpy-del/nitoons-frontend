/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  ToggleButton,
  Toolbar,
  Typography,
} from '@mui/material'
import Container from '@mui/material/Container'
import CloudOffIcon from '@mui/icons-material/CloudOff';
import Menu from '@mui/material/Menu'
import Link from '@mui/material/Link'
import Image from 'next/image'
import { getOwner } from '@/lib/utils'
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles'
import { GetUserAuthToken, clearUserAuthToken } from '@/services/config'
import {
  createNewScript,
  fetchScript,
  handleRenameRequest,
  updateThrashOneRequest,
} from '@/services/api-requests/api-request'
import ReplayIcon from '@mui/icons-material/Replay';
import useNitoonsHook from '@/hooks/useNitoonsHook'

const CanvasTopBar = () => {
  const [userMail, setUserMail] = React.useState('')
  const [script, setScript] = React.useState({})
  const [newScriptId, setNewScriptId] = React.useState('')
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElSettings, setAnchorElSettings] =
    React.useState<null | HTMLElement>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorEditEl, setAnchorEditEl] = React.useState<null | HTMLElement>(
    null,
  )
  const [anchorModeEl, setAnchorModeEl] = React.useState<null | HTMLElement>(
    null,
  )
  const [showScreenplayModeTick, setShowScreenplayModeTick] = React.useState<boolean>(false);
  const [showRegularModeTick, setShowRegularModeTick] = React.useState<boolean>(false);
  
  const nitoonsHook = useNitoonsHook()
  const contentSaved = nitoonsHook.contentSaved

  let userId: string = ''

  const open = Boolean(anchorEl)
  const openEdit = Boolean(anchorEditEl)
  const openMode = Boolean(anchorModeEl)
  const openSettings = Boolean(anchorElSettings)
  
  const router = useRouter()

  React.useEffect(() => {
    const mail = localStorage.getItem('user_email')
    typeof mail === 'string' && setUserMail(mail)
    const scriptId = router.query?.canvas_id;
    typeof scriptId === 'string' && setNewScriptId(scriptId);
  }, [router.query?.canvas_id])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEditEl(event.currentTarget)
  }
  const handleModeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorModeEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditClose = () => {
    setAnchorEditEl(null)
  }

  const handleModeClose = () => {
    setAnchorModeEl(null)
  }

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget)
  }

  const handleOpenSettingsMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElSettings(e.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null)
  }

  const scriptTitle = nitoonsHook.scriptTitle

  const currentUrl = `http://localhost:3000/${router.asPath}`
  const token = GetUserAuthToken()
  if (!token) {
    router.push('/login')
    return
  }

  if (typeof localStorage !== 'undefined') {
    userId = localStorage.getItem('user_id') as string
  }

  async function createScript() {
    try {
      if (!token) {
        console.error('Error: No valid token available')
        return
      }
      const response = await createNewScript({ userId, token })
      const scriptId = response?.data?.data?._id
      window.open(`/canvas/${scriptId}`, '_blank')
      fetchScriptById({ scriptId: scriptId })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function fetchScriptById(props: { scriptId: string }) {
    try {
      if (!token) {
        console.error('Error: No valid token available')
        return
      }
      const response = await fetchScript({ token, scriptId: props.scriptId })
      setScript(response?.data?.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  
  async function deleteOneScript() {
    try {
      const response = await updateThrashOneRequest({
        userId,
        scriptId: newScriptId,
        token
      })
      console.log(response, newScriptId)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  async function renameScript(props: { scriptId: string }) {
    // const title = renameText;
    // const script_id = renameTextId;

    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await handleRenameRequest({
        userId,
        scriptId: props.scriptId,
        title: scriptTitle,
        token,
      });
      fetchScriptById({scriptId: props.scriptId});
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSignOut = () => {
    clearUserAuthToken()
    handleCloseSettingsMenu()
    router.push('/login')
  }

  const CustomizedMenu = styled(Menu)`
    .MuiMenu-paper {
      box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.16); !important;
    }
  `

  return (
    <div style={{ backgroundColor: 'white' }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ backgroundColor: 'white', borderBottom: '1px solid #E2E2E2' }}
        >
          <Toolbar disableGutters>
            <Link href="/" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <Image
                src="/static/images/nitoons-logo.svg"
                alt="Nitoons logo"
                width="70"
                height="16"
              />
            </Link>

            {/* Mobile view */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{
                  color: '#353538',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <Typography>File</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>Mode</Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* Desktop View */}
            <Link href="/" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <Image
                src="/static/images/nitoons-logo.svg"
                alt="Nitoons logo"
                width="90"
                height="16"
              />
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  md: 'flex',
                  marginLeft: '50px',
                  gap: '10px',
                },
              }}
            >
              {/* FILE */}
              <Button
                id="basic-button"
                aria-controls={open ? 'file-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Typography
                  style={{ textTransform: 'capitalize', color: '#353538' }}
                >
                  File
                </Typography>
              </Button>

              {/* MENU FOR FILE */}
              <CustomizedMenu
                id="file-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                  onClick={() => {
                    createScript()
                    handleClose()
                  }}
                >
                  <img
                    src="/bx_file.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>New Script</Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                  onClick={() => {
                    handleClose()
                  }}
                >
                  <img
                    src="/la_pen-alTi.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Rename</Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                  onClick={() => {
                    deleteOneScript()
                    handleClose()
                  }}
                >
                  <img
                    src="/solar_trash-bin-trash-linear.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Delete</Typography>
                </MenuItem>
              </CustomizedMenu>

              {/* EDIT */}
              <Button
                id="basic-edit-button"
                aria-controls={openEdit ? 'edit-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openEdit ? 'true' : undefined}
                onClick={handleEditClick}
              >
                <Typography
                  style={{ textTransform: 'capitalize', color: '#353538' }}
                >
                  Edit
                </Typography>
              </Button>

              {/* MENU FOR EDIT */}
              <CustomizedMenu
                id="edit-menu"
                anchorEl={anchorEditEl}
                open={openEdit}
                onClose={handleEditClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-edit-button',
                }}
              >
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                >
                  <img
                    src="/gg_undo.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Undo</Typography>
                  <Typography style={{ marginLeft: '50px' }}>
                    Ctrl + Z
                  </Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                >
                  <img
                    src="/gg_redo.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Redo</Typography>
                  <Typography style={{ marginLeft: '50px' }}>
                    Ctrl + Y
                  </Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                >
                  <img
                    src="/ph_cursor-light.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Select All</Typography>
                  <Typography style={{ marginLeft: '25px' }}>
                    Ctrl + A
                  </Typography>
                </MenuItem>
              </CustomizedMenu>

              {/* MODE */}
              <Button
                id="basic-button"
                aria-controls={openMode ? 'mode-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMode ? 'true' : undefined}
                onClick={handleModeClick}
              >
                <Typography
                  style={{ textTransform: 'capitalize', color: '#353538' }}
                >
                  Mode
                </Typography>
              </Button>

              {/* MENU FOR MODE */}
              <CustomizedMenu
                id="mode-menu"
                anchorEl={anchorModeEl}
                open={openMode}
                onClose={handleModeClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {/* Regular Editor */}
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                  onClick={() => {
                    nitoonsHook.setShowRegularEditor(true)
                    nitoonsHook.setShowScreenplayEditor(false)
                    setShowRegularModeTick(true)
                    setShowScreenplayModeTick(false)
                    handleClose()
                  }}
                  >
                  <img
                    src="/charm_tick.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px', display: `${showRegularModeTick ? 'flex': 'none'}` }}
                  />
                  <Typography>Regular Editor</Typography>
                </MenuItem>

                {/* Screenplay Editor */}
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 25px',
                  }}
                  onClick={() => {
                    nitoonsHook.setShowScreenplayEditor(true)
                    nitoonsHook.setShowRegularEditor(false)
                    setShowScreenplayModeTick(true)
                    setShowRegularModeTick(false)
                    handleClose()
                  }}
                >
                  <img
                    src="/charm_tick.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px', display: `${showScreenplayModeTick ? 'flex': 'none'}` }}
                  />
                  <Typography>Screenplay</Typography>
                </MenuItem>
              </CustomizedMenu>
            </Box>

            <div
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <div>
                { contentSaved  ?
                (
                  <Image
                   src="/dashicons_cloud-saved.svg"
                   alt="cloud-saved logo"
                   width="20"
                   height="20"
                   /> 
                )
                :
                  <CloudOffIcon 
                    style={{
                      color:"black",
                      width:"20px",
                      height:"20px"
                    }}
                  />
                }
              </div>
              <Button
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Image
                  src="/solar_share-linear.svg"
                  alt="share icon"
                  width="20"
                  height="20"
                />
                <Typography
                  style={{
                    color: '#353538',
                    fontSize: '15px',
                    textTransform: 'capitalize',
                  }}
                >
                  Share
                </Typography>
              </Button>
              <div style={{ cursor: 'pointer' }}>
                <Image
                  src="/ph_download-light.svg"
                  alt="download icon"
                  width="24"
                  height="24"
                />
              </div>
              <div>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleOpenSettingsMenu}
                >
                  <img
                    src="/solar_settings-linear.svg"
                    alt="Logo"
                    style={{
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                    }}
                  />
                </IconButton>
                <CustomizedMenu
                  id="user-menu"
                  anchorEl={anchorElSettings}
                  keepMounted
                  open={Boolean(anchorElSettings)}
                  onClose={handleCloseSettingsMenu}
                >
                  <div
                    style={{
                      width: '177px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginTop: '15px',
                    }}
                  >
                    <Avatar
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#D90368',
                      }}
                    >
                      {getOwner(userMail).charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      style={{
                        marginTop: '9px',
                        fontSize: '16px',
                        fontWeight: '400px',
                        lineHeight: 'normal',
                        color: '#353538',
                      }}
                    >
                      {getOwner(userMail)}
                    </Typography>
                  </div>
                  <Divider
                    style={{
                      width: '147px',
                      marginLeft: '15px',
                      marginTop: '14px',
                    }}
                  />
                  <MenuItem
                    onClick={handleSignOut}
                    style={{
                      marginTop: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    <IconButton color="inherit">
                      <img
                        src="/basil_logout-solid.svg"
                        alt="Logo"
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    </IconButton>
                    <Typography
                      style={{
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400px',
                        lineHeight: 'normal',
                      }}
                    >
                      Sign Out
                    </Typography>
                  </MenuItem>
                </CustomizedMenu>
              </div>
            </div>
          </Toolbar>
          <Divider sx={{ margin: 0 }} />
        </Container>
      </AppBar>
      {/* <Divider sx={{ margin: 0, zIndex: (theme) => theme.zIndex.drawer + 5 }} /> */}
    </div>
  )
}

export default CanvasTopBar