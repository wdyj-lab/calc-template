import Color from "color";
import { nanoid } from "nanoid";
import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
} from "react";
import styled, { css } from "styled-components";

import foundations from "../../foundations";
import KeyCodes from "../../mixins/KeyCodes";
import { Size } from "../../types/Dimension";
import HintText from "../HintText";

export interface CheckboxPropsV2 {
  className?: string;
  indeterminate?: boolean;
  id?: string;
  name?: string;
  value?: any;
  checked?: boolean;
  label?: ReactNode;
  disabled?: boolean;
  hintText?: string;
  size?: Size;
  tab?: boolean;
  onChange?: (c: boolean, v?: any, e?: ChangeEvent<HTMLInputElement>) => void;
  "data-testid"?: string;
}

const CheckboxV2: FC<CheckboxPropsV2> = ({
  id = nanoid(),
  name = nanoid(),
  value,
  className,
  label,
  checked,
  indeterminate = false,
  disabled,
  hintText,
  size = Size.md,
  tab = true,
  onChange,
  "data-testid": testId,
}) => {
  const handleCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(!checked, value, e);
      }
    },
    [checked, onChange, value]
  );

  const handleWrapperClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  const handleWrapperKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === KeyCodes.Space || e.key === KeyCodes.Enter) {
        if (onChange) {
          onChange(!checked, value);
        }
      }
    },
    [checked, onChange, value]
  );

  const controlProps = onChange
    ? { checked: indeterminate ? false : checked, onChange: handleCheck }
    : { checked: indeterminate ? false : checked };

  return (
    <CheckboxWrapper
      tabIndex={tab ? 0 : undefined}
      className={className}
      onClick={handleWrapperClick}
      onKeyDown={handleWrapperKeyDown}
    >
      <StyledWrapper>
        <StyledInput
          id={id}
          name={name}
          type="checkbox"
          disabled={disabled}
          data-testid={testId}
          {...controlProps}
        />
        <StyledLabelCheckbox htmlFor={id} checkBoxSize={size} />
        {label && (
          <StyledLabelText htmlFor={id} labelTextSize={size}>
            {label}
          </StyledLabelText>
        )}
      </StyledWrapper>
      {hintText && <HintText>{hintText}</HintText>}
    </CheckboxWrapper>
  );
};

export default CheckboxV2;

const CheckboxWrapper = styled.div`
  display: inline-block;
  min-width: 50px;
  & + & {
    margin-right: 16px;
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabelCheckbox = styled.label<{
  checkBoxSize: Size;
}>`
  display: inline-block;
  vertical-align: top;
  margin-top: 0;
  min-width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.palette.core.BackgroundPrimary};
  transform: ${({ checkBoxSize }) =>
    checkBoxSize === Size.lg && css`scale(1.25);`};

  input:checked + & {
    position: relative;
    background-color: ${({ theme }) => theme.palette.core.BasePrimary};
    border-radius: 2px;

    &::before {
      content: "";
      position: absolute;
      display: block;
      width: 2px;
      height: 6px;
      background: ${({ theme }) => theme.palette.core.IconWhite};
      transform: translate(4px, 6px) rotate(-45deg);
    }

    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 2px;
      height: 11px;
      background: ${({ theme }) => theme.palette.core.IconWhite};
      transform: translate(9px, 2px) rotate(-315deg);
    }
  }

  input:not(:checked) + & {
    border: 1px solid ${({ theme }) => theme.palette.core.Borders200};
    border-radius: 2px;

    div:hover > & {
      background-color: ${({ theme }) =>
        Color(theme.palette.core.BaseSecondary).alpha(0.05).toString()};
    }

    div:active > & {
      background-color: ${({ theme }) =>
        Color(theme.palette.core.BaseSecondary).alpha(0.1).toString()};
    }
  }

  input:disabled + & {
    opacity: 0.3;
  }

  input:not(:checked):disabled + & {
    background-color: ${({ theme }) =>
      theme.palette.core.BackgroundPrimary} !important;
  }
`;

const StyledLabelText = styled.label<{ labelTextSize: Size }>`
  padding-left: ${({ labelTextSize }) =>
    labelTextSize === Size.lg ? 12 : 8}px;
  ${({ labelTextSize }) =>
    labelTextSize === Size.lg
      ? foundations.typography.Body1
      : foundations.typography.Body2};
  line-height: 20px;
`;
