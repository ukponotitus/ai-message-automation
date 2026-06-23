import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { api, Business, Subscription } from "../lib/api";
import { billingService } from "../services/billing";

interface AuthState {
  user: { id: number; email: string; name: string } | null;
  business: Business | null;
  businesses: Business[];
  subscription: Subscription | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: AuthState["user"]) => void;
  setBusiness: (b: Business) => void;
  refreshBusinesses: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSubscription = useCallback(async () => {
    try {
      if (business) {
        const sub = await billingService.getSubscription(business.id);
        setSubscription(sub);
      }
    } catch {
      setSubscription(null);
    }
  }, [business]);

  const refreshBusinesses = useCallback(async () => {
    try {
      const data = await api.get<{ businesses: Business[] }>("/auth/businesses/");
      const list = data.businesses || [];
      setBusinesses(list);
      if (list.length > 0) {
        setBusiness(list[0]);
      }
    } catch (err) {
      setBusinesses([]);
    }
  }, []);

  useEffect(() => {
    if (business) {
      refreshSubscription();
    }
  }, [business, refreshSubscription]);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userData = await api.get<{ id: number; email: string; name: string }>("/auth/me/");
          setUser(userData);
          await refreshBusinesses();
        } catch (error) {
          localStorage.removeItem("access_token");
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [refreshBusinesses]);
  
  const login = async (email: string, password: string) => {
    const data = await api.post<{ access: string; user: AuthState["user"] }>("/auth/login/", { email, password });
    localStorage.setItem("access_token", data.access);
    setUser(data.user);
    await refreshBusinesses();
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await api.post<{ access: string; refresh: string; user: AuthState["user"] }>("/auth/register/", { name, email, password });
    localStorage.setItem("access_token", data.access);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setBusiness(null);
    setBusinesses([]);
    setSubscription(null);
  };

  return (
    <AuthContext.Provider value={{ user, business, businesses, subscription, loading, login, register, logout, setUser, setBusiness, refreshBusinesses, refreshSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
