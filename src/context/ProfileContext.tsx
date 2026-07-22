import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  registeredAt: string;
}

interface ProfileContextValue {
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);
const STORAGE_PREFIX = "nyc_pms_profile_";

const EMPTY_PROFILE: StudentProfile = {
  fullName: "",
  email: "",
  phone: "",
  registeredAt: new Date().toISOString(),
};

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "Student";
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile>(EMPTY_PROFILE);

  useEffect(() => {
    if (!user) {
      setProfile(EMPTY_PROFILE);
      return;
    }

    const key = `${STORAGE_PREFIX}${user.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
        return;
      } catch {
        // fall through and reseed below
      }
    }

    const seeded: StudentProfile = {
      fullName: nameFromEmail(user.email),
      email: user.email,
      phone: "",
      registeredAt: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(seeded));
    setProfile(seeded);
  }, [user]);

  function updateProfile(updates: Partial<StudentProfile>) {
    if (!user) return;
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(`${STORAGE_PREFIX}${user.id}`, JSON.stringify(next));
      return next;
    });
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within a ProfileProvider");
  return ctx;
}
