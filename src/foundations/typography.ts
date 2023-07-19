/* eslint-disable @typescript-eslint/camelcase */
// 디자인 시스템의 네이밍을 그대로 이용하기 위해 룰을 끕니다.
import { css } from "styled-components";

const H1 = css`
  font-size: 3rem;
  font-weight: 300;
  line-height: 1.25;
  letter-spacing: -0.0781rem;
`;

const H2 = css`
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3125;
  letter-spacing: -0.03125rem;
`;

const H3 = css`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.3333;
  letter-spacing: -0.01875rem;
`;

const H4 = css`
  font-size: 1.1875rem;
  font-weight: 700;
  line-height: 1.3684;
  letter-spacing: -0.00625rem;
`;

const Subtitle1 = css`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0;
`;

const Subtitle2 = css`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.2857;
  letter-spacing: 0;
`;

const Body1 = css`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375;
  letter-spacing: 0;
`;

const Body1_300 = css`
  ${Body1};
  font-weight: 500;
`;

const Body1_400 = css`
  ${Body1};
  font-weight: 700;
`;

const Body2 = css`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4286;
  letter-spacing: 0;
`;

const Body2_300 = css`
  ${Body2};
  font-weight: 500;
`;

const Body2_400 = css`
  ${Body2};
  font-weight: 700;
`;

const Body3 = css`
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.3846;
  letter-spacing: 0;
`;

const Body3_300 = css`
  ${Body3};
  font-weight: 500;
`;

const Body3_400 = css`
  ${Body3};
  font-weight: 700;
`;

const Caption = css`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.3333;
  letter-spacing: 0;
`;

const Caption_300 = css`
  ${Caption};
  font-weight: 500;
`;

const Caption_400 = css`
  ${Caption};
  font-weight: 700;
`;

const SubCaption = css`
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.0125rem;
`;

const typography = {
  fontFamily:
    '"Roboto", "Noto Sans KR", "Noto Sans CJK KR", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  monospacedFontFamily:
    'SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", "Courier New", "Noto Sans KR", "Noto Sans CJK KR",  monospace',
  H1,
  H2,
  H3,
  H4,
  Subtitle1,
  Subtitle2,
  Body1,
  Body1_200: Body1,
  Body1_300,
  Body1_400,
  Body2,
  Body2_200: Body2,
  Body2_300,
  Body2_400,
  Body3,
  Body3_200: Body3,
  Body3_300,
  Body3_400,
  Caption,
  Caption_200: Caption,
  Caption_300,
  Caption_400,
  SubCaption,
} as const;

export const Typography = {
  H1,
  H2,
  H3,
  H4,
  Subtitle1,
  Subtitle2,
  Body1,
  Body1_200: Body1,
  Body1_300,
  Body1_400,
  Body2,
  Body2_200: Body2,
  Body2_300,
  Body2_400,
  Body3,
  Body3_200: Body3,
  Body3_300,
  Body3_400,
  Caption,
  Caption_200: Caption,
  Caption_300,
  SubCaption,
};

export default typography;
