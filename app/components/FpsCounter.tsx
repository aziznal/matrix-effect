"use client";

import { useEffect, useState } from "react";
import { useConfiguration } from "./Configuration";
import { cn } from "@/lib/utils";

type FpsCounterProps = {
  className?: string;
};

export function FpsCounter(props: FpsCounterProps) {
  const config = useConfiguration();

  const [fps, setFps] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setFps(+(localStorage.getItem("fps") ?? 0)),
      50,
    );

    return () => clearInterval(interval);
  }, []);

  if (!config.isFpsCounterVisible) return null;

  return (
    <div
      className={cn(
        "absolute right-6 top-4 w-fit rounded-lg border-2 border-green-600 bg-black px-2 py-1 font-mono text-3xl font-bold",
        props.className,
      )}
    >
      {Math.round(fps)}
    </div>
  );
}
