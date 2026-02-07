import { useNavigate } from "react-router-dom";
import AppRoutes from "../../routes/appRoutes";
import { setUserCredential } from "../../redux/user/auth";
import type { ILoginRequest } from "../../interfaces/auth/auth.types";
import { useSnackbar } from "../../components/Snackbar";
import { login } from "../../services/auth.service";
import { useAppDispatch } from "../../store/hooks";

function useAuthApiAction() {
  const snackbar = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tryLogin = async (values: ILoginRequest) => {
    localStorage.removeItem("persist:root");

    try {
      const response: any = await login(values);

      if (response.success === true) {
        console.log("response", response);
        dispatch(
          setUserCredential({
            token: response.data.token,
            isLoggedIn: true,
          }),
        );

        navigate(AppRoutes.DASHBOARD);

        snackbar?.show({
          title: response.message,
          type: "success",
        });

        return response;
      }
    } catch (res: any) {
      snackbar?.show({
        title: res?.message,
        type: "error",
      });
    }
  };

  return { tryLogin };
}

export default useAuthApiAction;
