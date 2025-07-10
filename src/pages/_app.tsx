import { GlobalStyle } from "@/globalStyle";
import BaseTheme from "@/themes/BaseTheme";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { ThemeProvider } from "styled-components";

const nanumRound = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquareRoundL.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRoundR.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareRoundB.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/NanumSquareRoundEB.ttf",
      weight: "800",
      style: "bold",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={BaseTheme}>
      <GlobalStyle />
      <main className={nanumRound.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
