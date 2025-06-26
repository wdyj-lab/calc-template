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
  20: 2200,
  30: 2200,
  40: 2200,
  50: 2200,
  60: 2200,
  70: 2200,
  80: 2200,
  90: 2200,
  100: 2500,
  110: 2600,
  120: 2700,
  130: 2800,
  140: 2400,
  150: 2400,
  160: 2600,
  170: 2800,
  180: 2900,
  190: 4000,
  200: 5000,
  210: 5200,
  220: 5600,
  230: 5800,
  240: 6200,
  250: 6600,
  260: 7000,
  270: 7200,
  280: 7400,
  290: 7500,
  300: 7600,
};

const magneticFineDensePrice: { [key: number]: number } = {
  10: 2500,
  20: 2800,
  30: 2800,
  40: 2800,
  50: 2800,
  60: 2800,
  70: 2800,
  80: 2800,
  90: 2800,
  100: 3100,
  110: 3300,
  120: 3400,
  130: 3500,
  140: 3000,
  150: 3000,
  160: 3300,
  170: 3500,
  180: 3600,
  190: 5000,
  200: 6300,
  210: 6500,
  220: 7000,
  230: 7300,
  240: 7800,
  250: 8300,
  260: 8800,
  270: 9000,
  280: 9300,
  290: 9400,
  300: 9500,
};

const velcroFinePrice: { [key: number]: number } = {
  10: 780,
  20: 780,
  30: 780,
  40: 780,
  50: 780,
  60: 800,
  70: 990,
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
  10: 1210,
  20: 1210,
  30: 1210,
  40: 1210,
  50: 1210,
  60: 1250,
  70: 1310,
  80: 1430,
  90: 1450,
  100: 1450,
  110: 1470,
  120: 1670,
  130: 1770,
  140: 1910,
  150: 2170,
  160: 2250,
  170: 2510,
  180: 2690,
  190: 2850,
  200: 3050,
  210: 3130,
  220: 3150,
  230: 3390,
  240: 3590,
  250: 4130,
  260: 4350,
  270: 4690,
  280: 5030,
  290: 5370,
  300: 5670,
};

const velcroDustproofPrice: { [key: number]: number } = {
  10: 2220,
  20: 2220,
  30: 2220,
  40: 2220,
  50: 2220,
  60: 2220,
  70: 2220,
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

    const a = Math.min(w, h);
    const b = Math.max(w, h);

    const unitPrice = magenticFineUnitPrice[a] || 0;

    return Math.ceil((unitPrice * Math.ceil(b / 10)) / 1000) * 1000;
  } else if (type === "MagneticFineDense") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;

    const a = Math.min(w, h);
    const b = Math.max(w, h);

    const unitPrice = magneticFineDensePrice[a] || 0;

    return Math.ceil((unitPrice * Math.ceil(b / 10)) / 1000) * 1000;
  } else if (type === "VelcroFine") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;

    const a = Math.min(w, h);
    const b = Math.max(w, h);

    const unitPrice = velcroFinePrice[a] || 0;

    return Math.ceil((unitPrice * Math.ceil(b / 10)) / 1000) * 1000;
  } else if (type === "VelcroFineDense") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;

    const a = Math.min(w, h);
    const b = Math.max(w, h);

    const unitPrice = velcroFineDensePrice[a] || 0;

    return Math.ceil((unitPrice * Math.ceil(b / 10)) / 1000) * 1000;
  } else if (type === "VelcroDustproof") {
    const w = Math.ceil(width / 10) * 10;
    const h = Math.ceil(height / 10) * 10;

    const a = Math.min(w, h);
    const b = Math.max(w, h);

    const unitPrice = velcroDustproofPrice[a] || 0;

    return Math.ceil((unitPrice * Math.ceil(b / 10)) / 1000) * 1000;
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
      // .when("meshScreenType", {
      //   is: (meshScreenType: keyof typeof MeshScreenType) =>
      //     meshScreenType === "VelcroDustproof",
      //   then: (schema) =>
      //     schema.test("min", "80cm 이상 입력", (value) => {
      //       const num = parseInt(value || "0", 10);
      //       return num >= 80;
      //     }),
      // })
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
