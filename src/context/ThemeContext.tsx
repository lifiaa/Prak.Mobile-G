
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const THEME_KEY = "petcare-dark-mode";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);

        if (savedTheme !== null) {
          setDarkMode(savedTheme === "true");
        }
      } catch (error) {
        console.error("Gagal memuat preferensi tema:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_KEY, String(darkMode));
      } catch (error) {
        console.error("Gagal menyimpan preferensi tema:", error);
      }
    };

    saveTheme();
  }, [darkMode, isLoaded]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
