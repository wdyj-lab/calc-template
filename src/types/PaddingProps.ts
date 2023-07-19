export interface HorizontalPaddingProps {
  paddingLeft?: string;
  paddingRight?: string;
}

export interface VerticalPaddingProps {
  paddingTop?: string;
  paddingBottom?: string;
}

export interface PaddingProps
  extends HorizontalPaddingProps,
    VerticalPaddingProps {
  padding?: string;
  tabIndex?: number;
  autoFocus?: boolean;
}
