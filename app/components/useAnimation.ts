import { useCallback, useEffect, useRef } from "react";

type UseAnimationProps = {
  animationFn?: () => void;
};

export function useAnimation({ animationFn }: UseAnimationProps) {
  const animationRef = useRef<number | null>(null);

  const previousTimeRef = useRef<number | null>(null);

  const animateCallback = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== null) {
        const delta = time - previousTimeRef.current;
        localStorage.setItem("fps", (1000 / delta).toString());
      }

      previousTimeRef.current = time;
      animationFn?.();
      animationRef.current = requestAnimationFrame(animateCallback);
    },
    [animationFn],
  );

  useEffect(() => {
    console.log("restarting animation");

    animationRef.current = requestAnimationFrame(animateCallback);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateCallback]);
}
