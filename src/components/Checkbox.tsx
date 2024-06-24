import { useReducer } from "react";
import styled from "styled-components";
import useToastStore from "../store/ToastStore";
import { UpdateWeeklyBooleanProps } from "../api/record.api";

type Props = {
  stateProps: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  mode: string;
  apiFunction: (props: UpdateWeeklyBooleanProps) => Promise<any>;
};

export default function Checkbox({ stateProps, setState, id, mode, apiFunction }: Props) {
  const [isboolean, toggleIsBoolean] = useReducer((state) => !state, stateProps || false);
  const { addToast } = useToastStore();

  const fetchChange = () => {
    apiFunction({ mode, id, flag: !stateProps }).then(
      (response) => {
        setState(!stateProps);
        toggleIsBoolean();
        addToast({ message: "기록 달성 여부 변경에 성공하였습니다.", type: "info" });
      },
      (error) => {
        addToast({ message: "기록 달성 여부 변경에 실패하였습니다.", type: "error" });
      }
    );
  };

  return <input type="checkbox" checked={isboolean} onChange={fetchChange} />;
}

const CheckboxStyle = styled.div``;
