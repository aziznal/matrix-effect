"use client";

import { PropsWithChildren, useState } from "react";
import { ConfigurationProvider, ConfigurationWindow } from "./Configuration";
import { Slider, SliderWithInput } from "./ui/Slider";
import { Input } from "./ui/Input";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/Tooltip";
import { ColorSelector, LabeledColorSelector } from "./ui/ColorSelector";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { LanguageSetSelector } from "./LanguageSetSelector";
import { FpsCounter } from "./FpsCounter";

export const dynamic = "force-dynamic";

// TODO: add digital rain component demo

export default function ComponentsPlayground() {
  return (
    <ConfigurationProvider>
      <div className="container mx-auto my-12 flex min-h-[100dvh] flex-col px-4">
        <h1 className="mb-8 text-center text-2xl font-bold">
          Component Playground
        </h1>

        <Component>
          <ComponentTitle>Configuration Window</ComponentTitle>

          <ConfigurationWindow className="static" />
        </Component>

        <Component>
          <ComponentTitle>Fps Counter</ComponentTitle>
          <FpsCounterDemo />
        </Component>

        <Component>
          <ComponentTitle>Color Selector</ComponentTitle>
          <ColorSelectorDemo />
        </Component>

        <Component>
          <ComponentTitle>Language Set Selector</ComponentTitle>
          <LanguageSetSelectorDemo />
        </Component>

        <Component>
          <ComponentTitle>Slider</ComponentTitle>
          <SliderDemo />
        </Component>

        <Component>
          <ComponentTitle>Input</ComponentTitle>
          <InputDemo />
        </Component>

        <Component>
          <ComponentTitle>Tooltip</ComponentTitle>
          <TooltipDemo />
        </Component>

        <Component>
          <ComponentTitle>Popover</ComponentTitle>
          <PopoverDemo />
        </Component>
      </div>
    </ConfigurationProvider>
  );
}

function Component(props: PropsWithChildren) {
  return <div className="mb-12">{props.children}</div>;
}

function ComponentTitle(props: PropsWithChildren) {
  return <h2 className="mb-3 text-lg font-bold">{props.children}</h2>;
}

function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="md:w-[50%]">
      <Slider min={-700} max={700} value={value} onValueChange={setValue} />

      <SliderWithInput
        min={-700}
        max={700}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
}

function InputDemo() {
  return (
    <div className="md:w-[50%]">
      <Input />
    </div>
  );
}

function ColorSelectorDemo() {
  const [color, setColor] = useState("");

  return (
    <div className="flex gap-3">
      <ColorSelector value={color} onValueChange={setColor} />

      <LabeledColorSelector
        value={color}
        onValueChange={setColor}
        label="labeled"
      />
    </div>
  );
}

function LanguageSetSelectorDemo() {
  return (
    <div>
      <LanguageSetSelector />
    </div>
  );
}

function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger />

        <TooltipContent side="right">It{"'"}s a tooltip, yo.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function PopoverDemo() {
  return (
    <Popover open>
      <PopoverTrigger />

      <PopoverContent align="start" side="right">
        It{"'"}s a popover, yo.
      </PopoverContent>
    </Popover>
  );
}

function FpsCounterDemo() {
  return <FpsCounter></FpsCounter>;
}
