import { css } from "styled-components";

import type {
  HorizontalPaddingProps,
  VerticalPaddingProps,
  PaddingProps,
} from "../types/PaddingProps";

export const setHorizontalPaddings = (props: HorizontalPaddingProps) => css`
  ${props.paddingLeft && `padding-left: ${props.paddingLeft} !important`};
  ${props.paddingRight && `padding-right: ${props.paddingRight} !important`};
`;

export const setVerticalPaddings = (props: VerticalPaddingProps) => css`
  ${props.paddingTop && `padding-top: ${props.paddingTop} !important`};
  ${props.paddingBottom && `padding-bottom: ${props.paddingBottom} !important`};
`;

export const setPaddings = (props: PaddingProps) => css`
  ${props.padding && `padding: ${props.padding}`};
  ${setHorizontalPaddings(props)};
  ${setVerticalPaddings(props)};
`;
