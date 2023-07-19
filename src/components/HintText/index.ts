import styled from "styled-components";

import type { Breakpoints } from "../../foundations/breakpoints";

type Size = keyof Breakpoints;

const big = new Set<Size>(["lg", "xl", "xxl", "xxxl"]);

const HintText = styled.div<{
  inputSize?: Size;
}>`
  margin-top: 4px;
  font-weight: 500;

  font-size: ${({ inputSize }) =>
    inputSize && big.has(inputSize) ? "13px" : "12px"};
  line-height: 16px;
  color: ${({ theme }) => theme.palette.text.CriticalText};
`;

export default HintText;
