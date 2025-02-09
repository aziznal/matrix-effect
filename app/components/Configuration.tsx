"use client";

import { cn } from "@/lib/utils";
import { LucideGithub, LucideHelpCircle, LucideX } from "lucide-react";
import Link from "next/link";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { SliderWithInput } from "./Slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const DEFAULT_TRAIL_LENGTH = 7;
const DEFAULT_FONT_SIZE = 21;
const DEFAULT_DENSITY = 8;

type ConfigurationContextType = {
  isConfigOpen: boolean;
  setIsConfigOpen: (value: boolean) => void;

  /** Amount of characters trailing behind */
  trailLength: number;
  setTrailLength: (value: number) => void;

  /** Font size in pixels */
  fontSize: number;
  setFontSize: (value: number) => void;

  /** How stacked up the characters are. 1 means divided among the screen width equally */
  density: number;
  setDensity: (value: number) => void;

  /** Computed value of how far down a character trail must go below the screen to fully disappear,
   * based on font size and trail length*/
  bottomMargin: number;
};

const ConfigurationContext = createContext<ConfigurationContextType>(
  {} as ConfigurationContextType,
);

export const useConfiguration = () => useContext(ConfigurationContext);

export function ConfigurationProvider(props: PropsWithChildren) {
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  const [trailLength, setTrailLength] = useState(DEFAULT_TRAIL_LENGTH);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [density, setDensity] = useState(DEFAULT_DENSITY);
  const bottomMargin = useMemo(() => {
    return fontSize * (trailLength + 1); // +1 is to account for the head char
  }, [fontSize, trailLength]);

  return (
    <ConfigurationContext.Provider
      value={{
        isConfigOpen,
        setIsConfigOpen,

        trailLength,
        setTrailLength,

        fontSize,
        setFontSize,

        density,
        setDensity,

        bottomMargin,
      }}
    >
      {props.children}
    </ConfigurationContext.Provider>
  );
}

export function ConfigurationWindow(props: { className?: string }) {
  const config = useConfiguration();

  if (!config.isConfigOpen) return null;

  return (
    <div
      className={cn(
        "absolute bottom-12 right-12 flex w-[300px] flex-col items-center rounded-lg border-2 border-green-600 bg-green-400 bg-opacity-10 p-5 font-mono text-xs shadow backdrop-blur",
        props.className,
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">Parameters</h1>

        <LucideX
          className="cursor-pointer"
          onClick={() => config.setIsConfigOpen(false)}
        />
      </div>

      <div className="mb-4 flex flex-col gap-3 w-full">
        <SliderControls
          title="Font Size"
          description="The size of each character (affects column count)"
          min={1}
          max={100}
          value={config.fontSize}
          onValueChange={config.setFontSize}
        />

        <SliderControls
          title="Trail Length"
          description="Controls how many trailing characters are left behind"
          min={1}
          max={12}
          value={config.trailLength}
          onValueChange={config.setTrailLength}
        />

        <SliderControls
          title="Density"
          description="How densly packed the character columns are (affects column count)"
          min={1}
          max={12}
          value={config.density}
          onValueChange={config.setDensity}
        />
      </div>

      <div className="flex gap-3">
        <Link
          target="_blank"
          className="flex items-center whitespace-nowrap rounded-full border-2 border-green-600 bg-green-400 bg-opacity-10 px-3 py-2 text-xs font-bold text-green-300 shadow backdrop-blur transition-colors hover:bg-opacity-35"
          href="https://aziznal.com"
        >
          by Aziz Nal
        </Link>

        <Link
          target="_blank"
          className="flex items-center whitespace-nowrap rounded-full border-2 border-slate-600 bg-slate-400 bg-opacity-10 px-2 py-2 text-sm font-bold text-white shadow backdrop-blur transition-colors hover:bg-opacity-35"
          href="https://github.com/aziznal/matrix-effect"
        >
          <LucideGithub size="16" />
        </Link>
      </div>
    </div>
  );
}

// todos:
// - TODO: make config expand from the side
// - TODO: add info toast on how to show config again after hiding
// - TODO: add FPS counter
// - TODO: make menu closeable to allow nice fullscreen experience
// - TODO: allow adjusting character set with checkboxes
// - TODO: add config options, incl:
//    - color
//    - speed
//    - effects (blur, shadow, glow, etc.)

type SliderControlProps = {
  title: string;
  description: string;

  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;

  className?: string;
};

function SliderControls(props: SliderControlProps) {
  return (
    <div className={cn("w-full", props.className)}>
      <div className="flex items-center gap-1">
        <h2 className="font-bold">{props.title}</h2>

        <DescriptionTooltip content={props.description} />
      </div>

      <SliderWithInput
        min={props.min}
        max={props.max}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </div>
  );
}

const DescriptionTooltip: React.FC<{ content: string }> = (props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <LucideHelpCircle className="text-emerald-300 opacity-50" size="16" />
        </TooltipTrigger>

        <TooltipContent side="top">{props.content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
