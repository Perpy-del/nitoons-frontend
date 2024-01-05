import React from 'react'
import styles from '@/styles/checkbox.module.css'

const CheckBox = (prop: {
  handleChange: any
  scriptId: string
  checkedboxArray: any
}) => {
  // Checkbox implementation
  const isChecked =
    prop.checkedboxArray.length > 0 &&
    prop.checkedboxArray.includes(prop.scriptId)

  return (
    <input
      className={styles.input}
      type="checkbox"
      id=""
      name="checkbox"
      value="checkbox"
      checked={isChecked}
      onChange={() => prop.handleChange(prop.scriptId)}
    />
  )
}

export default CheckBox
