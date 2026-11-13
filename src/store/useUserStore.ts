// src/store/useUserStore.ts
import { create } from "zustand";

interface UserState {
  userName: string;
  region: string;
  budget: number;
  spent: number;
  setUserData: (userName: string, region: string, budget: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userName: "Aylin",
  region: "Norte (Comarca Lagunera)",
  budget: 1200,
  spent: 980,
  setUserData: (userName, region, budget) => set({ userName, region, budget }),
}));
