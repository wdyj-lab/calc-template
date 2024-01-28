import Color from "color";
import { isEqual } from "lodash-es";
import React, { FC, useState, useMemo, useCallback, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled, { css } from "styled-components";

import foundations from "../../foundations";
import useScrollLockOnMobile from "../../hooks/useScrollLockOnMobile";
import type { StringLabelOption } from "../../types/Option";
import generateMediaQuery from "../../utils/generateMediaQuery";
import Divider from "../Divider";
import Icon from "../Icon";
import TextInputV2 from "../TextInputV2";

import DropdownOption from "./DropdownOption";
import type { DropdownType, OpenDirection } from "./DropdownV2";

interface DropdownOptionContainerProps {
  dropdownType: DropdownType;
  optionContainerWidth: string;
  placeholder?: string;
  value?: any;
  options: StringLabelOption[];
  useFilter?: boolean;
  onChange: (v: any) => void;
  onFilterChange?: (value: string) => void;
  withAllCheckOption?: boolean;
  optionContainerOpenDirection: OpenDirection;
  scrollMaxHeight?: string;
}

const DropdownOptionContainer: FC<DropdownOptionContainerProps> = ({
  dropdownType,
  optionContainerWidth,
  placeholder,
  value,
  options,
  useFilter,
  onChange,
  onFilterChange,
  withAllCheckOption,
  optionContainerOpenDirection,
  scrollMaxHeight,
}) => {
  useScrollLockOnMobile();

  const isSelectedAll =
    withAllCheckOption && value && value.length === options.length;

  const handleOptionSelect = useCallback(
    (option: any) => {
      if (!option.disabled) {
        if (dropdownType === "checkbox") {
          if (!value) {
            onChange([option.value]);
            return;
          }

          if (value.includes(option.value)) {
            onChange(value.filter((val: any) => val !== option.value));
          } else {
            onChange([...value, option.value]);
          }
        } else {
          onChange(option.value);
        }
      }
    },
    [dropdownType, onChange, value]
  );

  const [filterText, setFilterText] = useState<string>("");

  const handleFilterChange = useCallback(
    (v: string) => {
      setFilterText(v);
      onFilterChange?.(v);
    },
    [onFilterChange]
  );

  const handleFilterClear = useCallback(() => {
    setFilterText("");
    onFilterChange?.("");
  }, [onFilterChange]);

  const filteredOptions = useMemo(
    () =>
      // onFilterChange가 있을 떄에는 필터를 외부에서 제어하므로 여기서는 필터링하지 않는다.
      useFilter && !onFilterChange && filterText
        ? options.filter((option) =>
            typeof option.label === "string"
              ? option.label.toLowerCase().includes(filterText.toLowerCase())
              : true
          )
        : options,
    [useFilter, onFilterChange, filterText, options]
  );

  const [optionContainerScrollRef, setOptionContainerScrollRef] =
    useState<HTMLElement>();

  let optionContainerScrollTop = 0;
  let stopCalcFlag = false;

  const calcOptionContainerScrollTop = (height = 0) => {
    optionContainerScrollTop += height;
  };

  useEffect(() => {
    setTimeout(() => {
      if (optionContainerScrollRef) {
        optionContainerScrollRef.scrollTo({
          top: optionContainerScrollTop,
        });
      }
    }, 0);
  }, [optionContainerScrollTop, optionContainerScrollRef]);

  return (
    <OptionContainer
      optionContainerWidth={optionContainerWidth}
      openDirection={optionContainerOpenDirection}
      role="list"
    >
      {placeholder && <MobileTitleLabel>{placeholder}</MobileTitleLabel>}
      {useFilter && (
        <>
          <FilterInput
            id="dropdown-option-0"
            role="searchbox"
            optionContainerWidth={optionContainerWidth}
            value={filterText}
            placeholder="검색"
            onChange={handleFilterChange}
            onClear={handleFilterClear}
          />
          <StyledDivider width="auto" />
        </>
      )}
      <StyledScrollbar
        useFilter
        containerRef={(el) => setOptionContainerScrollRef(el)}
        maxHeight={scrollMaxHeight}
      >
        {dropdownType === "checkbox" && withAllCheckOption && (
          <DropdownOption
            getOptionElementHeight={
              isSelectedAll ? undefined : calcOptionContainerScrollTop
            }
            dropdownType={dropdownType}
            key="ALL"
            filterText={filterText}
            option={{ key: "ALL", value: "ALL", label: "전체" }}
            selected={isSelectedAll}
            onSelect={() => {
              if (!value) {
                onChange(options.map((option) => option.value));
              }

              if (value.length === options.length) {
                onChange([]);
              } else {
                onChange(options.map((option) => option.value));
              }
            }}
            idx={1}
          />
        )}
        {filteredOptions.length ? (
          filteredOptions.map((option, index) => {
            let selected = false;
            let tabIndex: number;

            if (
              dropdownType === "checkbox" &&
              value &&
              value.includes(option.value)
            ) {
              selected = true;
            }

            if (dropdownType === "default" && isEqual(option.value, value)) {
              selected = true;
            }

            if (selected) {
              stopCalcFlag = true;
            }

            if (useFilter && dropdownType === "checkbox") {
              tabIndex = index + 2;
            } else if (useFilter || dropdownType === "checkbox") {
              tabIndex = index + 1;
            } else {
              tabIndex = index;
            }

            return (
              <DropdownOption
                getOptionElementHeight={
                  stopCalcFlag || value == null || isSelectedAll
                    ? undefined
                    : calcOptionContainerScrollTop
                }
                dropdownType={dropdownType}
                key={option.key}
                filterText={filterText}
                option={option}
                selected={selected}
                onSelect={handleOptionSelect}
                isLastOption={filteredOptions.length - 1 === index}
                idx={tabIndex}
              />
            );
          })
        ) : (
          <NotFoundWrapper>
            <Icon name="ERROR" marginRight="6px" width="16px" height="16px" />
            검색 결과 없음
          </NotFoundWrapper>
        )}
      </StyledScrollbar>
    </OptionContainer>
  );
};

export default DropdownOptionContainer;

const StyledScrollbar = styled(PerfectScrollbar)<{
  useFilter: boolean;
  maxHeight?: string;
}>`
  position: relative;
  min-height: 0;
  flex: 1;
  max-height: ${({ maxHeight }) => maxHeight || "300px"};

  .dropdown-option:first-child {
    margin-top: 8px;
  }
`;

const OptionContainer = styled.div<{
  optionContainerWidth: string;
  openDirection: OpenDirection;
}>`
  position: absolute;
  ${({ openDirection }) =>
    openDirection === "down"
      ? css`
          top: calc(100% + 4px);
        `
      : css`
          bottom: calc(100% + 4px);
        `}
  display: flex;
  flex-direction: column;
  min-width: 106px;
  max-width: ${({ optionContainerWidth }) =>
    parseInt(optionContainerWidth, 10) >= 360 || optionContainerWidth === "100%"
      ? optionContainerWidth
      : "360px"};
  width: ${({ optionContainerWidth }) => optionContainerWidth};
  min-height: 84px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.palette.core.BackgroundPrimary};
  box-shadow: 0px 0px 2px
      ${({ theme }) => Color(theme.palette.core.Shadow).alpha(0.2).toString()},
    0px 5px 5px
      ${({ theme }) => Color(theme.palette.core.Shadow).alpha(0.1).toString()},
    0px 5px 10px
      ${({ theme }) => Color(theme.palette.core.Shadow).alpha(0.1).toString()};
  z-index: ${({ theme }) => theme.elevation.contents};

  @media ${generateMediaQuery("<", "md")} {
    position: fixed;
    z-index: ${({ theme }) => theme.elevation.PopUp + 5};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    width: auto;
    min-width: min(calc(100vw - 64px), 360px);
    max-width: 360px;
    max-height: 375px;
    padding: 28px 24px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px
        ${({ theme }) =>
          Color(theme.palette.core.Shadow).alpha(0.25).toString()},
      0px 30px 30px
        ${({ theme }) => Color(theme.palette.core.Shadow).alpha(0.2).toString()},
      0px 25px 40px
        ${({ theme }) =>
          Color(theme.palette.core.Shadow).alpha(0.15).toString()};
  }

  .ps__rail-x {
    display: none;
  }

  .ps__rail-y {
    display: none;
  }

  overflow: auto;
`;

const FilterInput = styled(TextInputV2)<{ optionContainerWidth: string }>`
  width: ${({ optionContainerWidth }) => optionContainerWidth};
  margin: 6px -8px;
  padding: 0 6px;

  > div {
    border-color: transparent !important;
  }
  height: 34px;
  margin-bottom: 6px;
  border-radius: 0;
  border-color: transparent;

  :focus-within {
    > div {
      border-color: transparent !important;
    }
  }
`;

const NotFoundWrapper = styled.div`
  ${foundations.typography.Body2};
  opacity: 0.4;
`;

const StyledDivider = styled(Divider)`
  margin: 0 -8px;
`;

const MobileTitleLabel = styled.div`
  display: none;

  @media ${generateMediaQuery("<", "md")} {
    display: block;
    margin-bottom: 20px;
    ${foundations.typography.H4};
  }
`;
