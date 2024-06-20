import styled from "styled-components";
import useToastStore, { Toast as IToast } from "../store/ToastStore";
import { FaPlus, FaBan, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export const TOAST_REMOVE_DELAY = 3000;

export default function Toast({ id, message, type }: IToast) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState(false);
  console.log("abc", isFadingOut);
  const handleRemoveToast = () => {
    setIsFadingOut(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, TOAST_REMOVE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    if (isFadingOut) removeToast(id);
  };

  return (
    <ToastStyle className={isFadingOut ? "fade-out" : "fade-in"} $type={type} onAnimationEnd={handleAnimationEnd}>
      {type === "info" && <FaInfoCircle />}
      {type === "error" && <FaBan />}
      <p>{message}</p>
      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </ToastStyle>
  );
}

type ToastStyleProps = {
  $type: "info" | "error";
};

const ToastStyle = styled.div<ToastStyleProps>`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }
  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
  opacity: 0;
  transition: all 0.3s ease-in-out;

  p {
    color: ${({ theme, $type }) => ($type === "error" ? theme.color.error : "")};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
    }
  }

  border: 1px solid ${({ theme, $type }) => ($type === "error" ? theme.color.error : "")};
  svg {
    fill: ${({ theme, $type }) => ($type === "error" ? theme.color.error : "")};
  }
`;
