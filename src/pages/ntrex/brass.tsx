import DropdownV2 from "@/components/DropdownV2";
import TextInputV2 from "@/components/TextInputV2";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import {
  heightOptions,
  priceList,
  thicknesOptions,
  widthOptions,
} from "./BrassPlate";

import {
  heightOptions as scantlingHeightOptions,
  priceList as scantlingPriceList,
  thicknesOptions as scantlingThicknesOptions,
  widthOptions as scantlingWidthOptions,
} from "./ScantlingPlate";

enum FoundationType {
  PLATE = "판재",
  SCANTLING = "각재",
  SEWING = "봉재",
}

const BrassPage = () => {
  const [direct, setDirect] = useState(false);
  const formResolver = yup.object().shape({
    foundationType: yup
      .mixed()
      .oneOf(Object.keys(FoundationType))
      .required("재단 종류를 선택해주세요."),
    thickness: yup.string().required("두께를 선택해주세요."),
    width: yup.string().required("가로를 입력해주세요."),
    height: yup.string().required("세로를 입력해주세요."),
    quantity: yup.number().typeError("").required("수량을 입력해주세요."),
  });

  const {
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formResolver),
    defaultValues: {
      foundationType: "PLATE",
      quantity: 1,
    },
  });

  const handleFoundationTypeClick = (type: keyof typeof FoundationType) => {
    setValue("foundationType", type);
  };

  const handleQuantityClick = (quantity: number) => {
    setValue("quantity", quantity);
    setDirect(false);
  };

  const priceFindKey = `${watch("foundationType")}: ${watch("width")}x${watch(
    "height"
  )}x${watch("thickness")}`;

  const previewQuantities = [1, 2, 5, 10];

  const quantityOptions = [
    { key: "direct", value: -1, label: "직접입력" },
    { key: "50", value: 50, label: "50" },
    { key: "100", value: 100, label: "100" },
    { key: "200", value: 200, label: "200" },
    { key: "300", value: 300, label: "300" },
  ];

  const foundationThicknesOptions = () => {
    switch (watch("foundationType")) {
      case "PLATE":
        return thicknesOptions;
      case "SCANTLING":
        return scantlingThicknesOptions;
      default:
        return [];
    }
  };

  const foundationWidthOptions = () => {
    switch (watch("foundationType")) {
      case "PLATE":
        return widthOptions;
      case "SCANTLING":
        return scantlingWidthOptions;
      default:
        return [];
    }
  };

  const foundationHeightOptions = () => {
    switch (watch("foundationType")) {
      case "PLATE":
        return heightOptions;
      case "SCANTLING":
        return scantlingHeightOptions;
      default:
        return [];
    }
  };

  const foundationPriceList = () => {
    switch (watch("foundationType")) {
      case "PLATE":
        return priceList;
      case "SCANTLING":
        return scantlingPriceList;
      default:
        return [];
    }
  };

  const resultPrice = isValid
    ? // @ts-ignore
      foundationPriceList()[priceFindKey] * watch("quantity")
    : 0;

  return (
    <Layout>
      <Wrapper>
        <FormLabel>재단 종류</FormLabel>
        <FoundationTypeArea>
          <FoundationTypeContainer>
            <FoundationTypeImageBox
              isActive={watch("foundationType") === "PLATE"}
              onClick={() => handleFoundationTypeClick("PLATE")}
            >
              <Image
                src={"/assets/ntrex/황동 판재.jpg"}
                alt={"황동 판재"}
                layout={"fill"}
                objectFit={"contain"}
              />
            </FoundationTypeImageBox>
            <FoundationTypeName>판재</FoundationTypeName>
          </FoundationTypeContainer>
          <FoundationTypeContainer>
            <FoundationTypeImageBox
              isActive={watch("foundationType") === "SCANTLING"}
              onClick={() => handleFoundationTypeClick("SCANTLING")}
            >
              <Image
                src={"/assets/ntrex/황동 각재.jpg"}
                alt={"황동 각재"}
                layout={"fill"}
                objectFit={"contain"}
              />
            </FoundationTypeImageBox>
            <FoundationTypeName>각재</FoundationTypeName>
          </FoundationTypeContainer>
          <FoundationTypeContainer>
            <FoundationTypeImageBox
              isActive={watch("foundationType") === "SEWING"}
              onClick={() => handleFoundationTypeClick("SEWING")}
            >
              <Image
                src={"/assets/ntrex/황동 봉재.jpg"}
                alt={"황동 봉재"}
                layout={"fill"}
                objectFit={"contain"}
              />
            </FoundationTypeImageBox>
            <FoundationTypeName>봉재</FoundationTypeName>
          </FoundationTypeContainer>
        </FoundationTypeArea>
        <OptionArea>
          <div>
            <FormLabel>두께(T/mm)</FormLabel>
            <OptionRow>
              <DropdownV2
                width="100%"
                dropdownSize={"lg"}
                optionContainerWidth="100%"
                scrollMaxHeight="185px"
                options={foundationThicknesOptions()}
                placeholder="두께 사이즈 입력"
                {...getSimpleProps({
                  key: "thickness",
                  setValue,
                  watch,
                  errors,
                })}
              />
            </OptionRow>
          </div>
          <div>
            <FormLabel>사이즈(mm)</FormLabel>
            <OptionRow>
              <DropdownV2
                width="100%"
                dropdownSize={"lg"}
                optionContainerWidth="100%"
                scrollMaxHeight="185px"
                options={foundationWidthOptions()}
                placeholder="가로 사이즈 입력"
                {...getSimpleProps({ key: "width", setValue, watch, errors })}
              />
              <BetweenText>X</BetweenText>
              <DropdownV2
                width="100%"
                dropdownSize={"lg"}
                optionContainerWidth="100%"
                scrollMaxHeight="185px"
                options={foundationHeightOptions()}
                placeholder="세로 사이즈 입력"
                {...getSimpleProps({ key: "height", setValue, watch, errors })}
              />
            </OptionRow>
          </div>
          <div>
            <FormLabel>수량</FormLabel>
            <QuantityOption>
              {previewQuantities.map((quantity) => (
                <QuantityOptionItem
                  key={quantity.toString()}
                  onClick={() => handleQuantityClick(quantity)}
                  isActive={watch("quantity") === quantity}
                >
                  {quantity}
                </QuantityOptionItem>
              ))}
              {!direct ? (
                <QuantityDropDown
                  width="100%"
                  dropdownSize={"lg"}
                  optionContainerWidth="100%"
                  scrollMaxHeight="185px"
                  borderRadius="8px"
                  options={quantityOptions}
                  isActive={!previewQuantities.includes(watch("quantity"))}
                  {...getSimpleProps({
                    key: "quantity",
                    setValue,
                    watch,
                    errors,
                  })}
                  onChange={(value) => {
                    if (value === -1) {
                      setDirect(true);
                      setValue("quantity", 0, { shouldValidate: true });
                      return;
                    }
                    setValue("quantity", value, { shouldValidate: true });
                  }}
                />
              ) : (
                <FocusTextInput
                  width="100%"
                  size={"lg"}
                  textAlignment="center"
                  maxLength={8}
                  {...getSimpleProps({
                    key: "quantity",
                    setValue,
                    watch,
                    errors,
                  })}
                />
              )}
            </QuantityOption>
          </div>
        </OptionArea>

        <ResultArea>
          <PriceWrapper>
            <PriceLabel>상품 금액</PriceLabel>
            <PriceResult>{resultPrice.toLocaleString()}원</PriceResult>
          </PriceWrapper>
          <PriceDescription>
            {isValid
              ? "하단을 참고하여 상품 수량을 입력해주세요!"
              : "구매하실 상품 사양을 입력해주세요!"}
          </PriceDescription>
        </ResultArea>
      </Wrapper>
    </Layout>
  );
};

export default BrassPage;

const Layout = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  padding: 20px 20px;
`;

const FoundationTypeArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  margin-bottom: 30px;
`;

const FoundationTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FoundationTypeImageBox = styled.div<{ isActive: boolean }>`
  width: 100%;
  padding-top: 100.84758364312268%;
  position: relative;
  cursor: pointer;
  ${({ isActive }) => isActive && "outline: 4px solid #586fe2;"}
  transition: outline 0.2s ease-in-out;

  border-radius: 8px;
  overflow: hidden;

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;

const FoundationTypeName = styled.div`
  font-size: 1.3rem;
  letter-spacing: 0.08em;
  font-weight: 500;
  text-align: center;
`;

const FormLabel = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const OptionArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const OptionRow = styled.div`
  width: 100%;
  display: flex;
`;

const BetweenText = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-size: 1.3rem;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

const QuantityOption = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const QuantityOptionItem = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid #cbcfd6;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;
  height: 48px;

  font-size: 1.3rem;
  font-weight: bold;
  color: #cbcfd6;

  ${({ isActive }) =>
    isActive &&
    `
  border: 2px solid #586fe2;
  color: #586fe2;
  `}
`;

const QuantityDropDown = styled(DropdownV2)<{ isActive: boolean }>`
  ${({ isActive }) =>
    isActive &&
    `
  > div {
    border: 2px solid #586fe2;
    border-radius: 8px;
  }
  `}
  label {
    width: 100%;
    font-size: 1.3rem;
    text-align: center;
    font-weight: bold;
    color: #586fe2;
  }
`;

const FocusTextInput = styled(TextInputV2)`
  height: 49px;
  > div {
    border: 2px solid #586fe2;
    border-radius: 8px;

    input {
      font-size: 1.3rem;
      font-weight: bold;
      color: #586fe2;
    }
  }
`;

const ResultArea = styled.div`
  width: 100%;
  height: 130px;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;

  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;
  margin: 30px 10px;
  gap: 10px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriceLabel = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
`;

const PriceResult = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const PriceDescription = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: #586fe2;
`;
