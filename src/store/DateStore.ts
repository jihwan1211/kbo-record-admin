import { create } from "zustand";

export type ValuePiece = Date | null;
export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

interface DateStoreState {
  date: DateValue;
  setDate: (newDate: Date) => void;
}

const useDateStore = create<DateStoreState>((set) => ({
  date: new Date(),
  setDate: (newDate) => {
    set(() => ({
      date: newDate,
    }));
  },
}));

export default useDateStore;
