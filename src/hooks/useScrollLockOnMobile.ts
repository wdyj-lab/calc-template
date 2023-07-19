import { debounce } from "lodash-es";
import { useEffect } from "react";

import breakpoints from "../foundations/breakpoints";

const useScrollLockOnMobile = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    const scrollPosition = globalThis.scrollY;

    const setScrollLock = () => {
      body!.classList.add("scroll-locked");
      body!.style.top = `-${scrollPosition}px`;
    };

    const unsetScrollLock = () => {
      body!.classList.remove("scroll-locked");
      body!.style.removeProperty("top");
      globalThis.scrollTo(0, scrollPosition);
    };

    if (globalThis.innerWidth < breakpoints.md) {
      setScrollLock();
    }

    const debouncedScrollLocker = debounce(() => {
      if (globalThis.innerWidth < breakpoints.md) {
        setScrollLock();
      } else {
        unsetScrollLock();
      }
    }, 100);

    globalThis.addEventListener("resize", debouncedScrollLocker);

    setScrollLock();

    return () => {
      globalThis.removeEventListener("resize", debouncedScrollLocker);
      unsetScrollLock();
    };
  }, []);
};

export default useScrollLockOnMobile;
