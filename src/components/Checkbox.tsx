import { useReducer } from "react";
import useToastStore from "../store/ToastStore";
import { UpdateWeeklyBooleanProps } from "../api/record.api";
import { useMutation } from "@tanstack/react-query";
import useTargetModeStore from "@/store/TargetModeStore";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  stateProps: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  recordId: number;
  mode: "team" | "player";

  apiFunction: (props: UpdateWeeklyBooleanProps) => Promise<any>;
}

export default function Checkbox({ stateProps, setState, recordId, mode, apiFunction, ...props }: Props) {
  const [isboolean, toggleIsBoolean] = useReducer((state) => !state, stateProps || false);
  const { addToast } = useToastStore();
  const { target } = useTargetModeStore();

  const { mutate } = useMutation({
    mutationFn: async () => apiFunction({ mode, id: recordId, flag: !isboolean, target }),
    onSuccess: (response) => {
      addToast({ message: "기록 달성 여부 변경에 성공하였습니다.", type: "info" });
      setState(!isboolean);
      toggleIsBoolean();
    },
    onError: (error) => {
      addToast({ message: `${error.message} 기록 달성 여부 변경에 실패하였습니다.`, type: "error" });
    },
  });

  return <input type="checkbox" checked={isboolean} onChange={() => mutate()} {...props} />;
}
