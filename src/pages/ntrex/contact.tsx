import AlertV2 from "@/components/AlertV2";
import { AlertV2Props } from "@/components/AlertV2/AlertV2";
import ButtonV2 from "@/components/ButtonV2";
import TextAreaV2 from "@/components/TextAreaV2";
import TextInputV2 from "@/components/TextInputV2";
import { fstorage } from "@/lib/utils/firebase";
import getSimpleProps from "@/lib/utils/getSimpleProps";
import emailjs from "@emailjs/browser";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import * as yup from "yup";

const ContactPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAlert, setIsAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertV2Props>({
    title: "문의 메일 발송",
    message: "문의 메일이 발송됐습니다. 빠른 시일 내에 답변드리겠습니다.",
    confirmText: "확인",
  });

  const formResolver = yup.object().shape({
    name: yup.string().required("성함을 입력해주세요."),
    phone: yup.string().required("연락처를 입력해주세요."),
    email: yup.string().required("이메일을 입력해주세요.").email("이메일 형식을 확인해주세요."),
    content: yup.string().required("문의 내용을 입력해주세요."),
  })

  const { setValue, watch, reset, trigger, formState: { isValid, errors } } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formResolver),
    defaultValues: {
      content: "1. 재단종류 : \n2. 가로x세로x두께(mm) : \n3. 수량 :",
    }
  })

  const handleClick = async () => {
    const mailServiceId = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID;
    const mailTemplateId = process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID;

    if (!mailServiceId || !mailTemplateId) {
      return;
    }

    if (!isValid) {
      trigger();
      return;
    }

    let url = "";

    if (file) {
      const fileRef = ref(fstorage, `ntrex/${file.name}`);
      const result = await uploadBytes(fileRef, file);
      url = await getDownloadURL(result.ref);
    }

    emailjs
      .send(
        mailServiceId,
        mailTemplateId,
        {
          name: watch("name"),
          email: watch("email"),
          phone: watch("phone"),
          content: watch("content"),
          url: url,
        },
        "TtUxC740mnV6lPNFT"
      )
      .then((res) => {
        setIsAlert(true);
        setAlertProps({
          title: "문의 메일 발송",
          message: "문의 메일이 발송됐습니다. 빠른 시일 내에 답변드리겠습니다.",
          confirmText: "확인",
          onConfirm: () => {
            reset();
            setFile(null);
            setIsAlert(false);
          }
        });
      })
      .catch((err) => {
        setIsAlert(true);
        setAlertProps({
          title: "문의 메일 발송",
          message: "문의 메일 발송에 실패했습니다. 다시 시도해주세요.",
          confirmText: "확인",
          onConfirm: () => {
            reset();
            setIsAlert(false);
          }
        });
      });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];

    if (!currentFile) return;
    if (currentFile.size > 10 * 1024 * 1024) {
      setIsAlert(true);
      setAlertProps({
        title: "파일 용량 제한",
        message: "파일 용량이 10MB를 초과했습니다. 다시 확인해주세요.",
        confirmText: "확인",
        onConfirm: () => {
          setIsAlert(false);
        }
      });
      return;
    }

    setFile(currentFile);
  }

  return (
    <Layout>
      <Wrapper>
        <Title>견적 문의 보내기</Title>
        <Description>★ 주문 시 주문자 성함과 동일하게 작성해주셔야 확인이 가능합니다.</Description>
        <FormRow>
          <FormColumn>
            <div>
              <FormLabel>문의자 성함</FormLabel>
              <TextInputV2
                width="100%"
                size="lg"
                placeholder="성함을 입력해주세요"
                autoFocus
                {...getSimpleProps({ key: "name", setValue, watch, errors })}
              />
            </div>
            <div>
              <FormLabel>문의자 연락처</FormLabel>
              <TextInputV2
                width="100%"
                size="lg"
                placeholder="연락처를 입력해주세요."
                {...getSimpleProps({ key: "phone", setValue, watch, errors })}
              />
            </div>
            <div>
              <FormLabel>문의자 이메일 (견적서 발송용)</FormLabel>
              <TextInputV2
                width="100%"
                size="lg"
                placeholder="견적서 발송용 이메일을 입력해주세요."
                {...getSimpleProps({ key: "email", setValue, watch, errors })}
              />
            </div>
          </FormColumn>
          <FormColumn>
            <div>
              <FormLabel>문의 내용</FormLabel>
              <TextAreaV2
                width="100%"
                height="270px"
                placeholder="문의 내용을 입력해주세요."
                {...getSimpleProps({ key: "content", setValue, watch, errors })}
              />
            </div>
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormWrapper>
            <FormLabel>파일첨부</FormLabel>
            <FileInputWrapper>
              {file ? file.name :
                <TitleWrap>파일 첨부하기 (최대10MB까지) <b>발송가능 파일 확장자 : .dwg, PDF</b></TitleWrap>
              }
              <FileInput
                type="file"
                name="file"
                accept=".dwg, .pdf"
                onChange={handleFileChange}
              />
            </FileInputWrapper>
          </FormWrapper>
        </FormRow>
        <SendButton status="primary" onClick={handleClick}>견적 발송</SendButton>
      </Wrapper>
      {isAlert && (
        <AlertV2 {...alertProps} />
      )}
    </Layout >
  );
}

export default ContactPage;

const SendButton = styled(ButtonV2)`
  width: 100%;
  height: 60px;
  font-size: 1.5rem;
  background-color: #DA6242;
  cursor: pointer;

  &:hover:enabled {
    background-color: #DA6242;
  }
`;

const TitleWrap = styled.div`
@media (max-width: 550px) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
`;

const FileInputWrapper = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border: 2px dashed #6DCED0;
  color: #6DCED0;
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;
`;

const FileInput = styled.input`
  display: none;
`;

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
  padding: 20px 10px;
  gap: 20px;
`;

const Title = styled.div`
  color: #DA6242;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    font-size: 2.4rem;
  }
`;

const Description = styled.div`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: start;
  width: 100%;
  font-weight: 600;

  @media (max-width: 550px) {
    font-size: 1.2rem;
  }
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 25px;
`;

const FormLabel = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;

  @media (max-width: 550px) {
    font-size: 1.3rem;
  }
`;