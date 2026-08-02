import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const themes = {
  // --- ☀️ LIGHT THEMES ---
  harvestLuxe: {
    palette: {
      mode: "light",
      primary: { main: "#2c6e49", light: "#3b8e5f", dark: "#1c4930", contrastText: "#ffffff" },
      secondary: { main: "#d97706", light: "#f59e0b", dark: "#b45309", contrastText: "#ffffff" },
      background: { default: "#f8fafc", paper: "#ffffff" },
      text: { primary: "#0f172a", secondary: "#475569" },
      gradient: "linear-gradient(135deg, #2c6e49 0%, #1c4930 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  royalAmethystLight: {
    palette: {
      mode: "light",
      primary: { main: "#7b2cbf", dark: "#5e2191", contrastText: "#ffffff" },
      secondary: { main: "#e5a50a", dark: "#c09d0c", contrastText: "#000000" },
      background: { default: "#f8f5fe", paper: "#ffffff" },
      text: { primary: "#24202b", secondary: "#5a5361" },
    },
    typography: { fontFamily: "Playfair Display, serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  nordicMist: {
    palette: {
      mode: "light",
      primary: { main: "#0f766e", light: "#14b8a6", dark: "#115e59", contrastText: "#ffffff" },
      secondary: { main: "#0284c7", light: "#38bdf8", dark: "#0369a1", contrastText: "#ffffff" },
      background: { default: "#f0fdfa", paper: "#ffffff" },
      text: { primary: "#042f2e", secondary: "#134e4a" },
      gradient: "linear-gradient(135deg, #0f766e 0%, #0284c7 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  sunsetGlow: {
    palette: {
      mode: "light",
      primary: { main: "#c85a32", light: "#d67a58", dark: "#9e3d1b", contrastText: "#ffffff" },
      secondary: { main: "#d99b26", light: "#e5b152", dark: "#a87515", contrastText: "#ffffff" },
      background: { default: "#faf6f0", paper: "#ffffff" },
      text: { primary: "#2d2019", secondary: "#5c483e" },
      gradient: "linear-gradient(135deg, #c85a32 0%, #9e3d1b 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  oceanBreeze: {
    palette: {
      mode: "light",
      primary: { main: "#1e40af", light: "#3b82f6", dark: "#1e3a8a", contrastText: "#ffffff" },
      secondary: { main: "#0d9488", light: "#14b8a6", dark: "#0f766e", contrastText: "#ffffff" },
      background: { default: "#f0f7ff", paper: "#ffffff" },
      text: { primary: "#0f172a", secondary: "#334155" },
      gradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },

  // --- 🌙 DARK THEMES ---
  harvestLuxeDark: {
    palette: {
      mode: "dark",
      primary: { main: "#38764e", light: "#4c9366", dark: "#234d32", contrastText: "#ffffff" },
      secondary: { main: "#c68a32", light: "#da9f47", dark: "#9b681e", contrastText: "#000000" },
      background: { default: "#0f172a", paper: "#1e293b" },
      text: { primary: "#f1f5f9", secondary: "#94a3b8" },
      gradient: "linear-gradient(135deg, #234d32 0%, #0f172a 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  royalAmethyst: {
    palette: {
      mode: "dark",
      primary: { main: "#7b2cbf", dark: "#5e2191", contrastText: "#ffffff" },
      secondary: { main: "#f1c40f", dark: "#c09d0c", contrastText: "#000000" },
      background: { default: "#14101b", paper: "#24202b" },
      text: { primary: "#e9d8fd", secondary: "#c3a6e4" },
    },
    typography: { fontFamily: "Playfair Display, serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  obsidianMidnight: {
    palette: {
      mode: "dark",
      primary: { main: "#6366f1", light: "#818cf8", dark: "#4338ca", contrastText: "#ffffff" },
      secondary: { main: "#f43f5e", light: "#fb7185", dark: "#e11d48", contrastText: "#ffffff" },
      background: { default: "#0b0f19", paper: "#161f32" },
      text: { primary: "#f3f4f6", secondary: "#9ca3af" },
      gradient: "linear-gradient(135deg, #4338ca 0%, #0b0f19 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  espressoDark: {
    palette: {
      mode: "dark",
      primary: { main: "#d97706", light: "#f59e0b", dark: "#b45309", contrastText: "#000000" },
      secondary: { main: "#ea580c", light: "#f97316", dark: "#c2410c", contrastText: "#ffffff" },
      background: { default: "#181210", paper: "#251c18" },
      text: { primary: "#fef3c7", secondary: "#d97706" },
      gradient: "linear-gradient(135deg, #78350f 0%, #181210 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },
  abyssalTeal: {
    palette: {
      mode: "dark",
      primary: { main: "#0d9488", light: "#14b8a6", dark: "#0f766e", contrastText: "#ffffff" },
      secondary: { main: "#38bdf8", light: "#7dd3fc", dark: "#0284c7", contrastText: "#000000" },
      background: { default: "#091e23", paper: "#112d34" },
      text: { primary: "#e0f2fe", secondary: "#7dd3fc" },
      gradient: "linear-gradient(135deg, #0f766e 0%, #091e23 100%)",
    },
    typography: { fontFamily: "Inter, sans-serif", button: { textTransform: "none", fontWeight: 700 } },
  },
};

const fonts = [
  "Roboto, Arial, sans-serif",
  "'Open Sans', sans-serif",
  "Lato, sans-serif",
  "Montserrat, sans-serif",
  "Oswald, sans-serif",
  "Raleway, sans-serif",
  "Merriweather, serif",
  "'Playfair Display', serif",
  "'Source Sans Pro', sans-serif",
  "Poppins, sans-serif",
  "Nunito, sans-serif",
  "Inter, sans-serif",
];

export function themeFromKey(key, fontFamilyOverride) {
  if (!themes[key]) key = "harvestLuxe";
  const baseThemeConfig = themes[key];
  const font = fontFamilyOverride || baseThemeConfig.typography?.fontFamily || "Inter, sans-serif";

  let theme = createTheme({
    ...baseThemeConfig,
    typography: {
      fontFamily: font,
      allVariants: { fontFamily: font },
      button: { textTransform: "none", fontWeight: 700, fontFamily: font },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: font,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: font,
            textTransform: "none",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: font,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontFamily: font,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: font,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: font,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: font,
            textTransform: "none",
          },
        },
      },
    },
  });
  return responsiveFontSizes(theme);
}

export { themes, fonts };