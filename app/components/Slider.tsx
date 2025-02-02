import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type SliderProps = {
  min: number;
  max: number;

  value: number;
  onValueChange: (value: number) => void;
};

export default function Slider({
  value,
  min,
  max,
  onValueChange,
}: SliderProps) {
  const range = useMemo(() => Math.abs(max) + Math.abs(min), [max, min]);

  const currentValue = useMemo(() => {
    return 100 * (value / range);
  }, [range, value]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startDragging = (event: MouseEvent) => {
      setIsDragging(true);
      setMouseX(event.x);
      console.log("started dragging");
    };

    const drag = (event: MouseEvent) => {
      if (!isDragging) return;
      setMouseX(event.x);
      console.log("dragging");
    };

    const stopDragging = () => {
      setIsDragging(false);
      console.log("stopped dragging!");
    };

    container.addEventListener("pointerdown", startDragging);
    window.addEventListener("pointermove", drag);
    window.addEventListener("pointerup", stopDragging);

    return () => {
      container.removeEventListener("pointerdown", startDragging);
      window.removeEventListener("pointermove", drag);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;

    /** the click relative to the slider's x rather than the screen's */
    const relativeClickX = mouseX - container.getBoundingClientRect().left;

    const newValue = (relativeClickX / containerWidth) * range;

    onValueChange(newValue);
  }, [isDragging, max, mouseX, onValueChange, range, value]);

  return (
    <div
      className="relative my-6 cursor-pointer touch-none rounded-full border border-green-800 before:absolute before:top-[50%] before:block before:h-[400%] before:w-full before:-translate-y-[50%] before:content-['']"
      ref={containerRef}
    >
      <div
        className="h-[6px] rounded-full bg-gradient-to-r from-green-400 to-green-600"
        style={{
          width: `${currentValue}%`,
          maxWidth: "100%",
        }}
      />

      <div
        className={cn(
          "absolute top-[50%] h-[30px] w-[16px] -translate-x-[50%] -translate-y-[50%] rounded border border-emerald-800 bg-emerald-400 hover:bg-emerald-600",
          isDragging && "bg-emerald-600",
        )}
        style={{
          left: `${clamp(currentValue, 0, 100)}%`,
        }}
      />
    </div>
  );
}

function clamp(num: number, min: number, max: number) {
  return num < min ? min : num > max ? max : num;
}
