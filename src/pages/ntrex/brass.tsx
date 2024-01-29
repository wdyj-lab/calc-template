import DropdownV2 from "@/components/DropdownV2";
import TextInputV2 from "@/components/TextInputV2";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import {
  heightOptions,
  priceList,
  thicknesOptions,
  widthOptions,
} from "../../company/ntrex/BrassPlate";

import {
  heightOptions as scantlingHeightOptions,
  priceList as scantlingPriceList,
  thicknesOptions as scantlingThicknesOptions,
  widthOptions as scantlingWidthOptions,
} from "../../company/ntrex/BrassScantling";

import {
  heightOptions as sewingHeightOptions,
  priceList as sewingPriceList,
  widthOptions as sewingWidthOptions,
} from "../../company/ntrex/BrassSewing";

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
    thickness: yup.string()
      .when("foundationType", {
        is: (type: keyof typeof FoundationType) => type === "PLATE" || type === "SCANTLING",
        then: (schema: any) => schema.required("두께를 선택해주세요.")
      }),
    width: yup.string().required("가로를 선택해주세요."),
    height: yup.string().required("세로를 선택해주세요."),
    quantity: yup.number().typeError("").required("수량을 입력해주세요."),
  });

  const {
    watch,
    setValue,
    trigger,
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
    setValue("thickness", "");
    setValue("width", "");
    setValue("height", "");
    setValue("quantity", 1);
    setDirect(false);
    trigger();
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
      case "SEWING":
        return sewingWidthOptions;
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
      case "SEWING":
        return sewingHeightOptions;
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
      case "SEWING":
        return sewingPriceList;
      default:
        return [];
    }
  };

  const resultPrice = isValid
    ? // @ts-ignore
    foundationPriceList()[priceFindKey] * watch("quantity")
    : 0;

  const resultResultPrice = isNaN(resultPrice) ? 0 : resultPrice;

  const optionTitleObj = useCallback((type: keyof typeof FoundationType) => {
    switch (type) {
      case "PLATE":
        return {
          thicknesTitle: "두께(T/mm)",
          sizeTitle: "사이즈(mm)",
          thicknes: "두께",
          width: "가로",
          height: "세로",
        }
      case "SCANTLING":
        return {
          thicknesTitle: "높이(mm)",
          sizeTitle: "사이즈(mm)",
          thicknes: "높이",
          width: "가로",
          height: "세로",
        }
      case "SEWING":
        return {
          thicknesTitle: undefined,
          sizeTitle: "직경 X 길이 (mm)",
          thicknes: undefined,
          width: "직경",
          height: "길이",
        }
    }
  }, [])

  const currentType = watch("foundationType") as keyof typeof FoundationType;

  return (
    <Layout>
      <Wrapper>
        <FormLabel>원하시는 재단종류를 선택해주세요.</FormLabel>
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
            <FoundationTypeName isActive={watch("foundationType") === "PLATE"}>
              판재
            </FoundationTypeName>
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
            <FoundationTypeName
              isActive={watch("foundationType") === "SCANTLING"}
            >
              각재
            </FoundationTypeName>
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
            <FoundationTypeName isActive={watch("foundationType") === "SEWING"}>
              봉재
            </FoundationTypeName>
          </FoundationTypeContainer>
        </FoundationTypeArea>
        <OptionArea>
          {optionTitleObj(currentType)?.thicknesTitle && (
            <div>
              <FormLabel>{optionTitleObj(currentType)?.thicknesTitle}</FormLabel>
              <OptionRow>
                <SizeWrapper>
                  <DropdownV2
                    width="100%"
                    dropdownSize={"lg"}
                    optionContainerWidth="100%"
                    scrollMaxHeight="185px"
                    options={foundationThicknesOptions()}
                    placeholder={`${optionTitleObj(currentType).thicknes} 선택`}
                    {...getSimpleProps({
                      key: "thickness",
                      setValue,
                      watch,
                      errors,
                    })}
                    hintText={`${optionTitleObj(currentType).thicknes}를 선택해주세요`}
                  />
                </SizeWrapper>
                <BetweenText></BetweenText>
                <SizeWrapper />
              </OptionRow>
            </div>
          )}
          <div>
            <FormLabel>{optionTitleObj(currentType).sizeTitle}</FormLabel>
            <OptionRow>
              <DropdownV2
                width="100%"
                dropdownSize={"lg"}
                optionContainerWidth="100%"
                scrollMaxHeight="185px"
                options={foundationWidthOptions()}
                placeholder={`${optionTitleObj(currentType).width} 사이즈 선택`}
                {...getSimpleProps({ key: "width", setValue, watch, errors })}
                hintText={`${optionTitleObj(currentType).width}를 선택해주세요`}
              />
              <BetweenText>X</BetweenText>
              <DropdownV2
                width="100%"
                dropdownSize={"lg"}
                optionContainerWidth="100%"
                scrollMaxHeight="185px"
                options={foundationHeightOptions()}
                placeholder={`${optionTitleObj(currentType).height} 사이즈 선택`}
                {...getSimpleProps({ key: "height", setValue, watch, errors })}
                hintText={`${optionTitleObj(currentType).height}를 선택해주세요`}
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
                  autoFocus
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
            <PriceResult>{resultResultPrice.toLocaleString()}원</PriceResult>
          </PriceWrapper>
          <PriceDescription>
            {isValid
              ? "하단을 참고하여 상품 수량을 입력해주세요!"
              : "구매하실 상품 사양을 입력해주세요!"}
          </PriceDescription>
        </ResultArea>

        {isValid && (
          <SmartStoreDescription>
            <SmartStoreDescriptionTitle>
              상단에서 주문수량을{" "}
              <b>{Math.ceil(resultResultPrice / 100).toLocaleString()}</b>개로
              결제해주세요.
            </SmartStoreDescriptionTitle>
            <SmartStoreDescriptionImageBox>
              <SmartStoreDescriptionQuantity>
                {Math.ceil(resultResultPrice / 100)}
              </SmartStoreDescriptionQuantity>
              <SmartStoreDescriptionMaxQuantity>
                총 수량 {Math.ceil(resultResultPrice / 100).toLocaleString()}개
              </SmartStoreDescriptionMaxQuantity>
              <SmartStoreDescriptionMaxPrice>
                {resultResultPrice.toLocaleString()}원
              </SmartStoreDescriptionMaxPrice>
              <Image
                src={"/assets/ntrex/store_result.png"}
                alt={"result"}
                layout={"fill"}
                objectFit={"contain"}
              />
            </SmartStoreDescriptionImageBox>
          </SmartStoreDescription>
        )}
      </Wrapper>
    </Layout>
  );
};

export default BrassPage;

const Layout = styled.div`
  width: 100%;
  max-width: 1000px;

  > *,
  input,
  label,
  button,
  div,
  span,
  textarea,
  select {
    font-family: "NanumSquareRound", sans-serif;
  }

  @font-face {
    font-family: "NanumSquareRound";
    font-weight: 400;
    src: url("/fonts/NanumSquareRoundR.ttf") format("truetype");
  }

  @font-face {
    font-family: "NanumSquareRound";
    font-weight: 800;
    src: url("/fonts/NanumSquareRoundB.ttf") format("truetype");
  }
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

const FoundationTypeName = styled.div<{ isActive: boolean }>`
  font-size: 1.4rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  text-align: center;

  ${({ isActive }) => isActive && "color: #586fe2;"}
`;

const FormLabel = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;

  @media (max-width: 550px) {
    font-size: 1.3rem;
  }
`;

const OptionArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-top: 2px solid #e5e5e5;
  padding-top: 30px;
`;

const OptionRow = styled.div`
  width: 100%;
  display: flex;
`;

const BetweenText = styled.div`
  display: flex;
  width: 120px;
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

const QuantityDropDown = styled(DropdownV2) <{ isActive: boolean }>`
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

const SmartStoreDescription = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const SmartStoreDescriptionTitle = styled.div`
  font-size: 1.5rem;

  > b {
    color: #586fe2;
  }

  @media (max-width: 550px) {
    font-size: 1.1rem;
  }
`;

const SmartStoreDescriptionImageBox = styled.div`
  position: relative;
  width: 500px;
  height: 300px;

  @media (max-width: 550px) {
    width: 380px;
    height: 200px;
  }
`;

const SmartStoreDescriptionQuantity = styled.div`
  position: absolute;
  z-index: 1;

  top: 27px;
  left: 50px;

  width: 50px;
  height: 34px;
  text-align: center;

  border: 3px solid #d40022;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 550px) {
    width: 32px;
    height: 23px;

    border: 2px solid #d40022;

    top: 15px;
    left: 50px;

    font-size: 0.7rem;
  }
`;

const SmartStoreDescriptionMaxQuantity = styled.div`
  position: absolute;
  z-index: 1;

  color: #999;

  top: 116px;
  right: 200px;

  background-color: #fff;

  width: 160px;
  text-align: end;

  @media (max-width: 550px) {
    width: 130px;
    height: 14px;

    background-color: #fff;

    top: 75px;
    left: 85px;

    font-size: 0.7rem;
  }
`;

const SmartStoreDescriptionMaxPrice = styled.div`
  position: absolute;
  z-index: 1;

  font-weight: 800;
  font-size: 1.5rem;

  color: #d40022;

  top: 112px;
  right: 18px;

  @media (max-width: 550px) {
    top: 72px;
    right: 30px;

    font-size: 1rem;
  }
`;

const SizeWrapper = styled.div`
  width: 100%;
  max-width: 456px;
`;
