import type { BasePalette } from "./BasePalette";

type ColorCode =
  | BasePalette
  | {
      code: BasePalette;
      alpha?: number;
    };

export default ColorCode;
