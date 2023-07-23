import DropdownV2 from "@/components/DropdownV2/DropdownV2";
import TextInputV2 from "@/components/TextInputV2/TextInputV2";
import useWindowSize from "@/lib/hooks/useWindowSize";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import * as yup from "yup";

import Image from "next/image";

const FomexCalcPage = () => {
  const noneRegex = /^(?!none$).*/;

  const applicationSpecResolver = yup.object().shape({
    color: yup.string().matches(noneRegex, "색상을 선택해주세요."),
    thickness: yup.string().matches(noneRegex, "두께를 선택해주세요."),
    manufacture: yup.string().matches(noneRegex, "가공 형태를 선택해주세요."),
    width: yup
      .number()
      .typeError("숫자만 입력해주세요.")
      .required("가로를 입력해주세요."),
    height: yup
      .number()
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
      manufacture: "none",
      width: undefined,
      height: undefined,
      quantity: undefined,
    },
  });

  const colorOptions = [
    { key: "none", value: "none", label: "색상" },
    { key: "white", value: "white", label: "백색" },
    { key: "black", value: "black", label: "검정" },
    { key: "red", value: "red", label: "빨강" },
    { key: "yellow", value: "yellow", label: "노랑" },
    { key: "blue", value: "blue", label: "파랑" },
    { key: "green", value: "green", label: "연두" },
    { key: "brown", value: "brown", label: "갈색" },
    { key: "grey", value: "grey", label: "회색" },
    { key: "etc", value: "etc", label: "그 외 (주문-메일문의)" },
  ];

  const thicknessOptions = [
    { key: "none", value: "none", label: "두께" },
    { key: "1t", value: "0.0075", label: "1T" },
    { key: "2t", value: "0.0112", label: "2T" },
    { key: "3t", value: "0.0175", label: "3T" },
    { key: "5t", value: "0.0283", label: "5T" },
    { key: "8t", value: "0.045", label: "8T" },
    { key: "10t", value: "0.055", label: "10T" },
  ];

  const manufactureOptions = [
    { key: "none", value: "none", label: "가공" },
    { key: "hole", value: "hole", label: "홀가공" },
    { key: "round", value: "round", label: "모서리라운드" },
    { key: "gok", value: "gok", label: "절곡" },
  ];

  const pricePerPrice =
    Math.ceil(
      (watch("width") * watch("height") * Number(watch("thickness"))) / 100
    ) * 100;

  const calcData = pricePerPrice * watch("quantity");

  const isResult = calcData.toString() !== "NaN" && calcData > 0 && isValid;

  const { width } = useWindowSize();

  return (
    <Wrapper>
      <Calculator>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            options={colorOptions}
            {...getSimpleProps({ key: "color", setValue, watch, errors })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            options={thicknessOptions}
            {...getSimpleProps({ key: "thickness", setValue, watch, errors })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
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
          <p>아래와 같이 입력해주세요!</p>
          <ResultBox>
            <ImageBox>
              <Image
                src={`/result_example1.png`}
                width={400}
                height={450}
                alt={""}
              />
              <p>{calcData / 100}</p>
            </ImageBox>
            <ResultMessage>
              <div>
                <p>
                  {watch("width")}x{watch("height")}mm
                </p>
                <p>{watch("quantity")}</p>
              </div>
              <div>
                <p>
                  {
                    colorOptions.find(
                      (option) => option.value === watch("color")
                    )?.label
                  }
                </p>
                <p>
                  {
                    thicknessOptions.find(
                      (option) => option.value === watch("thickness")
                    )?.label
                  }
                </p>
                <p>
                  {
                    manufactureOptions.find(
                      (option) => option.value === watch("manufacture")
                    )?.label
                  }
                </p>
              </div>
            </ResultMessage>
          </ResultBox>
        </ResultArea>
      )}
    </Wrapper>
  );
};

export default FomexCalcPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
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
