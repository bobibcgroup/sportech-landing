"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
}

interface ThemeContextValue extends ThemeState {
  setTheme: (primary: string, secondary: string) => void;
  resetTheme: () => void;
}

const DEFAULT_PRIMARY = "#faff69";
const DEFAULT_SECONDARY = "#0a0a0a";

function hexToRgbCss(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function getOnPrimaryColor(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#0a0a0a" : "#ffffff";
}

const ThemeContext = createContext<ThemeContextValue>({
  primaryColor: DEFAULT_PRIMARY,
  secondaryColor: DEFAULT_SECONDARY,
  setTheme: () => {},
  resetTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>({
    primaryColor: DEFAULT_PRIMARY,
    secondaryColor: DEFAULT_SECONDARY,
  });

  const setTheme = useCallback((primary: string, secondary: string) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", primary);
    root.style.setProperty("--color-primary-rgb", hexToRgbCss(primary));
    root.style.setProperty("--color-on-primary", getOnPrimaryColor(primary));
    setState({ primaryColor: primary, secondaryColor: secondary });
  }, []);

  const resetTheme = useCallback(() => {
    const root = document.documentElement;
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-rgb");
    root.style.removeProperty("--color-on-primary");
    setState({ primaryColor: DEFAULT_PRIMARY, secondaryColor: DEFAULT_SECONDARY });
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
