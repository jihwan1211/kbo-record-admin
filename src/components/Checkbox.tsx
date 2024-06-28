import { useReducer } from "react";
import useToastStore from "../store/ToastStore";
import { UpdateWeeklyBooleanProps } from "../api/record.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import useSideMenuStore from "../store/SideMenuStore";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  stateProps: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  recordId: number;
  mode: string;
  apiFunction: (props: UpdateWeeklyBooleanProps) => Promise<any>;
  mondayOfWeek: Date;
}

export default function Checkbox({ stateProps, setState, recordId, mode, apiFunction, mondayOfWeek, ...props }: Props) {
  const [isboolean, toggleIsBoolean] = useReducer((state) => !state, stateProps || false);
  const { addToast } = useToastStore();
  const { secondMenu } = useSideMenuStore();
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    const queryKey = ["weekly", "record", "team", dayjs(mondayOfWeek).format("YYYY-MM-DD"), secondMenu === "DONE" ? "UNDONE" : "DONE"];
    queryClient.invalidateQueries({ queryKey });
  };

  const { mutate } = useMutation({
    mutationFn: async () => apiFunction({ mode, id: recordId, flag: !isboolean }),
    onSuccess: (response) => {
      invalidateQueries();
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
