import DropdownV2 from "@/components/DropdownV2/DropdownV2";
import TextInputV2 from "@/components/TextInputV2/TextInputV2";
import useWindowSize from "@/lib/hooks/useWindowSize";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import * as yup from "yup";

import Image from "next/image";

const AcrylicCalcPage = () => {
  const noneRegex = /^(?!none$).*/;

  const applicationSpecResolver = yup.object().shape({
    color: yup.string().matches(noneRegex, "색상을 선택해주세요."),
    thickness: yup.string().matches(noneRegex, "두께를 선택해주세요."),
    width: yup
      .number()
      .min(100, "최소 100mm 이상 입력")
      .max(1200, "최대 1200mm 이하 입력")
      .typeError("숫자만 입력해주세요.")
      .required("가로를 입력해주세요."),
    height: yup
      .number()
      .min(100, "최소 100mm 이상 입력")
      .max(2400, "최대 2400mm 이하 입력")
      .typeError("숫자만 입력해주세요.")
      .required("세로를 입력해주세요."),
    quantity: yup
      .number()
      .typeError("숫자만 입력해주세요.")
      .min(1, "최소 1개 이상 선택")
      .required("수량을 입력해주세요."),
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
      width: undefined,
      height: undefined,
      quantity: undefined,
    },
  });

  const colorOptions = [
    { key: "none", value: "none", label: "색상" },
    { key: "transparency", value: "transparency", label: "투명" },
    { key: "white", value: "white", label: "백색(반투명)" },
    { key: "white2", value: "white2", label: "백색(불투명)" },
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
  ];

  const thicknessOptions = [
    { key: "none", value: "none", label: "두께" },
    { key: "2t", value: "2", label: "2T" },
    { key: "3t", value: "3", label: "3T" },
    { key: "5t", value: "5", label: "5T" },
    { key: "8t", value: "8", label: "8T" },
    { key: "10t", value: "10", label: "10T" },
    { key: "12t", value: "12", label: "12T" },
    { key: "15t", value: "15", label: "15T" },
    { key: "20t", value: "20", label: "20T" },
  ];

  const colorThicknessOptions = [
    { key: "none", value: "none", label: "두께" },
    { key: "2t", value: "2", label: "2T" },
    { key: "3t", value: "3", label: "3T" },
    { key: "5t", value: "5", label: "5T" },
    { key: "8t", value: "8", label: "8T" },
    { key: "10t", value: "10", label: "10T" },
  ];

  const widthCm = Number(watch("width")) / 10;
  const heightCm = Number(watch("height")) / 10;
  const thicknessCm = Number(watch("thickness")) / 10;

  const pricePerPrice =
    Math.ceil((widthCm * heightCm * thicknessCm * 18) / 100) * 100;

  const calcData = pricePerPrice * watch("quantity");

  const isResult = calcData.toString() !== "NaN" && calcData > 0 && isValid;

  const { width } = useWindowSize();

  return (
    <Wrapper>
      <Notice>
        <Image src={"/notice_img.png"} layout="fill" alt={""} />
      </Notice>
      <Title>
        <h1>아크릴 자동 견적 계산기</h1>
        <span>모든 사이즈의 단위는 mm를 기준으로합니다.[mm]</span>
      </Title>
      <Calculator>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            scrollMaxHeight="185px"
            options={colorOptions}
            {...getSimpleProps({ key: "color", setValue, watch, errors })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            scrollMaxHeight="185px"
            options={
              watch("color") === "transparency"
                ? thicknessOptions
                : colorThicknessOptions
            }
            {...getSimpleProps({ key: "thickness", setValue, watch, errors })}
          />
        </SelectOption>
        <SizeWrapper>
          <LabelOption>
            <label>가로</label>
            <TextInputV2
              width="100%"
              size={width > 1000 ? "md" : "lg"}
              textAlignment="center"
              maxLength={12}
              {...getSimpleProps({ key: "width", setValue, watch, errors })}
            />
          </LabelOption>
          <LabelText>X</LabelText>
          <LabelOption>
            <label>세로</label>
            <TextInputV2
              width="100%"
              size={width > 1000 ? "md" : "lg"}
              textAlignment="center"
              maxLength={12}
              {...getSimpleProps({ key: "height", setValue, watch, errors })}
            />
          </LabelOption>
          <QuantityOption>
            <label>수량</label>
            <TextInputV2
              width="100%"
              size={width > 1000 ? "md" : "lg"}
              textAlignment="center"
              maxLength={8}
              {...getSimpleProps({ key: "quantity", setValue, watch, errors })}
              onKeyDown={(e) => trigger()}
            />
          </QuantityOption>
        </SizeWrapper>
      </Calculator>
      {isResult && (
        <ResultArea>
          <div>
            1장당 가격 <b>{pricePerPrice.toLocaleString("ko")}원</b> X 주문 수량{" "}
            <b>{watch("quantity")}장</b> = 총 주문 금액{" "}
            <b>{calcData.toLocaleString("ko")}원</b>
          </div>
        </ResultArea>
      )}
    </Wrapper>
  );
};

export default AcrylicCalcPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
`;

const Notice = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 52.84758364312268%;
`;

const Title = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #586fe2;
  color: white;

  > h1 {
    margin: 10px 0;
  }

  > span {
    color: #b7c8ff;
  }
`;

const Calculator = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  gap: 10px;

  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const SelectOption = styled.div`
  width: 100%;
  min-width: 150px;
  max-width: 150px;

  @media (max-width: 1000px) {
    flex: 1;
    max-width: 100%;
    margin-bottom: 12px;
  }
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
    max-height: 50px;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1000px) {
    flex: 2;
  }

  @media (max-width: 500px) {
    margin-bottom: 12px;
  }
`;

const QuantityOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > label {
    display: flex;
    height: 100%;
    background-color: #f5f5f5;
    min-width: 50px;
    max-height: 50px;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1000px) {
    flex: 1;
  }
  @media (max-width: 500px) {
    margin-bottom: 12px;
  }
`;

const LabelText = styled.div`
  display: flex;
  width: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const SizeWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const ResultArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  align-items: center;

  > p {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    width: 100%;
    height: 50px;
  }
`;

const ResultBox = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ResultMessage = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;

  p {
    margin-top: 15px;
    margin-bottom: 15px;
    color: red;
    font-weight: 600;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > p {
    font-size: 20px;
    font-weight: 600;
    color: red;
    background-color: white;
    position: absolute;
    bottom: 157px;
    left: 120px;
  }
`;
