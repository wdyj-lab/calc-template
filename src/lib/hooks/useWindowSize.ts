import { ResponsiveType } from 'lib/types/ResponsiveType';
import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    status: ResponsiveType.PC,
  });

  const BreakPoint = {
    PC: 1256,
    Tablet: 1024,
    Mobile: 768,
  } as const;

  useEffect(() => {
    function handleResize() {
      if (
        window.innerWidth <= BreakPoint.Tablet &&
        window.innerWidth > BreakPoint.Mobile
      ) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          status: ResponsiveType.TABLET,
        });
      } else if (window.innerWidth <= BreakPoint.Mobile) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          status: ResponsiveType.MOBILE,
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          status: ResponsiveType.PC,
        });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [BreakPoint.PC, BreakPoint.Tablet, BreakPoint.Mobile]);
  return windowSize;
};

export default useWindowSize;
