import * as React from 'react'
import {
  Box,
  List,
  ListItem,
  Avatar,
  Divider,
  Typography,
  IconButton,
  ListItemIcon,
  MenuItem,
  ListItemText,
  ListItemButton,
  SwipeableDrawer,
} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import { TbTrash } from 'react-icons/tb'
import Link from 'next/link'
import { getOwner } from '@/lib/utils'

export default function SwipeableTemporaryDrawer(props: {
  setPage: (page: string) => void
  userMail: any
  state: any
  setState: any
  toggleDrawer: any
  handleSignOut: any
  viewportWidth: any
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [iconHomeColor, setIconHomeColor] = React.useState('#353538')
  const [iconStarColor, setIconStarColor] = React.useState('#353538')
  const [iconTrashColor, setIconTrashColor] = React.useState('#353538')

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    // Reset all icon colors to the initial state
    setIconHomeColor('#353538')
    setIconStarColor('#353538')
    setIconTrashColor('#353538')

    setSelectedIndex(index)

    // Handle individual icon color changes using if-else
    if (index === 0) {
      setIconHomeColor('#D90368')
      props.setPage('home')
    } else if (index === 1) {
      setIconStarColor('#D90368')
      props.setPage('starred')
    } else if (index === 2) {
      setIconTrashColor('#D90368')
      props.setPage('trash')
    }
  }

  const list = (anchor: string) => (
    <Box
      //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      style={{
        width:
          props.viewportWidth <= 200
            ? '150px'
            : props.viewportWidth <= 250
              ? '180px'
              : props.viewportWidth <= 270
                ? '220px'
                : props.viewportWidth <= 300
                  ? '240px'
                  : props.viewportWidth <= 329
                    ? '270px'
                    : props.viewportWidth <= 345
                      ? '290px'
                      : props.viewportWidth <= 360
                        ? '310px'
                        : props.viewportWidth <= 380
                          ? '330px'
                          : props.viewportWidth <= 390
                            ? '350px'
                            : props.viewportWidth <= 425
                              ? '377px'
                              : '250px',
      }}
      role="presentation"
      onClick={props.toggleDrawer(anchor, false)}
      onKeyDown={props.toggleDrawer(anchor, false)}
    >
      <List>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems:"center",
            marginTop: '31px',
            padding: '0px 10px',
          }}
        >
          <Link href={'/'}>
            <img
              src="/nitoons.svg"
              alt="Logo"
              // style={{ width: '100px', height: '50px', cursor: 'pointer' }}
              style={{
                width: '101.279px',
                height: '17.873px',
                cursor: 'pointer',
              }}
            />
          </Link>
          <img
            src="/iconamoon_close.svg"
            alt="Logo"
            onClick={props.toggleDrawer(anchor, false)}
            // style={{ width: '100px', height: '50px', cursor: 'pointer' }}
            style={{ width: '28px', height: '28px', cursor: 'pointer', marginBottom:"7px" }}
          />
        </div>
        <div
          style={{
            width: '377px',
            height: '114px',
            background: '#F6F6F6',
            marginTop: '46px',
            padding: '30px 24px',
          }}
        >
          <Avatar
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#D90368',
            }}
          >
            {getOwner(props.userMail).charAt(0).toUpperCase()}
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
            {getOwner(props.userMail)}
          </Typography>
        </div>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={event => {
            handleListItemClick(event, 0)
          }}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#FFF2F8',
              borderRight: '3px solid #D90368',
              color: '#D90368',
            },
          }}
          style={{
            marginTop: '45px',
          }}
        >
          <ListItemIcon>
            <HomeOutlinedIcon style={{ color: iconHomeColor }} />
          </ListItemIcon>
          <ListItemText primary="Home" style={{ fontSize: "18px" }} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={event => {
            handleListItemClick(event, 1)
          }}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#FFF2F8',
              borderRight: '3px solid #D90368',
              color: '#D90368',
            },
          }}
        >
          <ListItemIcon>
            <StarOutlineOutlinedIcon style={{ color: iconStarColor }} />
          </ListItemIcon>
          <ListItemText primary="Starred" style={{ fontSize: "18px" }} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={event => {
            handleListItemClick(event, 2)
          }}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#FFF2F8',
              borderRight: '3px solid #D90368',
              color: '#D90368',
            },
          }}
        >
          <ListItemIcon>
            <TbTrash
              style={{ width: '22px', height: '20px', color: iconTrashColor }}
            />
          </ListItemIcon>
          <ListItemText primary="Trash" style={{ fontSize: "18px" }} />
        </ListItemButton>
      </List>
      <Divider />
      <MenuItem
        onClick={props.handleSignOut}
        style={{
          marginTop: '5px',
          marginBottom: '5px',
          padding: '10px',
        }}
      >
        <IconButton color="inherit">
          <img
            src="/basil_logout-solid.svg"
            alt="Logo"
            style={{
              width: '21px',
              height: '21px',
            }}
          />
        </IconButton>
        <Typography
          style={{
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400px',
            lineHeight: 'normal',
            marginLeft: "25px"
          }}
        >
          Sign Out
        </Typography>
      </MenuItem>
    </Box>
  )

  return (
    <div>
      {['left'].map(anchor => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={'left'}
            open={props.state[anchor]}
            onClose={props.toggleDrawer(anchor, false)}
            onOpen={props.toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  )
}
