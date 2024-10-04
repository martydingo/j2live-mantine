import { createTheme, mergeMantineTheme, DEFAULT_THEME, MantineColorsTuple } from '@mantine/core';

export const halcyon_colors: {[key: string]: MantineColorsTuple} = { 
  dark: [
    "#e3e4e5",
    "#b9bbbf",
    "#8b8e94",
    "#5d6069",
    "#3a3e48",
    "#171c28",
    "#141924",
    "#11141e",
    "#0d1118",
    "#07090f"
  ],
  grey: [
    "#edf6fb",
    "#e4e7eb",
    "#c7cdd2",
    "#a8b1ba",
    "#8e99a5",
    "#7d8a99",
    "#738294",
    "#617082",
    "#556375",
    "#45556a"
  ],
  red: [
    "#ffeaec",
    "#fed3d6",
    "#f6a4aa",
    "#f0747b",
    "#ea4a53",
    "#e7313b",
    "#e7212d",
    "#ce1320",
    "#b80b1b",
    "#a10015"
  ],
  pink: [
    "#ffebfd",
    "#fad5f4",
    "#f2a8e6",
    "#ec78d8",
    "#e650cd",
    "#e238c5",
    "#e22ac2",
    "#c91eab",
    "#b31699",
    "#9d0786"
  ],
  grape: [
    "#ffebfd",
    "#fad5f4",
    "#f2a8e6",
    "#ec78d8",
    "#e650cd",
    "#e238c5",
    "#e22ac2",
    "#c91eab",
    "#b31699",
    "#9d0786"
  ],
  violet: [
    "#f2eaff",
    "#dfd0ff",
    "#bc9cff",
    "#9764fe",
    "#7737fd",
    "#641afd",
    "#590bfe",
    "#4a00e3",
    "#4100cb",
    "#3600b3"
  ],
  indigo: [
    "#f2eaff",
    "#dfd0ff",
    "#bc9cff",
    "#9764fe",
    "#7737fd",
    "#641afd",
    "#590bfe",
    "#4a00e3",
    "#4100cb",
    "#3600b3"
  ],
  blue: [
    "#eaf3ff",
    "#d6e4fa",
    "#aec6ee",
    "#83a7e1",
    "#5e8cd6",
    "#467bd1",
    "#3973cf",
    "#2962b7",
    "#2057a6",
    "#0b4b94"
  ],
  cyan: [
    "#dffdff",
    "#cff4fc",
    "#a5e7f4",
    "#76d8eb",
    "#50cce4",
    "#37c4e0",
    "#21c0df",
    "#00aac7",
    "#0097b2",
    "#00839d"
  ],
  teal: [
    "#dffdff",
    "#cff4fc",
    "#a5e7f4",
    "#76d8eb",
    "#50cce4",
    "#37c4e0",
    "#21c0df",
    "#00aac7",
    "#0097b2",
    "#00839d"
  ],
  green: [
    "#f3fde6",
    "#e9f8d4",
    "#d2efab",
    "#bae67e",
    "#a6de57",
    "#98d93f",
    "#91d731",
    "#7cbe23",
    "#6da91a",
    "#5c920a"
  ],
  lime: [
    "#f3fde6",
    "#e9f8d4",
    "#d2efab",
    "#bae67e",
    "#a6de57",
    "#98d93f",
    "#91d731",
    "#7cbe23",
    "#6da91a",
    "#5c920a"
  ],
  yellow: [
    "#fff8e1",
    "#ffefcc",
    "#ffde9b",
    "#ffcb64",
    "#ffbc38",
    "#ffb21b",
    "#ffad09",
    "#e39700",
    "#ca8600",
    "#af7300"
  ],
  orange: [
    "#fff4e2",
    "#ffe7cc",
    "#ffcf9b",
    "#ffb464",
    "#fe9e38",
    "#fe901b",
    "#ff8809",
    "#e47600",
    "#cb6700",
    "#b05800"
  ]
}

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: halcyon_colors
});
