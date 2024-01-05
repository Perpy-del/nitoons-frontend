import { Typography } from '@mui/material';
import React from 'react'
import styles from '@/styles/canvasnavbar.module.css'

const DialogueIcon = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;

  return (
    <button className={styles.headingButton} onClick={() => {handleIconClick(4)}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="22"
      viewBox="0 0 26 22"
      fill="none"
    >
      <g clip-path="url(#clip0_5148_1795)">
        <path
          d="M2.19201 20.5749L1.70738 20.1595C1.52067 20.3773 1.50223 20.693 1.66232 20.9311C1.82241 21.1692 2.12168 21.2712 2.39385 21.1804L2.19201 20.5749ZM5.53717 15.6914L1.70738 20.1595L2.67665 20.9903L6.50643 16.5222L5.53717 15.6914ZM2.39385 21.1804L10.0534 18.6272L9.64974 17.4162L1.99016 19.9694L2.39385 21.1804Z"
          fill={isActive(4) ? '#D90368' : '#353538'}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.8935 9.72291C23.8935 14.0977 19.5489 18.0208 13.6808 18.0208C12.3502 18.0208 11.0981 17.8191 9.95708 17.4561L7.8057 17.9526C9.52476 18.8068 11.534 19.2974 13.6808 19.2974C20.0262 19.2974 25.1701 15.0107 25.1701 9.72291C25.1701 4.43507 20.0262 0.148438 13.6808 0.148438C7.33537 0.148438 2.19141 4.43507 2.19141 9.72291C2.19141 12.5996 3.7138 15.18 6.12382 16.935L6.92073 15.9389C4.77387 14.384 3.468 12.1213 3.468 9.72291C3.468 5.34817 7.81259 1.42503 13.6808 1.42503C19.5489 1.42503 23.8935 5.34817 23.8935 9.72291Z"
          fill={isActive(4) ? '#D90368' : '#353538'}
        />
      </g>
      <defs>
        <clipPath id="clip0_5148_1795">
          <rect
            width="24.2553"
            height="21.7021"
            fill="white"
            transform="translate(0.915039 0.148438)"
          />
        </clipPath>
      </defs>
    </svg>
      <Typography style={{fontSize: '11px', color: isActive(4) ? '#D90368' : '#353538'}}>Dialogue</Typography>
    </button>
  )
}

export default DialogueIcon