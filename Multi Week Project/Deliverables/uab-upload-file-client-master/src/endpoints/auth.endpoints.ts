import { API_SERVER_URL } from "@/constants/routes.constants";
import { Credentials, User } from "@/types";
import baseAxios from ".";

export const login = (credentials: Credentials) => {
  return baseAxios
    .post<{ user: User; token: string }>(
      `${API_SERVER_URL}/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};

export const logout = () => {
  return baseAxios
    .get<string>(`${API_SERVER_URL}/logout`)
    .then((res) => res.data);
};
