/* eslint-disable jsx-a11y/label-has-associated-control */
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ThemeProvider } from "styled-components";

import BaseTheme from "../../themes/BaseTheme";

import TextInputV2 from "./TextInputV2";

describe("TextInputV2", () => {
  it("화면에 입력창을 렌더링해야 한다.", () => {
    // given
    // when
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 />
      </ThemeProvider>,
    );

    // then
    expect(document.querySelector("input[type=text]")).toBeInTheDocument();
  });

  it("컴포넌트를 클릭하는 경우 포커스돼야 한다.", () => {
    // given
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" />
      </ThemeProvider>,
    );

    // when
    userEvent.click(document.querySelector("#test-textinput")!);

    // then
    expect(document.querySelector("#test-textinput")).toHaveFocus();
  });

  it("htmlFor에 id를 제공한 label을 클릭하는 경우 포커스돼야 한다.", () => {
    // given
    render(
      <ThemeProvider theme={BaseTheme}>
        <label htmlFor="test-textinput" data-testid="test-label">
          label
        </label>
        <TextInputV2 id="test-textinput" />
      </ThemeProvider>,
    );

    // when
    userEvent.click(screen.getByTestId("test-label"));

    // then
    expect(document.querySelector("#test-textinput")).toHaveFocus();
  });

  it("텍스트 lorem을 입력하면 onChange 함수에 lorem을 인자로 전달해야 한다.", () => {
    // given
    const handleChange = jest.fn();
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" onChange={handleChange} />
      </ThemeProvider>,
    );

    // when
    fireEvent.change(document.querySelector("#test-textinput")!, {
      target: {
        value: "lorem",
      },
    });

    // then
    expect(handleChange).toHaveBeenCalledWith("lorem");
  });

  it("value에 ipsum을 인자로 전달하면 입력창 값이 ipsum이어야 한다.", () => {
    // given
    // when
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" value="ipsum" />
      </ThemeProvider>,
    );

    // then
    expect(document.querySelector("#test-textinput")).toHaveValue("ipsum");
  });

  it("엔터키를 입력한 경우 onEnter 함수가 실행돼야 한다.", () => {
    // given
    const handleEnter = jest.fn();
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" onEnter={handleEnter} />
      </ThemeProvider>,
    );

    // when
    userEvent.type(document.querySelector("#test-textinput")!, "{enter}");

    // then
    expect(handleEnter).toHaveBeenCalled();
  });

  it("maxLength를 10으로 설정하면 입력창에 10자까지 입력할 수 있어야 한다.", () => {
    // given
    const InputWrapper = () => {
      const [value, setValue] = React.useState("");

      return (
        <ThemeProvider theme={BaseTheme}>
          <TextInputV2
            id="test-textinput"
            maxLength={10}
            value={value}
            onChange={setValue}
          />
        </ThemeProvider>
      );
    };
    render(<InputWrapper />);

    // when
    userEvent.type(document.querySelector("#test-textinput")!, "lorem ipsum");

    // then
    expect(document.querySelector("#test-textinput")).toHaveValue("lorem ipsu");
  });

  it("onClear가 주어지고 value가 비어있지 않은 경우 클리어 버튼이 표시돼야 한다.", () => {
    // given
    // when
    const handleClear = jest.fn();
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" value="lorem" onClear={handleClear} />
      </ThemeProvider>,
    );

    // then
    const clearButton = screen.getByTestId("TextInputV2-clear");
    expect(clearButton).toBeInTheDocument();
  });

  it("onClear가 주어지고 value가 비어있는 경우 클리어 버튼이 표시되지 않아야 한다.", () => {
    // given
    // when
    const handleClear = jest.fn();
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" onClear={handleClear} />
      </ThemeProvider>,
    );

    // then
    const clearButton = screen.queryByTestId("TextInputV2-clear");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("disabled 상태일 경우 포커스가 되지 않아야 한다.", () => {
    // given
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" disabled />
      </ThemeProvider>,
    );
    // when
    userEvent.click(document.querySelector("#test-textinput")!);

    // then
    expect(document.querySelector("#test-textinput")).not.toHaveFocus();
  });

  it("disabled 상태일 경우 value가 있고 onClear가 있어도 클리어 버튼이 표시되지 않아야 한다.", () => {
    // given
    // when
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2
          id="test-textinput"
          value="lorem"
          onClear={jest.fn()}
          disabled
        />
      </ThemeProvider>,
    );

    // then
    const clearButton = screen.queryByTestId("TextInputV2-clear");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("unit이 주어지면 입력창 옆에 주어진 unit 텍스트가 표시돼야 한다.", () => {
    // given
    // when
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" unit="km" />
      </ThemeProvider>,
    );

    // then
    const unit = screen.getByText("km");
    expect(unit).toBeInTheDocument();
  });

  it("hintType이 negative이고 hintText가 주어진 경우 hintText가 렌더링 돼야한다", () => {
    // given
    // when
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2
          id="test-textinput"
          unit="km"
          hintType="negative"
          hintText="힌트텍스트"
        />
      </ThemeProvider>,
    );

    // then
    const hintText = screen.getByText("힌트텍스트");
    expect(hintText).toBeInTheDocument();
  });

  it("hintType이 negative가 아니고 hintText가 주어진 경우 hintText가 렌더링 되면 안된다", () => {
    // given
    // when
    render(
      <ThemeProvider theme={BaseTheme}>
        <TextInputV2 id="test-textinput" unit="km" hintText="힌트텍스트" />
      </ThemeProvider>,
    );

    // then
    const textInput = screen.getByTestId("TextInputV2");
    expect(textInput).not.toHaveTextContent("힌트텍스트");
  });
});
