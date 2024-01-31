import Color from "color";
import React, {
  MouseEvent,
  useCallback,
  FC,
  useMemo,
  useRef,
  useEffect,
} from "react";
import styled, { css } from "styled-components";

import foundations from "../../foundations";
import KeyCodes from "../../mixins/KeyCodes";
import type { StringLabelOption } from "../../types/Option";
import generateMediaQuery from "../../utils/generateMediaQuery";
import CheckboxV2 from "../CheckboxV2";

import type { DropdownType } from "./DropdownV2";

interface DropdownOptionProps {
  dropdownType: DropdownType;
  option: StringLabelOption;
  selected: boolean;
  filterText?: string;
  isLastOption?: boolean;
  onSelect: (selectedOption: StringLabelOption) => void;
  getOptionElementHeight?: (height?: number) => void;
  idx: number;
}

const DropdownOption: FC<DropdownOptionProps> = ({
  dropdownType,
  option,
  selected,
  filterText,
  isLastOption,
  onSelect,
  getOptionElementHeight,
  idx,
}) => {
  const handleClick = useCallback(
    (e?: MouseEvent<HTMLDivElement>) => {
      e?.stopPropagation();

      if (!option.disabled) {
        onSelect(option);
      }
    },
    [onSelect, option],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === KeyCodes.Enter || e.key === KeyCodes.Space) {
        // spacebar or enter
        e.preventDefault();
        e.stopPropagation();
        if (!option.disabled) {
          onSelect(option);
        }
      }
    },
    [onSelect, option],
  );

  const label = useMemo(() => {
    if (filterText && !selected) {
      const match = option.label.match(new RegExp(filterText));

      if (!match) {
        return option.label;
      }

      const startIndex = match.index!;
      const endIndex = startIndex + match[0]!.length;

      return (
        <>
          {option.label.slice(0, startIndex)}
          <HighlightSpan>
            {option.label.slice(startIndex, endIndex)}
          </HighlightSpan>
          {option.label.slice(endIndex)}
        </>
      );
    }

    return option.label;
  }, [filterText, option.label, selected]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getOptionElementHeight?.(ref?.current?.clientHeight);
  }, [getOptionElementHeight, ref]);

  return (
    <StyledDiv
      ref={ref}
      tabIndex={0}
      selected={selected}
      disabled={!!option.disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      dropdownType={dropdownType}
      className="dropdown-option"
      isLastOption={!!isLastOption}
      role="listitem"
      data-testid={`dropdown-option-${option.key}`}
      id={`dropdown-option-${idx}`}
    >
      {dropdownType === "checkbox" && (
        <StyledCheckbox
          checked={selected}
          onChange={() => handleClick()}
          tab={false}
        />
      )}
      {label}
    </StyledDiv>
  );
};

export default DropdownOption;

const StyledDiv = styled.div<{
  selected: boolean;
  disabled: boolean;
  dropdownType: DropdownType;
  isLastOption: boolean;
}>`
  display: flex;
  align-items: center;
  min-height: 34px;
  border-radius: 3px;
  padding: 7px 12px;
  ${foundations.typography.Body2_200};
  opacity: 0.8;
  outline: none;

  &:hover,
  &:focus-visible {
    background-color: ${(props) =>
    Color(props.theme.palette.core.BasePrimary).alpha(0.05).toString()};
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      ${foundations.typography.Body2_400};
      background-color: ${Color(theme.palette.core.BasePrimary)
        .alpha(0.1)
        .toString()};
      opacity: 1;
      &:hover {
        background-color: ${(props) =>
        Color(props.theme.palette.core.BasePrimary).alpha(0.1).toString()};
      }
    `}

  ${({ isLastOption }) =>
    isLastOption &&
    css`
      margin-bottom: 8px;
    `}

  @media ${generateMediaQuery("<", "md")} {
    padding: 14px 0;
    ${foundations.typography.Body1};

    &::before {
      content: ${(props) =>
    props.dropdownType === "checkbox" ? "normal" : '""'};
      display: inline-block;
      flex-shrink: 0;
      margin-left: 1.5px;
      margin-right: 13.5px;
      width: 17px;
      height: 17px;
      border: 3.5px solid
        ${(props) => props.theme.palette.core.BackgroundPrimary};
      background-color: ${(props) =>
    props.theme.palette.core.BackgroundPrimary};
      box-shadow: 0 0 1.5px 1.5px
        ${(props) => props.theme.palette.core.Borders200};
      border-radius: 17px;
    }

    ${({ selected }) =>
    selected &&
    css`
        background-color: transparent;
        ${foundations.typography.Body1};

        &::before {
          background-color: ${(props) => props.theme.palette.core.BasePrimary};
          box-shadow: 0 0 1.5px 1.5px
            ${(props) => props.theme.palette.core.BasePrimary};
        }

        &:hover {
          background-color: transparent;
        }
      `}
  }
`;

const HighlightSpan = styled.span`
  color: ${({ theme }) => theme.palette.core.BasePrimary};
`;

const StyledCheckbox = styled(CheckboxV2)`
  margin-right: 8px;
  min-width: unset;

  @media ${generateMediaQuery("<", "md")} {
    margin-right: 12px;
  }
`;
