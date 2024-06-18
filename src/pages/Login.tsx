import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

export type LoginType = {
  email: string;
  password: string;
};

export default function Login() {
  const { isloginFailed, userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginType>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    userLogin(data);
  };

  return (
    <>
      <h1>Login</h1>
      <LoginStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <input
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "올바른 이메일 형식이 아니에요",
                },
              })}
            />
          </fieldset>
          <fieldset>
            <input type="password" placeholder="비밀번호" {...register("password", { required: true })} />
          </fieldset>
          <fieldset>
            <button type="submit" disabled={!isValid || isSubmitting}>
              로그인
            </button>
            {(errors.password || errors.email) && <p className="error">이메일 혹은 비밀번호를 입력하십시오.</p>}
            {isloginFailed && (
              <p className="error">
                로그인에 실패하였습니다.
                <br /> 이메일 혹은 비밀번호를 입력하십시오.
              </p>
            )}
          </fieldset>
        </form>
      </LoginStyle>
    </>
  );
}

const LoginStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0;
    margin: 10px 0;
  }

  input {
    width: 100%;
    line-height: 2;
    font-size: 1rem;
  }

  button {
    border: 0;
    background-color: ${({ theme }) => theme.menu.backgroundColor};
    color: ${({ theme }) => theme.menu.color};
    cursor: pointer;

    width: 100%;
    max-width: ${({ theme }) => theme.layout.width.small};
    border: 1px solid black;
    padding: 0.5rem;

    &:hover {
      background-color: ${({ theme }) => theme.menu.hoverBackgroundColor};
    }

    &:disabled {
      border: 0;
      background-color: ${({ theme }) => theme.color.disabled};
    }
  }

  .error {
    color: ${({ theme }) => theme.color.error};
    font-size: 0.8rem;
  }
`;
