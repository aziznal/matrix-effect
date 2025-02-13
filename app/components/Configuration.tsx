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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/Tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { SliderWithInput } from "./ui/Slider";
import { hexToRgbObject, LabeledColorSelector } from "./ui/ColorSelector";
import { LanguageSetSelector } from "./LanguageSetSelector";
import { Charsets } from "@/lib/charsets";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

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

  /** Computed value of how far down a character trail must go below the
   * screen to fully disappear,
   * based on font size and trail length
   */
  bottomMargin: number;

  /** The set from which characters are selected for columns of the digital rain */
  chars: string[];
  setChars: (value: string[]) => void;

  leadingCharFillColor: string;
  setLeadingCharFillColor: (value: string) => void;

  leadingCharShadowColor: string;
  setLeadingCharShadowColor: (value: string) => void;

  trailFillColor: string;
  setTrailFillColor: (value: string) => void;

  trailShadowColor: string;
  setTrailShadowColor: (value: string) => void;

  isFpsCounterVisible: boolean;
  setIsFpsCounterVisible: (value: boolean) => void;
};

const ConfigurationContext = createContext<ConfigurationContextType>(
  {} as ConfigurationContextType,
);

export const useConfiguration = () => useContext(ConfigurationContext);

export function ConfigurationProvider(props: PropsWithChildren) {
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  const [trailLength, setTrailLength] = useState(7);
  const [fontSize, setFontSize] = useState(21);
  const [density, setDensity] = useState(8);
  const bottomMargin = useMemo(() => {
    return fontSize * (trailLength + 1); // +1 is to account for the head char
  }, [fontSize, trailLength]);

  const [leadingCharFillColor, setLeadingCharFillColor] =
    useState("255 255 255");
  const [leadingCharShadowColor, setLeadingCharShadowColor] =
    useState("255 255 255");

  const [trailFillColor, setTrailFillColor] = useState("144 238 144");
  const [trailShadowColor, setTrailShadowColor] = useState("0 255 0");

  const [chars, setChars] = useState<string[]>([...Charsets.Katakana.chars]);

  const [isFpsCounterVisible, setIsFpsCounterVisible] = useState(false);

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

        leadingCharFillColor,
        setLeadingCharFillColor,

        leadingCharShadowColor,
        setLeadingCharShadowColor,

        trailFillColor,
        setTrailFillColor,

        trailShadowColor,
        setTrailShadowColor,

        chars,
        setChars,

        isFpsCounterVisible,
        setIsFpsCounterVisible,
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
        "absolute bottom-12 right-12 flex max-h-[70vh] w-[300px] flex-col items-center overflow-y-auto rounded-lg border-2 border-green-600 bg-green-400 bg-opacity-10 p-5 font-mono text-xs shadow backdrop-blur",
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

      <div className="mb-4 flex w-full flex-col gap-3">
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

        <LanguageSetControls className="mb-2" />

        <div >
          <h2 className="mb-2 font-bold">Color Controls</h2>

          <div className="flex flex-wrap gap-3">
            <ColorControls
              value={config.leadingCharFillColor}
              onValueChange={config.setLeadingCharFillColor}
              title="lead fill"
            />

            <ColorControls
              value={config.leadingCharShadowColor}
              onValueChange={config.setLeadingCharShadowColor}
              title="lead shadow"
            />

            <ColorControls
              value={config.trailFillColor}
              onValueChange={config.setTrailFillColor}
              title="trail fill"
            />

            <ColorControls
              value={config.trailShadowColor}
              onValueChange={config.setTrailShadowColor}
              title="trail shadow"
            />
          </div>
        </div>

        <FpsControls className="mb-4" />
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

const ColorControls: React.FC<{
  value: string;
  onValueChange: (value: string) => void;

  title: string;
}> = (props) => {
  const onValueChangeAsRgb = (hexColor: string) => {
    const { r, g, b } = hexToRgbObject(hexColor);
    props.onValueChange(`${r} ${g} ${b}`);
  };

  return (
    <LabeledColorSelector
      label={props.title}
      value={`rgb(${props.value})`}
      onValueChange={onValueChangeAsRgb}
    />
  );
};

const LanguageSetControls: React.FC<{ className?: string }> = (props) => {
  return (
    <div className={cn(props.className)}>
      <h2 className="mb-2 font-bold">Characters</h2>

      <Popover>
        <PopoverTrigger className="rounded-md border border-green-800 px-2 py-1">
          Modify Characters
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="center"
          className="max-h-[50vh] overflow-y-auto"
        >
          <LanguageSetSelector />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const FpsControls: React.FC<{ className?: string }> = (props) => {
  const { isFpsCounterVisible, setIsFpsCounterVisible } = useConfiguration();

  return (
    <div className={cn("w-full", props.className)}>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={isFpsCounterVisible}
          onClick={() => setIsFpsCounterVisible(!isFpsCounterVisible)}
        />
        Show FPS
      </label>
    </div>
  );
};

// todos:
// - TODO: make config expand from the side
// - TODO: add info toast on how to show config again after hiding
// - TODO: make menu closeable to allow nice fullscreen experience
// - TODO: improve color selector controls (custom implementation?)
// - TODO: store state in URL
// - TODO: add config options, incl:
//    - speed
//    - enabling full-screen
//    - effects (blur, shadow, glow, etc.)
//    - toggle for flipping chars vertically
//    - add retro-fy effect with CRT effect and a fish-eye lens
