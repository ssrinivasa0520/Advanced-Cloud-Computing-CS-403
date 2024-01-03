import Navbar from "@/components/global/Navbar";
import { classNames } from "@/utils";
import { ReactNode } from "react";
import MountTransition from "../global/transitions/MountTransition";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <MountTransition
      className={classNames("h-screen w-full min-w-fit overflow-auto")}
    >
      <Navbar />
      <main className="w-full min-h-full bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        {children}
      </main>
    </MountTransition>
  );
}
