import { API_SERVER_URL } from "@/constants/routes.constants";
import baseAxios from ".";
import { Attachment } from "@/types";

export const getAttachments = () => {
  return baseAxios
    .get<Attachment[]>(`${API_SERVER_URL}/attachments`)
    .then((res) => res.data);
};

export const generatePresignedLink = (attachmentId: number) => {
  return baseAxios
    .get<string>(`${API_SERVER_URL}/presign/${attachmentId}`)
    .then((res) => res.data);
};
