import { TextareaHTMLAttributes } from "react";

import HintType from "./HintType";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLElement> {
  name?: string;
  value?: any;
  label?: string;
  guide?: string;
  width?: string;
  minWidth?: string;
  disabled?: boolean;
  required?: boolean;
  withLabelMargin?: boolean;
  hintType?: HintType;
  hintText?: string;
  resizable?: boolean;
  onChange?: (v: any) => void;
}
