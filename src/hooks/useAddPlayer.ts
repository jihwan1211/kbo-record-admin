import { TeamType } from "@/models/team";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerPlayer } from "@/api/player.api";
import useToastStore from "@/store/ToastStore";
import { FormEventHandler } from "react";

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

  const handleNewPlayerChange = (e: any) => {
    let { name, value } = e.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: async () => registerPlayer({ ...player }),
    onError: (error) => {
      addToast({ message: `${error}, 선수 등록에 실패하였습니다.`, type: "error" });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!player.player || !player.team || !player.uniformNumber) {
      addToast({ message: "선수 정보를 모두 입력하세요.", type: "error" });
      return;
    }

    mutate(undefined, {
      onSuccess: () => {
        addToast({ message: "선수 저장에 성공하였습니다.", type: "info" });
        onClose();
      },
    });
  };

  return { handleNewPlayerChange, player, setPlayer, handleSubmit };
};

export default useAddPlayer;
