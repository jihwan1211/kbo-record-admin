import { useReducer } from "react";
import styled from "styled-components";
import useToastStore from "../store/ToastStore";
import { UpdateWeeklyBooleanProps } from "../api/record.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import useSideMenuStore from "../store/SideMenuStore";

type Props = {
  stateProps: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  mode: string;
  apiFunction: (props: UpdateWeeklyBooleanProps) => Promise<any>;
  mondayOfWeek: Date;
};

export default function Checkbox({ stateProps, setState, id, mode, apiFunction, mondayOfWeek }: Props) {
  const queryClient = useQueryClient();
  const [isboolean, toggleIsBoolean] = useReducer((state) => !state, stateProps || false);
  const { addToast } = useToastStore();
  const { secondMenu } = useSideMenuStore();

  const invalidateQueries = () => {
    const queryKey = ["weekly", "record", dayjs(mondayOfWeek).format("YYYY-MM-DD"), secondMenu === "DONE" ? "UNDONE" : "DONE"];
    queryClient.invalidateQueries({ queryKey });
  };

  const { mutate } = useMutation({
    mutationFn: async () => apiFunction({ mode, id, flag: !stateProps }),
    onSuccess: (response) => {
      invalidateQueries();
      addToast({ message: "기록 달성 여부 변경에 성공하였습니다.", type: "info" });
      setState(!stateProps);
      toggleIsBoolean();
    },
    onError: (error) => {
      addToast({ message: `${error.message} 기록 달성 여부 변경에 실패하였습니다.`, type: "error" });
    },
  });

  const fetchChange = () => {
    mutate();
  };
  return <input type="checkbox" checked={isboolean} onChange={fetchChange} />;
}

const CheckboxStyle = styled.div``;
