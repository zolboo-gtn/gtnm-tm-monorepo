//
import { create } from "zustand";

type Props = {
  isTransitioning: boolean;
  setIsTransitioning: (isOpen: boolean) => void;
};
export const useClientTransition = create<Props>()((set) => ({
  isTransitioning: false,
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
}));
