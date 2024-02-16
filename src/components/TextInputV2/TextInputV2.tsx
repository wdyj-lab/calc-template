import React, {
  ChangeEvent,
  useCallback,
  KeyboardEvent,
  MouseEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  forwardRef,
  RefObject,
} from "react";
import styled, { css } from "styled-components";

import foundations from "../../foundations";
import KeyCodes from "../../mixins/KeyCodes";
import type HintType from "../../types/HintType";
import Icon from "../Icon";

export interface TextInputV2Props {
  id?: string;
  size?: TextInputSize;
  width?: string;
  value?: string;
  placeholder?: string;
  unit?: string;
  maxLength?: number;
  className?: string;
  hintType?: HintType;
  hintText?: string;
  disabled?: boolean;
  textAlignment?: "left" | "center" | "right";
  onClear?: () => void;
  onEnter?: () => void;
  onChange?: (value: string) => void;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;
  autoFocus?: boolean;
  role?: string;
  type?: "text" | "username" | "password";
  ref?: RefObject<HTMLInputElement>;
}

type TextInputSize = "lg" | "md" | "sm" | "xs";

const TextInputV2 = ({
  id,
  size = "md",
  width = "200px",
  placeholder,
  className,
  hintType,
  hintText,
  unit,
  maxLength,
  disabled,
  value = "",
  onEnter,
  onClear,
  onChange,
  onClick,
  onKeyDown,
  textAlignment = "left",
  autoCapitalize,
  autoComplete,
  autoCorrect,
  type = "text",
  role,
  onFocus,
  onBlur,
  autoFocus,
}: TextInputV2Props) => {
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
    },
    [onKeyDown]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnter && e.key === KeyCodes.Enter) {
        e.preventDefault();

        const currentValue = e.currentTarget.value;

        if (onChange && typeof currentValue === "string") {
          onChange(currentValue.trim());
        }
        onEnter();
      }
    },
    [onChange, onEnter]
  );

  const showClear = !!onClear && !disabled && !!value;
  const showUnit = !!unit;
  const showControl = showClear || showUnit;

  return (
    <Wrapper width={width} className={className} data-testid="TextInputV2">
      <InputWrapper
        textInputSize={size}
        alert={hintType === "negative"}
        disabled={!!disabled}
        showControl={showControl}
      >
        <StyledInput
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          id={id}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          textInputSize={size}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          value={value}
          role={role}
          onClick={onClick}
          autoFocus={autoFocus}
          size={maxLength}
          textAlignment={textAlignment}
        />
        {showControl && (
          <ControlWrapper className="clear-icon">
            {showClear && (
              <IconWrapper onClick={onClear} data-testid="TextInputV2-clear">
                <StyledIcon name="DELETE_V2" />
              </IconWrapper>
            )}
            {showUnit && (
              <UnitWrapper>
                <span>{unit}</span>
              </UnitWrapper>
            )}
          </ControlWrapper>
        )}
      </InputWrapper>
      {hintType === "negative" && hintText && !disabled && (
        <HintText textInputSize={size}>{hintText}</HintText>
      )}
    </Wrapper>
  );
};

export default TextInputV2;

const Wrapper = styled.div<{ width: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
`;

// Controls & Hint
const ControlWrapper = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  right: 0;
  height: 100%;
  min-height: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  opacity: 0.4;
  background-color: ${({ theme }) => theme.palette.core.BackgroundPrimary};
`;

const UnitWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    opacity: 0.4;
  }
  padding: 0 8px;

  ${IconWrapper} + & {
    padding-left: 0px;
  }
`;

const InputWrapper = styled.div<{
  textInputSize: TextInputSize;
  alert: boolean;
  disabled: boolean;
  showControl: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.palette.core.Borders200};
  background-color: ${({ theme }) => theme.palette.core.BackgroundPrimary};
  padding: 0 5px;
  box-sizing: border-box;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.palette.core.BasePrimary};
  }

  ${({ alert }) =>
    alert &&
    css`
      border: 2px solid ${({ theme }) => theme.palette.core.BaseCritical};
      ${ControlWrapper} {
        right: -1px;
      }
      &:focus-within {
        border: 2px solid ${({ theme }) => theme.palette.core.BaseCritical};
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) =>
        theme.palette.core.BackgroundSecondary};
      border: 1px solid ${({ theme }) => theme.palette.core.Borders100};
      cursor: not-allowed;
    `}

  ${({ textInputSize, alert }) => {
    switch (textInputSize) {
      case "lg":
        return css`
          height: 48px;
          ${foundations.typography.Body1};
          border-radius: 4px;
        `;
      case "sm":
        return css`
          ${foundations.typography.Body2};
          height: 28px;
          border-radius: 3px;
        `;
      case "xs":
        return css`
          ${foundations.typography.Body3};
          height: 24px;
          border-radius: 3px;
        `;
      case "md":
      default:
        return css`
          height: 34px;
          ${foundations.typography.Body2};
          border-radius: 3px;
        `;
    }
  }};

  ${({ showControl }) =>
    showControl &&
    css`
      padding-right: 0px !important;

      &:focus-within ${ControlWrapper} {
        right: -1px;
      }
    `}
`;

const StyledInput = styled.input<{
  textInputSize: TextInputSize;
  textAlignment: "left" | "center" | "right";
}>`
  background-color: transparent;
  border: none;
  height: 100%;
  flex: 1;
  min-width: 0;
  outline: none;
  text-align: ${({ textAlignment }) => textAlignment};
`;

const HintText = styled.div<{
  textInputSize: TextInputSize;
}>`
  position: absolute;
  bottom: -20px;
  margin-top: 4px;
  ${({ textInputSize }) =>
    textInputSize === "lg"
      ? foundations.typography.Body3_300
      : foundations.typography.Caption_300};
  color: ${({ theme }) => theme.palette.text.CriticalText};
`;
