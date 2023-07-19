import { StoryFn } from "@storybook/react";
import React, { useCallback, useState } from "react";

import {
  Header,
  Category,
  Title,
  Main,
  SectionTitle,
} from "../../storybook-components";

import TextInputV2 from "./TextInputV2";
import type { TextInputV2Props } from "./TextInputV2";

export default {
  title: "Components/TextInputV2",
  component: TextInputV2,
  argTypes: {},
};

const Template: StoryFn<TextInputV2Props> = (props: TextInputV2Props) => {
  const { value, ...restProps } = props;
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  const handleInputChange = useCallback((v: string) => {
    setInputValue(v);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue("");
  }, []);

  return (
    <>
      <Header>
        <Category>Components</Category>
        <Title>TextInputV2</Title>
      </Header>
      <Main>
        <SectionTitle>Large</SectionTitle>
        <TextInputV2
          {...restProps}
          value={inputValue}
          onChange={handleInputChange}
          onClear={handleClear}
          size="lg"
        />
        <SectionTitle>Medium</SectionTitle>
        <TextInputV2
          {...restProps}
          value={inputValue}
          onChange={handleInputChange}
          onClear={handleClear}
          size="md"
        />
        <SectionTitle>Small</SectionTitle>
        <TextInputV2
          {...restProps}
          value={inputValue}
          onChange={handleInputChange}
          onClear={handleClear}
          size="sm"
        />
        <SectionTitle>XSmall</SectionTitle>
        <TextInputV2
          {...restProps}
          value={inputValue}
          onChange={handleInputChange}
          onClear={handleClear}
          size="xs"
        />
      </Main>
    </>
  );
};

export const Basic = Template.bind({});
