import { useEffect, useState } from "react";

export default function useEase(inTime: number, outTime: number) {
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    const id = setTimeout(
      () => {
        setFlag((prev) => !prev);
      },
      flag ? inTime : outTime
    );
    return () => clearTimeout(id);
  }, [flag, inTime, outTime]);

  return [flag, flag ? inTime : outTime] as const;
}
