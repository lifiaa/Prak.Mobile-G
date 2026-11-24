import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

// Menentukan data dan fungsi autentikasi yang dibagikan ke seluruh aplikasi
interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

// Membuat context untuk menyimpan informasi autentikasi
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Menyimpan session pengguna dan status loading
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Mendengarkan perubahan status autentikasi secara langsung
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        setIsLoading(false);
      }
    });

    // Mengambil session yang tersimpan ketika aplikasi pertama kali dibuka
    supabase.auth.getSession().then(({ data, error }) => {
      if (mounted) {
        if (!error) {
          setSession(data.session);
        }
        setIsLoading(false);
      }
    });

    // Membersihkan listener ketika komponen tidak digunakan
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Menjalankan proses logout dari akun Supabase
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setSession(null);
  };

  // Membagikan informasi autentikasi ke seluruh halaman aplikasi
  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook untuk mengakses data autentikasi dari komponen lain
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}
