/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styles from '@/styles/home.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Typography, CircularProgress } from '@mui/material';
import CheckBox from '@/components/CheckBox/Checkbox';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import {
  formatTime,
  formatDate,
  formatDayOfWeek,
  getCurrentDayOfWeek,
  getOwner,
} from '@/lib/utils';
import TableHead from '@/components/ScriptTable/TableHead';
import TableRow from '@/components/ScriptTable/TableRow';
import { GetUserAuthToken } from '@/services/config';
import {
  duplicateScriptRequest,
  handleRenameRequest,
  updateThrashOneRequest,
} from '@/services/api-requests/api-request';

const Home = (props: {
  rename: boolean;
  setRename: (rename: boolean) => void;
  // isHovered: boolean;
  // setIsHovered: (value: boolean) => void;
  setTrashOneScript: any;
  trashOneScript: any;
  fetchScripts: any;
  searchValue: any;
  setModalIsOpen: (value: boolean) => void;
  scripts: any;
  handleImageClick: (scriptId: string, isStarred: boolean) => void;
  checkedboxArray: string[];
  setCheckedboxArray: React.Dispatch<React.SetStateAction<string[]>>;
  setLastModified: any;
  lastModified: any;
  // handleSearchResult: any
  setSearchExist: any;
  searchExist: any;
  page: any;
  viewportWidth: any;
  HomeScriptCondition: any;
}) => {
  const numberOfColumns = 6;
  // const userId = '65511e62f0071b8049ecc736';
  const [userId, setUserId] = useState('');
  const [userMail, setUserMail] = useState('');
  // const [trashOneScript, setTrashOneScript] = useState(false);
  const [trashScriptId, setTrashScriptId] = useState('');
  const [renameText, setRenameText] = useState('');
  const [scriptText, setScriptText] = useState('');
  const [renameTextId, setRenameTextId] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<any>({
    element: null,
    scriptId: null,
  });

  const token = GetUserAuthToken();

  React.useEffect(() => {
    // console.log(props.scripts);
    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem('user_id') as string;
      typeof id === 'string' && setUserId(id);
      const mail = localStorage.getItem('user_email');
      typeof mail === 'string' && setUserMail(mail);
    }
  }, [props.scripts]);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    scriptId: string
  ) => {
    setAnchorEl({ element: event.currentTarget, scriptId });
  };

  const handleClose = () => {
    setAnchorEl({
      element: null,
      scripId: null,
    });
  };

  const handleChange = (scriptId: string) => {
    const isIdExist = props.checkedboxArray.includes(scriptId);

    if (isIdExist) {
      props.setCheckedboxArray(prevArray =>
        prevArray.filter(id => id !== scriptId)
      );
    } else {
      props.setCheckedboxArray(prevArray => [...prevArray, scriptId]);
    }
  };

  const handleRename = (event: any) => {
    const inputValue = event.target.value;
    setRenameText(inputValue);
  };

  async function renameScript() {
    const title = renameText;
    const script_id = renameTextId;

    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await handleRenameRequest({
        userId,
        scriptId: script_id,
        title,
        token,
      });
      props.fetchScripts();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function trashScript(scriptId: any) {
    const script_id = scriptId;

    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await updateThrashOneRequest({
        userId,
        scriptId: script_id,
        token,
      });
      props.fetchScripts();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function duplicateScript(scriptId: any) {
    const script_id = scriptId;

    try {
      if (!token) {
        console.error('Error: No valid token available');
        return;
      }

      const response = await duplicateScriptRequest({
        userId,
        scriptId: script_id,
        token,
      });
      props.fetchScripts();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleRenameProceed = () => {
    renameScript();
    setRenameTextId('');
    setRenameText('');
    props.setRename(false);
  };

  const handleDuplicateScript = (script_id: string) => {
    duplicateScript(script_id);
  };

  const handleTrashScript = (script_id: string) => {
    trashScript(script_id);
  };

  const handleTrashNo = () => {
    setTrashScriptId('');
    props.setTrashOneScript(false);
  };

  const handleTrashYes = () => {
    handleTrashScript(trashScriptId);
    setTrashScriptId('');
    props.setTrashOneScript(false);
  };

  const handleHeaderCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      // console.log("isTrue: ", isChecked);
      props.HomeScriptCondition.forEach((script: any) => {
        if (!props.checkedboxArray.includes(script._id)) {
          props.setCheckedboxArray(prevArray => [...prevArray, script._id]);
        }
      });
    } else {
      // console.log("isFalse: ", isChecked);
      props.setCheckedboxArray([]);
    }
  };

  // const handleSearchExist = () => {
  //   props.setSearchExist((prev: boolean) => !!prev);
  // }

  const HomeScriptExist =
    props.scripts &&
    props.scripts !== undefined &&
    props.scripts.filter(
      (script: any) =>
        !script.isTrashed && script.title.includes(props.searchValue)
    )?.length !== 0;

  return (
    <div
      style={{
        overflowX:
          HomeScriptExist && props.viewportWidth <= 958 ? 'auto' : 'hidden',
      }}
    >
      {props.checkedboxArray && props.checkedboxArray.length > 0 && (
        <div
          style={{
            background: '#FFE1EF',
            borderRadius: '4x',
            padding: '10px 50px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
            minWidth: '564px',
          }}
        >
          <Typography>
            {props.checkedboxArray && props.checkedboxArray.length} selected
          </Typography>

          <img
            src="/solar_trash-bin-trash-linear.svg"
            alt="Logo"
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={() => props.setModalIsOpen(true)}
          />
        </div>
      )}

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '564px',
        }}
      >
        <tbody style={{ textAlign: 'left' }}>
          {props.viewportWidth <= 425 &&
          props.scripts &&
          props.scripts !== undefined &&
          props.scripts.filter(
            (script: any) =>
              !script.isTrashed && script.title.includes(props.searchValue)
          )?.length === 0 ? (
            <div></div>
          ) : (
            <TableHead
              setLastModified={props.setLastModified}
              lastModified={props.lastModified}
              page={props.page}
              handleHeaderCheckboxChange={handleHeaderCheckboxChange}
              checkedboxArray={props.checkedboxArray}
              HomeScriptCondition={props.HomeScriptCondition}
              viewportWidth={props.viewportWidth}
            />
          )}
          <br />

          {props.scripts &&
            props.scripts !== undefined &&
            props.scripts.length !== 0 &&
            props.scripts
              .filter(
                (script: any) =>
                  !script.isTrashed && script.title.includes(props.searchValue)
              )
              .sort((a: any, b: any) =>
                props.lastModified
                  ? new Date(a.updated_at).getTime() -
                    new Date(b.updated_at).getTime()
                  : new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
              )
              .map((script: any) => (
                <TableRow
                  key={script._id}
                  script={script}
                  handleChange={handleChange}
                  checkedboxArray={props.checkedboxArray}
                  userMail={userMail}
                  anchorEl={anchorEl}
                  setScriptText={setScriptText}
                  setRenameTextId={setRenameTextId}
                  setRename={props.setRename}
                  handleDuplicateScript={handleDuplicateScript}
                  handleTrashScript={handleTrashScript}
                  handleClose={handleClose}
                  handleImageClick={props.handleImageClick}
                  handleClick={handleClick}
                  setTrashOneScript={props.setTrashOneScript}
                  setTrashScriptId={setTrashScriptId}
                  page={props.page}
                  viewportWidth={props.viewportWidth}
                />
              ))
              .reverse()}
        </tbody>
      </table>

      {props.rename && (
        <div
          style={{
            background: '#FFF',
            width:
              props.viewportWidth <= 320
                ? '280px'
                : props.viewportWidth <= 375
                  ? '330px'
                  : props.viewportWidth <= 425
                    ? '380px'
                    : '500px',
            height: '280px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            padding: props.viewportWidth <= 375 ? '15px' : '26px',
            top: props.viewportWidth <= 425 ? '210px' : '280px',
            left:
              props.viewportWidth <= 425
                ? '20px'
                : props.viewportWidth <= 768
                  ? '150px'
                  : props.viewportWidth <= 1024
                    ? '400px'
                    : '500px',
            zIndex: '2',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '41px',
            }}
          >
            <Typography
              style={{
                color: '#353538',
                fontSize: '22px',
                fontWeight: 500,
                marginLeft:
                  props.viewportWidth <= 375
                    ? '0px'
                    : props.viewportWidth <= 425
                      ? '10px'
                      : '29px',
              }}
            >
              Rename Script
            </Typography>
            <img
              src="/iconamoon_close.svg"
              alt="Logo"
              style={{
                width: '24px',
                height: '24px',
                marginRight: props.viewportWidth <= 375 ? '0px' : '15px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setRenameTextId('');
                setRenameText('');
                props.setRename(false);
              }}
            />
          </div>
          <div
            style={{
              marginBottom: '42px',
              marginLeft:
                props.viewportWidth <= 375
                  ? '0px'
                  : props.viewportWidth <= 425
                    ? '10px'
                    : '30px',
            }}
          >
            <Typography
              style={{
                color: '#212330',
                fontSize: props.viewportWidth <= 425 ? '14px' : '16px',
              }}
            >
              Please enter a new name for your script
            </Typography>
            <input
              type="text"
              placeholder={scriptText}
              style={{
                width:
                  props.viewportWidth <= 320
                    ? '250px'
                    : props.viewportWidth <= 425
                      ? '295px'
                      : '400px',
                height: '51px',
                fontSize: props.viewportWidth <= 375 ? '14px' : '16px',
                borderRadius: '6px',
                border: '1px solid #7D7D80',
                outline: 'none',
                paddingLeft: '20px',
                paddingBottom: '10px',
              }}
              onChange={handleRename}
            />
          </div>
          <div
            style={{
              width: '200px',
              // background:"blue",
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft:
                props.viewportWidth <= 375
                  ? '30px'
                  : props.viewportWidth <= 425
                    ? '60px'
                    : '230px',
              marginBottom: '26px',
            }}
          >
            <button
              style={{
                width: '79px',
                height: '44px',
                fontSize: '16px',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #3F4250',
                color: '#212330',
                cursor: 'pointer',
              }}
              onClick={() => {
                setRenameTextId('');
                setRenameText('');
                props.setRename(false);
              }}
            >
              Cancel
            </button>
            <button
              style={{
                width: '94px',
                height: '44px',
                fontSize: '16px',
                padding: '12px',
                borderRadius: '10px',
                background: ' #D90368',
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={handleRenameProceed}
            >
              Rename
            </button>
          </div>
        </div>
      )}

      {props.trashOneScript && (
        <div
          style={{
            position: 'absolute',
            top: props.viewportWidth <= 425 ? '210px' : '280px',
            left:
              props.viewportWidth <= 425
                ? '20px'
                : props.viewportWidth <= 768
                  ? '150px'
                  : props.viewportWidth <= 1024
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
              props.viewportWidth <= 320
                ? '280px'
                : props.viewportWidth <= 375
                  ? '330px'
                  : props.viewportWidth <= 425
                    ? '380px'
                    : '453px',
            height: '252px',
            borderRadius: '8px',
            background: '#FFF',
          }}
        >
          {props.viewportWidth <= 375 ? (
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

      {props.scripts &&
        props.scripts !== undefined &&
        props.scripts?.length !== 0 &&
        props.scripts.filter((script: any) => !script.isTrashed)?.length ===
          0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src="video.gif"
              alt="Logo"
              style={{ width: '300px', height: '300px' }}
            />
            {props.viewportWidth <= 425 ? (
              <Typography
                style={{
                  width: '460px',
                  marginTop: '-50px',
                  textAlign: 'center',
                  fontSize: props.viewportWidth <= 320 ? '14px' : '16px',
                }}
              >
                Get started by clicking on 'New Script.' You can also <br />
                take a look at your existing scripts and make edits to
                <br /> them.
              </Typography>
            ) : (
              <Typography
                style={{
                  width: '460px',
                  marginTop: '-50px',
                  textAlign: 'center',
                }}
              >
                Get started by clicking on 'New Script.' You can also take a
                look at your existing scripts and make edits to them.
              </Typography>
            )}
          </div>
        )}

      {props.scripts &&
        props.scripts !== undefined &&
        props.scripts?.length !== 0 &&
        props.scripts.filter((script: any) => !script.isTrashed)?.length !==
          0 &&
        props.scripts.filter(
          (script: any) =>
            !script.isTrashed && script.title.includes(props.searchValue)
        )?.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '160px',
            }}
          >
            <Typography
              style={{
                width: '460px',
                marginTop: '-50px',
                textAlign: 'center',
              }}
            >
              Your Search Result Is Empty
            </Typography>
          </div>
        )}

      {props.scripts &&
        props.scripts !== undefined &&
        props.scripts?.length === 0 && (
          <CircularProgress
            disableShrink
            className={styles.circular_progress}
            style={{
              width: '80px',
              height: '80px',
            }}
          />
        )}
    </div>
  );
};

export default Home;
