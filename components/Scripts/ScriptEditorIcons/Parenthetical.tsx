import { Typography } from '@mui/material';
import React from 'react'
import styles from '@/styles/canvasnavbar.module.css'
import { isActive } from '@tiptap/core';

const Parenthetical = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;
  
  return (
    <button className={styles.headingButton} onClick={() => {handleIconClick(3)}} title="Note about how the line is said. Follows Character/Parenthetical">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 24 18"
      fill="none"
    >
      <g clip-path="url(#clip0_5148_1599)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.3195 0.0634766C3.53639 1.69536 0.936523 5.08397 0.936523 8.99965C0.936523 12.9153 3.53639 16.3039 7.3195 17.9358V16.5356C4.2217 15.0049 2.21312 12.1352 2.21312 8.99965C2.21312 5.86411 4.2217 2.99444 7.3195 1.46365V0.0634766ZM17.5323 17.9358C21.3153 16.3039 23.9152 12.9153 23.9152 8.99965C23.9152 5.08397 21.3153 1.69536 17.5323 0.0634766V1.46365C20.6301 2.99444 22.6387 5.86411 22.6387 8.99965C22.6387 12.1352 20.6301 15.0049 17.5323 16.5356V17.9358Z"
          fill={isActive(3) ? '#D90368' : '#353538'}
        />
      </g>
      <defs>
        <clipPath id="clip0_5148_1599">
          <rect
            width="22.9787"
            height="17.8723"
            fill="white"
            transform="translate(0.936523 0.0634766)"
          />
        </clipPath>
      </defs>
    </svg>
      <Typography style={{fontSize: '11px', color: isActive(3) ? '#D90368' : '#353538'}}>Parens</Typography>
    </button>
  )
}

export default Parenthetical