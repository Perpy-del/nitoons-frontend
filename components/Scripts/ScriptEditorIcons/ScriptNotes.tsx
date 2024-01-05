import { Typography } from '@mui/material';
import React from 'react'
import styles from '@/styles/canvasnavbar.module.css'

const ScriptNotes = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;
  
  return (
    <button className={styles.headingButton} onClick={() => {handleIconClick(7)}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 24"
      fill="none"
    >
      <g clip-path="url(#clip0_5148_2196)">
        <path
          d="M4.51074 5.61719H17.2767"
          stroke={isActive(7) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M4.51074 9.44727H17.2767"
          stroke={isActive(7) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          d="M4.51074 13.2764H17.2767"
          stroke={isActive(7) ? '#D90368' : '#353538'}
          stroke-width="1.2766"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.51045 1.78734H17.2764C18.6865 1.78734 19.8296 2.93044 19.8296 4.34053V15.8299H21.1062V4.34053C21.1062 2.2254 19.3916 0.510742 17.2764 0.510742H4.51045C2.39532 0.510742 0.680664 2.2254 0.680664 4.34053V19.6597C0.680664 21.7749 2.39532 23.4895 4.51045 23.4895H13.4466V22.2129H4.51045C3.10036 22.2129 1.95726 21.0698 1.95726 19.6597V4.34053C1.95726 2.93044 3.10036 1.78734 4.51045 1.78734Z"
          fill={isActive(7) ? '#D90368' : '#353538'}
        />
        <mask
          id="mask0_5148_2196"
          //   style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="13"
          y="15"
          width="9"
          height="9"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.1059 17.1067V15.8301H13.4463V23.4897H14.7229L21.1059 17.1067Z"
            fill="black"
          />
        </mask>
        <g mask="url(#mask0_5148_2196)">
          <path
            d="M21.1061 15.8303H22.3827V14.5537H21.1061V15.8303ZM21.1061 17.1069L22.0088 18.0096L22.3827 17.6357V17.1069H21.1061ZM13.4465 15.8303V14.5537H12.1699V15.8303H13.4465ZM13.4465 23.4899H12.1699V24.7665H13.4465V23.4899ZM14.7231 23.4899V24.7665H15.2519L15.6258 24.3926L14.7231 23.4899ZM19.8295 15.8303V17.1069H22.3827V15.8303H19.8295ZM13.4465 17.1069H21.1061V14.5537H13.4465V17.1069ZM14.7231 23.4899V15.8303H12.1699V23.4899H14.7231ZM14.7231 22.2133H13.4465V24.7665H14.7231V22.2133ZM15.6258 24.3926L22.0088 18.0096L20.2034 16.2042L13.8204 22.5872L15.6258 24.3926Z"
            fill={isActive(7) ? '#D90368' : '#353538'}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5148_2196">
          <rect
            width="20.4255"
            height="22.9787"
            fill="white"
            transform="translate(0.680664 0.510742)"
          />
        </clipPath>
      </defs>
    </svg>
      <Typography style={{fontSize: '11px', color: isActive(7) ? '#D90368' : '#353538'}}>Note</Typography>
    </button>
  )
}

export default ScriptNotes
