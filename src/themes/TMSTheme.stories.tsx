import Color from "color";
import React from "react";
import styled from "styled-components";

import {
  Header,
  Category,
  Title,
  Main,
  ItemTitle,
  MonospacedValue,
  Subtitle,
} from "../storybook-components";
import { ItemList, Item } from "../storybook-components/ItemList";

import ColorCode from "./colors/ColorCode";
import { CorePalette as CP } from "./colors/CorePalette";
import { TextPalette as TP } from "./colors/TextPalette";
import tmsLight, { TMSLightMapping, TMSSpotPalette } from "./TMSLight";

export default {
  title: "Themes/TMS",
};

export const CorePalette = () => {
  return (
    <>
      <Header>
        <Category>Theme</Category>
        <Title>TMS</Title>
        <Subtitle>Core palette</Subtitle>
      </Header>
      <Main>
        <ItemList>
          {Object.entries(tmsLight.palette.core).map(([key, color]) => (
            <Item key={key}>
              <ColorChip color={color}>core.{key}</ColorChip>
              <MonospacedValue>
                {color}
                <ColorName
                  color={TMSLightMapping.palette.core[key as keyof CP]}
                />
              </MonospacedValue>
            </Item>
          ))}
        </ItemList>
      </Main>
    </>
  );
};

export const SpotPalette = () => {
  return (
    <>
      <Header>
        <Category>Theme</Category>
        <Title>TMS</Title>
        <Subtitle>Spot palette</Subtitle>
      </Header>
      <Main>
        <ItemList>
          {Object.entries(tmsLight.palette.spot).map(([key, color]) => (
            <Item key={key}>
              <ColorChip color={color}>spot.{key}</ColorChip>
              <MonospacedValue>
                {color}
                <ColorName
                  color={TMSLightMapping.palette.spot[key as TMSSpotPalette]}
                />
              </MonospacedValue>
            </Item>
          ))}
        </ItemList>
      </Main>
    </>
  );
};

export const TextPalette = () => {
  return (
    <>
      <Header>
        <Category>Theme</Category>
        <Title>TMS</Title>
        <Subtitle>Text palette</Subtitle>
      </Header>
      <Main>
        <ItemList>
          {Object.entries(tmsLight.palette.text).map(([key, color]) => (
            <Item key={key}>
              <ColorChip color={color}>text.{key}</ColorChip>
              <MonospacedValue>
                {color}
                <ColorName
                  color={TMSLightMapping.palette.text[key as keyof TP]}
                />
              </MonospacedValue>
            </Item>
          ))}
        </ItemList>
      </Main>
    </>
  );
};

const ColorChip = styled(ItemTitle)<{ color: string }>`
  color: ${(props) => {
    if (props.color === "WIP") {
      return "#000";
    }
    return Color(props.color).isDark() ? "#fff" : "#000";
  }};
  background-color: ${(props) =>
    props.color === "WIP" ? "#fff" : props.color};
`;

const ColorName = ({ color }: { color: ColorCode | string }) => {
  if (typeof color === "string") {
    return <>&nbsp;({color})</>;
  }

  const { code, alpha } = color;

  return (
    <>
      &nbsp;({code}
      {alpha === undefined ? "" : `, ${alpha * 100}%`})
    </>
  );
};
