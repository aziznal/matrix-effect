"use client";

import { MatrixDigitalRain } from "./components/MatrixDigitalRain";
import {
  ConfigurationProvider,
  ConfigurationWindow,
} from "./components/Configuration";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <ConfigurationProvider>

      <MatrixDigitalRain />

      <ConfigurationWindow />

    </ConfigurationProvider>
  );
}
