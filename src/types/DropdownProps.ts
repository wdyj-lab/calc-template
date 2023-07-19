import { ReactNode } from "react";

import {
  DropdownOptionHorizontal,
  DropdownOptionVertical,
} from "../mixins/dropdown";

import type { InputProps } from "./InputProps";
import type { MarginProps } from "./MarginProps";
import type Option from "./Option";

export interface DropdownOptionProps {
  optionWidth?: string;
  optionHeight?: string;
  optionHorizontalLocation?: DropdownOptionHorizontal;
  optionVerticalLocation?: DropdownOptionVertical;
}

export interface DropdownOption extends Option {
  selectedLabel?: ReactNode;
}

export interface DropdownProps
  extends InputProps,
    MarginProps,
    DropdownOptionProps {
  options: DropdownOption[];
  className?: string;
  invalidOptionPlaceholder?: string;
  withFilter?: boolean;
  withLabelMargin?: boolean;
  filterPlaceholder?: string;
  filterMinLength?: number;
  dropdownBackgroundColor?: string;
  emptyFallbackMessage?: string;
  onFilterChange?: (v: any) => void;
}
