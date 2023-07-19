import Color from "color";
import React from "react";
import styled from "styled-components";

import {
  Header,
  Category,
  Title,
  Main,
  SectionTitle,
  ItemTitle,
  ItemValue,
  MonospacedValue,
  Subtitle,
} from "../storybook-components";
import { ItemList, Item } from "../storybook-components/ItemList";

import tmsLight from "./TMSLight";

export default {
  title: "Themes/Legacy Props",
};

export const LegacyProps = () => {
  return (
    <>
      <Header>
        <Category>Theme</Category>
        <Title>Global</Title>
        <Subtitle>Legacy Props</Subtitle>
      </Header>
      <Main>
        <SectionTitle>Font</SectionTitle>
        <ItemList>
          <Item>
            <ItemTitle>fontFamily</ItemTitle>
            <FontValue fontFamily={tmsLight.fontFamily}>
              {tmsLight.fontFamily}
            </FontValue>
          </Item>
          <Item>
            <ItemTitle>monospacedFontFamily</ItemTitle>
            <FontValue fontFamily={tmsLight.monospacedFontFamily}>
              {tmsLight.monospacedFontFamily}
            </FontValue>
          </Item>
        </ItemList>
        <SectionTitle>Colors</SectionTitle>
        <ItemList>
          <Item>
            <ColorChip color={tmsLight.black}>black</ColorChip>
            <MonospacedValue>{tmsLight.black}</MonospacedValue>
          </Item>
          <Item>
            <ColorChip color={tmsLight.white}>white</ColorChip>
            <MonospacedValue>{tmsLight.white}</MonospacedValue>
          </Item>
          {Object.entries(tmsLight.body).map(([key, color]) => (
            <Item key={key}>
              <ColorChip color={color}>body.{key}</ColorChip>
              <MonospacedValue>{color}</MonospacedValue>
            </Item>
          ))}
          {Object.entries(tmsLight.color).map(([key, color]) => (
            <Item key={key}>
              <ColorChip color={color}>color.{key}</ColorChip>
              <MonospacedValue>{color}</MonospacedValue>
            </Item>
          ))}
        </ItemList>
        <SectionTitle>Elevation</SectionTitle>
        <ItemList>
          {Object.entries(tmsLight.elevation).map(([key, elevation]) => (
            <Item key={key}>
              <ItemTitle>elevation.{key}</ItemTitle>
              <ItemValue>{elevation}</ItemValue>
            </Item>
          ))}
        </ItemList>
      </Main>
    </>
  );
};

const ColorChip = styled(ItemTitle)<{ color: string }>`
  color: ${(props) => (Color(props.color).isDark() ? "#fff" : "#000")};
  background-color: ${(props) => props.color};
`;

const FontValue = styled(ItemValue)<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily};
`;
