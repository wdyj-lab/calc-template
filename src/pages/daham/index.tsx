import ButtonV2 from "@/components/ButtonV2";
import TextInputV2 from "@/components/TextInputV2";
import { Well, WellIcon } from "@/components/Well";
import foundations from "@/foundations";
import useWindowSize from "@/lib/hooks/useWindowSize";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { styled } from "styled-components";
import * as yup from "yup";

enum MeshScreenType {
  MagneticFine = "자석 방충망 (미세망)",
  MagneticFineDense = "자석 방충망 (미세 촘촘망)",
  VelcroFine = "벨크로 미세 방충망",
  VelcroFineDense = "벨크로 미세 촘촘 방충망",
  VelcroDustproof = "벨크로 방진 방충망",
}

const magenticFineUnitPrice: { [key: number]: number } = {
  10: 1000,
  20: 2340,
  30: 2340,
  40: 2340,
  50: 2340,
  60: 2340,
  70: 2340,
  80: 2340,
  90: 2340,
  100: 2600,
  110: 2860,
  120: 3120,
  130: 3380,
  140: 3640,
  150: 3900,
  160: 4160,
  170: 4420,
  180: 4680,
  190: 4790,
  200: 5200,
  210: 5460,
  220: 5720,
  230: 5980,
  240: 6240,
  250: 6500,
  260: 6760,
  270: 7020,
  280: 7280,
  290: 7482,
  300: 7800,
};

const magneticFineDensePrice: { [key: number]: number } = {
  10: 2000,
  20: 3042,
  30: 3042,
  40: 3042,
  50: 3042,
  60: 3042,
  70: 3042,
  80: 3042,
  90: 3042,
  100: 3380,
  110: 3718,
  120: 4056,
  130: 4394,
  140: 4732,
  150: 5070,
  160: 5408,
  170: 5746,
  180: 6084,
  190: 6227,
  200: 6760,
  210: 7098,
  220: 7436,
  230: 7774,
  240: 8112,
  250: 8450,
  260: 8788,
  270: 9126,
  280: 9464,
  290: 9727,
  300: 10140,
};

const velcroFinePrice: { [key: number]: number } = {
  10: 740,
  20: 740,
  30: 740,
  40: 740,
  50: 770,
  60: 800,
  70: 830,
  80: 950,
  90: 980,
  100: 1020,
  110: 1040,
  120: 1200,
  130: 1300,
  140: 1400,
  150: 1500,
  160: 1600,
  170: 1700,
  180: 1800,
  190: 2000,
  200: 2100,
  210: 2200,
  220: 2300,
  230: 2400,
  240: 2500,
  250: 2600,
  260: 2700,
  270: 2800,
  280: 2900,
  290: 3000,
  300: 3100,
};

const velcroFineDensePrice: { [key: number]: number } = {
  10: 1240,
  20: 1240,
  30: 1240,
  40: 1240,
  50: 1240,
  60: 1280,
  70: 1340,
  80: 1460,
  90: 1480,
  100: 1480,
  110: 1500,
  120: 1700,
  130: 1800,
  140: 1940,
  150: 1980,
  160: 2200,
  170: 2280,
  180: 2540,
  190: 2720,
  200: 2880,
  210: 3080,
  220: 3160,
  230: 3180,
  240: 3420,
  250: 3620,
  260: 4160,
  270: 4380,
  280: 4620,
  290: 5060,
  300: 5400,
};

const velcroDustproofPrice: { [key: number]: number } = {
  80: 2220,
  90: 2400,
  100: 2600,
  110: 2800,
  120: 3000,
  130: 3200,
  140: 3400,
  150: 3680,
  160: 3880,
  170: 4080,
  180: 4280,
  190: 4480,
  200: 4680,
  210: 4880,
  220: 5080,
  230: 5280,
  240: 5480,
  250: 5680,
  260: 5880,
  270: 5920,
  280: 5960,
  290: 6000,
  300: 6040,
};

function calculatePrice(
  type: keyof typeof MeshScreenType,
  width?: number,
  height?: number
) {
  if (!width || !height) return;

  if (type === "MagneticFine") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;
    const widthUnitPrice = magenticFineUnitPrice[w] || 0;
    const heightUnitPrice = magenticFineUnitPrice[h] || 0;

    const widthPrice = Math.ceil((widthUnitPrice * (h / 10)) / 1000) * 1000;
    const heightPrice = Math.ceil((heightUnitPrice * (w / 10)) / 1000) * 1000;
    return Math.max(widthPrice, heightPrice);
  } else if (type === "MagneticFineDense") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;
    const widthUnitPrice = magneticFineDensePrice[w] || 0;
    const heightUnitPrice = magneticFineDensePrice[h] || 0;

    const widthPrice = Math.ceil((widthUnitPrice * (h / 10)) / 1000) * 1000;
    const heightPrice = Math.ceil((heightUnitPrice * (w / 10)) / 1000) * 1000;
    return Math.max(widthPrice, heightPrice);
  } else if (type === "VelcroFine") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;
    const widthUnitPrice = velcroFinePrice[w] || 0;
    const heightUnitPrice = velcroFinePrice[h] || 0;

    const widthPrice = Math.ceil((widthUnitPrice * (h / 10)) / 1000) * 1000;
    const heightPrice = Math.ceil((heightUnitPrice * (w / 10)) / 1000) * 1000;
    return Math.max(widthPrice, heightPrice);
  } else if (type === "VelcroFineDense") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;
    const widthUnitPrice = velcroFineDensePrice[w] || 0;
    const heightUnitPrice = velcroFineDensePrice[h] || 0;

    const widthPrice = Math.ceil((widthUnitPrice * (h / 10)) / 1000) * 1000;
    const heightPrice = Math.ceil((heightUnitPrice * (w / 10)) / 1000) * 1000;
    return Math.max(widthPrice, heightPrice);
  } else if (type === "VelcroDustproof") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;
    const widthUnitPrice = velcroDustproofPrice[w] || 0;
    const heightUnitPrice = velcroDustproofPrice[h] || 0;

    const widthPrice = Math.ceil((widthUnitPrice * (h / 10)) / 1000) * 1000;
    const heightPrice = Math.ceil((heightUnitPrice * (w / 10)) / 1000) * 1000;
    return Math.max(widthPrice, heightPrice);
  }

  return 0;
}

export default function DahamPage() {
  const formResolver = yup.object().shape({
    meshScreenType: yup
      .string()
      .oneOf(Object.keys(MeshScreenType), "방충망 종류를 선택해주세요.")
      .required("방충망 종류를 선택해주세요."),

    width: yup
      .string()
      .when("meshScreenType", {
        is: (meshScreenType: keyof typeof MeshScreenType) =>
          meshScreenType !== "VelcroDustproof",
        then: (schema) =>
          schema.test("min", "10cm 이상 입력", (value) => {
            const num = parseInt(value || "0", 10);
            return num >= 10;
          }),
      })
      .when("meshScreenType", {
        is: (meshScreenType: keyof typeof MeshScreenType) =>
          meshScreenType === "VelcroDustproof",
        then: (schema) =>
          schema.test("min", "80cm 이상 입력", (value) => {
            const num = parseInt(value || "0", 10);
            return num >= 80;
          }),
      })
      .required("가로를 입력해주세요."),
    height: yup
      .string()
      .test("min", "10cm 이상 입력", (value) => {
        const num = parseInt(value || "0", 10);
        return num >= 10;
      })
      .required("세로를 입력해주세요."),
  });

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formResolver),
    defaultValues: {
      meshScreenType: "MagneticFine",
    },
  });

  return (
    <Layout>
      <FormProvider {...methods}>
        <MeshScreenTypeContainer />
        <SizeContainer />
        <CalcResultContainer />
      </FormProvider>
    </Layout>
  );
}

function MeshScreenTypeContainer() {
  const { watch, setValue, trigger } = useFormContext();

  return (
    <Container>
      <SectionTitle>1. 구매하실 방충망 종류를 선택해주세요.</SectionTitle>
      <MeshScreenTypeGrid>
        {Object.keys(MeshScreenType).map((type) => (
          <MeshScreenTypeItem
            key={type}
            selected={watch("meshScreenType") === type}
            onClick={() => {
              setValue("meshScreenType", type);
              trigger("width");
            }}
          >
            {MeshScreenType[type as keyof typeof MeshScreenType]}
          </MeshScreenTypeItem>
        ))}
      </MeshScreenTypeGrid>
    </Container>
  );
}

function SizeContainer() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { width } = useWindowSize();

  return (
    <Container>
      <SectionTitle>2. 방충망 사이즈를 입력해주세요.</SectionTitle>
      <SizeTooltip>
        <WellIcon name="INFO_OUTLINE" inline />
        가로 세로를 입력 <br />
        종류 및 사이즈별 가격 확인 후 1,000원 옵션으로 금액만큼 주문하세요.
      </SizeTooltip>
      <SizeWrapper>
        <LabelOption>
          <label>가로</label>
          <TextInputV2
            width="100%"
            size="lg"
            textAlignment="center"
            maxLength={12}
            unit="cm"
            {...getSimpleProps({ key: "width", setValue, watch, errors })}
          />
        </LabelOption>
        {width > 500 && (
          <LabelText style={{ padding: "0px 14px" }}>X</LabelText>
        )}
        <LabelOption>
          <CalcResultRow></CalcResultRow>
          <label>세로</label>
          <TextInputV2
            width="100%"
            size="lg"
            textAlignment="center"
            maxLength={12}
            unit="cm"
            {...getSimpleProps({ key: "height", setValue, watch, errors })}
          />
        </LabelOption>
      </SizeWrapper>
    </Container>
  );
}

function CalcResultContainer() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <Container>
      <SectionTitle>3. 계산 결과</SectionTitle>
      <CalcResultRow>
        <ResultValueBox>
          <LabelOption>
            <label>가로</label>
            <TextInputV2
              width="100%"
              size="lg"
              unit="cm"
              textAlignment="center"
              maxLength={12}
              value={watch("width") ?? 0}
            />
          </LabelOption>
          <LabelOption>
            <label>세로</label>
            <TextInputV2
              width="100%"
              size="lg"
              unit="cm"
              textAlignment="center"
              maxLength={12}
              value={watch("height") ?? 0}
            />
          </LabelOption>
          <LabelOption>
            <label>종류</label>
            <TextInputV2
              width="100%"
              size="lg"
              textAlignment="center"
              maxLength={12}
              value={
                MeshScreenType[
                  watch("meshScreenType") as keyof typeof MeshScreenType
                ]
              }
            />
          </LabelOption>
          <LabelOption>
            <label>가격</label>
            <TextInputV2
              width="100%"
              size="lg"
              textAlignment="center"
              maxLength={12}
              unit="원"
              value={(
                calculatePrice(
                  watch("meshScreenType"),
                  watch("width"),
                  watch("height")
                ) || 0
              ).toLocaleString()}
            />
          </LabelOption>
        </ResultValueBox>
        {(calculatePrice(
          watch("meshScreenType"),
          watch("width"),
          watch("height")
        ) || 0) > 0 && (
          <ResultImageBox>
            <h2>
              구매 수량{" : "}
              <NumberBox>
                {Math.ceil(
                  (calculatePrice(
                    watch("meshScreenType"),
                    watch("width"),
                    watch("height")
                  ) || 0) / 1000
                ).toLocaleString()}{" "}
              </NumberBox>
              개
            </h2>
            <br />
            <h2>구매 수량을 확인 후 구매하기 버튼을 눌러주세요.</h2>

            <ButtonV2
              status="primary"
              minWidth="100%"
              size="lg"
              style={{ marginTop: "20px" }}
              onClick={() =>
                window.open(
                  "https://smartstore.naver.com/gen-aqua/products/10282982921",
                  "_blank"
                )
              }
            >
              구매하기
            </ButtonV2>
          </ResultImageBox>
        )}
      </CalcResultRow>
    </Container>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1000px;

  margin: 0 auto;

  background-color: #f8f8f8;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  @media (max-width: 500px) {
    padding: 8px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
`;

const MeshScreenTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MeshScreenTypeItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  min-height: 50px;
  cursor: pointer;

  padding: 0px 5px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${(props) =>
    !!props.selected &&
    `
      background-color: #555555;
      color: #ffffff;
    `};
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
    flex-direction: column;
    gap: 20px;
  }
`;

const LabelOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;

  > label {
    display: flex;
    height: 100%;
    background-color: #555555;
    color: #ffffff;
    min-width: 50px;
    min-height: 50px;
    max-height: 50px;
    justify-content: center;
    align-items: center;
    margin-right: -2px;
    z-index: 1;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  @media (max-width: 1000px) {
    flex: 2;
  }
`;

const SizeTooltip = styled(Well)`
  background-color: #ffffff;
  margin-bottom: 20px;
  word-break: keep-all;

  ${foundations.typography.Body2_300}
`;

const CalcResultRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 500px) {
    gap: 20px;
  }
`;

const ResultValueBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  flex: 1;
  height: 100%;
  margin-top: 5px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ResultImageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h2 {
    margin: 0;
    text-align: center;
    line-height: 1.5;
  }
`;

const NumberBox = styled.div`
  display: inline-block;
  background-color: #ffffff;
  padding: 0px 10px;
  border: 1px solid #cccccc;
  margin: 0 5px;
`;
