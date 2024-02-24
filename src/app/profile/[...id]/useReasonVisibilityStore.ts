import { create } from "zustand";

interface ReasonVisibilityState {
  reasonsToHide: string[];
  activeTags: string[];
  clearActiveTags: () => void;
  updateActiveTags: (ids: string) => void;
  updateReasonsToHide: (ids: string[]) => void;
}

const useReasonVisibilityStore = create<ReasonVisibilityState>((set) => ({
  reasonsToHide: [],
  activeTags: [],
  clearActiveTags: () => set(() => ({ activeTags: [] })),
  updateActiveTags: (tag: string) => set((state) => ({ activeTags: [tag] })),
  updateReasonsToHide: (ids) => set(() => ({ reasonsToHide: ids })),
}));

export default useReasonVisibilityStore;
