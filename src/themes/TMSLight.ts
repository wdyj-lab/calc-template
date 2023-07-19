// TODO: 이 파일은 TMS에서만 사용되므로 TMS로 이동해야 합니다.
// 하지만 스토리북 등에서 사용되므로 일단 유지합니다.

import createTheme, { ThemeOptions } from "./createTheme";

export type TMSSpotPalette =
  | "PlanDoneBlue"
  | "PlanPendingYellow"
  | "PlanErrorRed"
  | "PlanCancelGray"
  | "PinStartBlue"
  | "PinFinishRed"
  | "PinDelayRed"
  | "PinStartDonePastelBlue"
  | "PinFinishDonePastelRed"
  | "PinBaseDarkBlue"
  | "DotLinePastelBlue";

export const TMSLightMapping: ThemeOptions<TMSSpotPalette> = {
  palette: {
    core: {
      BasePrimary: "Blue600",
      BaseSecondary: "BlueGray800",
      BaseTertiary: "DarkBlue050",
      BaseCritical: "Red400",
      BaseWarning: "Yellow700",
      BaseSuccess: "Green400",
      BaseAccent: "Blue600",

      BackgroundPrimary: "White900",
      BackgroundSecondary: "BlueGray100",
      BackgroundTertiary: "BlueGray200",

      SurfacePrimary: "White900",
      SurfaceSecondary: "BlueGray050",
      SurfaceTertiary: "BlueGray100",
      SurfaceSuccess: "Green050",
      SurfaceCritical: "Red050",
      SurfaceWarning: "Yellow050",
      SurfaceDarkBlue: "DarkBlue800",
      SurfacePastelBlue: "Blue050",
      SurfaceDarkBlueGray: "BlueGray800",
      SurfaceBlack: "Black800",

      Borders400: "BlueGray500",
      Borders300: "BlueGray400",
      Borders200: "BlueGray300",
      Borders100: "BlueGray200",
      Borders050: "BlueGray100",
      BordersCritical: "Red400",
      BordersCritical100: "Red200",
      BordersWarning: "Yellow700",
      BordersWarning100: "Yellow400",
      BordersSuccess: "Green400",
      BordersSuccessBlue: "Blue200",

      Divider: "BlueGray400",

      Shadow: "BlueGray800",

      Dimmed: "BlueGray800",

      IconDark: "BlueGray800",
      IconGray: "BlueGray400",
      IconWhite: "White900",
      IconBlue: "Blue600",
      IconYellow: "Yellow800",
      IconRed: "Red400",

      AssetSpinnerLight: "BlueGray400",
      AssetSpinnerDark: "White900",
    },
    spot: {
      PlanDoneBlue: "Blue700",
      PlanPendingYellow: "WIP",
      PlanErrorRed: "WIP",
      PlanCancelGray: "WIP",
      PinStartBlue: "WIP",
      PinFinishRed: "WIP",
      PinDelayRed: "WIP",
      PinStartDonePastelBlue: "WIP",
      PinFinishDonePastelRed: "WIP",
      PinBaseDarkBlue: "WIP",
      DotLinePastelBlue: "WIP",
    },
    text: {
      PrimaryText: "Black800",
      SecondaryText: {
        code: "Black800",
        alpha: 0.8,
      },
      TertiaryText: {
        code: "Black800",
        alpha: 0.6,
      },
      OptionalText: {
        code: "Black800",
        alpha: 0.4,
      },
      DisabledText: {
        code: "Black800",
        alpha: 0.3,
      },
      PrimaryNegativeText: "White900",
      CriticalText: "Red400",
      CriticalText200: "Red500",
      WarningText: "Yellow700",
      WarningText200: "Yellow900",
      SuccessText: "Green400",
      SuccessTextBlue: "Blue500",
      AccentText: "Blue600",
      ConditionDarkblueText: "DarkBlue700",
    },
  },
};

const TMSLight = createTheme<TMSSpotPalette>(TMSLightMapping);

export default TMSLight;
