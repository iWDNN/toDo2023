import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    elementColor: {
      inputBg: string;
      boxBg: string;
    };
  }
}
