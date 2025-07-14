import Estimate from "@/company/myungsung/models/Estimate";
import myungsungColorOptions from "@/company/myungsung/myungsungColorOptions";
import myungsungEstimateColumns from "@/company/myungsung/myungsungEstimateColumns";
import myungsungPostProcessingOptions from "@/company/myungsung/myungsungPostProcessingOptions";
import myungsungPriceSchema from "@/company/myungsung/myungsungPriceSchema";
import myungsungThicknessOptions from "@/company/myungsung/myungsungThicknessOptions";
import ButtonV2 from "@/components/ButtonV2";
import DropdownV2 from "@/components/DropdownV2";
import { TableV2 } from "@/components/TableV2";
import TextAreaV2 from "@/components/TextAreaV2";
import TextInputV2 from "@/components/TextInputV2";
import MyungsungAcrylicImageType from "@/lib/constant/MyungsungAcrylicImageType";
import MyungsungAcrylicType from "@/lib/constant/MyungsungAcrylicType";
import MyungsungPostProcessingPriceType from "@/lib/constant/MyungsungPostProcessingPriceType";
import MyungsungPostProcessingType from "@/lib/constant/MyungsungPostProcessingType";
import { firestoreService } from "@/lib/firestore";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { styled } from "styled-components";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import myungsungPostProcessingImageUrl from "@/company/myungsung/myungsungPostProcessingImageUrl";

interface AcrylicFormSource {
  type: keyof typeof MyungsungAcrylicType;
  color?: string;
  thickness: string;
  width: number;
  height: number;
  quantity: number;
  postProcessing?: (keyof typeof MyungsungPostProcessingType)[];
  postProcessingOptions?: {
    key: keyof typeof MyungsungPostProcessingType;
    value: string;
    price: number;
  }[];
}

interface CustomerFormSource {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerRequest?: string;
}

export default function MyungsungPage() {
  const formResolver = yup.object<AcrylicFormSource>().shape({
    type: yup
      .mixed<keyof typeof MyungsungAcrylicType>()
      .oneOf(
        Object.keys(
          MyungsungAcrylicType
        ) as (keyof typeof MyungsungAcrylicType)[]
      )
      .required("판의 종류를 선택해주세요."),
    color: yup
      .string()
      .when("type", {
        is: (type: keyof typeof MyungsungAcrylicType) => type !== "ACRYLIC",
        then: (color) => color.required("색상을 선택해주세요."),
      })
      .optional(),
    thickness: yup.string().required("두께를 입력해주세요."),
    width: yup
      .number()
      .typeError("가로 사이즈는 숫자로 입력해주세요.")
      .min(10, "가로 사이즈는 최소 10mm입니다.")
      .when("type", {
        is: (type: keyof typeof MyungsungAcrylicType) =>
          type === "ACRYLIC" || type === "ACRYLIC_PC",
        then: (width) => width.max(1200, "가로 사이즈는 최대 1200mm입니다."),
      })
      .when(["type", "thickness"], {
        is: (type: keyof typeof MyungsungAcrylicType, thickness: string) =>
          type === "ACRYLIC_COLOR" && thickness === "2",
        then: (width) => width.max(900, "가로 사이즈는 최대 900mm입니다."),
      })
      .when(["type", "thickness"], {
        is: (type: keyof typeof MyungsungAcrylicType, thickness: string) =>
          type === "ACRYLIC_COLOR" && thickness !== "2",
        then: (width) => width.max(1200, "가로 사이즈는 최대 1200mm입니다."),
      })
      .when("type", {
        is: (type: keyof typeof MyungsungAcrylicType) =>
          type === "ACRYLIC_MATTE" ||
          type === "ACRYLIC_PVC" ||
          type === "ACRYLIC_MIRROR",
        then: (width) => width.max(900, "가로 사이즈는 최대 900mm입니다."),
      })
      .required("가로 사이즈를 입력해주세요."),
    height: yup
      .number()
      .typeError("세로 사이즈는 숫자로 입력해주세요.")
      .min(10, "세로 사이즈는 최소 10mm입니다.")
      .when("type", {
        is: (type: keyof typeof MyungsungAcrylicType) =>
          type === "ACRYLIC" || type === "ACRYLIC_PC",
        then: (width) => width.max(2400, "세로 사이즈는 최대 2400mm입니다."),
      })
      .when(["type", "thickness"], {
        is: (type: keyof typeof MyungsungAcrylicType, thickness: string) =>
          type === "ACRYLIC_COLOR" && thickness === "2",
        then: (width) => width.max(1800, "세로 사이즈는 최대 1800mm입니다."),
      })
      .when(["type", "thickness"], {
        is: (type: keyof typeof MyungsungAcrylicType, thickness: string) =>
          type === "ACRYLIC_COLOR" && thickness !== "2",
        then: (width) => width.max(2400, "세로 사이즈는 최대 2400mm입니다."),
      })
      .when("type", {
        is: (type: keyof typeof MyungsungAcrylicType) =>
          type === "ACRYLIC_MATTE" ||
          type === "ACRYLIC_PVC" ||
          type === "ACRYLIC_MIRROR",
        then: (width) => width.max(1800, "세로 사이즈는 최대 1800mm입니다."),
      })
      .required("세로 사이즈를 입력해주세요."),
    quantity: yup
      .number()
      .typeError("수량은 숫자로 입력해주세요.")
      .min(1, "최소 1개 이상의 수량을 입력해주세요.")
      .required("수량을 입력해주세요."),
    postProcessing: yup
      .array()
      .of(yup.mixed<keyof typeof MyungsungPostProcessingType>().required())
      .optional(),
    postProcessingOptions: yup
      .array()
      .of(
        yup.object().shape({
          key: yup.mixed<keyof typeof MyungsungPostProcessingType>().required(),
          value: yup.string().required(),
          price: yup.number().required(),
        })
      )
      .optional(),
  });

  const customerFormResolver = yup.object<CustomerFormSource>().shape({
    customerName: yup.string().required("수취인명을 입력해주세요."),
    customerPhone: yup.string().required("수취인 연락처를 입력해주세요."),
    customerEmail: yup
      .string()
      .email("유효한 이메일 주소를 입력해주세요.")
      .required("수취인 이메일을 입력해주세요."),
    customerRequest: yup
      .string()
      .max(500, "요청사항은 최대 500자까지 입력 가능합니다.")
      .optional(),
  });

  const methods = useForm<AcrylicFormSource>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formResolver),
    defaultValues: {
      type: "ACRYLIC",
      color: "투명",
    },
  });

  const customerFormMethods = useForm<CustomerFormSource>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(customerFormResolver),
  });

  const mmToCmRoundedUp = (mmValue: number) => Math.ceil(mmValue / 100) * 10;
  const width = mmToCmRoundedUp(methods.watch("width") || 0);
  const height = mmToCmRoundedUp(methods.watch("height") || 0);
  const thickness = Number(methods.watch("thickness") || 0);
  const quantity = methods.watch("quantity") || 0;

  const key = `${width}x${height}x${thickness}`;

  const priceSchema = myungsungPriceSchema[methods.watch("type")];
  const price = priceSchema[key as keyof typeof priceSchema] * quantity;
  const totalPrice = isNaN(price) ? 0 : price;

  const [estimates, setEstimates] = useState<Estimate[]>([]);

  const handleAddCart = () => {
    if (!methods.formState.isValid) {
      methods.trigger();
      return;
    }

    const formData = methods.getValues();
    const estimate = new Estimate(
      formData.type,
      formData.color,
      `${methods.watch("width")}mm x ${methods.watch(
        "height"
      )}mm x ${thickness}T`,
      formData.quantity,
      totalPrice,
      formData.postProcessing
        ?.map((option) => MyungsungPostProcessingType[option])
        .join(", ") || "",
      formData.postProcessingOptions?.reduce(
        (acc, option) => acc + option.price,
        0
      ) || 0
    );

    setEstimates((prev) => [...prev, estimate]);
    methods.reset();
  };

  const handleSubmit = async () => {
    if (!customerFormMethods.formState.isValid) {
      customerFormMethods.trigger();
      return;
    }

    if (estimates.length === 0) {
      alert("견적서에 추가된 제품이 없습니다.");
      return;
    }

    try {
      const { create } = firestoreService.estimates;
      const customerData = customerFormMethods.getValues();

      const estimatesData = estimates.map(
        (estimate) => estimate.toEstimateDate
      );

      const childEstimatesData = estimatesData.map((data) => ({
        ...data,
      }));

      estimatesData[0].childEstimates = childEstimatesData;

      await create({
        ...estimatesData[0],
        ...customerData,
      });

      const mailServiceId = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID;
      const mailTemplateId = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID;

      if (!mailServiceId || !mailTemplateId) {
        return;
      }

      const totalPrice = estimatesData.reduce(
        (acc, estimate) =>
          acc + (estimate.price + estimate.postProcessingPrice),
        0
      );

      emailjs
        .send(
          mailServiceId,
          mailTemplateId,
          {
            email: customerFormMethods.watch("customerEmail"),
            orders: estimatesData.map((estimate) => ({
              name: `${estimate.type} / ${estimate.color} / ${estimate.size}`,
              price: `${(
                estimate.price + estimate.postProcessingPrice
              ).toLocaleString()}원`,
              units: estimate.quantity,
            })),
            name: `${estimatesData[0].type} 외 ${estimates.length - 1}건`,
            price: totalPrice.toLocaleString(),
            totalEstimatePrice: totalPrice.toLocaleString(),
            calcQuantity: Math.ceil(totalPrice / 100),
          },
          "FE8kF-BjJhcCQpe7h"
        )
        .then((res) => {})
        .catch((err) => {});

      alert("견적서가 성공적으로 전송되었습니다!");
      customerFormMethods.reset({});
    } catch (error) {
      console.error("견적서 전송 중 오류가 발생했습니다:", error);
      alert("견적서 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Head>
        <title>아크릴 견적 계산기</title>
      </Head>
      <Layout>
        <FormProvider {...methods}>
          <FormLabel>1. 구매하실 판의 종류를 선택해주세요.</FormLabel>
          <AcrylicTypeTileList />
          <FormLabel>2. 선택하신 판재의 사이즈를 입력해주세요.</FormLabel>
          <ImageAndSpecGrid>
            <AcrylicImageBox />
            <AcrylicSpecBox />
          </ImageAndSpecGrid>
          <FormLabel>2-1. 가공 옵션을 선택해주세요.</FormLabel>
          <PostProcessingBox />
          <ButtonV2
            size="lg"
            status="primary"
            minWidth="180px"
            style={{ maxWidth: "180px", margin: "20px auto" }}
            onClick={handleAddCart}
          >
            제품 담기
          </ButtonV2>
          <FormLabel>
            3. 주문하실 견적서를 확인한 뒤 판매자에게 전송해주세요.
          </FormLabel>
          <EstimateTable
            data={estimates}
            onDelete={(estimate) => {
              setEstimates((prev) => prev.filter((item) => item !== estimate));
            }}
          />
          <TotalPriceBox estimates={estimates} />
        </FormProvider>
        <FormProvider {...customerFormMethods}>
          <ContactBox />
        </FormProvider>
        <SubmitButtonWrapper>
          <ButtonV2
            size="lg"
            status="primary"
            minWidth="220px"
            onClick={handleSubmit}
          >
            판매자에게 견적 전송하기
          </ButtonV2>
          <ButtonV2
            size="lg"
            status="primary"
            minWidth="220px"
            style={{ backgroundColor: "#00C73C", marginLeft: "0px" }}
            onClick={() =>
              window.open(
                "https://smartstore.naver.com/sellacrylic/products/5762492997",
                "_blank"
              )
            }
          >
            스마트스토어로 구매하러가기
          </ButtonV2>
        </SubmitButtonWrapper>
      </Layout>
    </>
  );
}

function AcrylicTypeTileList() {
  const { watch, reset } = useFormContext<AcrylicFormSource>();

  return (
    <AcrylicGrid>
      {Object.keys(MyungsungAcrylicType).map((key) => {
        return (
          <AcrylicGridItem
            key={key}
            selected={key === watch("type")}
            onClick={() => {
              if (key === "ACRYLIC") {
                reset({
                  type: key as keyof typeof MyungsungAcrylicType,
                  color: "투명",
                });
                return;
              }
              reset({ type: key as keyof typeof MyungsungAcrylicType });
            }}
          >
            {MyungsungAcrylicType[key as keyof typeof MyungsungAcrylicType]}
          </AcrylicGridItem>
        );
      })}
    </AcrylicGrid>
  );
}

function AcrylicImageBox() {
  const { watch } = useFormContext<AcrylicFormSource>();

  return (
    <ImageBox>
      <Image
        src={MyungsungAcrylicImageType[watch("type")]}
        alt="Acrylic Image"
        fill
        style={{ objectFit: "contain" }}
      />
    </ImageBox>
  );
}

function AcrylicSpecBox() {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<AcrylicFormSource>();

  const isDisableColor = watch("type") === "ACRYLIC";
  const colorOptions = myungsungColorOptions[watch("type")] || [];
  const thicknessOptions = myungsungThicknessOptions[watch("type")] || [];

  const mmToCmRoundedUp = (mmValue: number) => Math.ceil(mmValue / 100) * 10;
  const width = mmToCmRoundedUp(watch("width") || 0);
  const height = mmToCmRoundedUp(watch("height") || 0);
  const thickness = Number(watch("thickness") || 0);
  const quantity = watch("quantity") || 0;

  const key = `${width}x${height}x${thickness}`;

  const priceSchema = myungsungPriceSchema[watch("type")];
  const price = priceSchema[key as keyof typeof priceSchema] * quantity;
  const totalPrice = isNaN(price) ? 0 : price;

  return (
    <SpecWrapper>
      <SpecItem>
        <SpecLabel>색상</SpecLabel>
        <DropdownV2
          width="100%"
          options={colorOptions}
          disabled={isDisableColor}
          optionContainerWidth="100%"
          {...getSimpleProps({ key: "color", setValue, watch, errors })}
        />
      </SpecItem>
      <SpecItem>
        <SpecLabel>두께</SpecLabel>
        <DropdownV2
          width="100%"
          options={thicknessOptions}
          optionContainerWidth="100%"
          {...getSimpleProps({ key: "thickness", setValue, watch, errors })}
          onChange={(value) => {
            setValue("thickness", value);
            trigger("thickness");
            trigger("width");
            trigger("height");
          }}
        />
      </SpecItem>
      <SpecItem>
        <SpecLabel>가로</SpecLabel>
        <TextInputV2
          width="100%"
          unit="mm"
          {...getSimpleProps({ key: "width", setValue, watch, errors })}
        />
      </SpecItem>
      <SpecItem>
        <SpecLabel>세로</SpecLabel>
        <TextInputV2
          width="100%"
          unit="mm"
          {...getSimpleProps({ key: "height", setValue, watch, errors })}
        />
      </SpecItem>
      <SpecItem>
        <SpecLabel>수량</SpecLabel>
        <TextInputV2
          width="100%"
          unit="EA"
          {...getSimpleProps({ key: "quantity", setValue, watch, errors })}
        />
      </SpecItem>
      <SpecItem>
        <SpecLabel color="red">금액</SpecLabel>
        <TextInputV2
          width="100%"
          unit="원"
          value={totalPrice?.toLocaleString()}
        />
      </SpecItem>
    </SpecWrapper>
  );
}

function PostProcessingBox() {
  const { watch, setValue } = useFormContext<AcrylicFormSource>();

  const handleClick = (key: keyof typeof MyungsungPostProcessingType) => {
    const currentPostProcessing = watch("postProcessing") || [];

    if (key === "LASER_PROCESSING") {
      if (currentPostProcessing.includes("LASER_PROCESSING")) {
        setValue(
          "postProcessing",
          currentPostProcessing.filter((item) => item !== "LASER_PROCESSING")
        );
      } else {
        setValue("postProcessing", ["LASER_PROCESSING"]);
      }
      return;
    }

    if (
      currentPostProcessing.includes(
        key as keyof typeof MyungsungPostProcessingType
      )
    ) {
      setValue(
        "postProcessing",
        currentPostProcessing.filter(
          (item) => item !== (key as keyof typeof MyungsungPostProcessingType)
        )
      );
    } else {
      setValue("postProcessing", [
        ...currentPostProcessing.filter((item) => item !== "LASER_PROCESSING"),
        key,
      ] as (keyof typeof MyungsungPostProcessingType)[]);
    }
  };

  const handleProcessingChange = (
    key: keyof typeof MyungsungPostProcessingType,
    value: string
  ) => {
    const currentPostProcessingOptions = watch("postProcessingOptions") || [];
    setValue("postProcessingOptions", [
      ...currentPostProcessingOptions.filter((option) => option.key !== key),
      {
        key,
        value,
        price: MyungsungPostProcessingPriceType[key] || 0,
      },
    ]);
  };

  return (
    <PostProcessingWrapper>
      <PostProcessingGrid>
        {Object.keys(MyungsungPostProcessingType).map((key) => {
          return (
            <AcrylicGridItem
              key={key}
              selected={watch("postProcessing")?.includes(
                key as keyof typeof MyungsungPostProcessingType
              )}
              onClick={() =>
                handleClick(key as keyof typeof MyungsungPostProcessingType)
              }
            >
              {
                MyungsungPostProcessingType[
                  key as keyof typeof MyungsungPostProcessingType
                ]
              }
            </AcrylicGridItem>
          );
        })}
      </PostProcessingGrid>
      {(watch("postProcessing")?.length || 0) > 0 ? (
        <PostProcessingOptionBox>
          {watch("postProcessing")?.map((key) => (
            <PostProcessingOption
              key={key}
              type={key}
              onChange={(value) => handleProcessingChange(key, value)}
            />
          ))}
        </PostProcessingOptionBox>
      ) : (
        <EmptyBox>선택된 가공 옵션이 없습니다.</EmptyBox>
      )}
    </PostProcessingWrapper>
  );
}

function PostProcessingOption({
  type,
  onChange,
}: {
  type: keyof typeof MyungsungPostProcessingType;
  onChange?: (value: string) => void;
}) {
  const { watch } = useFormContext<AcrylicFormSource>();

  const postProcessingOptions = watch("postProcessingOptions") || [];

  const selectedProcessingOption = postProcessingOptions.find(
    (option) => option.key === type
  )?.value;

  const options = myungsungPostProcessingOptions[type] || [];
  const processingFee = MyungsungPostProcessingPriceType[type] || 0;
  const processingFeeString =
    processingFee > 0 ? `+${processingFee.toLocaleString()}원` : "무료";

  return (
    <PostProcessingOptionWrapper>
      <PostProcessingOptionLabel>
        {MyungsungPostProcessingType[type]}
      </PostProcessingOptionLabel>
      <PostProcessingOptionInput>
        <DropdownV2
          width="100%"
          options={options}
          optionContainerWidth="100%"
          value={selectedProcessingOption}
          onChange={onChange}
        />
      </PostProcessingOptionInput>
      <ButtonV2
        style={{ marginLeft: "10px" }}
        onClick={() => {
          const imageUrl = myungsungPostProcessingImageUrl[type];
          window.open(
            imageUrl,
            "_blank",
            "width=800,height=600,scrollbars=yes,resizable=yes"
          );
        }}
      >
        사진보기
      </ButtonV2>
      <PostProcessingOptionPriceLabel>
        {processingFeeString}
      </PostProcessingOptionPriceLabel>
    </PostProcessingOptionWrapper>
  );
}

function EstimateTable({
  data,
  onDelete,
}: {
  data: Estimate[];
  onDelete: (item: Estimate) => void;
}) {
  return (
    <EstimateTableBox>
      <TableV2
        columns={myungsungEstimateColumns({
          onDelete: onDelete,
        })}
        data={data}
        options={{
          width: "100%",
          minWidth: "1100px",
          maxHeight: "300px",
          overflow: "auto",
          resize: true,
        }}
      />
    </EstimateTableBox>
  );
}

function TotalPriceBox({ estimates }: { estimates: Estimate[] }) {
  const totalEstimatePrice = estimates.reduce(
    (acc, estimate) => acc + (estimate.price + estimate.postProcessingPrice),
    0
  );

  const quantity = Math.ceil(totalEstimatePrice / 100);

  return (
    <TotalPriceBoxWrapper>
      <div style={{ flex: "2" }}>
        <h2>총 결제금액</h2>
        <ul>
          <li>
            100원 단위 결제 금액에서 <b>결제수량</b>대로 수량을 동일하게
            입력하여 구매하시면 됩니다.
          </li>
          <li>
            포맥스, 거울 아크릴 사이즈는 900x1800mm 이하로 주문 가능합니다.
          </li>
          <li>
            그 외 모든 아크릴 사이즈는 1200x2400mm 이하로 주문 가능합니다.
          </li>
        </ul>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: "1",
        }}
      >
        <LabelAndTextInput>
          <label>총 견적 금액</label>
          <TextInputV2
            width="100%"
            unit="원"
            disabled
            value={totalEstimatePrice.toLocaleString()}
          />
        </LabelAndTextInput>
        <LabelAndTextInput>
          <label>총 결제 금액</label>
          <TextInputV2
            width="100%"
            unit="원"
            disabled
            value={totalEstimatePrice.toLocaleString()}
          />
        </LabelAndTextInput>
        <LabelAndTextInput>
          <label style={{ color: "red", fontWeight: "bold" }}>결제수량</label>
          <TextInputV2
            width="100%"
            unit="개"
            disabled
            value={quantity.toLocaleString()}
          />
        </LabelAndTextInput>
      </div>
    </TotalPriceBoxWrapper>
  );
}

function ContactBox() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CustomerFormSource>();

  return (
    <ContactBoxWrapper>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextInputV2
          width="100%"
          placeholder="수취인명"
          {...getSimpleProps({ key: "customerName", setValue, watch, errors })}
        />
        <TextInputV2
          width="100%"
          placeholder="수취인 연락처"
          {...getSimpleProps({ key: "customerPhone", setValue, watch, errors })}
        />
        <TextInputV2
          width="100%"
          placeholder="수취인 이메일"
          {...getSimpleProps({ key: "customerEmail", setValue, watch, errors })}
        />
      </div>
      <div style={{ flex: "1" }}>
        <TextAreaV2
          width="100%"
          height="100%"
          placeholder="[요청사항] 주문과 관련된 사항은 톡톡문의 또는 1:1문의 게시판으로 올려주시면 빠른 견적이 가능합니다."
          {...getSimpleProps({
            key: "customerRequest",
            setValue,
            watch,
            errors,
          })}
        />
      </div>
    </ContactBoxWrapper>
  );
}

const ContactBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 20px;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const LabelAndTextInput = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;

  > label {
    min-width: 100px;
  }
`;

const Layout = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;

  background-color: #f8f8f8;

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

  @media (max-width: 550px) {
    padding: 10px;
  }
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

const AcrylicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const AcrylicGridItem = styled.div<{ selected?: boolean }>`
  background-color: #ffffff;
  text-align: center;
  padding: 16px 20px;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    background-color: #555555;
    color: #ffffff;
  `};

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ImageAndSpecGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 304px;
  padding-top: 9%;

  @media (max-width: 550px) {
    width: 100%;
    padding-top: 60%;
  }
`;

const SpecWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SpecItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const SpecLabel = styled.label<{ color?: string }>`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-right: 10px;
  min-width: 60px;
  color: ${(props) => props.color || "#000000"};
`;

const PostProcessingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostProcessingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const PostProcessingOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 150px;
`;

const EmptyBox = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px dashed #cccccc;
`;

const PostProcessingOptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PostProcessingOptionLabel = styled.label`
  min-width: 120px;
  font-size: 1rem;
  font-weight: 600;

  @media (max-width: 550px) {
    min-width: 100px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const PostProcessingOptionInput = styled.div`
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 550px) {
    max-width: 130px;
  }
`;

const PostProcessingOptionPriceLabel = styled.label`
  min-width: 100px;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  color: red;

  @media (max-width: 550px) {
    min-width: 65px;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: end;
  }
`;

const EstimateTableBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  min-height: 300px;
`;

const TotalPriceBoxWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px;
  border: 2px solid #333333;
  box-sizing: border-box;
  background-color: #ffffff;

  @media (max-width: 550px) {
    flex-wrap: wrap;
  }

  h2 {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 16px 20px;

    > li:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const SubmitButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
