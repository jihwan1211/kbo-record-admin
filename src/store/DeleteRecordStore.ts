import { create } from "zustand";

interface DeleteRecordState {
  deleteTargets: number[];
  setDeleteTargets: (id: number) => void;
}

const useDeleteRecordStore = create<DeleteRecordState>((set) => ({
  deleteTargets: [],
  setDeleteTargets: (id: number) => {
    set((state) => {
      if (state.deleteTargets.includes(id)) {
        return {
          deleteTargets: state.deleteTargets.filter((targetId) => targetId !== id),
        };
      } else {
        return {
          deleteTargets: [...state.deleteTargets, id],
        };
      }
    });
  },
}));

export default useDeleteRecordStore;
