import styled from "styled-components";

type Props = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleRecordChange: () => void;
};

export default function EditRecord({ isEditing, setIsEditing, handleRecordChange }: Props) {
  return (
    <td>
      {isEditing ? (
        <>
          <button onClick={handleRecordChange}>완료</button>
          <button onClick={() => setIsEditing(!isEditing)}>취소</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(!isEditing)}>수정</button>
      )}
    </td>
  );
}

const EditRecordStyle = styled.div``;
