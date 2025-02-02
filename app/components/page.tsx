import { PropsWithChildren } from "react";
import { ConfigurationProvider, ConfigurationWindow } from "./Configuration";

export const dynamic = "force-dynamic";

export default function ComponentsPlayground() {
  return (
    <div className="container mx-auto my-12 flex min-h-[100dvh] flex-col">
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

        TODO: create slider component
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
