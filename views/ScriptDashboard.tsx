/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Home from '@/pages/home';
import Starred from '@/pages/starred';
import Trash from '@/pages/trash';
import Sidebar from '../components/DashboardSideBar/Sidebar';
import Searchbar from '../components/SearchBar/Searchbar';
import { styled } from '@mui/material/styles';
import { getOwner } from '@/lib/utils';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Grid,
  Divider,
  Typography,
  Button,
  dividerClasses,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SwipeableTemporaryDrawer from '../components/DashboardSideBar/TemporaryDrawer';
import { GetUserAuthToken, clearUserAuthToken } from '@/services/config';
import {
  createNewScript,
  fetchAllScripts,
  updateScriptRequest,
  updateScriptThrashRequest,
} from '@/services/api-requests/api-request';
import useNitoonsHook from '@/hooks/useNitoonsHook'

const ScriptDashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = React.useState('home');
  const [rename, setRename] = useState(false);
  const [lastModified, setLastModified] = useState(false);
  const [trashOneScript, setTrashOneScript] = useState(false);
  const [deleteScriptPermanently, setDeleteScriptPermanently] = useState(false);
  const [scripts, setScripts] = useState([]);
  const [checkedboxArray, setCheckedboxArray] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userMail, setUserMail] = useState('');
  const [searchExist, setSearchExist] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const nitoonsHook = useNitoonsHook()

  let userId: string = '';

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchScripts();
    const mail = localStorage.getItem('user_email');
    typeof mail === 'string' && setUserMail(mail);
  }, []);

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  if (typeof localStorage !== 'undefined') {
    userId = localStorage.getItem('user_id') as string;
  }

  const router = useRouter();
  const token = GetUserAuthToken();


  if (!token || scripts === undefined) {
    router.push('/login');
    return;
  }

  const handleRefresh = () => {
    router.reload;
  };

  async function createScript() {
    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await createNewScript({
        userId,
        token,
      });
      const scriptId = response?.data?.data?._id
      nitoonsHook.useCanvasSocket().handleCreateChapter(scriptId)
      router.push(`/canvas/${scriptId}`)
      // fetchScripts();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSearchChange = (event: any) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  };

  const handleSearchResult = () => {
    const filteredScripts = scripts.filter((script: any) =>
      script.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredScripts;

    //  if(filteredScripts.length === 0) {
    //     setSearchExist(false);
    //   } else {
    //     setSearchExist(true);
    //   }
  };

  async function fetchScripts() {
    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await fetchAllScripts({
        userId,
        token,
      });
      const responseData = response?.data?.data;
      // console.log("responseData: ",responseData)
      // responseData !== undefined &&
      // const filterNullData =  responseData.filter((data: any) => !!data)
      setScripts(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateScripts() {
    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await updateScriptRequest({
        userId,
        scripts,
        token,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateScriptsTrash() {
    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await updateScriptThrashRequest({
        userId,
        checkedboxArray,
        token,
      });
      fetchScripts();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleImageClick = (scriptId: string, isStarred: boolean) => {
    // Find the index of the script with the matching scriptId
    const scriptIndex = scripts.findIndex(
      (script: any) => script._id === scriptId
    );

    if (scriptIndex !== -1) {
      // Create a copy of the scripts array to avoid mutating the original state
      const updatedScripts: any = [...scripts];

      // Toggle the isStarred property for the specific script
      updatedScripts[scriptIndex].isStarred = !isStarred;

      // Update the state with the new array
      setScripts(updatedScripts);
      updateScripts();
    }
  };

  const handleTrashYes = () => {
    updateScriptsTrash();
    setCheckedboxArray([]);
    setModalIsOpen(false);
  };

  const handleTrashNo = () => {
    setCheckedboxArray([]);
    setModalIsOpen(false);
    handleRefresh;
  };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const CustomizedMenu = styled(Menu)`
  .MuiMenu-paper {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.16); !important;
  }
`;

  const handleSignOut = () => {
    clearUserAuthToken();
    handleMenuClose();
    router.push('/login');
  };

  const HomeScriptCondition =
    scripts &&
    scripts.length !== 0 &&
    scripts.filter(
      (script: any) => !script.isTrashed && script.title.includes(searchValue)
    );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'hidden',
        // background: modalIsOpen ? 'rgba(0, 0, 0, 0.46)' : '#FFF',
      }}
    >
      {(rename || modalIsOpen || trashOneScript || deleteScriptPermanently) && (
        <div
          onClick={() => {
            setRename(false);
            setModalIsOpen(false);
            setTrashOneScript(false);
            setDeleteScriptPermanently(false);
          }}
          style={{
            display: 'block',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '1',
          }}
        ></div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '26px',
          marginBottom: '26px',
          marginRight:
            viewportWidth <= 500
              ? '20px'
              : viewportWidth <= 750
                ? '10px'
                : '80px',
          marginLeft:
            viewportWidth <= 500
              ? '20px'
              : viewportWidth <= 750
                ? '10px'
                : '80px',
        }}
      >
        {viewportWidth <= 958 ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableTemporaryDrawer
              viewportWidth={viewportWidth}
              handleSignOut={handleSignOut}
              userMail={userMail}
              setPage={setPage}
              state={state}
              setState={setState}
              toggleDrawer={toggleDrawer}
            ></SwipeableTemporaryDrawer>
          </>
        ) : (
          <Link href={'/'}>
            <img
              src="/nitoons.svg"
              alt="Logo"
              // style={{ width: '100px', height: '50px', cursor: 'pointer' }}
              style={{ width: '80%', cursor: 'pointer' }}
            />
          </Link>
        )}

        {viewportWidth > 500 && (
          <Searchbar
            handleSearchChange={handleSearchChange}
            handleSearchResult={handleSearchResult}
          />
        )}

        <div>
          <IconButton
            edge="end"
            color="inherit"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
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
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
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

      {viewportWidth <= 500 && (
        <div
          style={{
            marginLeft: '20px',
            marginTop: '38px',
          }}
        >
          <Searchbar
            handleSearchChange={handleSearchChange}
            handleSearchResult={handleSearchResult}
          />
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft:
            viewportWidth <= 500
              ? '20px'
              : viewportWidth <= 750
                ? '15px'
                : viewportWidth <= 958
                  ? '100px'
                  : '310px',
          paddingRight: viewportWidth <= 750 ? '15px' : '82px',
          marginTop: viewportWidth <= 500 ? '30px' : '91px',
          marginBottom: viewportWidth <= 500 ? '20px' : '0px',
        }}
      >
        {page === 'starred' ? (
          <Typography
            style={{
              width: '185px',
              height: '32px',
              color: '#353538',
              fontSize: '20px',
              fontWeight: '500',
            }}
          >
            Starred Scripts
          </Typography>
        ) : page === 'trash' ? (
          <Typography
            style={{
              width: '185px',
              height: '32px',
              color: '#353538',
              fontSize: '20px',
              fontWeight: '500',
            }}
          >
            Trashed Scripts
          </Typography>
        ) : (
          <Typography
            style={{
              width: '185px',
              height: '32px',
              color: '#353538',
              fontSize: '20px',
              fontWeight: '500',
            }}
          >
            All Scripts
          </Typography>
        )}

        {viewportWidth > 500 && (
          <Button
            variant="contained"
            startIcon={
              <img
                src="/la_pen-alt.svg"
                alt="Logo"
                style={{
                  width: '14px',
                  height: '14px',
                }}
              />
            }
            style={{
              background: '#D90368',
              borderRadius: '10px',
              width: '148px',
              height: '44px',
              textTransform: 'capitalize',
              opacity: page === 'trash' ? 0 : 1,
            }}
            onClick={() =>{
              createScript()

            }}
            disableElevation={true}
          >
            New script
          </Button>
        )}
      </div>
      {page !== 'trash' && viewportWidth <= 500 && (
        <Button
          startIcon={
            <img
              src="/la_pen-alt.svg"
              alt="Logo"
              style={{ width: '14px', height: '14px' }}
            />
          }
          style={{
            background: '#D90368',
            borderRadius: '10px',
            width: '148px',
            height: '44px',
            textTransform: 'capitalize',
            marginLeft: '20px',
            marginBottom: '68px',
            color: 'white',
          }}
          onClick={() => createScript()}
          disableElevation={true}
        >
          New script
        </Button>
      )}

      <div
        style={{
          marginTop: '35px',
        }}
      >
        {viewportWidth <= 958 ? (
          <div
            style={{
              padding: '0px 5px',
            }}
          >
            {page === 'starred' ? (
              <Starred
                // isHovered={isHovered}
                // setIsHovered={setIsHovered}
                page={page}
                searchValue={searchValue}
                handleImageClick={handleImageClick}
                scripts={scripts}
                setLastModified={setLastModified}
                lastModified={lastModified}
                viewportWidth={viewportWidth}
                checkedboxArray={checkedboxArray}
                HomeScriptCondition={HomeScriptCondition}
              />
            ) : page === 'trash' ? (
              <Trash
                // isHovered={isHovered}
                // setIsHovered={setIsHovered}
                page={page}
                deleteScriptPermanently={deleteScriptPermanently}
                setDeleteScriptPermanently={setDeleteScriptPermanently}
                fetchScripts={fetchScripts}
                searchValue={searchValue}
                handleImageClick={handleImageClick}
                scripts={scripts}
                setLastModified={setLastModified}
                lastModified={lastModified}
                viewportWidth={viewportWidth}
                checkedboxArray={checkedboxArray}
                HomeScriptCondition={HomeScriptCondition}
              />
            ) : (
              <Home
                fetchScripts={fetchScripts}
                page={page}
                rename={rename}
                setRename={setRename}
                setTrashOneScript={setTrashOneScript}
                trashOneScript={trashOneScript}
                // isHovered={isHovered}
                // setIsHovered={setIsHovered}
                searchValue={searchValue}
                checkedboxArray={checkedboxArray}
                setCheckedboxArray={setCheckedboxArray}
                handleImageClick={handleImageClick}
                scripts={scripts}
                setModalIsOpen={setModalIsOpen}
                setLastModified={setLastModified}
                lastModified={lastModified}
                // handleSearchResult={handleSearchResult}
                setSearchExist={setSearchExist}
                searchExist={searchExist}
                viewportWidth={viewportWidth}
                HomeScriptCondition={HomeScriptCondition}
              />
            )}
          </div>
        ) : (
          <Container maxWidth="xl" style={{ padding: 0 }}>
            <Grid container>
              <Grid item md={3}>
                <Sidebar viewportWidth={viewportWidth} setPage={setPage} />
              </Grid>
              <Grid item md={8} style={{ marginTop: '8px' }}>
                {page === 'starred' ? (
                  <Starred
                    // isHovered={isHovered}
                    // setIsHovered={setIsHovered}
                    page={page}
                    searchValue={searchValue}
                    handleImageClick={handleImageClick}
                    scripts={scripts}
                    setLastModified={setLastModified}
                    lastModified={lastModified}
                    viewportWidth={viewportWidth}
                    checkedboxArray={checkedboxArray}
                    HomeScriptCondition={HomeScriptCondition}
                  />
                ) : page === 'trash' ? (
                  <Trash
                    // isHovered={isHovered}
                    // setIsHovered={setIsHovered}
                    page={page}
                    deleteScriptPermanently={deleteScriptPermanently}
                    setDeleteScriptPermanently={setDeleteScriptPermanently}
                    fetchScripts={fetchScripts}
                    searchValue={searchValue}
                    handleImageClick={handleImageClick}
                    scripts={scripts}
                    setLastModified={setLastModified}
                    lastModified={lastModified}
                    viewportWidth={viewportWidth}
                    checkedboxArray={checkedboxArray}
                    HomeScriptCondition={HomeScriptCondition}
                  />
                ) : (
                  <Home
                    fetchScripts={fetchScripts}
                    page={page}
                    rename={rename}
                    setRename={setRename}
                    setTrashOneScript={setTrashOneScript}
                    trashOneScript={trashOneScript}
                    // isHovered={isHovered}
                    // setIsHovered={setIsHovered}
                    searchValue={searchValue}
                    checkedboxArray={checkedboxArray}
                    setCheckedboxArray={setCheckedboxArray}
                    handleImageClick={handleImageClick}
                    scripts={scripts}
                    setModalIsOpen={setModalIsOpen}
                    setLastModified={setLastModified}
                    lastModified={lastModified}
                    // handleSearchResult={handleSearchResult}
                    setSearchExist={setSearchExist}
                    searchExist={searchExist}
                    viewportWidth={viewportWidth}
                    HomeScriptCondition={HomeScriptCondition}
                  />
                )}
              </Grid>
            </Grid>
          </Container>
        )}
      </div>

      {modalIsOpen && (
        <div
          style={{
            position: 'absolute',
            top: viewportWidth <= 425 ? '210px' : '280px',
            left:
              viewportWidth <= 425
                ? '20px'
                : viewportWidth <= 768
                  ? '150px'
                  : viewportWidth <= 1024
                    ? '400px'
                    : '600px',
            zIndex: '2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '52px',
            paddingBottom: '62px',
            width:
              viewportWidth <= 320
                ? '280px'
                : viewportWidth <= 375
                  ? '330px'
                  : viewportWidth <= 425
                    ? '380px'
                    : '453px',
            height: '252px',
            borderRadius: '8px',
            background: '#FFF',
          }}
        >
          {viewportWidth <= 375 ? (
            <Typography
              style={{
                color: '#353538',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              Are sure you want to delete
              <br />
              this script and all its content?
            </Typography>
          ) : (
            <Typography
              style={{
                color: '#353538',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              Are sure you want to delete this script
              <br />
              and all its content?
            </Typography>
          )}

          <div
            style={{
              width: '200px',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <button
              style={{
                display: 'flex',
                width: '79px',
                padding: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '10px',
                border: '1px solid #D90368',
                background: '#D90368',
                color: '#FFF',
                cursor: 'pointer',
              }}
              onClick={handleTrashYes}
            >
              Yes
            </button>
            <button
              style={{
                display: 'flex',
                width: '79px',
                padding: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '10px',
                border: '1px solid #3F4250',
                cursor: 'pointer',
              }}
              onClick={handleTrashNo}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptDashboard;
