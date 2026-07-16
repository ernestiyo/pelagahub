import { Header } from "@/components/layout/Header";

export default function ModulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
