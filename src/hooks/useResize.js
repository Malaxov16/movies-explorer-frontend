import { useState, useEffect } from 'react';
import {
  WINDOW_WIDTH_1280, WINDOW_WIDTH_1150, WINDOW_WIDTH_650,
} from '../utils/consts';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenXL: width >= WINDOW_WIDTH_1280,
    isScreenL: width >= WINDOW_WIDTH_1150,
    isScreenM: width >= WINDOW_WIDTH_650,
    isScreenS: width < WINDOW_WIDTH_650,
  };
};