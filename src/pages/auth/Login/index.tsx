import { useState } from "react";
import LoginUI from "./LoginUI";
import type { ILoginRequest } from "../../../interfaces/auth/auth.types";
import useAuthApiAction from "../../../apiActions/Login/useAuthApiAction";
import useLoginForm from "../../../forms/login/useLoginForm";

const initialValues: ILoginRequest = {
  phone: "",
  password: "",
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { tryLogin } = useAuthApiAction();

  const onSubmit = async (values: ILoginRequest) => {
    await tryLogin(values);
  };

  const formik = useLoginForm(onSubmit, initialValues);

  const handlePasswordToggle = () => setShowPassword((prev) => !prev);

  return (
    <LoginUI
      formik={formik}
      handlePasswordToggle={handlePasswordToggle}
      showPassword={showPassword}
    />
  );
}

export default Login;
