import { Typography } from '@mui/material';
import React from 'react';
import styles from '@/styles/canvasnavbar.module.css';

const GeneralIcon = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;

  return (
    <button className={styles.headingButton} onClick={() => {handleIconClick(6)}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="17"
        viewBox="0 0 24 18"
        fill="none"
      >
        <g clip-path="url(#clip0_5148_2385)">
          <path
            d="M0.702148 1.33984H23.6809"
            stroke={isActive(6) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <path
            d="M0.702148 6.44629H23.6809"
            stroke={isActive(6) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <path
            d="M0.702148 11.5527H23.6809"
            stroke={isActive(6) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <path
            d="M0.702148 16.6592H23.6809"
            stroke={isActive(6) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
        </g>
        <defs>
          <clipPath id="clip0_5148_2385">
            <rect
              width="22.9787"
              height="17.8723"
              fill="white"
              transform="translate(0.702148 0.0634766)"
            />
          </clipPath>
        </defs>
      </svg>
      <Typography
        style={{ fontSize: '11px', marginTop: 2, color: isActive(6) ? '#D90368' : '#353538' }}
      >
        General
      </Typography>
    </button>
  );
};

export default GeneralIcon;
