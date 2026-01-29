import { AppLayout } from "@/src/ui/Layout/appLayout";
import { ReactNode } from "react";

export default function FinTrackLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
