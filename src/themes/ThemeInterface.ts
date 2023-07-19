import { Breakpoints } from "../foundations";

import { CorePalette } from "./colors/CorePalette";
import { TextPalette } from "./colors/TextPalette";

interface Body {
  foreground: string;
  primary: string;
  secondary: string;
}

interface LegacyColor {
  primary: string;
  secondary: string;
  option: string;
  disable: string;
  hover: string;
  background: string;
  affordable: string;
  affordableDisabled: string;
  supporting: string;
  warning: string;
  urgent: string;
  dropdownBorder: string;
  inputBorder: string;
  indicatorBorder: string;
  tableBorder: string;
  switchBackground: string;
  resetButtonForeground: string;
  resetButtonBackground: string;
  selectedRowBackground: string;
  tabBackground: string;
  tabBorder: string;
}

interface Elevation {
  blocking: number; // spinner
  PopUp: number; // alert, prompt
  toastPopUp: number; // toasts, snackbars
  GNB: number; // global navigation bar
  LNB: number; // left navigation bar
  tableFixedElements: number; // table header / footer / sticky head
  contents: number; // inline contents like dropdowns
}

interface ThemeInterface<SpotPaletteKeys extends string = ""> {
  /**
   * @deprecated since 2.0
   */
  black: string;
  /**
   * @deprecated since 2.0
   */
  white: string;
  /**
   * @deprecated since 2.0
   */
  fontFamily: string;
  /**
   * @deprecated since 2.0
   */
  monospacedFontFamily: string;
  /**
   * @deprecated since 2.0
   */
  body: Body;
  /**
   * @deprecated since 2.0
   */
  color: LegacyColor;
  palette: {
    core: CorePalette;
    spot: {
      [key in SpotPaletteKeys]: string;
    };
    text: TextPalette;
  };
  elevation: Elevation;
  /**
   * @deprecated since 2.0
   */
  breakpoints: Breakpoints;
}

export default ThemeInterface;
