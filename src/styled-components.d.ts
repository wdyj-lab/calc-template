import 'styled-components';
import ThemeInterface from './themes/ThemeInterface';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}