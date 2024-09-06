import { cn } from "@/util";
import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  const container = {
    displays: "flex flex-col justify-center items-center h-screen",
    sizes: "min-h-screen ",
  };
  return <div className={cn(container)}>{children}</div>;
}
