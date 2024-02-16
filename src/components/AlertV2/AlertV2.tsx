import Color from "color";
import React, { FC, ReactChild } from "react";
import styled from "styled-components";

import foundations from "../../foundations";
import useScrollLock from "../../hooks/useScrollLock";
import generateMediaQuery from "../../utils/generateMediaQuery";
import useDidMount from "../../utils/useDidMount";
import ActionButton, { ActionButtonGroup } from "../ActionButton";
import ButtonV2 from "../ButtonV2";

export interface AlertV2Props {
  title?: string;
  message: ReactChild;
  type?: "horizontal" | "vertical";
  showCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

const AlertV2: FC<AlertV2Props> = ({
  title,
  message,
  type = "horizontal",
  confirmText = "Confirm",
  cancelText = "Close",
  onClose,
  onConfirm,
  showCancel,
}) => {
  useScrollLock();

  useDidMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Wrapper>
      <Content>
        <Box>
          {title && <AlertTitle>{title}</AlertTitle>}
          {typeof message === "string" ? (
            <AlertMessage>{message}</AlertMessage>
          ) : (
            message
          )}
          <AlertButtons>
            {showCancel && (
              <ButtonV2
                size="md"
                betweenMargin="8px"
                minWidth="92px"
                onClick={onClose}
              >
                {cancelText}
              </ButtonV2>
            )}
            <ButtonV2
              size="md"
              status="primary"
              minWidth="92px"
              onClick={onConfirm}
              autoFocus
            >
              {confirmText}
            </ButtonV2>
          </AlertButtons>
          <MobileAlertButtons type={type}>
            {showCancel && (
              <ActionButton status="tertiary" onClick={onClose}>
                {cancelText}
              </ActionButton>
            )}
            <ActionButton status="primary" onClick={onConfirm}>
              {confirmText}
            </ActionButton>
          </MobileAlertButtons>
        </Box>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
  background: ${(props) =>
    Color(props.theme.palette.core.Dimmed).alpha(0.5).toString()};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const AlertTitle = styled.h4`
  padding: 0;
  margin: 0 0 12px;
  ${foundations.typography.H4};
  color: ${(props) => props.theme.palette.text.PrimaryText};
`;

const AlertMessage = styled.p`
  min-height: 40px;
  margin: 0;
  color: ${(props) =>
    Color(props.theme.palette.text.PrimaryText).alpha(0.8).toString()};
  white-space: pre-line;
  ${foundations.typography.Body2_300};

  @media ${generateMediaQuery("<", "md")} {
    ${foundations.typography.Body1_200};
  }
`;

const AlertButtons = styled.footer`
  margin-top: 40px;
  text-align: right;

  @media ${generateMediaQuery("<", "md")} {
    display: none;
  }
`;

const MobileAlertButtons = styled(ActionButtonGroup)`
  display: none;

  @media ${generateMediaQuery("<", "md")} {
    display: flex;
    margin: 36px -4px -8px;
  }
`;

const Box = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 400px;
  min-height: 154px;
  padding: 20px 24px;
  margin: auto;
  color: ${(props) => props.theme.palette.text.PrimaryText};
  background: ${(props) => props.theme.palette.core.BackgroundPrimary};
  border-radius: 6px;
  box-shadow: 0 3px 7px
    ${(props) => Color(props.theme.palette.core.Shadow).alpha(0.1).toString()};

  @media ${generateMediaQuery("<", "md")} {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: ${({ theme }) => theme.elevation.PopUp + 5};
    width: auto;
    min-width: min(calc(100vw - 64px), 360px);
    max-width: 360px;
    max-height: 375px;
    padding: 28px 24px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 0 10px
        ${({ theme }) =>
    Color(theme.palette.core.Shadow).alpha(0.25).toString()},
      0 30px 30px
        ${({ theme }) => Color(theme.palette.core.Shadow).alpha(0.2).toString()},
      0 25px 40px
        ${({ theme }) =>
    Color(theme.palette.core.Shadow).alpha(0.15).toString()};
    transform: translate(-50%, -50%);
  }
`;

export default AlertV2;
