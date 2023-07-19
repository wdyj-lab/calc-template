import Color from "color";
import React, {
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
  KeyboardEvent,
  useCallback,
  Children,
} from "react";
import styled, { css } from "styled-components";

import foundations, { Breakpoints } from "../../foundations";
import { Typography as TG } from "../../foundations/typography";
import KeyCodes from "../../mixins/KeyCodes";
import generateMediaQuery from "../../utils/generateMediaQuery";

export interface ButtonV2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Sizes;
  sizes?: Sizes[];
  minWidth?: string;
  betweenMargin?: string;
  disabled?: boolean;
  borderRadius?: string;
  typography?: keyof typeof TG;
  status?: Status;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

type Status =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "text";

type Sizes = keyof Breakpoints;

const generateSizedStyle = (
  size: Sizes | undefined,
  children: React.ReactNode,
) => {
  const childrenLength = Children.toArray(children).length;

  switch (size) {
    // NOTE: 추후 여러 breakpoint change에 대응하기 위해 스위치에 중복 로직이 사용됨.
    case "xs":
      return css`
        height: 24px;
        padding: ${childrenLength > 1 ? "0 9px 0 7px" : "0 7px"};
      `;
    case "sm":
      return css`
        height: 28px;
        padding: ${childrenLength > 1 ? "0 11px 0 9px" : "0 11px"};
      `;
    case "lg":
      return css`
        ${foundations.typography.Body1_300};
        height: 48px;
        padding: ${childrenLength > 1 ? "0 11px 0 9px" : "0 11px"};
      `;
    case "md":
    default:
      return css`
        height: 34px;
        padding: ${childrenLength > 1 ? "0 11px 0 9px" : "0 11px"};
      `;
  }
};

const setResponsiveButtonSettings = (
  size: Sizes,
  children: React.ReactNode,
) => css`
  @media ${generateMediaQuery(">=", size)} {
    ${generateSizedStyle(size, children)}
  }
`;

const generateStatusStyle = (buttonProps: ButtonV2Props) => {
  switch (buttonProps.status) {
    case "primary":
      return css`
        background: ${(props) => props.theme.palette.core.BasePrimary};
        border: 1px solid transparent;
        color: ${(props) => props.theme.palette.text.PrimaryNegativeText};

        &:hover:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BasePrimary)
              .mix(Color(props.theme.palette.core.BackgroundPrimary), 0.2)
              .toString()};
        }

        &:focus-visible:enabled {
          border-radius: 4px;
          box-shadow: 0 0 0 1px #fff,
            0 0 0 3px ${(props) => props.theme.palette.core.BasePrimary};
        }

        &:active:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BasePrimary)
              .mix(Color("#303540"), 0.1)
              .toString()};
        }
      `;
    case "secondary":
      return css`
        background: ${(props) => props.theme.palette.core.BaseSecondary};
        border: 1px solid transparent;
        color: ${(props) => props.theme.palette.text.PrimaryNegativeText};

        &:hover:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BaseSecondary)
              .mix(Color(props.theme.palette.core.BackgroundPrimary), 0.2)
              .toString()};
        }

        &:focus-visible:enabled {
          border-radius: 4px;
          box-shadow: 0 0 0 1px #fff,
            0 0 0 3px ${(props) => props.theme.palette.core.BasePrimary};
        }

        &:active:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BaseSecondary)
              .mix(Color("#303540"), 0.1)
              .toString()};
        }
      `;
    case "tertiary":
      return css`
        background: ${(props) => props.theme.palette.core.BaseTertiary};
        border: 1px solid transparent;
        color: ${(props) => props.theme.palette.text.TertiaryText};

        &:hover:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BaseTertiary)
              .mix(Color(props.theme.palette.core.BackgroundPrimary), 0.2)
              .toString()};
        }

        &:focus-visible:enabled {
          border-radius: 4px;
          box-shadow: 0 0 0 1px #fff,
            0 0 0 3px ${(props) => props.theme.palette.core.BasePrimary};
        }

        &:active:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BaseTertiary)
              .mix(Color("#303540"), 0.1)
              .toString()};
        }
      `;
    case "error":
      return css`
        background: ${(props) => props.theme.palette.core.BackgroundPrimary};
        border: 1px solid ${(props) => props.theme.palette.core.BaseCritical};
        color: ${(props) => props.theme.palette.text.CriticalText};

        &:hover:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BackgroundPrimary)
              .mix(Color("#303540"), 0.05)
              .toString()};
        }

        &:focus-visible:enabled {
          border-radius: 4px;
          box-shadow: 0 0 0 1px #fff,
            0 0 0 3px ${(props) => props.theme.palette.core.BasePrimary};
        }

        &:active:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BackgroundPrimary)
              .mix(Color("#303540"), 0.1)
              .toString()};
        }
      `;
    case "text":
      return css`
        background: transparent;
        border: 1px solid transparent;
        color: ${(props) => props.theme.palette.text.AccentText};

        &:focus-visible:enabled {
          border-radius: 4px;
          box-shadow: 0 0 0 1px #fff,
            0 0 0 3px ${(props) => props.theme.palette.core.BasePrimary};
        }

        &:active:enabled {
          color: ${(props) => props.theme.palette.text.ConditionDarkblueText};
        }
      `;
    default:
      return css`
        background: ${(props) => props.theme.palette.core.BackgroundPrimary};
        border: 1px solid ${(props) => props.theme.palette.core.Borders200};
        color: ${(props) => props.theme.palette.text.PrimaryText};

        &:hover:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BackgroundPrimary)
              .mix(Color("#303540"), 0.05)
              .toString()};
        }

        &:focus-visible:enabled {
          border-radius: 4px;
          box-shadow: 0 0 0 1px #fff,
            0 0 0 3px ${(props) => props.theme.palette.core.BasePrimary};
        }

        &:active:enabled {
          background: ${(props) =>
            Color(props.theme.palette.core.BackgroundPrimary)
              .mix(Color("#303540"), 0.1)
              .toString()};
        }
      `;
  }
};

const Element = styled.button<ButtonV2Props>`
  ${(props) => foundations.typography[props.typography || "Body3_300"]};
  vertical-align: top;
  height: 34px; // NOTE: 기본 md 스타일 적용
  padding: ${(props) =>
    Children.toArray(props.children).length > 1 ? "0 12px 0 10px" : "0 12px"};
  min-width: ${(props) => props.minWidth};
  border-radius: ${(props) => props.borderRadius};
  outline: 0;
  white-space: nowrap;
  line-height: 18px;
  opacity: 1;

  ${generateStatusStyle};

  &:disabled {
    opacity: 0.3;
  }

  & + button {
    margin-left: ${(props) => props.betweenMargin};
  }

  ${(props) => generateSizedStyle(props.size, props.children)};

  ${(props) => {
    if (props.sizes) {
      return props.sizes.map((size) => {
        return setResponsiveButtonSettings(size, props.children);
      });
    }
  }}
`;

const ButtonV2: FC<ButtonV2Props> = ({
  // FIXME: theme 에서 스타일 적용 예정
  status = "default",
  typography,
  size,
  sizes,
  minWidth,
  betweenMargin = "8px",
  type = "button",
  disabled = false,
  borderRadius = "3px",
  onClick,
  onKeyPress,
  children,
  ...restProps
}) => {
  const handleClick = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    },
    [onClick, disabled],
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (!disabled && onKeyPress) {
        onKeyPress(e);
      }
      if (
        (e.key === KeyCodes.Enter || e.key === KeyCodes.Space) &&
        !disabled &&
        onClick
      ) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick, onKeyPress, disabled],
  );

  return (
    <Element
      status={status}
      typography={typography}
      size={size}
      sizes={sizes}
      minWidth={minWidth}
      betweenMargin={betweenMargin}
      type={type}
      disabled={disabled}
      borderRadius={borderRadius}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      {...restProps}
    >
      {children}
    </Element>
  );
};

export default ButtonV2;
