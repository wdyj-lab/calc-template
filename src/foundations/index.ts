import breakpoints, { Breakpoints } from "./breakpoints";
import typography from "./typography";

const foundations = {
  breakpoints,
  typography,
} as const;

export type { Breakpoints };
export default foundations;
