import { ReactNode } from "react";

interface Option<T = any> {
  key: string;
  label: ReactNode;
  value: T;
  disabled?: boolean;
}

export interface StringLabelOption<T = any> extends Option<T> {
  label: string;
}

export default Option;
