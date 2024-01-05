/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton, Typography } from '@mui/material'
import CheckBox from '@/components/CheckBox/Checkbox'
import axios from 'axios'
import { useRouter } from 'next/router';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { styled } from '@mui/material/styles'
import {
  formatTime,
  formatDate,
  formatDayOfWeek,
  getCurrentDayOfWeek,
  getOwner,
} from '@/lib/utils'
import TableHead from '@/components/ScriptTable/TableHead'
import { GetUserAuthToken } from '@/services/config'

const TableRow = (props: {
  script: any
  handleChange: any
  anchorEl?: any
  checkedboxArray?: string[]
  userMail: string
  setScriptText?: any
  setRenameTextId?: any
  setRename?: any
  handleDuplicateScript?: any
  handleTrashScript?: any
  handleClose?: any
  setTrashOneScript?: any
  setTrashScriptId?: any
  handleClick?: any
  handleRestoreScript?: any
  page: any
  handleImageClick: (scriptId: string, isStarred: boolean) => void
  setDeleteScriptPermanentlyId?: any
  setDeleteScriptPermanently?: any
  viewportWidth: any
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter();

  const CustomizedMenu = styled(Menu)`
      .MuiMenu-paper {
        box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.16); !important;
      }
    `

  return (
    <>
      <tr
        key={props.script._id}
        style={{
          borderBottom: '1px solid #F3F3F3',
          backgroundColor: isHovered ? '#F8F8F8' : '#FFF',
          cursor: isHovered ? "pointer" : "none"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <th
          style={{
            opacity:
              (isHovered &&
                props.page !== 'starred' &&
                props.page !== 'trash') ||
              (props.checkedboxArray && props.checkedboxArray?.length > 0 && props.page !== 'starred' && props.page !== 'trash')
                ? 1
                : 0,
            transition: 'opacity 0.3s',
            width: '80px',
            paddingLeft: '30px',
          }}
        >
          <CheckBox
            handleChange={props.handleChange}
            scriptId={props.script._id}
            checkedboxArray={props.checkedboxArray}
          />
        </th>

        <th 
        style={{ fontWeight: '500', fontSize: '16px', padding: '15px 0' }}
        onClick={() => {
          props.page !== "trash" && router.push(`/canvas/${props.script._id}`)
        }}
        >
          {props.script.title}
        </th>

        <th 
        style={{ fontWeight: '500', fontSize: '16px', padding: '15px 0'}}
        onClick={() => {
          props.page !== "trash" && router.push(`/canvas/${props.script._id}`)
        }}
        >
          {formatDayOfWeek(props.script.updated_at) === getCurrentDayOfWeek()
            ? formatTime(props.script.updated_at)
            : formatDate(props.script.updated_at) !== 'Yesterday'
              ? formatDayOfWeek(props.script.updated_at)
              : formatDate(props.script.updated_at)}
        </th>

        <th 
        style={{ fontWeight: '500', fontSize: '16px', padding: '15px 0', paddingLeft:"15px" }}
        onClick={() => {
        }}
        >
          {props.script.isStarred ? (
            <img
              src="/Vector.svg"
              alt="Logo"
              style={{ width: '20px', height: '20px' }}
              onClick={() =>
                props.handleImageClick(props.script._id, props.script.isStarred)
              }
            />
          ) : (
            <img
              src="/twemoji_star.svg"
              alt="Logo"
              style={{ width: '20px', height: '20px' }}
              onClick={() =>
                props.handleImageClick(props.script._id, props.script.isStarred)
              }
            />
          )}
        </th>

        <th 
        style={{ fontWeight: '500', fontSize: '16px', padding: '15px 0' }}
        onClick={() => {
          props.page !== "trash" && router.push(`/canvas/${props.script._id}`)
        }}
        >
          {getOwner(props.userMail)}
        </th>
        <th>
          <div>
            <IconButton
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                props.page !== 'starred' &&
                  props.handleClick(e, props.script._id)
              }}
              style={{
                color: '#353538',
                opacity: props.page === 'starred' ? 0 : 1,
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            {props.page === 'home' && (
              <CustomizedMenu
                anchorEl={props.anchorEl.element}
                open={Boolean(props.anchorEl.scriptId == props.script._id)}
                onClose={props.handleClose}
              >
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onClick={() => {
                    window.open(`/canvas/${props.script._id}`, '_blank')
                    props.handleClose()
                  }}
                >
                  {/* <Icon icon="fluent:tab-desktop-24-regular" />  */}
                  <img
                    src="/fluent_tab-desktop-24-regular.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Open in new tab</Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onClick={() => {
                    props.setRenameTextId(props.script._id)
                    props.setScriptText(props.script.title)
                    props.handleClose()
                    props.setRename(true)
                  }}
                >
                  {/* <LiaPenAltSolid fontSize="large"/> */}
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
                    gap: '10px',
                  }}
                  onClick={() => {
                    props.handleDuplicateScript(props.script._id)
                    props.handleClose()
                  }}
                >
                  <img
                    src="/humbleicons_duplicate.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Duplicate</Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onClick={() => {
                    props.setTrashScriptId(props.script._id)
                    props.setTrashOneScript(true)
                    props.handleClose()
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
            )}
            {props.page === 'trash' && (
              <CustomizedMenu
                anchorEl={props.anchorEl.element}
                open={Boolean(props.anchorEl.scriptId == props.script._id)}
                onClose={props.handleClose}
              >
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onClick={() => {
                    props.handleRestoreScript(props.script._id)
                    props.handleClose()
                  }}
                >
                  <img
                    src="/restore-page-outline.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Restore script</Typography>
                </MenuItem>
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onClick={() => {
                    props.setDeleteScriptPermanentlyId(props.script._id)
                    props.setDeleteScriptPermanently(true)
                    props.handleClose()
                  }}
                >
                  <img
                    src="/solar_trash-bin-trash-linear.svg"
                    alt="Logo"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <Typography>Delete permanently</Typography>
                </MenuItem>
              </CustomizedMenu>
            )}
          </div>
        </th>
      </tr>
    </>
  )
}

export default TableRow
