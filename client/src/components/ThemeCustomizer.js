import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { FormControl, InputLabel, Select, MenuItem, Typography, Box, Stack } from "@mui/material";

export default function ThemeCustomizer() {
  const { themeKey, changeTheme, fontFamily, changeFont, themes, fonts } = useContext(ThemeContext);

  const safeThemeKey = themes[themeKey] ? themeKey : "harvestLuxe";

  return (
    <Box sx={{ px: 1, pb: 2 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontFamily, fontWeight: 600 }}>
        Theme Palette
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="theme-select-label" sx={{ fontFamily }}>Theme Palette</InputLabel>
        <Select
          labelId="theme-select-label"
          value={safeThemeKey}
          label="Theme Palette"
          onChange={(e) => changeTheme(e.target.value)}
          sx={{
            fontFamily,
          }}
        >
          {Object.keys(themes).map((key) => {
            const themeObj = themes[key];
            const primaryColor = themeObj?.palette?.primary?.main || '#888';
            const mode = themeObj?.palette?.mode || 'light';

            return (
              <MenuItem
                key={key}
                value={key}
                sx={{ fontFamily }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: primaryColor,
                      border: '1px solid rgba(0,0,0,0.15)',
                      flexShrink: 0
                    }}
                  />
                  <Typography variant="body2" sx={{ fontFamily, textTransform: "capitalize" }}>
                    {key.replace(/([A-Z])/g, " $1")} ({mode})
                  </Typography>
                </Stack>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Typography variant="subtitle1" gutterBottom sx={{ fontFamily, fontWeight: 600 }}>
        Font Family
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="font-select-label" sx={{ fontFamily }}>Font Family</InputLabel>
        <Select
          labelId="font-select-label"
          value={fontFamily}
          label="Font Family"
          onChange={(e) => changeFont(e.target.value)}
          sx={{
            fontFamily,
          }}
        >
          {fonts.map((font) => (
            <MenuItem
              key={font}
              value={font}
              style={{ fontFamily: font }}
            >
              {font.split(",")[0].replace(/['"]/g, "")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
