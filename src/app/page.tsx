import Terminal from "@/components/Terminal";
import Action from "@/layout/Action";
import { useState } from "react";

export default function RootPage() {
  const commandState = useState<string>("");
  return (
    <Action.Replace actions={[[true, <Terminal state={commandState} />]]}>
      <div>minhyeong's portfolio</div>
    </Action.Replace>
  );
}
