import DropdownV2 from "@/components/DropdownV2/DropdownV2";
import TextInputV2 from "@/components/TextInputV2/TextInputV2";
import useWindowSize from "@/lib/hooks/useWindowSize";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import * as yup from "yup";

import Image from "next/image";

const FrameCalcPage = () => {
  const noneRegex = /^(?!none$).*/;

  const applicationSpecResolver = yup.object().shape({
    material: yup.string().matches(noneRegex, "뒷면 재질을 선택해주세요."),
    thickness: yup.string().matches(noneRegex, "뒷면 두께를 선택해주세요."),
    frontMaterial: yup.string().matches(noneRegex, "앞면 재질을 선택해주세요."),
    frontThickness: yup
      .string()
      .matches(noneRegex, "앞면 두께를 선택해주세요."),
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
      material: "none",
      thickness: "none",
      frontMaterial: "none",
      frontThickness: "none",
      width: undefined,
      height: undefined,
      quantity: undefined,
    },
  });

  const edgeOptions = [
    { key: "none", value: "none", label: "가공" },
    { key: "round", value: "round", label: "원형" },
    { key: "white", value: "square", label: "사각" },
  ];

  const materialOptions = [
    { key: "none", value: "none", label: "뒷면 재질" },
    { key: "acrylic", value: "acrylic", label: "아크릴" },
  ];

  const frontMaterialOptions = [
    { key: "none", value: "none", label: "앞면 재질" },
    { key: "acrylic", value: "acrylic", label: "아크릴" },
    { key: "fomex", value: "fomex", label: "포멕스" },
  ];

  const acrylicThicknessOptions = [
    { key: "none", value: "none", label: "두께" },
    { key: "2t", value: "0.0258", label: "2T" },
    { key: "3t", value: "0.0375", label: "3T" },
    { key: "4t", value: "0.0483", label: "4T" },
    { key: "5t", value: "0.0591", label: "5T" },
    { key: "6t", value: "0.07", label: "6T" },
    { key: "8t", value: "0.0958", label: "8T" },
    { key: "10t", value: "0.1166", label: "10T" },
    { key: "12t", value: "0.1416", label: "12T" },
    { key: "15t", value: "0.175", label: "15T" },
    { key: "18t", value: "0.2083", label: "18T" },
    { key: "20t", value: "0.25", label: "20T" },
  ];

  const fomexThicknessOptions = [
    { key: "none", value: "none", label: "두께" },
    { key: "1t", value: "0.0075", label: "1T" },
    { key: "2t", value: "0.0112", label: "2T" },
    { key: "3t", value: "0.0175", label: "3T" },
    { key: "5t", value: "0.0283", label: "5T" },
    { key: "8t", value: "0.045", label: "8T" },
    { key: "10t", value: "0.055", label: "10T" },
  ];

  const pricePerPrice =
    Math.ceil(
      (watch("width") * watch("height") * Number(watch("thickness")) +
        Number(watch("frontThickness"))) /
        100
    ) * 100;

  const calcData = pricePerPrice * watch("quantity");

  const isResult = calcData.toString() !== "NaN" && calcData > 0 && isValid;

  const { width } = useWindowSize();

  return (
    <Wrapper>
      <Notice>
        <Image src={"/notice_img.png"} layout="fill" alt={""} />
      </Notice>
      <Title>
        <h1>다보액자 자동 견적 계산기</h1>
        <span>모든 사이즈의 단위는 mm를 기준으로합니다.[mm]</span>
      </Title>
      <Calculator>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            options={materialOptions}
            {...getSimpleProps({ key: "material", setValue, watch, errors })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            options={acrylicThicknessOptions}
            {...getSimpleProps({
              key: "thickness",
              setValue,
              watch,
              errors,
            })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            options={frontMaterialOptions}
            {...getSimpleProps({
              key: "frontMaterial",
              setValue,
              watch,
              errors,
            })}
          />
        </SelectOption>
        <SelectOption>
          <DropdownV2
            width="100%"
            dropdownSize={width > 1000 ? "md" : "lg"}
            optionContainerWidth="100%"
            options={
              watch("frontMaterial") === "acrylic"
                ? acrylicThicknessOptions
                : fomexThicknessOptions
            }
            {...getSimpleProps({
              key: "frontThickness",
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
          <p>옵션 및 수량을 사진과 동일하게 입력해주세요.</p>
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
                    materialOptions.find(
                      (option) => option.value === watch("material")
                    )?.label
                  }
                </p>
                <p>
                  {
                    acrylicThicknessOptions.find(
                      (option) => option.value === watch("thickness")
                    )?.label
                  }
                </p>
                <p>
                  {
                    frontMaterialOptions.find(
                      (option) => option.value === watch("frontMaterial")
                    )?.label
                  }
                </p>
                <p>
                  {watch("frontMaterial") === "acrylic"
                    ? acrylicThicknessOptions.find(
                        (option) => option.value === watch("frontThickness")
                      )?.label
                    : fomexThicknessOptions.find(
                        (option) => option.value === watch("frontThickness")
                      )?.label}
                </p>
              </div>
            </ResultMessage>
          </ResultBox>
        </ResultArea>
      )}
    </Wrapper>
  );
};

export default FrameCalcPage;

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
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const SelectOption = styled.div`
  width: 100%;
  flex: 1;

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
  margin-top: 15px;

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
