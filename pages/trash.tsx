/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, Typography } from '@mui/material'
import CheckBox from '@/components/CheckBox/Checkbox'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import {
  formatTime,
  formatTime24,
  formatDate,
  formatDayOfWeek,
  getCurrentDayOfWeek,
  getOwner,
} from '@/lib/utils'
import TableHead from '@/components/ScriptTable/TableHead'
import TableRow from '@/components/ScriptTable/TableRow'
import { GetUserAuthToken } from '@/services/config'
import { deleteScriptRequest, unthrashScript } from '@/services/api-requests/api-request'

const Trash = (props: {
  // isHovered: boolean;
  // setIsHovered: (value: boolean) => void;
  deleteScriptPermanently: any
  setDeleteScriptPermanently: any
  fetchScripts: any
  searchValue: any
  scripts: any
  checkedboxArray: string[]
  handleImageClick: (scriptId: string, isStarred: boolean) => void
  setLastModified: any
  lastModified: any
  page: any
  viewportWidth: any
  HomeScriptCondition: any
}) => {
  const [userId, setUserId] = useState('')
  const [userMail, setUserMail] = useState('')
  const [deleteScriptPermanentlyId, setDeleteScriptPermanentlyId] = useState('')
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<any>({
    element: null,
    scriptId: null,
  })
  // const userId = '65511e62f0071b8049ecc736';
  // const [scripts, setScripts] = useState( []);

  const token = GetUserAuthToken()

  React.useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem('user_id') as string
      typeof id === 'string' && setUserId(id)
      const mail = localStorage.getItem('user_email')
      typeof mail === 'string' && setUserMail(mail)
    }
  }, [props.scripts])

  const CustomizedMenu = styled(Menu)`
    .MuiMenu-paper {
      box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.16); !important;
    }
  `

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    scriptId: string,
  ) => {
    setAnchorEl({ element: event.currentTarget, scriptId })
  }

  const handleClose = () => {
    setAnchorEl({
      element: null,
      certificateId: null,
    })
  }

  const handleDeletePermanentYes = () => {
    handleDeleteScript(deleteScriptPermanentlyId)
    setDeleteScriptPermanentlyId('')
    props.setDeleteScriptPermanently(false)
  }

  const handleDeletePermanentNo = () => {
    setDeleteScriptPermanentlyId('')
    props.setDeleteScriptPermanently(false)
  }

  //
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleChange = (event: any) => {
    setIsChecked(event.target.checked)
  }

  async function deleteScript(scriptId: any) {
    const script_id = scriptId

    try {
      if (!token) {
        console.error('Error: No valid token available')
        return
      }

      const response = await deleteScriptRequest({
        userId, scriptId: script_id, token
      })
      props.fetchScripts()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function restoreScript(scriptId: any) {
    const script_id = scriptId

    try {
      if (!token) {
        console.error('Error: No valid token available')
        return
      }

      const response = await unthrashScript({
        userId, scriptId: script_id, token
      })
      props.fetchScripts()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleRestoreScript = (script_id: string) => {
    // console.log(`${script_id}`);
    restoreScript(script_id)
  }

  const handleDeleteScript = (script_id: string) => {
    // console.log(`${script_id}`);
    deleteScript(script_id)
  }

  // console.log("view: ", props.viewportWidth)
  const checkTrashSearchScript =
    props.scripts && props.scripts !== undefined &&
    props.scripts
      .filter((script: any) => script.isTrashed)
      .filter((script: any) => !script.isDeleted)
      .filter((script: any) => script.title.includes(props.searchValue))
      ?.length !== 0

      // console.log("ckeck: ", checkTrashSearchScript)
  return (
    <div
      style={{
        overflowX:
          checkTrashSearchScript && props.viewportWidth <= 958
            ? 'auto'
            : 'hidden',
      }}
    >
      <table
        style={{ width: '100%', borderCollapse: 'collapse', minWidth: '564px' }}
      >
        <tbody style={{ textAlign: 'left' }}>
          {props.viewportWidth <= 425 &&
          props.scripts && props.scripts !== undefined &&
          props.scripts.filter((script: any) => script.isTrashed && !script.isDeleted && script.title.includes(props.searchValue))
          ?.length === 0 ? (
            <div></div>
          ) : (
            <TableHead
              setLastModified={props.setLastModified}
              lastModified={props.lastModified}
              checkedboxArray={props.checkedboxArray}
              HomeScriptCondition={props.HomeScriptCondition}
              viewportWidth={props.viewportWidth}
              page={props.page}
            />
          )}
          <br />

          {props.scripts && props.scripts !== undefined &&
            props.scripts.filter((script: any) => script.isTrashed && !script.isDeleted && script.title.includes(props.searchValue))
              .sort((a: any, b: any) =>
                props.lastModified
                  ? new Date(a.updated_at).getTime() -
                    new Date(b.updated_at).getTime()
                  : new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime(),
              )
              .map((script: any) => (
                <TableRow
                  key={script._id}
                  script={script}
                  handleChange={handleChange}
                  checkedboxArray={props.checkedboxArray}
                  userMail={userMail}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  handleImageClick={props.handleImageClick}
                  handleClick={handleClick}
                  handleRestoreScript={handleRestoreScript}
                  setDeleteScriptPermanently={props.setDeleteScriptPermanently}
                  setDeleteScriptPermanentlyId={setDeleteScriptPermanentlyId}
                  page={props.page}
                  viewportWidth={props.viewportWidth}
                />
              ))
              .reverse()}
        </tbody>
      </table>

      {props.deleteScriptPermanently && (
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
              onClick={handleDeletePermanentYes}
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
              onClick={handleDeletePermanentNo}
            >
              No
            </button>
          </div>
        </div>
      )}

     
          {props.scripts && props.scripts !== undefined && props.scripts?.length !== 0 &&
          props.scripts?.filter((script: any) => script.isTrashed && !script.isDeleted)
          ?.length === 0 && (
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
                Your trashed script will appear here
              </Typography>
            </div>
          )}
          
          {props.scripts && props.scripts !== undefined && props.scripts?.length !== 0 &&
          props.scripts.filter((script: any) => script.isTrashed && !script.isDeleted)?.length !== 0 &&
            props.scripts.filter((script: any) => script.isTrashed && !script.isDeleted && script.title.includes(props.searchValue))
            ?.length === 0 && (
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
                Your search did not match any records
              </Typography>
            </div>
          )}
    </div>
  )
}

export default Trash