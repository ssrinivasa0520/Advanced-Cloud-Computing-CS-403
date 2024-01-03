"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import RenderIf from "../global/RenderIf";
import React from "react";
import { useRouter } from "next/navigation";
import Routes from "@/constants/routes.constants";

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = (props: PublicLayoutProps) => {
  const { children } = props;
  const user = useAppSelector((state) => state.auth.user);

  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.replace(Routes.upload);
    }
  }, [user, router]);

  return <RenderIf isTrue={!Boolean(user)}>{children}</RenderIf>;
};

export default PublicLayout;
