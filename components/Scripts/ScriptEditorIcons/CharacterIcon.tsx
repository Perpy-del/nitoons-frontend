import { Typography } from '@mui/material';
import React from 'react'
import styles from '@/styles/canvasnavbar.module.css'

const CharacterIcon = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;

  return (
    <button className={styles.headingButton} onClick={() => {
      handleIconClick(2)}} title="Name of character. Precedes Dialog/Parenthetical">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_5148_1394)">
        <path
          d="M8.81885 16.8379C9.82668 18.2488 12.568 20.2242 15.4706 16.8379"
          stroke={isActive(2) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.77711 7.76758C3.13342 9.22482 2.77148 10.8674 2.77148 12.605C2.77148 18.6165 7.10324 23.4896 12.4467 23.4896C17.7903 23.4896 22.122 18.6165 22.122 12.605C22.122 10.8674 21.7601 9.22482 21.1163 7.76758H19.7078C20.4277 9.17428 20.8454 10.8202 20.8454 12.605C20.8454 18.057 16.948 22.2131 12.4467 22.2131C7.94549 22.2131 4.04808 18.057 4.04808 12.605C4.04808 10.8202 4.46578 9.17428 5.18562 7.76758H3.77711Z"
          fill={isActive(2) ? '#D90368' : '#353538'}
        />
        <path
          d="M0.95752 8.37207H23.9362"
          stroke={isActive(2) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M6.60165 1.14941H18.2925C20.0553 1.14941 21.484 2.57829 21.484 4.3409V8.33866H3.41016V4.3409C3.41016 2.57829 4.83904 1.14941 6.60165 1.14941Z"
          stroke={isActive(2) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M8.2139 13.1758C8.86328 13.1758 9.38971 12.6494 9.38971 12C9.38971 11.3506 8.86328 10.8242 8.2139 10.8242C7.56451 10.8242 7.03809 11.3506 7.03809 12C7.03809 12.6494 7.56451 13.1758 8.2139 13.1758Z"
          stroke={isActive(2) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M16.6797 13.1758C17.3291 13.1758 17.8555 12.6494 17.8555 12C17.8555 11.3506 17.3291 10.8242 16.6797 10.8242C16.0303 10.8242 15.5039 11.3506 15.5039 12C15.5039 12.6494 16.0303 13.1758 16.6797 13.1758Z"
          stroke={isActive(2) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
      </g>
      <defs>
        <clipPath id="clip0_5148_1394">
          <rect
            width="22.9787"
            height="22.9787"
            fill="white"
            transform="translate(0.95752 0.510742)"
          />
        </clipPath>
      </defs>
    </svg>
      <Typography style={{fontSize: '11px', color: isActive(2) ? '#D90368' : '#353538'}}>Character</Typography>
    </button>
  )
}

export default CharacterIcon