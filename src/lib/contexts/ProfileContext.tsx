"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  avatar: string;
};

const defaultProfile: ProfileData = {
  firstName: "Green",
  lastName: "Trace",
  email: "green.trace@example.com",
  country: "India",
  avatar: "leaf"
};

const emptyProfile: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  avatar: "leaf"
};

type ProfileContextType = {
  profile: ProfileData;
  setProfile: (data: ProfileData) => void;
  isLoaded: boolean;
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  setProfile: () => { },
  isLoaded: false
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<ProfileData>(emptyProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gt_user_profile");
    if (saved) {
      try {
        setProfileState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse profile", e);
        setProfileState(defaultProfile);
      }
    } else {
      setProfileState(defaultProfile);
    }
    setIsLoaded(true);
  }, []);

  const setProfile = (newProfile: ProfileData) => {
    setProfileState(newProfile);
    localStorage.setItem("gt_user_profile", JSON.stringify(newProfile));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, isLoaded }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
