import Color from "color";
import styled, { css } from "styled-components";

import type HintType from "../types/HintType";
import type { MarginProps } from "../types/MarginProps";

import { setMargins } from "./setMargins";

interface InputBoxProps {
  width?: string;
  minWidth?: string;
  disabled?: boolean;
  hintType?: HintType;
}

export const InputWrapper = styled.div<MarginProps & InputBoxProps>`
  display: inline-block;
  width: ${(props) => props.width ?? "auto"};
  min-width: ${(props) => props.minWidth ?? "auto"};
  ${(props) => setMargins(props)};

  & + & {
    margin-left: 10px;
  }
`;

export const InputElementWrapper = styled.div`
  position: relative;
`;

const disabledStyle = css`
  padding: 10px 12px;
  background-color: ${(props) =>
    Color(props.theme.color.primary).alpha(0.05).toString()};
  border-width: 1px;
  border-color: ${(props) => props.theme.color.inputBorder} !important;
`;

const negativeStyle = css`
  padding: 9px 11px;
  border-width: 2px;
  border-color: ${(props) => props.theme.color.urgent} !important;
`;

export const inputBox = css<InputBoxProps>`
  width: ${(props) => props.width ?? "auto"};
  min-width: ${(props) => props.minWidth ?? "auto"};
  padding: 10px 12px;
  height: 46px;
  border: 1px solid ${(props) => props.theme.color.inputBorder};

  ${(props) => (props.hintType === "negative" ? negativeStyle : "")};

  ${(props) => (props.disabled ? disabledStyle : "")};

  &:hover {
    border-color: ${(props) => props.theme.color.primary};
  }

  &:focus {
    border-color: ${(props) => props.theme.color.affordable};
    outline: 0;
  }

  &::placeholder {
    color: ${(props) => props.theme.color.option};
    opacity: 1;
  }

  &:disabled {
    ${disabledStyle};
  }
`;
