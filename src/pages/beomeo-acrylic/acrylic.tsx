import { yupResolver } from "@hookform/resolvers/yup";
import DropdownV2 from "@/components/DropdownV2/DropdownV2";
import TextInputV2 from "@/components/TextInputV2/TextInputV2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import * as yup from "yup";
import getSimpleProps from "@/lib/utils/getSimpleProps";

const AcrylicCalcPage = () => {
  const [selectedColor, setSelectedColor] = useState("none");
  const [selectedThickness, setSelectedThickness] = useState("none");
  const [selectedManufacture, setSelectedManufacture] = useState("none");

  const applicationSpecResolver = yup.object().shape({
    color: yup.string().required("색상을 선택해주세요"),
    thickness: yup.string().required("두께를 선택해주세요."),
    manufacture: yup.string().required("가공을 선택해주세요."),
    width: yup
      .number()
      .typeError("숫자만 입력해주세요.")
      .required("가로를 입력해주세요."),
    height: yup
      .number()
      .typeError("숫자만 입력해주세요.")
      .required("세로를 입력해주세요."),
  });

  const {
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(applicationSpecResolver),
    defaultValues: {
      color: "none",
      thickness: "none",
      manufacture: "none",
      width: 0,
      height: 0,
    },
  });

  const colorOptions = [
    { key: "none", value: "none", label: "색상" },
    { key: "transparency", value: "transparency", label: "투명" },
    { key: "white", value: "white", label: "백색" },
    {
      key: "black-transparency",
      value: "black-transparency",
      label: "흑색(투명)",
    },
    { key: "black", value: "black", label: "흑색(불투명)" },
    { key: "red-transparency", value: "red-transparency", label: "빨강(투명)" },
    { key: "red", value: "red", label: "빨강(불투명)" },
    {
      key: "yellow-transparency",
      value: "yellow-transparency",
      label: "노랑(투명)",
    },
    { key: "yellow", value: "yellow", label: "노랑(불투명)" },
    {
      key: "blue-transparency",
      value: "blue-transparency",
      label: "파랑(투명)",
    },
    { key: "blue", value: "blue", label: "파랑(불투명)" },
    {
      key: "green-transparency",
      value: "green-transparency",
      label: "초록(투명)",
    },
    { key: "green", value: "green", label: "초록(불투명)" },
    {
      key: "brown-transparency",
      value: "brown-transparency",
      label: "갈색(투명)",
    },
    { key: "brown", value: "brown", label: "갈색(불투명)" },
    { key: "etc", value: "etc", label: "그 외 (주문-메일문의)" },
  ];

  const thicknessOptions = [
    { key: "none", value: "none", label: "두께" },
    { key: "2t", value: "2t", label: "2T" },
    { key: "3t", value: "3t", label: "3T" },
    { key: "4t", value: "4t", label: "4T" },
    { key: "5t", value: "5t", label: "5T" },
    { key: "6t", value: "6t", label: "6T" },
    { key: "8t", value: "8t", label: "8T" },
    { key: "10t", value: "10t", label: "10T" },
    { key: "12t", value: "12t", label: "12T" },
    { key: "15t", value: "15t", label: "15T" },
    { key: "18t", value: "18t", label: "18T" },
    { key: "20t", value: "20t", label: "20T" },
  ];

  const manufactureOptions = [
    { key: "none", value: "none", label: "가공" },
    { key: "hole", value: "hole", label: "홀가공" },
    { key: "round", value: "round", label: "모서리라운드" },
    { key: "45degress", value: "45degress", label: "테두리 45도" },
    { key: "bulgwang", value: "bulgwang", label: "측면불광" },
    { key: "mirror", value: "mirror", label: "경면가공" },
  ];

  return (
    <Wrapper>
      <Calculator>
        <SelectOption>
          <DropdownV2
            width="100%"
            optionContainerWidth="90%"
            options={colorOptions}
            {...getSimpleProps({ key: "color", setValue, watch, errors })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            optionContainerWidth="90%"
            options={thicknessOptions}
            {...getSimpleProps({ key: "thickness", setValue, watch, errors })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            optionContainerWidth="90%"
            options={manufactureOptions}
            {...getSimpleProps({
              key: "manufacture",
              setValue,
              watch,
              errors,
            })}
          />
        </SelectOption>
        <SizeWrapper>
          <LabelOption>
            <label>가로</label>
            <TextInputV2
              width="100%"
              maxLength={15}
              textAlignment="center"
              {...getSimpleProps({ key: "width", setValue, watch, errors })}
            />
          </LabelOption>
          <LabelText>X</LabelText>
          <LabelOption>
            <label>세로</label>
            <TextInputV2
              width="100%"
              maxLength={15}
              textAlignment="center"
              {...getSimpleProps({ key: "height", setValue, watch, errors })}
            />
          </LabelOption>
          <LabelOption>
            <label>수량</label>
            <TextInputV2
              width="100%"
              maxLength={10}
              textAlignment="center"
              {...getSimpleProps({ key: "width", setValue, watch, errors })}
            />
          </LabelOption>
        </SizeWrapper>
      </Calculator>
    </Wrapper>
  );
};

export default AcrylicCalcPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Calculator = styled.div`
  display: flex;
  width: 100%;
  min-width: 500px;
  gap: 10px;
`;

const SelectOption = styled.div`
  width: 100%;
  min-width: 150px;
  max-width: 170px;
`;

const LabelOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > label {
    display: flex;
    height: 100%;
    background-color: #f5f5f5;
    min-width: 50px;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #cbcfd6;
    border-bottom: 1px solid #cbcfd6;
    border-left: 1px solid #cbcfd6;
  }
`;

const LabelText = styled.div`
  display: flex;
  width: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const SizeWrapper = styled.div`
  width: 300px;
  display: flex;
  gap: 10px;
`;
