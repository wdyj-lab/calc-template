import React, { FC } from "react";
import styled from "styled-components";

type DividerType = 400 | 300 | 200 | 100 | 50;

export const TypeValue: Record<DividerType, number> = {
  400: 0.6,
  300: 0.4,
  200: 0.3,
  100: 0.2,
  50: 0.1,
} as const;

export interface DividerProps {
  width?: string;
  height?: string;
  type?: DividerType;
  className?: string;
}

const Divider: FC<DividerProps> = (props) => {
  return <Element {...props} />;
};

export default Divider;

const Element = styled.hr<DividerProps>`
  margin: 0;
  border: none;
  background-color: ${({ theme }) => theme.palette.core.Divider};
  opacity: ${({ type }) => TypeValue[type || 400]};
  height: ${({ height }) => height || "1px"};
  width: ${({ width }) => width || "1px"};
`;
