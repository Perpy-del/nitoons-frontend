/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Typography, IconButton } from '@mui/material'
import CheckBox from '@/components/CheckBox/Checkbox'
import axios from 'axios'
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

const Starred = (props: {
  // isHovered: boolean;
  // setIsHovered: (value: boolean) => void;
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
  const [userMail, setUserMail] = useState('')
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  React.useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const mail = localStorage.getItem('user_email')
      typeof mail === 'string' && setUserMail(mail)
    }
  }, [props.scripts])

  const handleMenuOpen = () => {
    setMenuIsOpen(true)
  }

  const handleMenuClose = () => {
    setMenuIsOpen(false)
  }

  const handleChange = (event: any) => {
    setIsChecked(event.target.checked)
  }

  const checkStarredScript = props.scripts
    ?.filter((script: any) => script.isStarred && !script.isTrashed)
    ?.filter((script: any) => script.title.includes(props.searchValue))
    ?.length !== 0

      // console.log(
      //   "starredProp: ", 
      //   props.scripts && 
      //   props.scripts !== undefined &&
      //   props.scripts.filter((script: any) => script.isStarred && !script.isTrashed && script.title.includes(props.searchValue))
      //   ?.length
      // )

  return (
    <div
      style={{
        overflowX:
          checkStarredScript && props.viewportWidth <= 958 ? 'auto' : 'hidden',
      }}
    >
      <table
        style={{ width: '100%', borderCollapse: 'collapse', minWidth: '564px' }}
      >
        <tbody style={{ textAlign: 'left' }}>
          {props.viewportWidth <= 425 &&
          props.scripts
            ?.filter((script: any) => script.isStarred && !script.isTrashed)
            ?.filter((script: any) => script.title.includes(props.searchValue))
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

          {
            props.scripts
              ?.filter((script: any) => script.isStarred && !script.isTrashed && script.title.includes(props.searchValue))
              ?.sort((a: any, b: any) =>
                props.lastModified
                  ? new Date(a.updated_at).getTime() -
                    new Date(b.updated_at).getTime()
                  : new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime(),
              )
              ?.map((script: any) => (
                <TableRow
                  key={script._id}
                  script={script}
                  handleChange={handleChange}
                  checkedboxArray={props.checkedboxArray}
                  userMail={userMail}
                  handleImageClick={props.handleImageClick}
                  page={props.page}
                  viewportWidth={props.viewportWidth}
                />
              ))
              ?.sort()
              ?.reverse()}
        </tbody>
      </table>

      { props.scripts?.length !== 0 &&
        props.scripts?.filter((script: any) => script.isStarred && !script.isTrashed)
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
              Your starred script will appear here
            </Typography>
          </div>
        )}

      {props.scripts?.length !== 0 &&
       props.scripts?.filter((script: any) => script.isStarred && !script.isTrashed)?.length !== 0 &&
        props.scripts?.filter((script: any) => script.isStarred && !script.isTrashed && script.title.includes(props.searchValue))
        ?.length === 0 
        &&
        (
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
        )
      } 
    </div>
  )
}

export default Starred