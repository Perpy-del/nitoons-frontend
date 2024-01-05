import React from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import { TbTrash } from 'react-icons/tb'

const Sidebar = (props: {
  setPage: (page: string) => void
  viewportWidth: any
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [iconHomeColor, setIconHomeColor] = React.useState('#D90368')
  const [iconStarColor, setIconStarColor] = React.useState('#353538')
  const [iconTrashColor, setIconTrashColor] = React.useState('#353538')

  // React.useEffect(() => {

  // }, [ setSelectedIndex])

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
  // console.log("viewport: ", props.viewportWidth)
  return (
    <Box
      sx={{
        width: props.viewportWidth <= 1149 ? 200 : 266,
        backgroundColor: 'white',
        overflowY: 'auto',
        paddingLeft: '0px',
      }}
    >
      <List>
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
        >
          <ListItemIcon>
            <HomeOutlinedIcon
              style={{ marginLeft: '70px', color: iconHomeColor }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            style={{
              marginLeft: '20px',
            }}
          />
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
            <StarOutlineOutlinedIcon
              style={{ marginLeft: '70px', color: iconStarColor }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Starred"
            style={{
              marginLeft: '20px',
            }}
          />
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
              style={{
                marginLeft: '73px',
                width: '22px',
                height: '20px',
                color: iconTrashColor,
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Trash"
            style={{
              marginLeft: '20px',
            }}
          />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default Sidebar
