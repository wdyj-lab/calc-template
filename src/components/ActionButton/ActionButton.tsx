import React, {
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
  PropsWithChildren,
} from "react";
import styled, { css } from "styled-components";

import foundations from "../../foundations";
import ButtonV2 from "../ButtonV2";

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  status?: "primary" | "error" | "tertiary";
  ratio?: number;
  betweenMargin?: string;
  disabled?: boolean;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Element = styled(ButtonV2)<ActionButtonProps>`
  ${foundations.typography.Body1_300};
  flex: ${({ ratio = 1 }) => ratio} 0 auto;

  & + & {
    margin: 0;
  }
`;

const ActionButton: FC<ActionButtonProps> = ({
  // FIXME: theme 에서 스타일 적용 예정
  status = "primary",
  type = "button",
  disabled = false,
  onClick,
  onKeyPress,
  children,
  ...restProps
}) => (
  <Element
    status={status}
    size="lg"
    betweenMargin="0"
    type={type}
    disabled={disabled}
    borderRadius="4px"
    onClick={onClick}
    {...restProps}
  >
    {children}
  </Element>
);
export interface ActionButtonGroupProps {
  type?: "horizontal" | "vertical";
  betweenMargin?: string;
}

export const ActionButtonGroup = styled.div<ActionButtonGroupProps>`
  display: flex;
  gap: ${(props) => props.betweenMargin || "8px"};

  ${({ type = "horizontal" }) =>
    type !== "horizontal" &&
    css`
      flex-direction: column;
    `}
`;

export default ActionButton;
