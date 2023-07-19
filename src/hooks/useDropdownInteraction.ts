import {
  useCallback,
  useState,
  useEffect,
  MutableRefObject,
  KeyboardEvent,
} from "react";

import KeyCodes from "../mixins/KeyCodes";
import type Option from "../types/Option";

interface DropdownInteractionProps {
  options: Option[];
  onChange: (v: any) => void;
  disabled?: boolean;
  node: MutableRefObject<HTMLDivElement | null>;
}

const useDropdownInteraction = ({
  options,
  onChange,
  disabled,
  node,
}: DropdownInteractionProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleDropdownToggle = useCallback(() => {
    if (!disabled) {
      setIsOpened(!isOpened);
    }
  }, [disabled, isOpened, setIsOpened]);

  const handleClick = useCallback(
    (e: any) => {
      if (node.current && node.current.contains(e.target)) {
        return;
      }
      setIsOpened(false);
    },
    [node],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      if (e.key === KeyCodes.Space) {
        // spacebar
        e.preventDefault();
        handleDropdownToggle();
      } else if (e.key === KeyCodes.ArrowUp || e.key === KeyCodes.ArrowDown) {
        // up, down
        e.preventDefault();
        if (!disabled && options.length !== 0) {
          setIsOpened(true);
        }
      } else if (e.key === KeyCodes.Esc) {
        // esc
        e.preventDefault();
        if (!disabled && options.length !== 0) {
          setIsOpened(false);
        }
      }
    },
    [handleDropdownToggle, setIsOpened, options, disabled],
  );

  const handleChange = useCallback(
    (v: any) => {
      onChange?.(v);
      setIsOpened(false);
    },
    [onChange],
  );

  useEffect(() => {
    if (node) {
      window.addEventListener("mousedown", handleClick, false);

      return () => {
        window.removeEventListener("mousedown", handleClick, false);
      };
    }
  }, [node, handleClick]);

  useEffect(() => {
    if (disabled && isOpened) {
      setIsOpened(false);
    }
  }, [disabled, isOpened, setIsOpened]);

  return {
    isOpened,
    handleKeyDown,
    handleChange,
    handleDropdownToggle,
  };
};

export default useDropdownInteraction;
