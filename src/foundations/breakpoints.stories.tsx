import React from "react";

import { Table, Tbody, Td, Th, Thead, Tr } from "../components/Table";
import {
  Category,
  CodeBlock,
  Header,
  Main,
  SectionSubTitle,
  SectionTitle,
  Subtitle,
  Title,
} from "../storybook-components";

import foundations from ".";

export default {
  title: "Foundations/Layouts/Breakpoints",
};

export const Breakpoints = () => (
  <>
    <Header>
      <Category>Foundations</Category>
      <Title>Layouts</Title>
      <Subtitle>Breakpoints</Subtitle>
    </Header>
    <Main>
      <SectionTitle>Definition</SectionTitle>
      <Table>
        <Thead>
          <tr>
            <Th width="180px">Size</Th>
            <Th>Breakpoint</Th>
          </tr>
        </Thead>
        <Tbody>
          {Object.entries(foundations.breakpoints).map(([size, breakpoint]) => (
            <Tr key={size}>
              <Th width="180px">{size}</Th>
              <Td>{breakpoint}px 이상</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <SectionTitle>Utility Function</SectionTitle>
      <SectionSubTitle>generateMediaQuery</SectionSubTitle>
      media query를 조건 기반으로 만들어줍니다. 예를 들어,
      <CodeBlock>
        generateMediaQuery(&quot;&gt;=&quot;, &quot;xl&quot;)
      </CodeBlock>
      이 코드는 xl(1260px) 이상의 화면에서만 적용되는 스타일을 선언하고 싶을 때
      사용하실 수 있습니다. 비교 연산자는 이상(&gt;=), 초과(&gt;), 이하(&lt;=),
      미만(&lt;)을 지원합니다.
    </Main>
  </>
);
