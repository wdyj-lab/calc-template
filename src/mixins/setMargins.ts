import { css } from "styled-components";

import type {
  HorizontalMarginProps,
  VerticalMarginProps,
  MarginProps,
} from "../types/MarginProps";

export const setHorizontalMargins = (props: HorizontalMarginProps) => css`
  ${props.marginLeft && `margin-left: ${props.marginLeft} !important`};
  ${props.marginRight && `margin-right: ${props.marginRight} !important`};
`;

export const setVerticalMargins = (props: VerticalMarginProps) => css`
  ${props.marginTop && `margin-top: ${props.marginTop} !important`};
  ${props.marginBottom && `margin-bottom: ${props.marginBottom} !important`};
`;

export const setMargins = (props: MarginProps) => css`
  ${props.margin && `margin: ${props.margin}`};
  ${setHorizontalMargins(props)};
  ${setVerticalMargins(props)};
`;
