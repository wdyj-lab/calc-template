import { useEffect } from "react";

const useScrollLock = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    const scrollPosition = globalThis.scrollY;
    body!.classList.add("scroll-locked");
    body!.style.top = `-${scrollPosition}px`;

    return () => {
      body!.classList.remove("scroll-locked");
      body!.style.removeProperty("top");
      globalThis.scrollTo(0, scrollPosition);
    };
  }, []);
};

export default useScrollLock;
