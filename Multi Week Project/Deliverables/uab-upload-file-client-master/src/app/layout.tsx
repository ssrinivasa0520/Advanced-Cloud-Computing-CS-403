import BaseLayout from "@/components/layouts/BaseLayout";
import "rsuite/dist/rsuite-no-reset.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProvider from "@/context/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UAB FILE UPLOAD",
  description: "UAB Cloud Computing Project for uploading files to Amazon S3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <BaseLayout>{children}</BaseLayout>
        </AppProvider>
      </body>
    </html>
  );
}
