"use client";

import Routes from "@/constants/routes.constants";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);

  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.replace(Routes.login);
    }
    if (user) {
      router.replace(Routes.upload);
    }
  });
  return <></>;
}
