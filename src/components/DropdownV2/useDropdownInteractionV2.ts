import {
  useCallback,
  useState,
  useEffect,
  MutableRefObject,
  KeyboardEvent,
} from "react";

import KeyCodes from "../../mixins/KeyCodes";
import type Option from "../../types/Option";

import type { DropdownType } from "./DropdownV2";

interface DropdownInteractionProps {
  options: Option[];
  node: MutableRefObject<HTMLDivElement | null>;
  disabled?: boolean;
  dropdownType: DropdownType;
  onChange: (v: any) => void;
}

const useDropdownInteraction = ({
  dropdownType,
  options,
  disabled,
  node,
  onChange,
}: DropdownInteractionProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleToggleDropdown = useCallback(() => {
    if (!disabled) {
      setIsOpened(!isOpened);
    }
  }, [disabled, isOpened, setIsOpened]);

  const handleClickOutsideDropdown = useCallback(
    (e: any) => {
      if (node.current && node.current.contains(e.target)) {
        return;
      }
      setIsOpened(false);
    },
    [node],
  );

  const handleOptionsFocus = useCallback(
    (key: string) => {
      let optionElement: HTMLDivElement | null = null;
      let index = 0;

      if (key === KeyCodes.ArrowUp) {
        if (focusIndex > -1) {
          index = focusIndex - 1;
        }
      } else if (key === KeyCodes.ArrowDown || key === KeyCodes.Tab) {
        if (focusIndex < options.length + 1) {
          index = focusIndex + 1;
        }
      }

      optionElement = document.querySelector(`#dropdown-option-${index}`)!;
      if (optionElement) {
        const isTextInput = optionElement.getAttribute("type");
        if (key !== KeyCodes.Tab) {
          optionElement.focus();
          if (isTextInput) optionElement.click();
        }

        setFocusIndex(index);
      }
    },
    [focusIndex, options.length],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      if (e.key === KeyCodes.Space) {
        // spacebar
        e.preventDefault();
        handleToggleDropdown();
      } else if (e.key === KeyCodes.ArrowUp || e.key === KeyCodes.ArrowDown) {
        // up, down
        e.preventDefault();
        if (!disabled && options.length !== 0) {
          if (!isOpened) {
            setIsOpened(true);
          } else {
            handleOptionsFocus(e.key);
          }
        }
      } else if (e.key === KeyCodes.Tab) {
        handleOptionsFocus(e.key);
      } else if (e.key === KeyCodes.Esc) {
        // esc
        e.preventDefault();
        if (!disabled && options.length !== 0) {
          setIsOpened(false);
        }
      }
    },
    [
      disabled,
      handleToggleDropdown,
      options.length,
      isOpened,
      handleOptionsFocus,
    ],
  );

  const handleChange = useCallback(
    (v: any) => {
      onChange?.(v);

      if (dropdownType !== "checkbox") {
        setIsOpened(false);
      }
    },
    [onChange, dropdownType],
  );

  useEffect(() => {
    if (node && node.current) {
      window.addEventListener("mousedown", handleClickOutsideDropdown, false);

      return () => {
        window.removeEventListener(
          "mousedown",
          handleClickOutsideDropdown,
          false,
        );
      };
    }
  }, [node, handleClickOutsideDropdown]);

  useEffect(() => {
    if (disabled && isOpened) {
      setIsOpened(false);
    }
    setFocusIndex(-1);
  }, [disabled, isOpened, setIsOpened]);

  return {
    isOpened,
    handleKeyDown,
    handleChange,
    handleToggleDropdown,
  };
};

export default useDropdownInteraction;
