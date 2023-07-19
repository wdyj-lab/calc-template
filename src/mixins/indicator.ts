import Color from "color";
import styled, { css, DefaultTheme } from "styled-components";

import { InputProps } from "../types/InputProps";
import type { MarginProps } from "../types/MarginProps";

interface IndicatorElementWrapperProps {
  inForm?: boolean;
  inline?: boolean;
  margin?: string;
}

export const IndicatorElementWrapper = styled.div<IndicatorElementWrapperProps>`
  position: relative;

  ${(props) =>
    props.inForm
      ? css`
          padding-top: 16px;
          padding-bottom: 6px;
          font-size: 14px;
        `
      : ""};

  ${(props) =>
    props.inline
      ? css`
          display: inline-block;

          & + & {
            margin-left: 20px;
          }
        `
      : css`
          display: flex;

          > ${OptionLabel} {
            flex: 1;
          }
        `}

  margin: ${(props) => props.margin};
`;

export const HiddenIndicatorElement = styled.input`
  display: none;
`;

export const OptionLabel = styled.label<{ inForm?: boolean }>`
  padding-left: 15px;
  line-height: 24px;

  input:disabled + label + & {
    opacity: 0.3;
  }
`;

export const checkedIndicatorStyle = css`
  position: relative;
  background-color: ${(props) => props.theme.color.affordable};
`;

export const disabledIndeterminateIndicatorStyle = css`
  opacity: 0.2;
  background-color: ${(props) => props.theme.color.primary} !important;
`;

export const disabledCheckedIndicatorStyle = css`
  background-color: ${(props) =>
    Color(props.theme.color.primary).alpha(0.2).toString()} !important;
`;

export const uncheckedIndicatorStyle = css`
  border: 2px solid ${(props) => props.theme.color.indicatorBorder};
  border-radius: 2px;

  div:hover > & {
    background-color: ${(props) =>
      Color(props.theme.color.primary).alpha(0.07).toString()};
  }

  div:active > & {
    background-color: ${(props) =>
      Color(props.theme.color.primary).alpha(0.12).toString()};
  }
`;

export const disabledUncheckedIndicatorStyle = css`
  border-color: ${(props) =>
    Color(props.theme.color.primary).alpha(0.3).toString()};
  background-color: ${(props) => props.theme.color.background} !important;
`;

export interface IndicatorProps extends InputProps, MarginProps {
  optionLabel?: string;
  checked?: boolean;
}
