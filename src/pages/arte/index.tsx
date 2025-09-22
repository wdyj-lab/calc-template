/* eslint-disable @next/next/no-img-element */
import DropdownV2 from "@/components/DropdownV2";
import TextInputV2 from "@/components/TextInputV2";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { StringLabelOption } from "@/types/Option";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "styled-components";
import * as yup from "yup";

export default function ArtePage() {
  const quantityOptions = [
    { key: "1~300", label: "1장이상~300장미만", value: "1~300" },
    { key: "300~1000", label: "300장이상~1,000장미만", value: "300~1000" },
    { key: "1000~2000", label: "1,000장이상~2,000장미만", value: "1000~2000" },
    { key: "2000~5000", label: "2,000장이상~5,000장미만", value: "2000~5000" },
    { key: "5000~10000", label: "5,000장이상~만장미만", value: "5000~10000" },
    { key: "10000~", label: "만장이상", value: "10000~" },
  ];

  const colorOptions = [
    { key: "black", label: "흑백", value: "black" },
    { key: "alpha50", label: "칼라배경비율 50%이하", value: "alpha50" },
    { key: "alpha60", label: "칼라배경비율 60%이상", value: "alpha60" },
  ];

  const pageOptions: { [key: string]: StringLabelOption[] } = {
    black: [
      { key: "oneSide", label: "단면", value: "oneSide" },
      { key: "twoSide", label: "양면", value: "twoSide" },
    ],
    alpha50: [
      { key: "oneSide", label: "단면", value: "oneSide" },
      { key: "twoSideHalf", label: "양면(칼라&흑백)", value: "twoSideHalf" },
      { key: "twoSideFull", label: "양면(칼라&칼라)", value: "twoSideFull" },
    ],
    alpha60: [
      { key: "oneSide", label: "단면", value: "oneSide" },
      { key: "twoSideHalf", label: "양면(칼라&흑백)", value: "twoSideHalf" },
      { key: "twoSideFull", label: "양면(칼라&칼라)", value: "twoSideFull" },
    ],
  };

  const unitPrice: { [key: string]: number } = {
    "1~300/black/oneSide": 180,
    "1~300/black/twoSide": 270,
    "300~1000/black/oneSide": 160,
    "300~1000/black/twoSide": 240,
    "1000~2000/black/oneSide": 140,
    "1000~2000/black/twoSide": 180,
    "2000~5000/black/oneSide": 90,
    "2000~5000/black/twoSide": 120,
    "5000~10000/black/oneSide": 80,
    "5000~10000/black/twoSide": 110,
    "10000~/black/oneSide": 70,
    "10000~/black/twoSide": 90,

    "1~300/alpha50/oneSide": 260,
    "1~300/alpha50/twoSideHalf": 360,
    "1~300/alpha50/twoSideFull": 390,
    "300~1000/alpha50/oneSide": 220,
    "300~1000/alpha50/twoSideHalf": 290,
    "300~1000/alpha50/twoSideFull": 330,
    "1000~2000/alpha50/oneSide": 190,
    "1000~2000/alpha50/twoSideHalf": 240,
    "1000~2000/alpha50/twoSideFull": 290,
    "2000~5000/alpha50/oneSide": 110,
    "2000~5000/alpha50/twoSideHalf": 140,
    "2000~5000/alpha50/twoSideFull": 160,
    "5000~10000/alpha50/oneSide": 90,
    "5000~10000/alpha50/twoSideHalf": 120,
    "5000~10000/alpha50/twoSideFull": 150,
    "10000~/alpha50/oneSide": 80,
    "10000~/alpha50/twoSideHalf": 110,
    "10000~/alpha50/twoSideFull": 140,

    "1~300/alpha60/oneSide": 290,
    "1~300/alpha60/twoSideHalf": 400,
    "1~300/alpha60/twoSideFull": 480,
    "300~1000/alpha60/oneSide": 260,
    "300~1000/alpha60/twoSideHalf": 330,
    "300~1000/alpha60/twoSideFull": 360,
    "1000~2000/alpha60/oneSide": 200,
    "1000~2000/alpha60/twoSideHalf": 270,
    "1000~2000/alpha60/twoSideFull": 330,
    "2000~5000/alpha60/oneSide": 180,
    "2000~5000/alpha60/twoSideHalf": 240,
    "2000~5000/alpha60/twoSideFull": 280,
    "5000~10000/alpha60/oneSide": 160,
    "5000~10000/alpha60/twoSideHalf": 190,
    "5000~10000/alpha60/twoSideFull": 230,
    "10000~/alpha60/oneSide": 150,
    "10000~/alpha60/twoSideHalf": 170,
    "10000~/alpha60/twoSideFull": 190,
  };

  const formResolver = yup
    .object<{
      quantity: string;
      color: string;
      page: string;
      ea: string;
    }>()
    .shape({
      quantity: yup.string().required("수량을 선택해주세요"),
      color: yup.string(),
      page: yup.string(),
      ea: yup
        .string()
        .required("수량을 입력해주세요")
        .test(
          "range-validation",
          "선택한 수량 범위에 맞지 않습니다",
          function (value) {
            const { quantity } = this.parent;
            if (!quantity || !value) return true;

            const eaNumber = parseInt(value);
            if (isNaN(eaNumber)) return false;

            if (quantity.includes("~")) {
              const [minStr, maxStr] = quantity.split("~");
              const min = parseInt(minStr);

              if (maxStr === "") {
                return eaNumber >= min;
              } else {
                const max = parseInt(maxStr);
                return eaNumber >= min && eaNumber < max;
              }
            }

            return true;
          }
        ),
    });

  const {
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formResolver),
  });

  const seletedOptionKey = `${watch("quantity")}/${watch("color")}/${watch(
    "page"
  )}`;

  const totalPrice = unitPrice[seletedOptionKey] * Number(watch("ea") || 0);

  const resultPrice = isNaN(totalPrice)
    ? "금액자동계산"
    : totalPrice.toLocaleString() + "원";

  return (
    <Layout>
      <TitleImage>
        <Image
          src="/assets/arte/title.jpg"
          alt="arte logo"
          width={590}
          height={101}
        />
      </TitleImage>
      <ControlBox>
        <Notice>
          <p>
            본 계산서기는 주문전 금액 확인용으로 사용 바랍니다.
            <br />
            금액 확인후 주문 옵션에서 수량 및 컬러, 인쇄면 선택해서 주문주시면
            됩니다.
          </p>
        </Notice>
        <ButtonWrapper>
          <img
            src="/assets/arte/return_ic.jpg"
            alt="주문페이지로 가기"
            style={{ cursor: "pointer" }}
            onClick={() => console.log("Go to order page")}
          />
          <img
            src="/assets/arte/reset_ic.jpg"
            alt="계산기 리셋"
            style={{ cursor: "pointer" }}
            onClick={() => reset({})}
          />
        </ButtonWrapper>
      </ControlBox>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={3}
              style={{
                background: "#8593A9",
                color: "white",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              인쇄옵션
            </th>
            <th
              style={{
                background: "#7A7A7C",
                color: "white",
                border: "1px solid black",
                padding: "10px",
              }}
              rowSpan={2}
            >
              인쇄수량
              <br />
              (숫자를 입력해 주세요)
            </th>
            <th
              style={{
                background: "#CC312A",
                color: "white",
                border: "1px solid black",
                padding: "10px",
              }}
              rowSpan={2}
            >
              총금액(부가세포함)
            </th>
          </tr>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              수량선택
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              흑백&컬러 선택
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              인쇄면선택
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <DropdownV2
                width="100%"
                options={quantityOptions}
                placeholder="수량선택"
                {...getSimpleProps({
                  key: "quantity",
                  setValue,
                  watch,
                  errors,
                })}
                onChange={async (value) => {
                  setValue("quantity", value);
                  setValue("ea", "");
                  await trigger("ea");
                }}
              />
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <DropdownV2
                width="100%"
                options={colorOptions}
                placeholder="흑백&컬러 선택"
                {...getSimpleProps({ key: "color", setValue, watch, errors })}
              />
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <DropdownV2
                width="100%"
                options={pageOptions[watch("color") ?? ""] || []}
                placeholder="인쇄면선택"
                {...getSimpleProps({ key: "page", setValue, watch, errors })}
              />
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "24px 10px",
                textAlign: "center",
              }}
            >
              <TextInputV2
                width="100%"
                placeholder="수량 입력"
                unit="매"
                {...getSimpleProps({ key: "ea", setValue, watch, errors })}
              />
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.2em",
              }}
            >
              {resultPrice}
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        * 한 디자인당 100장부터 톡으로 디자인 시안 및 샘플 인쇄 확인 /{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>
          100장 미만시(한디자인당) 시안 확인없이 인쇄 (인쇄품질 확인해 드리지
          않습니다.)
        </span>
      </p>
      <NoticeImageBox>
        <Image
          width={860}
          height={860}
          src="/assets/arte/self_01.jpg"
          alt="self_01"
        />
      </NoticeImageBox>
      <NoticeImageBox>
        <Image
          width={860}
          height={233}
          src="/assets/arte/self_02.jpg"
          alt="self_01"
        />
      </NoticeImageBox>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  min-width: 1000px;
  max-width: 1000px;

  margin: 0 auto;

  background-color: white;
  overflow: auto;

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

const TitleImage = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0;
`;

const ControlBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Notice = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const NoticeImageBox = styled.div`
  position: relative;
  text-align: center;
`;
