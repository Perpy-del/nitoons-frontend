import { Typography } from '@mui/material';
import React from 'react';
import styles from '@/styles/canvasnavbar.module.css';

const ActionIcon = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;

  return (
    <button
      className={styles.headingButton}
      onClick={() => {
        handleIconClick(1);
      }}
      title="Description of the setting and what happens in the scene"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="22"
        viewBox="0 0 24 22"
        fill="none"
      >
        <g clip-path="url(#clip0_5148_1192)">
          <path
            d="M23.319 2.81502C23.319 2.04777 22.697 1.42578 21.9298 1.42578C21.1625 1.42578 20.5405 2.04777 20.5405 2.81502V17.6836C20.5405 18.4508 21.1625 19.0728 21.9298 19.0728C22.697 19.0728 23.319 18.4508 23.319 17.6836V2.81502Z"
            stroke={isActive(1) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <path
            d="M4.39517 6.86971C4.39517 6.10245 3.77319 5.48047 3.00594 5.48047C2.23868 5.48047 1.6167 6.10245 1.6167 6.86971V13.6281C1.6167 14.3954 2.23868 15.0174 3.00594 15.0174C3.77319 15.0174 4.39517 14.3954 4.39517 13.6281V6.86971Z"
            stroke={isActive(1) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <path
            d="M4.35742 7.54524L20.5778 4.16602V17.0071L4.35742 12.952V7.54524Z"
            stroke={isActive(1) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <mask
            id="mask0_5148_1192"
            // style="mask-type:luminance"
            maskUnits="userSpaceOnUse"
            x="6"
            y="11"
            width="13"
            height="10"
          >
            <path
              d="M16.7366 15.8687C16.4191 17.0826 15.6324 18.1206 14.5496 18.7545C13.4668 19.3884 12.1765 19.5661 10.9626 19.2486C9.7487 18.9311 8.71065 18.1445 8.07679 17.0616C7.44294 15.9788 7.26519 14.6885 7.58267 13.4746L12.1596 14.6716L16.7366 15.8687Z"
              stroke="black"
              stroke-width="2.55319"
            />
          </mask>
          <g mask="url(#mask0_5148_1192)">
            <path
              d="M16.7366 15.8687C16.4191 17.0826 15.6324 18.1206 14.5496 18.7545C13.4668 19.3884 12.1765 19.5661 10.9626 19.2486C9.7487 18.9311 8.71065 18.1445 8.07679 17.0616C7.44294 15.9788 7.26519 14.6885 7.58267 13.4746L12.1596 14.6716L16.7366 15.8687Z"
              stroke={isActive(1) ? '#D90368' : '#353538'}
              stroke-width="2.55319"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5148_1192">
            <rect
              width="22.9787"
              height="20.4255"
              fill="white"
              transform="translate(0.978516 0.787109)"
            />
          </clipPath>
        </defs>
      </svg>
      <Typography
        style={{ fontSize: '11px', color: isActive(1) ? '#D90368' : '#353538' }}
      >
        Action
      </Typography>
    </button>
  );
};

export default ActionIcon;
