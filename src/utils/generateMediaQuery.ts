import foundations, { Breakpoints } from "../foundations";

type CompareOperator = ">" | ">=" | "<=" | "<";

const generateMediaQueryForSize = (
  compareOperator: CompareOperator,
  viewport: keyof Breakpoints,
) => {
  const { breakpoints } = foundations;
  const breakpointsArray = Object.keys(breakpoints) as Array<keyof Breakpoints>;

  const isMatchedForAllSize =
    (compareOperator === "<=" && viewport === "xxxl") ||
    (compareOperator === ">=" && viewport === "xs");
  const isNotMatchedForAllSize =
    (compareOperator === ">" && viewport === "xxxl") ||
    (compareOperator === "<" && viewport === "xs");

  if (isMatchedForAllSize || isNotMatchedForAllSize) {
    return "";
  }

  const sizeType =
    compareOperator === "<" || compareOperator === "<="
      ? "max-width"
      : "min-width";

  // 매치가 불가능한 사이즈 쿼리가 모두 early return되었으므로, 배열에서 인덱스를 더하거나 뺄 때 underflow / overflow를 걱정하지 않아도 된다.
  switch (compareOperator) {
    case "<=": {
      const biggerSize =
        breakpointsArray[
          breakpointsArray.findIndex((bp) => bp === viewport) + 1
        ];
      return `(${sizeType}: ${breakpoints[biggerSize] - 1}px)`;
    }
    case "<": {
      return `(${sizeType}: ${breakpoints[viewport] - 1}px)`;
    }
    case ">": {
      const biggerSize =
        breakpointsArray[
          breakpointsArray.findIndex((bp) => bp === viewport) + 1
        ];
      return `(${sizeType}: ${breakpoints[biggerSize]}px)`;
    }
    case ">=":
    default:
      return `(${sizeType}: ${breakpoints[viewport]}px)`;
  }
};

const generateMediaQuery = (
  compareOperator: CompareOperator,
  viewport: keyof Breakpoints,
  mediaType?: string,
) => {
  return [mediaType, generateMediaQueryForSize(compareOperator, viewport)]
    .filter((x) => x)
    .join(" and ");
};

export default generateMediaQuery;
