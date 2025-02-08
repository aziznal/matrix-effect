"use client";

import { PropsWithChildren, useState } from "react";
import { ConfigurationProvider, ConfigurationWindow } from "./Configuration";
import { Slider, SliderWithInput } from "./Slider";

export const dynamic = "force-dynamic";

export default function ComponentsPlayground() {
  return (
    <div className="container mx-auto my-12 flex min-h-[100dvh] flex-col px-4">
      <h1 className="mb-8 text-center text-2xl font-bold">
        Component Playground
      </h1>

      <Component>
        <ComponentTitle>Configuration Window</ComponentTitle>

        <ConfigurationProvider>
          <ConfigurationWindow className="static" />
        </ConfigurationProvider>
      </Component>

      <Component>
        <ComponentTitle>Slider</ComponentTitle>
        <SliderDemo />
      </Component>
    </div>
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
