import { keyframes } from "styled-components";

export const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const blink = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  51% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const shake = keyframes`
  0% {
    transform: translateX(0);
  }

  8.33% {
    transform: translateX(-3px);
  }

  25% {
    transform: translateX(3px);
  }

  41.67% {
    transform: translateX(-3px);
  }

  58.33% {
    transform: translateX(3px);
  }

  75% {
    transform: translateX(-3px);
  }

  91.67% {
    transform: translateX(3px);
  }

  100% {
    transform: translateX(0);
  }
`;
