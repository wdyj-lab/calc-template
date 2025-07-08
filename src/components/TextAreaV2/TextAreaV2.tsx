import React, { useCallback } from "react";
import styled, { css } from "styled-components";

import foundations from "../../foundations";
import HintType from "../../types/HintType";

export interface TextAreaV2Props {
  id?: string;
  size?: TextAreaSize;
  className?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  disabled?: boolean;
  hintText?: string;
  hintType?: HintType;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  shouldTrimOnBlur?: boolean;
  maxLength?: number;
  value: string;
}

type TextAreaSize = "md" | "sm" | "xs";

const TextAreaV2: React.FC<TextAreaV2Props> = ({
  id,
  size = "md",
  className,
  width,
  height,
  placeholder,
  disabled,
  hintText,
  hintType,
  onChange,
  onBlur,
  shouldTrimOnBlur,
  maxLength,
  value = "",
}) => {
  const showWordCount = !!(onChange && maxLength);

  const showHintText = hintType === "negative" && !!hintText && !disabled;

  const isMaximumLength = value.length === maxLength;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!onChange || disabled) {
        return;
      }

      const v = e.target.value;

      if (maxLength && maxLength < v.length) {
        return;
      }

      onChange(v);
    },
    [onChange, disabled, maxLength]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(e);

      if (shouldTrimOnBlur && onChange) {
        onChange(value.trim());
      }
    },
    [onBlur, onChange, value, shouldTrimOnBlur]
  );

  return (
    <>
      <TextAreaInnerWrapper
        width={width}
        height={height}
        size={size}
        showNegative={!disabled && hintType === "negative"}
        disabled={disabled}
        className={className}
      >
        <TextAreaElement
          id={id}
          value={value}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="TextAreaV2-element"
        />
        {showWordCount && (
          <WordCount>
            <HighlightLength
              data-testid="TextAreaV2-wordcount"
              isMaximumLength={isMaximumLength}
            >
              {value.length}
            </HighlightLength>
            <span data-testid="TextAreaV2-maxlength">/{maxLength}</span>
          </WordCount>
        )}
      </TextAreaInnerWrapper>
      {showHintText && <HintText>{hintText}</HintText>}
    </>
  );
};

export default TextAreaV2;

const TextAreaInnerWrapper = styled.div<
  Pick<TextAreaV2Props, "size" | "width" | "height" | "disabled"> & {
    showNegative: boolean;
  }
>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1px;
  background-color: ${({ theme }) => theme.palette.core.BackgroundPrimary};
  border: 1px solid ${({ theme }) => theme.palette.core.Borders200};
  border-radius: 3px;
  transition: border-color 0.3s;

  ${({ size }) => {
    switch (size) {
      case "md":
        return css`
          width: 280px;
          height: 92px;
        `;
      case "sm":
        return css`
          width: 200px;
          height: 92px;
        `;
      case "xs":
        return css`
          width: 100px;
          height: 92px;
        `;
      default:
        return css`
          width: 100%;
          height: 92px;
        `;
    }
  }}

  ${({ width }) => !!width && `width: ${width}`};
  ${({ height }) => !!height && `height: ${height}`};

  ${({ showNegative, theme }) =>
    showNegative &&
    css`
      padding: 0;
      border-color: ${theme.palette.core.BaseCritical};
      border-width: 2px;
    `}

  &:focus-within {
    padding: 0;
    border-color: ${({ showNegative, theme }) =>
      showNegative
        ? theme.palette.core.BaseCritical
        : theme.palette.core.BasePrimary};
    border-width: 2px;
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.palette.core.BackgroundSecondary};
      border: 1px solid ${theme.palette.core.Borders100};
      cursor: not-allowed;
    `};
`;

const TextAreaElement = styled.textarea<Pick<TextAreaV2Props, "size">>`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;

  &::placeholder {
    font-size: 0.875rem; /* 14px */
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbcfd6;
    border-radius: 4px;
  }

  box-sizing: border-box;
  ${({ size }) => {
    switch (size) {
      case "md":
        return css`
          ${foundations.typography.Body2_200};
          padding: 5px 10px 2px;
        `;
      case "sm":
        return css`
          ${foundations.typography.Body2_200};
          padding: 3px 9px 2px;
        `;
      case "xs":
        return css`
          ${foundations.typography.Body3_200};
          padding: 3px 8px 2px;
        `;
      default:
        return css`
          ${foundations.typography.Body2_200};
          padding: 5px 10px 2px;
        `;
    }
  }};

  font-size: 0.875rem; /* 14px */
  font-weight: 800;

  @media (max-width: 550px) {
    font-size: 0.875rem; /* 14px */
  }
`;

const WordCount = styled.div`
  ${foundations.typography.Caption_200};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100px;
  height: 24px;
  margin-right: 9px;
  color: ${({ theme }) => theme.palette.text.OptionalText};
`;

const HighlightLength = styled.span<{ isMaximumLength: boolean }>`
  ${({ isMaximumLength, theme }) =>
    isMaximumLength && `color: ${theme.palette.text.AccentText}`};
`;

const HintText = styled.div`
  ${foundations.typography.Caption_300};
  margin-top: 6px;
  color: ${({ theme }) => theme.palette.text.CriticalText};
`;
