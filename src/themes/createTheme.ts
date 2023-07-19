import Color from "color";

import foundations from "../foundations";

import { basePalette } from "./colors/BasePalette";
import ColorCode from "./colors/ColorCode";
import type { CorePalette } from "./colors/CorePalette";
import { TextPalette } from "./colors/TextPalette";
import ThemeInterface from "./ThemeInterface";

export interface ThemeOptions<SpotPalette extends string> {
  palette: {
    core: {
      [key in keyof CorePalette]: ColorCode;
    };
    spot: {
      [key in SpotPalette]: ColorCode | string;
    };
    text: {
      [key in keyof TextPalette]: ColorCode;
    };
  };
}

const getColorFromColorCode = (colorCode: ColorCode) =>
  typeof colorCode === "string"
    ? basePalette[colorCode]
    : Color(basePalette[colorCode.code])
        .alpha(colorCode.alpha ?? 1)
        .toString();

const createTheme = <SpotPaletteKeys extends string>(
  options: ThemeOptions<SpotPaletteKeys>,
): ThemeInterface<SpotPaletteKeys> => {
  const corePalette = Object.entries(options.palette.core).reduce<CorePalette>(
    (prev, [key, value]) => ({
      ...prev,
      [key]: getColorFromColorCode(value),
    }),
    {} as CorePalette,
  );

  type SpotPalette = {
    [key in SpotPaletteKeys]: string;
  };

  const basePaletteKeys = Object.keys(basePalette);
  const getIfColorCode = (v: ColorCode | string): v is ColorCode =>
    !(typeof v === "string" && !basePaletteKeys.includes(v));

  const spotPalette = Object.entries<ColorCode | string>(
    options.palette.spot,
  ).reduce<SpotPalette>((prev, [key, value]) => {
    return {
      ...prev,
      [key]: getIfColorCode(value) ? getColorFromColorCode(value) : value,
    };
  }, {} as SpotPalette);

  const textPalette = Object.entries(options.palette.text).reduce<TextPalette>(
    (prev, [key, value]) => ({
      ...prev,
      [key]: getColorFromColorCode(value),
    }),
    {} as TextPalette,
  );

  return {
    black: "#000",
    white: "#fff",
    fontFamily: foundations.typography.fontFamily,
    monospacedFontFamily: foundations.typography.monospacedFontFamily,
    body: {
      foreground: "#000",
      primary: "#212121",
      secondary: "#464646",
    },
    color: {
      primary: "#000",
      secondary: "#666",
      option: "#999",
      disable: "rgba(0, 0, 0, 0.3)",
      hover: "rgba(237, 239, 250, 0.3)",
      background: "#fff",
      affordable: "#5188f3",
      affordableDisabled: "rgba(81, 136, 243, 0.3)",
      supporting: "#13bf80",
      warning: "#efa831",
      urgent: "#e87171",
      dropdownBorder: "#979797",
      inputBorder: "#bdbdbd",
      indicatorBorder: "#757575",
      tableBorder: "#dfdfdf",
      switchBackground: "#adadad",
      resetButtonForeground: "#5f5f5f",
      resetButtonBackground: "#e8e8e8",
      tabBackground: "#f5f5f5",
      tabBorder: "#ababab",
      selectedRowBackground: "#dfeaff",
    },
    palette: {
      core: corePalette,
      spot: spotPalette,
      text: textPalette,
    },
    elevation: {
      blocking: 10000,
      PopUp: 2000,
      toastPopUp: 1000,
      GNB: 300,
      LNB: 200,
      tableFixedElements: 100,
      contents: 10,
    },
    breakpoints: foundations.breakpoints,
  };
};

export default createTheme;
