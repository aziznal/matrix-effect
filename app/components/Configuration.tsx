"use client";

import { cn } from "@/lib/utils";
import { LucideGithub, LucideX } from "lucide-react";
import Link from "next/link";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

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
        "absolute bottom-12 right-12 flex flex-col items-center gap-3 rounded-lg border-2 border-green-600 bg-green-400 bg-opacity-10 p-3 text-sm shadow backdrop-blur md:w-[350px]",
        props.className,
      )}
    >
      <LucideX
        className="absolute right-4 top-4 cursor-pointer"
        onClick={() => config.setIsConfigOpen(false)}
      />

      <pre>{JSON.stringify(config, null, 2)}</pre>

      <div className="flex gap-3">
        <Link
          target="_blank"
          className="flex items-center whitespace-nowrap rounded-full border-2 border-green-600 bg-green-400 bg-opacity-10 px-4 py-3 text-sm font-bold text-green-300 shadow backdrop-blur transition-colors hover:bg-opacity-35"
          href="https://aziznal.com"
        >
          by Aziz Nal
        </Link>

        <Link
          target="_blank"
          className="flex items-center whitespace-nowrap rounded-full border-2 border-slate-600 bg-slate-400 bg-opacity-10 px-4 py-3 text-sm font-bold text-white shadow backdrop-blur transition-colors hover:bg-opacity-35"
          href="https://github.com/aziznal/matrix-effect"
        >
          <LucideGithub />
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
// - TODO: create slider component (with text input) to adjust values of params
// - TODO: allow adjusting character set with checkboxes
// - TODO: add config options, incl:
//    - color
//    - density
//    - trail length
//    - effects (blur, shadow, glow, etc.)
