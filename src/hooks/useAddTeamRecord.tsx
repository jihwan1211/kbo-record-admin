import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { postNewTeamRecord } from "../api/record.api";
import useToastStore from "../store/ToastStore";
import { getMondayDateOfWeek } from "../lib/formatDate";

const useAddTeamRecord = () => {
  const [team, setTeam] = useState("SSG");
  const [content, setContent] = useState("");
  const [accSum, setAccSum] = useState("");
  const [remain, setRemain] = useState("");
  const [remark, setRemark] = useState(1);
  const [celebrate, setCelebrate] = useState(false);
  const [createdAt, setCreatedAt] = useState(() => dayjs(new Date()).format("YYYY-MM-DD"));
  const { addToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: async () =>
      postNewTeamRecord({ team, content, accSum, remain, remark, celebrate, achieve: false, createdAt: dayjs(getMondayDateOfWeek(new Date(createdAt))).format("YYYY-MM-DD"), achievementDate: null }),
    onError: (error) => {
      console.log(error);
      addToast({ message: `${error}, 팀 기록 저장에 실패하였습니다.`, type: "error" });
    },
  });

  return { team, setTeam, content, setContent, accSum, setAccSum, remain, setRemain, remark, setRemark, celebrate, setCelebrate, createdAt, setCreatedAt, mutate };
};

export default useAddTeamRecord;
