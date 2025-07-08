import styled, { keyframes } from "styled-components";

const placeholderAnimation = keyframes`
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 200% 50%;
  }

  100% {
    background-position: 400% 50%;
  }
`;

export interface PlaceholderProps {
  $width?: string;
  $marginLeft?: string;
  $marginRight?: string;
}

const Placeholder = styled.span<PlaceholderProps>`
  display: inline-block;
  width: ${(props) => props.$width || "4em"};
  height: 1em;
  margin: 0.25em ${(props) => props.$marginRight || 0} 0.25em
    ${(props) => props.$marginLeft || 0};
  vertical-align: top;
  background: linear-gradient(
    -45deg,
    ${({ theme }) => theme.palette.core.Borders050},
    ${({ theme }) => theme.palette.core.Borders100},
    ${({ theme }) => theme.palette.core.Borders050}
  );
  background-size: 400% 400%;
  border-radius: 0.3em;
  animation: ${placeholderAnimation} 5s infinite;
`;

export default Placeholder;
