import { Typography } from '@mui/material';
import React from 'react';
import styles from '@/styles/canvasnavbar.module.css';

const FilmCutIcon = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleIconClick = (num: number) => {
    setActiveIndex((prevIndex) => (prevIndex === num ? null : num));
  };

  const isActive = (num: number) => activeIndex === num;

  return (
    <button className={styles.headingButton} onClick={() => {
      handleIconClick(0)}} title="Location, begins INT. (Interior) or EXT(Exterior) and ends - DAY or - Night">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 23 26"
        fill="none"
      >
        <g clip-path="url(#clip0_5145_978)">
          <path
            d="M2.46411 13.1338H22.3404V21.2966C22.3404 23.0592 20.9115 24.4881 19.1489 24.4881H5.6556C3.89299 24.4881 2.46411 23.0592 2.46411 21.2966V13.1338Z"
            stroke={isActive(0) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <path
            d="M3.87223 6.25543L19.8308 1.65723L21.355 6.48628L2.32989 11.9681L1.76623 10.1825C1.23564 8.50167 2.17853 6.74345 3.87223 6.25543Z"
            stroke={isActive(0) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
          <path
            d="M15.3797 2.93457L16.9066 7.77172L12.4766 9.04819L10.9496 4.21104L6.51953 5.48751L8.04647 10.3247"
            stroke={isActive(0) ? '#D90368' : '#353538'}
            stroke-width="1.2766"
          />
        </g>
        <defs>
          <clipPath id="clip0_5145_978">
            <rect
              width="22.9787"
              height="24.2553"
              fill="white"
              transform="translate(0 0.87207)"
            />
          </clipPath>
        </defs>
      </svg>
      <Typography
        style={{ fontSize: '11px', color: isActive(0) ? '#D90368' : '#353538' }}
      >
        Scene
      </Typography>
    </button>
  );
};

export default FilmCutIcon;
