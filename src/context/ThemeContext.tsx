
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
    // Fungsinya untuk mengambil preferensi tema yang sebelumnya disimpan pengguna.fungsi asynchronous yang kita buat sendiri menggunakan keyword async.
    const loadTheme = async () => {
      try {
        // Pre-built Async Function: getItem()	Mengambil data tema yang tersimpan
        // Pre-built Async Function adalah fungsi asynchronous yang sudah disediakan oleh library atau package, sehingga kita tidak perlu membuat implementasi dasarnya sendiri.
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
    // Fungsinya untuk menyimpan perubahan tema pengguna ke penyimpanan lokal agar preferensi tersebut tidak hilang ketika aplikasi ditutup.
    const saveTheme = async () => {
      try {
        // Pre-built Async Function: AsyncStorage.setItem()	Menyimpan preferensi tema
        await AsyncStorage.setItem(THEME_KEY, String(darkMode));
      } catch (error) {
        console.error("Gagal menyimpan preferensi tema:", error);
      } finally {
        setIsLoaded(true);
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

// loadTheme() dibuat sendiri oleh programmer.
// async membuat fungsi tersebut menghasilkan Promise.
// await menunggu proses pengambilan data selesai.