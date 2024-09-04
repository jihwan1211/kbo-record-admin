import { TeamType } from "@/models/team";
import { useState } from "react";
import useToastStore from "@/store/ToastStore";
import { FormEventHandler } from "react";
import { usePostPlayer } from "./api/usePostPlayer";

type Props = {
  onClose: () => void;
};

const useAddPlayer = ({ onClose }: Props) => {
  const [player, setPlayer] = useState<{ team: TeamType; player: string; uniformNumber: string }>({
    team: "SSG",
    player: "",
    uniformNumber: "",
  });
  const { addToast } = useToastStore();

  const { mutate } = usePostPlayer(player, {
    onSuccess: () => {
      addToast({ message: "선수 저장에 성공하였습니다.", type: "info" });
      onClose();
    },
    onError: (error) => {
      addToast({ message: `${error}, 선수 등록에 실패하였습니다.`, type: "error" });
    },
  });

  const handleNewPlayerChange = (e: any) => {
    let { name, value } = e.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return { handleNewPlayerChange, player, setPlayer, handleSubmit };
};

export default useAddPlayer;
