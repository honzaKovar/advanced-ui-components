import { createTheme, Theme } from "@mui/material/styles";
import { colors } from "./colors";

export function getTheme(): Theme {
  return createTheme({
    palette: {
      primary: {
        main: colors.primary.main,
        light: colors.primary.light,
        dark: colors.primary.dark,
      },
      background: {
        default: colors.background.default,
        paper: colors.background.paper,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
      grey: colors.grey,
    },
    spacing: 4,
  });
}
