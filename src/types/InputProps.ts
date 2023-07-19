import { InputHTMLAttributes } from "react";

import HintType from "./HintType";

export interface InputProps extends InputHTMLAttributes<HTMLElement> {
  name?: string;
  value?: any;
  label?: string;
  guide?: string;
  width?: string;
  minWidth?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  withLabelMargin?: boolean;
  hintType?: HintType;
  hintText?: string;
  placeholder?: string;
  endEnhancer?: string | JSX.Element;
  onChange?: (v: any) => void;
  onEnter?: () => void;
}
