import foundations from "@/foundations";
import styled from "styled-components";
import { IconV2 } from "../IconV2";

const Well = styled.div`
  padding: 9px 14px;
  background-color: ${({ theme }) => theme.palette.core.SurfaceSecondary};
  border: 1px solid ${({ theme }) => theme.palette.core.Borders100};
  border-radius: 5px;
  word-break: keep-all;

  ${foundations.typography.Body3}

  > p {
    margin-top: 0;
  }
`;

export const WellIcon = styled(IconV2)<{
  inline?: boolean;
}>`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  ${({ inline }) => (inline ? "margin-right: 8px" : "margin-bottom: 8px")}
`;

export const WarningWell = styled(Well)`
  border-color: ${({ theme }) => theme.palette.core.BordersWarning100};
  background-color: ${({ theme }) => theme.palette.core.SurfaceWarning};
  word-break: keep-all;
`;

export const ErrorWell = styled(Well)`
  border-color: ${({ theme }) => theme.palette.core.BordersCritical100};
  background-color: ${({ theme }) => theme.palette.core.SurfaceCritical};
  color: ${({ theme }) => theme.palette.text.CriticalText};
  word-break: keep-all;
`;

export default Well;
