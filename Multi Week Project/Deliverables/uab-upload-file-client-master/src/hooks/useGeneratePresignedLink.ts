import { generatePresignedLink } from "@/endpoints/attachment.endpoints";
import { useQuery } from "@tanstack/react-query";
import { useAlert } from "react-alert";

const useGeneratePresignedLink = (
  attachmentId: number,
  onSuccess?: (data: string) => void
) => {
  const alert = useAlert();
  const generatePresignedLinkQuery = useQuery({
    queryFn: () => generatePresignedLink(attachmentId),
    queryKey: ["attachment", attachmentId],
    enabled: false,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: () => {
      alert.error("Something went wrong");
    },
  });

  const fetch = () => generatePresignedLinkQuery.refetch();

  const {
    isLoading,
    isSuccess,
    isError,
    data: presignedLink,
    fetchStatus,
  } = generatePresignedLinkQuery;

  return {
    generateLink: fetch,
    isLoading,
    isSuccess,
    isError,
    presignedLink,
    fetchStatus,
  };
};

export default useGeneratePresignedLink;
