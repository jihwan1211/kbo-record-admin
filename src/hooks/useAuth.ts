import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import useAuthStore from "../store/AuthStore";
import { useState, useCallback } from "react";
import { LoginType } from "../pages/Login";

const useAuth = () => {
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  const [isloginFailed, setIsLoginFailed] = useState(false);
  const navigate = useNavigate();

  const userLogin = useCallback((data: LoginType) => {
    login(data).then(
      (res) => {
        storeLogin(res.data.token);
        setIsLoginFailed(false);
        navigate("/");
        window.location.reload();
      },
      (error) => {
        setIsLoginFailed(true);
      }
    );
  }, []);
  // 일반 함수로? useCallback으로 최적화? -> 공식문서는 useCallback으로 최적화하래
  const userLogout = () => {
    storeLogout();
    window.location.reload();
  };

  return { isLoggedIn, userLogin, isloginFailed, userLogout };
};

export default useAuth;
