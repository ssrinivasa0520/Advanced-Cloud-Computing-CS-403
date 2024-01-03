import PublicLayout from "@/components/layouts/PublicLayout";

export default function OpenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
