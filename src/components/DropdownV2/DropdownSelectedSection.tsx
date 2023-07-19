import React, { FC } from "react";
import styled, { css } from "styled-components";

import type { StringLabelOption } from "../../types/Option";
import Icon from "../Icon/Icon";

import type { DropdownType, LabelDisplayType } from "./DropdownV2";

interface DropdownSelectedSectionProps {
  className?: string;
  value?: any;
  selectedOption?: StringLabelOption | null;
  options: StringLabelOption[];
  placeholder?: string;
  opened?: boolean;
  disabled?: boolean;
  dropdownType: DropdownType;
  withAllCheckOption?: boolean;
  labelDisplayType: LabelDisplayType;
  onClick?: () => void;
}

const DropdownSelectedSection: FC<DropdownSelectedSectionProps> = ({
  className,
  value,
  disabled,
  selectedOption,
  options,
  placeholder = "선택",
  dropdownType,
  opened,
  withAllCheckOption,
  labelDisplayType,
  onClick,
}) => {
  const openedIconName = "ARROW_UP2";
  const closedIconName = "ARROW_DOWN2";

  let label = placeholder;

  if (selectedOption && dropdownType === "checkbox") {
    if (value.length === options.length && withAllCheckOption) {
      label = "전체";
    } else if (labelDisplayType === "default") {
      label = `${selectedOption.label}${
        value.length > 1 ? ` 외 ${value.length - 1}건` : ""
      }`;
    } else {
      const selectedLabels = options.reduce((acc: string[], cur) => {
        if (value.includes(cur.value)) {
          acc.push(cur.label);
        }
        return acc;
      }, []);
      label = selectedLabels.join(", ");
    }
  } else if (selectedOption) {
    label = selectedOption.label;
  }

  return (
    <SectionWrapper
      disabled={disabled}
      className={className}
      onClick={onClick}
      data-testid="dropdownv2-selected-section"
    >
      <StyledLabel
        isSelected={!!selectedOption}
        data-testid="dropdownv2-selected-label"
      >
        {label}
      </StyledLabel>
      <ArrowIcon name={opened ? openedIconName : closedIconName} />
    </SectionWrapper>
  );
};

export default DropdownSelectedSection;

const SectionWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.palette.text.PrimaryText};
`;

const StyledLabel = styled.label<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    !isSelected &&
    css`
      opacity: 0.4;
    `}
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  overflow: hidden;
`;

const ArrowIcon = styled(Icon)`
  color: ${(props) => props.theme.palette.core.Borders300};
`;
