import { Typography } from '@mui/material';
import React from 'react'
import styles from '@/styles/canvasnavbar.module.css'

const TransitionIcon = () => {
  const [isActive, setIsActive] = React.useState([false, false, false, false, false, false, false, false, false, false]);
  const activeIndex = 5;

  const handleIconClick = (num: number) => {
    setIsActive(prevIsActive =>
      prevIsActive.map((_, index) =>
        index === num ? !prevIsActive[index] : false
      )
    );
  };

  return (
    <button className={styles.headingButton} onClick={() => {handleIconClick(activeIndex)}} title='Visual change to the next scene e.g. CUT TO'>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="23"
      viewBox="0 0 26 26"
      fill="none"
    >
      <g clip-path="url(#clip0_5148_2186)">
        <path
          d="M2.08496 6.38574H24.3673"
          stroke={isActive[activeIndex] ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M7.65556 1.51074L2.08496 6.38501L7.65556 11.2593"
          stroke={isActive[activeIndex] ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M24.3674 19.6162H2.08496"
          stroke={isActive[activeIndex] ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M18.7969 14.7412L24.3674 19.6155L18.7969 24.4897"
          stroke={isActive[activeIndex] ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
      </g>
      <defs>
        <clipPath id="clip0_5148_2186">
          <rect
            width="25.5319"
            height="25.5319"
            fill="white"
            transform="translate(0.169922 0.234375)"
          />
        </clipPath>
      </defs>
    </svg>
      <Typography style={{fontSize: '11px', color: isActive[activeIndex] ? '#D90368' : '#353538'}}>Transition</Typography>
    </button>
  )
}

export default TransitionIcon