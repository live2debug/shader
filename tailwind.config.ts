import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        'light-mode': {
          extend: 'light',
          colors: {
            background: {
              "50": "#ffffff",
              "100": "#fbfbfb",
              "200": "#f7f7f7",
              "300": "#f3f3f3",
              "400": "#efefef",
              "500": "#ebebeb",
              "600": "#e7e7e7",
              "700": "#e2e2e2",
              "800": "#dedede",
              "900": "#dadada",
              "DEFAULT": "#fafafa",
              "foreground": "#000000",
            },
            foreground: {
              "50": "#cccccc",
              "100": "#bababa",
              "200": "#a8a8a8",
              "300": "#969696",
              "400": "#858585",
              "500": "#737373",
              "600": "#616161",
              "700": "#4f4f4f",
              "800": "#3d3d3d",
              "900": "#2b2b2b",
              "DEFAULT": "#3f3f3f",
              "foreground": "#ffffff",
            },
            divider: "#858585",
            focus: '#00000000',

          }
        },
        'dark-mode': {
          extend: 'dark',
          colors: {
            background: {
              "50": "#4d4d4d",
              "100": "#454545",
              "200": "#3d3d3d",
              "300": "#363636",
              "400": "#2e2e2e",
              "500": "#262626",
              "600": "#1f1f1f",
              "700": "#171717",
              "800": "#0f0f0f",
              "900": "#080808",
              "DEFAULT": "#161616",
              "foreground": "#ffffff",
            },
            foreground: {
              "50": "#f5f5f5",
              "100": "#e3e3e3",
              "200": "#d1d1d1",
              "300": "#bebebe",
              "400": "#acacac",
              "500": "#9a9a9a",
              "600": "#888888",
              "700": "#767676",
              "800": "#646464",
              "900": "#525252",
              "DEFAULT": "#e4e4e4",
              "foreground": "#000000",
            },
            divider: "#bfbebe",
            focus: '#00000000',
          }
        }
      }
    }),
  ],
}