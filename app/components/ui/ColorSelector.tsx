import { LucidePipette } from "lucide-react";
import { useId } from "react";

type ColorSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
};

/** an RGB color selector that uses the system dialog */
export function ColorSelector(props: ColorSelectorProps) {
  const inputId = useId();

  return (
    <div>
      <label
        htmlFor={inputId}
        className="relative mb-1 mr-1 block h-[24px] w-[24px] cursor-pointer rounded border border-gray-600 transition-all hover:outline"
        style={{
          backgroundColor: props.value,
        }}
      >
        <LucidePipette size="12" className="absolute -bottom-1 -right-1" />
      </label>

      <input
        id={inputId}
        className="absolute h-0 w-0 opacity-0"
        type="color"
        onChange={(e) => {
          props.onValueChange(e.target.value);
        }}
      />
    </div>
  );
}

export function LabeledColorSelector({
  label,
  ...props
}: ColorSelectorProps & { label: string }) {
  return (
    <div className="flex w-fit flex-col items-center">
      <ColorSelector {...props} />

      <span className="max-w-[50px] break-words text-center text-[10px]">
        {label}
      </span>
    </div>
  );
}

/** `#ffffff` -> `"rgb(255, 255, 255)"` */
export function hexToRgbString(hex: string) {
  const strippedHex = hex.replaceAll("#", "");

  const r = Number.parseInt(strippedHex.slice(0, 1), 16);
  const g = Number.parseInt(strippedHex.slice(2, 3), 16);
  const b = Number.parseInt(strippedHex.slice(4), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

/** `#ffffff` -> `{ r: 255, g: 255, b: 255 }` */
export function hexToRgbObject(hex: string) {
  const strippedHex = hex.replaceAll("#", "");

  const r = Number.parseInt(strippedHex.slice(0, 2), 16);
  const g = Number.parseInt(strippedHex.slice(2, 4), 16);
  const b = Number.parseInt(strippedHex.slice(4), 16);

  return {
    r,
    g,
    b,
  };
}
