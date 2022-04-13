export type Theme = {
  name: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    scrollTrack: string;
    scrollHandle: string;
  };
};

export const light: Theme = {
  name: "light",
  colors: {
    background: "#ffffff",
    primary: "#000000",
    secondary: "#495057",
    tertiary: "#555559",
    quaternary: "#dadada",
    scrollTrack: "#171717",
    scrollHandle: "rgba(255,255,255,0.41)",
  },
};

export const dark: Theme = {
  name: "dark",
  colors: {
    background: "#000000",
    primary: "#ffffff",
    secondary: "#ced4da",
    tertiary: "#bbbbbb",
    quaternary: "#424242",
    scrollTrack: "#495057",
    scrollHandle: "#ced4da",
  },
};
