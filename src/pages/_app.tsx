import BaseTheme from "@/themes/BaseTheme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={BaseTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
