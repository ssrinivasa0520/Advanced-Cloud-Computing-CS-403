import { upload } from "@/endpoints/upload.endpoints";
import { useMutation } from "@tanstack/react-query";
import { useAlert } from "react-alert";

const useUpload = (onSuccess?: () => void) => {
  const alert = useAlert();
  const mutation = useMutation({
    mutationFn: (payload: FormData) => {
      return upload(payload);
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
      alert.success("Upload successful");
    },
    onError: () => {
      alert.error("Something went wrong");
    },
  });

  const {
    isLoading,
    isError,
    isSuccess,
    mutate: uploadFile,
    error,
    data,
  } = mutation;

  return { mutation, isLoading, isError, isSuccess, uploadFile, error, data };
};

export default useUpload;
