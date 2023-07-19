import Color from "color";
import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

import type HintType from "../types/HintType";

import { inputBox } from "./input";
import { textEllipsis } from "./textEllipsis";

export type DropdownOptionHorizontal = "left" | "center" | "right";
export type DropdownOptionVertical = "top" | "bottom";

const closedDropdownListStyle = css`
  max-height: 0;
  transition: max-height 0.5s;
`;

const openedDropdownListStyle = css<{ height?: string }>`
  max-height: ${(props) => props.height || "210px"};
  border: 1px solid ${(props) => props.theme.color.dropdownBorder};
  transition: max-height 0;
`;

const getLocation = (
  horizontal?: DropdownOptionHorizontal,
  vertical?: DropdownOptionVertical,
): string => {
  const options = {
    left: "",
    right: "",
    top: "",
    bottom: "",
    transform: [] as string[],
  };

  switch (horizontal) {
    case "center":
      options.left = "50%";
      options.transform.push("translateX(-50%)");
      break;
    case "right":
      options.right = "0";
      break;
    default:
      options.left = "0";
  }

  switch (vertical) {
    case "top":
      options.bottom = "51px";
      break;
    default:
      options.transform.push("translateY(5px)");
  }

  return Object.entries(options)
    .map(([key, value]) =>
      key !== "transform"
        ? `${key}: ${value};`
        : `transform: ${(value as string[]).join(" ")};`,
    )
    .join("\n");
};

interface DropdownListProps {
  width?: string;
  minWidth?: string;
  height?: string;
  open: boolean;
  horizontalLocation?: DropdownOptionHorizontal;
  verticalLocation?: DropdownOptionVertical;
}

export const DropdownListWrapper = styled.div<DropdownListProps>`
  position: absolute;
  z-index: 50;
  ${(props) => getLocation(props.horizontalLocation, props.verticalLocation)};
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || "100%"};
  min-width: ${(props) => props.minWidth || "auto"};
  height: ${(props) => props.height || "auto"};
  overflow: hidden;
  background: ${(props) => props.theme.color.background};

  ${(props) => (props.open ? openedDropdownListStyle : closedDropdownListStyle)}
`;

interface DropdownOptionWrapperProps extends HTMLAttributes<HTMLElement> {
  selected?: boolean;
  disabled?: boolean;
  isResetOption?: boolean;
}

const elementWithBackground = css`
  background-color: ${(props) => props.theme.color.hover};
`;

export const DropdownOptionWrapper = styled.li<DropdownOptionWrapperProps>`
  margin: 0;
  padding: 6px 20px;

  ${(props) =>
    props.selected
      ? css`
          font-weight: 700;
          ${elementWithBackground}
        `
      : ""};

  ${(props) => (props.disabled ? `color: ${props.theme.color.disable}` : "")};
  ${(props) =>
    props.isResetOption ? `color: ${props.theme.color.secondary}` : ""};

  &:hover {
    ${elementWithBackground};
  }

  &:focus {
    outline: 0;
    ${elementWithBackground};
  }

  strong {
    font-weight: inherit;
    color: ${(props) =>
      props.disabled
        ? Color(props.theme.color.affordable).alpha(0.4).toString()
        : props.theme.color.affordable};
  }
`;

interface DropdownSelectedItemWrapperProps {
  disabled?: boolean;
  width?: string;
  minWidth?: string;
  opened?: boolean;
  selected?: boolean;
  hintType?: HintType;
}

export const DropdownSelectedItemWrapper = styled.div<
  DropdownSelectedItemWrapperProps
>`
  ${inputBox};
  display: flex;

  ${(props) =>
    props.opened
      ? css`
          border-color: ${props.theme.color.affordable} !important;
        `
      : ""};

  ${(props) =>
    !props.selected
      ? css`
          color: ${props.theme.color.option};
        `
      : ""};

  > span {
    flex: 1;
    user-select: none;
    ${textEllipsis};
  }
`;
