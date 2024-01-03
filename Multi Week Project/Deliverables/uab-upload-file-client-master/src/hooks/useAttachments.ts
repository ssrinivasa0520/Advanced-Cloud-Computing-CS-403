import { getAttachments } from "@/endpoints/attachment.endpoints";
import { useQuery } from "@tanstack/react-query";
import { useAlert } from "react-alert";

const useAttachments = (onSuccess?: () => void) => {
  const alert = useAlert();
  const attachmentQuery = useQuery({
    queryFn: () => getAttachments(),
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: () => {
      alert.error("Something went wrong");
    },
  });

  const { isLoading, isSuccess, isError, data } = attachmentQuery;

  return { isLoading, isSuccess, isError, data };
};

export default useAttachments;
