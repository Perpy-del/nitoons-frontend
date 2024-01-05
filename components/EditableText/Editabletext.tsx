// EditableText.js
import useNitoonsHook from '@/hooks/useNitoonsHook';
import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

const EditableText = (prop:{ id:any, initialValue:any, onSave?:any, handleDoubleClick?:any, isEditing?: any, setIsEditing?:any, onRename?: any  }) => {
  // const [isEditing, setIsEditing] = useState(false);
  const nitoonsHook = useNitoonsHook()
  const [text, setText] = useState(prop.initialValue);

  useEffect(() => {
    setText(prop.initialValue);
  }, [prop.initialValue]);

  const handleBlur = () => {
    prop.setIsEditing(false);
    prop.onSave(prop.id, text);
  };

  const handleChange = (e: any) => {
    if (e.currentTarget.value !== ''){
      setText(e.currentTarget.value)
    } else if (e.currentTarget.value.length < 2) {
      setText('')
    }
    // setText(prop.initialValue)
  };

  const handleChangeTextKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleBlur()
    }
  };

  return (
    <div>
      {prop.isEditing ? (
        <TextField
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleChangeTextKeyPress}
          autoFocus
          placeholder={prop.initialValue}
          sx={{
            padding: 0,
            width: 100
          }}
          size='small'
        />
      ) : (
        <span onDoubleClick={prop.handleDoubleClick}>{text}</span>
      )}
    </div>
  );
};

export default EditableText;
