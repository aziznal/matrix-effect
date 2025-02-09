import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./Input";

type SliderProps = {
  min: number;
  max: number;

  value: number;
  onValueChange: (value: number) => void;

  className?: string;
};

export function Slider({
  value,
  min,
  max,
  onValueChange,
  className,
}: SliderProps) {
  const range = useMemo(() => Math.abs(max) + Math.abs(min), [max, min]);

  // this maps values from the domain of the input to a domain where all values are positive
  const currentValue = useMemo(() => {
    return mapToDomain(value, { min, max }, { min: 0, max: 100 });
  }, [max, min, value]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startDragging = (event: MouseEvent) => {
      setIsDragging(true);
      setMouseX(event.x);
    };

    const drag = (event: MouseEvent) => {
      if (!isDragging) return;
      setMouseX(event.x);
    };

    const stopDragging = () => {
      setIsDragging(false);
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

    /** new value is a ratio of the available range */
    const newValue = (relativeClickX / containerWidth) * range;

    onValueChange(
      round(
        clamp(
          mapToDomain(newValue, { min: 0, max: range }, { min, max }),
          min,
          max,
        ),
      ),
    );
  }, [isDragging, max, min, mouseX, onValueChange, range, value]);

  return (
    <div
      ref={containerRef}
      className={cn(
        `relative my-4 cursor-pointer touch-none rounded-full border border-green-800 before:absolute before:top-[50%] before:block before:h-[400%] before:w-full before:-translate-y-[50%] before:content-['']`,
        className,
      )}
    >
      <div
        className="h-[4px] bg-gradient-to-r from-green-800 to-green-300"
        style={{
          width: `${currentValue}%`,
          maxWidth: "100%",
        }}
      ></div>

      {/* handle */}
      <div
        className={cn(
          "absolute top-[50%] h-[20px] w-[12px] -translate-x-[50%] -translate-y-[50%] rounded border border-emerald-800 bg-emerald-400 hover:bg-emerald-300",
          isDragging && "bg-emerald-300",
        )}
        style={{
          left: `${currentValue}%`,
        }}
      ></div>
    </div>
  );
}

export function SliderWithInput(props: SliderProps) {
  // input has its own value control flow to accomodate any crazy values
  // the user may enter but only accept valid ones
  //
  // e.g. to allow entering negative values which start with a '-' which
  // gets transformed to a NaN making it impossible to enter negative numbers
  const [inputValue, setInputValue] = useState<string>(props.value.toString());

  // to prevent infinite calls to the effects
  const [shouldEmitInputUpdate, setShouldEmitInputUpdate] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setShouldEmitInputUpdate(true);
  };

  // always update input with new values from parent
  useEffect(() => {
    setInputValue(props.value.toString());
  }, [props.value]);

  // emit only valid input updates
  useEffect(() => {
    if (!shouldEmitInputUpdate) return;

    if (!inputValue) return;

    const parsedValue = +inputValue;

    if (isNaN(parsedValue)) return;

    props.onValueChange(parsedValue);

    setShouldEmitInputUpdate(false);
  }, [inputValue, props, shouldEmitInputUpdate]);

  return (
    <div className="flex items-center gap-3">
      <Slider className="flex-1" {...props} />

      <Input
        className="w-[70px]"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}

function clamp(num: number, min: number, max: number) {
  return num < min ? min : num > max ? max : num;
}

function round(num: number) {
  return Math.round(num);
}

function mapToDomain(
  num: number,

  fromRange: {
    min: number;
    max: number;
  },

  toRange: {
    min: number;
    max: number;
  },
) {
  return (
    ((num - fromRange.min) * (toRange.max - toRange.min)) /
      (fromRange.max - fromRange.min) +
    toRange.min
  );
}
