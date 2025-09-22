import Color from "color";
import { isEqual } from "lodash-es";
import React, { FC, useRef } from "react";
import styled, { css } from "styled-components";

import foundations from "../../foundations";
import HintType from "../../types/HintType";
import type { StringLabelOption } from "../../types/Option";
import generateMediaQuery from "../../utils/generateMediaQuery";
import HintText from "../HintText";

import DropdownOptionContainer from "./DropdownOptionContainer";
import DropdownSelectedSection from "./DropdownSelectedSection";
import useDropdownInteraction from "./useDropdownInteractionV2";

export type DropdownType = "default" | "checkbox";

type DropdownSize = "lg" | "md" | "sm" | "xs";

export type OpenDirection = "down" | "up";

export type LabelDisplayType = "default" | "all";

export interface DropdownV2Props {
  type?: DropdownType;
  options: StringLabelOption[];
  dropdownSize?: DropdownSize;
  width?: string;
  borderRadius?: string;
  optionContainerWidth?: string;
  value?: any;
  placeholder?: string;
  className?: string;
  hintType?: HintType;
  hintText?: string;
  disabled?: boolean;
  useFilter?: boolean;
  onChange?: (value: any) => void;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onFilterChange?: (value: string) => void;
  withAllCheckOption?: boolean;
  optionContainerOpenDirection?: OpenDirection;
  labelDisplayType?: LabelDisplayType;
  scrollMaxHeight?: string;
  disableMobilePopup?: boolean;
}

const DropdownV2: FC<DropdownV2Props> = ({
  type = "default",
  dropdownSize = "md",
  width = "90px",
  optionContainerWidth = "200px",
  borderRadius,
  value,
  options,
  placeholder,
  className,
  hintType,
  hintText,
  disabled,
  useFilter,
  onChange = () => {},
  onFocus,
  onBlur,
  onFilterChange,
  withAllCheckOption,
  optionContainerOpenDirection = "down",
  labelDisplayType = "default",
  scrollMaxHeight,
  disableMobilePopup = false,
}) => {
  const ref = useRef(null);

  if (type === "checkbox" && !Array.isArray(value) && value !== undefined) {
    throw new Error(
      "체크박스 드랍다운의 value는 Array 또는 undefined만 가능합니다"
    );
  }

  const { isOpened, handleKeyDown, handleChange, handleToggleDropdown } =
    useDropdownInteraction({
      options,
      disabled,
      node: ref,
      onChange,
      dropdownType: type,
    });

  // 체크박스일 경우 선택된 값들중 첫번째 (레이블 표출 용도)
  const selectedOption =
    value !== undefined
      ? options.find((option) =>
          isEqual(option.value, type === "checkbox" ? value[0] : value)
        )
      : undefined;

  return (
    <DropdownWrapper
      width={width}
      className={className}
      role="combobox"
      aria-expanded={isOpened}
    >
      <DropdownContainer
        ref={ref}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        isOpened={isOpened}
        alert={hintType === "negative"}
        dropdownSize={dropdownSize}
        onFocus={onFocus}
        onBlur={onBlur}
        borderRadius={borderRadius}
      >
        <DropdownSelectedSection
          dropdownType={type}
          value={value}
          disabled={disabled}
          opened={isOpened}
          placeholder={placeholder}
          selectedOption={selectedOption}
          options={options}
          withAllCheckOption={withAllCheckOption}
          labelDisplayType={labelDisplayType}
          onClick={handleToggleDropdown}
        />
        {isOpened && (
          <>
            <DropdownOptionBackground onClick={handleToggleDropdown} disableMobilePopup={disableMobilePopup} />
            <DropdownOptionContainer
              dropdownType={type}
              optionContainerWidth={optionContainerWidth}
              useFilter={useFilter}
              onFilterChange={onFilterChange}
              placeholder={placeholder}
              value={value}
              options={options}
              withAllCheckOption={withAllCheckOption}
              onChange={handleChange}
              scrollMaxHeight={scrollMaxHeight}
              optionContainerOpenDirection={optionContainerOpenDirection}
              disableMobilePopup={disableMobilePopup}
            />
          </>
        )}
      </DropdownContainer>
      {hintType === "negative" && hintText && !disabled && !isOpened && (
        <HintText inputSize={dropdownSize}>{hintText}</HintText>
      )}
    </DropdownWrapper>
  );
};

export default DropdownV2;

const DropdownWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => width};
`;

const DropdownContainer = styled.div<{
  dropdownSize: DropdownSize;
  disabled?: boolean;
  alert: boolean;
  isOpened?: boolean;
  borderRadius?: string;
}>`
  ${({ dropdownSize, isOpened, alert, borderRadius }) =>
    sizeToMatchingCss(dropdownSize, isOpened, alert, borderRadius)};
  width: 100%;
  background-color: ${({ disabled, theme }) =>
    !disabled
      ? theme.palette.core.BackgroundPrimary
      : theme.palette.core.BackgroundSecondary};
  border: 1px solid ${({ theme }) => theme.palette.core.Borders200};
  display: inline-flex;
  align-items: center;
  outline: none;

  :focus-visible::before {
    transform: translate(-16px, 0px);
  }

  ${({ isOpened }) =>
    !isOpened
      ? css`
          &:focus-visible::before {
            position: absolute;
            border: 2px solid ${({ theme }) => theme.palette.core.BasePrimary};
            border-radius: 4px;
            content: "";
            width: calc(100% + 6px);
            border-radius: 4px;
            height: calc(100% + 6px);
          }
        `
      : css`
          border: 2px solid ${({ theme }) => theme.palette.core.BasePrimary};
          margin: -1px 0px;
        `};

  ${({ alert }) =>
    alert &&
    css`
      border: 2px solid ${({ theme }) => theme.palette.core.BaseCritical};
    `}
`;

const sizeToMatchingCss = (
  size: DropdownSize,
  isOpened?: boolean,
  alert?: boolean,
  borderRadius?: string
) => {
  switch (size) {
    case "lg":
      return css`
        height: 48px;
        ${foundations.typography.Body1};
        ${borderRadius
          ? `border-radius: ${borderRadius}`
          : "border-radius: 4px"};
      `;
    case "md":
      return css`
        height: 34px;
        ${foundations.typography.Body2};
        border-radius: 3px;
      `;
    case "sm":
      return css`
        height: 28px;
        ${foundations.typography.Body3};
        border-radius: 3px;
      `;
    case "xs":
      return css`
        height: 24px;
        ${foundations.typography.Body3};
        border-radius: 3px;
      `;
    default:
      return "";
  }
};

const DropdownOptionBackground = styled.div<{ disableMobilePopup: boolean }>`
  display: none;

  @media ${generateMediaQuery("<", "md")} {
    display: ${({ disableMobilePopup }) => disableMobilePopup ? "none" : "block"};
    position: fixed;
    z-index: ${(props) => props.theme.elevation.PopUp};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${({ theme }) =>
      Color(theme.palette.core.Dimmed).alpha(0.5).toString()};
  }
`;
