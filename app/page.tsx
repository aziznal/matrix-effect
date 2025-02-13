"use client";

import { MatrixDigitalRain } from "./components/MatrixDigitalRain";
import {
  ConfigurationProvider,
  ConfigurationWindow,
} from "./components/Configuration";
import { FpsCounter } from "./components/FpsCounter";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <ConfigurationProvider>
      <FpsCounter />

      <MatrixDigitalRain />

      <ConfigurationWindow />
    </ConfigurationProvider>
  );
}
