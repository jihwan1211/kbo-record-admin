import { useReducer } from "react";
import styled from "styled-components";
import { updateWeeklyAchieve } from "../api/record.api";
import useToastStore from "../store/ToastStore";

type Props = {
  achieve: boolean;
  id: number;
  mode: string;
};

export default function Checkbox({ achieve, id, mode }: Props) {
  const [isAchieved, toggleIsAchieved] = useReducer((state) => !state, achieve || false);
  const { addToast } = useToastStore();

  const fetchWeeklyAchieve = () => {
    updateWeeklyAchieve({ mode, id, achieve: !isAchieved }).then(
      (response) => {
        toggleIsAchieved();
        addToast({ message: "기록 달성 여부 변경에 성공하였습니다.", type: "info" });
      },
      (error) => {
        addToast({ message: "기록 달성 여부 변경에 실패하였습니다.", type: "error" });
      }
    );
  };

  return (
    <CheckboxStyle>
      <input type="checkbox" checked={isAchieved} onChange={fetchWeeklyAchieve} />
    </CheckboxStyle>
  );
}

const CheckboxStyle = styled.div``;
