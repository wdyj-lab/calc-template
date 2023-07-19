export interface HorizontalMarginProps {
  marginLeft?: string;
  marginRight?: string;
}

export interface VerticalMarginProps {
  marginTop?: string;
  marginBottom?: string;
}

export interface MarginProps
  extends HorizontalMarginProps,
    VerticalMarginProps {
  margin?: string;
  tabIndex?: number;
  autoFocus?: boolean;
}
