import { API_SERVER_URL } from "@/constants/routes.constants";
import axios from "axios";
import baseAxios from ".";

export const upload = (payload: FormData) => {
  return baseAxios
    .post<string>(`${API_SERVER_URL}/upload`, payload)
    .then((res) => res.data);
};
