import { Typography } from '@mui/material';
import React from 'react'
import styles from '@/styles/canvasnavbar.module.css'

const RenumberIcon = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;
  
  return (
    <button className={styles.headingButton} onClick={() => {handleIconClick(8)}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="21"
      viewBox="0 0 22 24"
      fill="none"
    >
      <g clip-path="url(#clip0_5148_2205)">
        <path
          d="M16.0645 21.4465V3.06348"
          stroke={isActive(8) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M20.5319 16.8506L16.0638 21.4463L11.5957 16.8506"
          stroke={isActive(8) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M4.32491 10.7232H2.78402V6.50443L2.79898 5.81127L2.82391 5.05329C2.56793 5.30928 2.39006 5.47716 2.29033 5.55695L1.45257 6.23016L0.709544 5.30264L3.05828 3.43262H4.32491V10.7232ZM5.61147 22.2125H0.515063V21.1405L2.34519 19.2903C2.88708 18.7351 3.24113 18.3512 3.40735 18.1384C3.57358 17.9223 3.69326 17.7229 3.7664 17.5399C3.83953 17.3571 3.87609 17.1677 3.87609 16.9715C3.87609 16.679 3.79465 16.4612 3.63175 16.3182C3.47218 16.1753 3.25775 16.1038 2.98846 16.1038C2.70589 16.1038 2.43161 16.1686 2.16566 16.2983C1.89971 16.428 1.62211 16.6125 1.33288 16.8519L0.495117 15.8594C0.85416 15.5537 1.1517 15.3376 1.38774 15.2112C1.62377 15.0849 1.88141 14.9884 2.16068 14.922C2.43992 14.8522 2.75243 14.8172 3.09818 14.8172C3.55363 14.8172 3.95588 14.9003 4.30495 15.0665C4.65403 15.2329 4.92497 15.4655 5.11779 15.7647C5.31061 16.0639 5.40701 16.4063 5.40701 16.792C5.40701 17.1277 5.34718 17.4436 5.2275 17.7395C5.11114 18.0321 4.92829 18.3328 4.67896 18.642C4.43295 18.9512 3.99745 19.3918 3.37244 19.9636L2.43495 20.8462V20.916H5.61147V22.2125Z"
          fill={isActive(8) ? '#D90368' : '#353538'}
        />
      </g>
      <defs>
        <clipPath id="clip0_5148_2205">
          <rect
            width="21.7021"
            height="22.9787"
            fill="white"
            transform="translate(0.106445 0.510742)"
          />
        </clipPath>
      </defs>
    </svg>
      <Typography style={{fontSize: '11px', color: isActive(8) ? '#D90368' : '#353538'}}>Renumber</Typography>
    </button>
  )
}

export default RenumberIcon