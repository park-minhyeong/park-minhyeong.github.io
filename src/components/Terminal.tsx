import { cn } from "@/util";

export default function Terminal() {
  const container = {
    sizes: "w-full min-w-[800px] h-[600px]",
    backgrounds: "bg-gray-500",
  };
  return <div className={cn(container)}></div>;
}
