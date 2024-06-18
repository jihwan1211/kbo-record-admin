import { useCallback } from "react";

export const useAlert = () => {
  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  }, []);

  return { showConfirm };
};
