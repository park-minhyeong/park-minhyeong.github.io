import { cn } from "@/util";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const container = {
    displays: "flex flex-col justify-center items-center",
    sizes: " w-full min-h-screen",
  };
  return <div className={cn(container)}>{children}</div>;
}
