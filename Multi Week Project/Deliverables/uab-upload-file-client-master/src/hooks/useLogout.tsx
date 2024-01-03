import { logout } from "@/endpoints/auth.endpoints";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "./useAppDispatch";
import authSlice from "@/slices/auth.slice";
import { useAlert } from "react-alert";
import { useRouter } from "next/navigation";
import Routes from "@/constants/routes.constants";

const useLogout = (enabled = true) => {
  const alert = useAlert();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logoutQuery = useQuery({
    queryFn: () => logout(),
    enabled,
    onSuccess: () => {
      alert.success("Logged out successfully");
      dispatch(authSlice.actions.setUser(null));
      localStorage.removeItem("token");
      router.replace(Routes.login);
    },
    onError: () => {
      alert.error("Log out failed");
      dispatch(authSlice.actions.setUser(null));
      localStorage.removeItem("token");
      router.replace(Routes.login);
    },
  });

  const { isLoading, isSuccess, isError } = logoutQuery;

  return { isLoading, isSuccess, isError };
};

export default useLogout;
