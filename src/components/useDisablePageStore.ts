import { create } from "zustand";

interface PageState {
  isDisabled: boolean;
  enable: () => void;
  disable: () => void;
}

const useDisablePageStore = create<PageState>((set) => ({
  isDisabled: false,
  enable: () => set({ isDisabled: false }),
  disable: () => set({ isDisabled: true }),
}));

export default useDisablePageStore;
