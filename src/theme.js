import { theme } from "@chakra-ui/react";

export default {
  ...theme,
  colors: {
    ...theme.colors,
    main: {
      50: "#fffff0",
      100: "#fefcbf",
      200: "#faf089",
      300: "#f6e05e",
      400: "#ecc94b",
      500: "#d69e2e",
      600: "#b7791f",
      700: "#975a16",
      800: "#744210",
      900: "#5F370E"
    },
    secondary: {
      background: "#FBF7EF",
      link: "#4A5568",
      card: "#ffffff",
      inputHelper: "#CBD5E0"
    },
    navItem: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568"
    }
  }
};
