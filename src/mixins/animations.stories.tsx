import React from "react";
import styled, { css } from "styled-components";

import {
  Header,
  Category,
  Title,
  SectionTitle,
  Main,
  ItemTitle,
  ItemValue,
} from "../storybook-components";
import { ItemList, Item } from "../storybook-components/ItemList";

import { rotate360, blink, fadeIn, fadeOut, shake } from "./animations";

export default {
  title: "Mixins/Animation Keyframes",
};

const element = css`
  width: 100px;
  height: 100px;
  background: ${(props) => props.theme.color.primary};
`;

const RotatingElement = styled.div`
  ${element};
  margin: 20px;
  animation: ${rotate360} 2s linear infinite;
`;

const BlinkingElement = styled.div`
  ${element};
  animation: ${blink} 1s linear infinite;
`;

const FadeInElement = styled.div`
  ${element};
  animation: ${fadeIn} 1s forwards;
`;

const FadeOutElement = styled.div`
  ${element};
  animation: ${fadeOut} 1s forwards;
`;

const ShakeElement = styled.div`
  ${element};
  animation: ${shake} 1s forwards;
`;

export const Keyframes = () => (
  <>
    <Header>
      <Category>Mixins</Category>
      <Title>Animation Keyframes</Title>
    </Header>
    <Main>
      <SectionTitle>Keyframes</SectionTitle>
      <ItemList>
        <Item>
          <ItemTitle>rotate360</ItemTitle>
          <ItemValue>
            <RotatingElement />
          </ItemValue>
        </Item>
        <Item>
          <ItemTitle>blink</ItemTitle>
          <ItemValue>
            <BlinkingElement />
          </ItemValue>
        </Item>
        <Item>
          <ItemTitle>fadeIn</ItemTitle>
          <ItemValue>
            <FadeInElement />
          </ItemValue>
        </Item>
        <Item>
          <ItemTitle>fadeOut</ItemTitle>
          <ItemValue>
            <FadeOutElement />
          </ItemValue>
        </Item>
        <Item>
          <ItemTitle>shake</ItemTitle>
          <ItemValue>
            <ShakeElement />
          </ItemValue>
        </Item>
      </ItemList>
    </Main>
  </>
);
