import { login } from "@/endpoints/auth.endpoints";
import authSlice from "@/slices/auth.slice";
import { Credentials } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useAlert } from "react-alert";
import { useAppDispatch } from "./useAppDispatch";
import { useRouter } from "next/navigation";
import Routes from "@/constants/routes.constants";

const useLogin = () => {
  const alert = useAlert();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: (credentials: Credentials) => {
      return login(credentials);
    },
    onSuccess: (data) => {
      alert.success("Login successful");
      dispatch(authSlice.actions.setUser(data.user));
      localStorage.setItem("token", data.token);
      router.replace(Routes.upload);
    },
    onError: () => {
      alert.error("Something went wrong");
    },
  });

  const {
    isLoading,
    isError,
    isSuccess,
    mutate: authenticate,
    error,
    data,
  } = mutation;

  return { mutation, isLoading, isError, isSuccess, authenticate, error, data };
};

export default useLogin;
