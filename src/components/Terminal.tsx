import { cn } from "@/util";
import { State } from "@/interface";

interface TerminalProps {
  state: State<string>;
}

export default function Terminal({ state }: TerminalProps) {
  const [command, setCommand] = state;
  const container = {
    sizes: "w-full min-w-[800px] h-[600px]",
    backgrounds: "bg-gray-500",
  };
  return <div className={cn(container)}></div>;
}
