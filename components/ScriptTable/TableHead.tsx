/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import CheckBox from '../CheckBox/Checkbox'

const TableHead = (props: {
  handleHeaderCheckboxChange?: any
  HomeScriptCondition ?: any;
  checkedboxArray: string[]
  setLastModified: any
  lastModified: any
  viewportWidth: any
  page: any
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isChecked, setisChecked] = useState(true)

  const toggleTrashOneScript = () => {
    props.setLastModified((prev: any) => !prev)
  }

  const arrayOccupied = props.checkedboxArray?.length === props.HomeScriptCondition?.length && props.HomeScriptCondition?.length !== 0

  return (
    <tr
      style={{
        width: '100%',
        backgroundColor: isHovered ? '#F8F8F8' : '#FFF',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <th
        style={{
          opacity:
            isHovered && props.page !== 'starred' && props.page !== 'trash'
            || props.checkedboxArray && props.checkedboxArray?.length > 0 && props.page !== 'starred' && props.page !== 'trash'
              ? 1
              : 0,
          transition: 'opacity 0.3s',
          width: '80px',
          paddingLeft: '30px',
        }}
      >
        <input
          type="checkbox"
          id=""
          name="checkbox"
          value="checkbox"
          checked={arrayOccupied}
          style={{
            width: '15px',
            height: '15px',
            accentColor: '#D90368',
            cursor: 'pointer',
          }}
          onChange={() => {
            setisChecked(prev => !prev)
            props.handleHeaderCheckboxChange(isChecked)
          }}
        />
      </th>
      <th 
      style={{ 
        fontWeight: '400', 
        fontSize: '14px', 
        padding: '15px 0',
        width:  "300px"
      }}
      >
        Name
      </th>
      <th
        style={{
          fontWeight: '400',
          fontSize: '14px',
          padding: '15px 0',
          width:"200px",
        }}
      >
        Last modified
        {props.lastModified ? (
          <ArrowUpwardOutlinedIcon
            style={{
              width: '19px',
              height: '17px',
              paddingTop: '5px',
              cursor: 'pointer',
              textAlign:"center"
            }}
            onClick={toggleTrashOneScript}
          />
        ) : (
          <ArrowDownwardOutlinedIcon
            style={{
              width: '19px',
              height: '17px',
              paddingTop: '5px',
              cursor: 'pointer',
              textAlign:"center"
            }}
            onClick={toggleTrashOneScript}
          />
        )}
      </th>
      <th 
      style={{ 
        fontWeight: '400',
        fontSize: '14px', 
        width:"150px",
      }}
      >
        Starred
      </th>
      <th 
      style={{
         fontWeight: '400',
          fontSize: '14px', 
          width:"150px" 
        }}
      >
        Owner
      </th>
      <th 
      // style={{ width:"66px" }}
      ></th>
    </tr>
  )
}

export default TableHead
