"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import RenderIf from "../global/RenderIf";
import React from "react";
import { useRouter } from "next/navigation";
import Routes from "@/constants/routes.constants";
import { shallowEqual } from "react-redux";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;
  const user = useAppSelector((state) => state.auth.user, shallowEqual);

  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.replace(Routes.login);
    }
  }, [user, router]);

  return <RenderIf isTrue={Boolean(user)}>{children}</RenderIf>;
};

export default AuthLayout;
