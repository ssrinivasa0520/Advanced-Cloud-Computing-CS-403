"use client";

import { useAppSelector } from "./useAppSelector";

const useUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  return { user, isAuthenticated: Boolean(user) };
};

export default useUser;
