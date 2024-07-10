import { create } from "zustand";

interface SidebarState {
  activeId: string | null;
  updateActiveId: (id: string | null) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  activeId: null,
  updateActiveId: (id: string | null) => set((state) => ({ activeId: id })),
}));

export default useSidebarStore;
