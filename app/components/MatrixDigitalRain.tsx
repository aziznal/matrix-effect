"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useConfiguration } from "./Configuration";
import { useAnimation } from "./useAnimation";

// TODO: measure perf
// TODO: improve perf
// TODO: make it easy to fill screen

export function MatrixDigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const config = useConfiguration();

  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  // track window size changes to re-render canvas on entire window
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateScreenSize);

    // run effect once manually to set initial screen size
    updateScreenSize();

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // set up and render on canvas
  const animateCallback = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = screenSize.width;
    canvas.height = screenSize.height;

    /** Handles styling and behavior for a single column of digital rain */
    class RainColumn {
      x: number;
      y: number;

      /** the character at the head (i.e. lowest y) of the column */
      headChar: string;

      /** all the characters in the column other than the head, ordered bottom to op */
      trailChars: string[];

      /** how much time must pass before a column moves down one character on the y axis */
      updateStep: number;

      /** timestamp when last update happened  */
      lastUpdateTime: number;

      constructor(args: { x: number }) {
        if (!ctx || !canvas) throw new Error("Canvas or Context is undefined.");

        this.x = args.x;

        this.y = getRandomInt(0, canvas?.height);

        this.headChar = getRandomChar(config.chars);

        this.trailChars = this.#populateTrail();

        this.updateStep = getRandomInt(100, 500);
        this.lastUpdateTime = Date.now();
      }

      #populateTrail() {
        return Array(config.trailLength)
          .fill(0)
          .map(() => getRandomChar(config.chars));
      }

      update() {
        if (!ctx || !canvas) throw new Error("Canvas or Context is undefined.");

        if (Date.now() - this.lastUpdateTime < this.updateStep) return;

        this.lastUpdateTime = Date.now();

        const previousHeadChar = this.headChar;
        this.headChar = getRandomChar(config.chars);

        if (this.y > canvas.height + config.bottomMargin)
          this.y = -config.fontSize;
        this.y += config.fontSize;

        // trail chars are updated top to bottom
        this.trailChars = [
          previousHeadChar,
          ...this.trailChars.slice(0, this.trailChars.length - 1),
        ];
      }

      draw() {
        if (!ctx || !canvas) throw new Error("Canvas or Context is undefined.");

        ctx.save();

        ctx.font = `${config.fontSize}px JetBrainsMono Nerd Font`;
        ctx.fillStyle = `rgb(${config.leadingCharFillColor})`;
        ctx.shadowColor = `rgb(${config.leadingCharShadowColor})`;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 12;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.fillText(this.headChar, this.x, this.y);

        ctx.restore();

        this.#drawTrail();
      }

      #drawTrail() {
        if (!ctx || !canvas) throw new Error("Canvas or Context is undefined.");

        this.trailChars.forEach((char, i) => {
          ctx.save();

          ctx.font = `${config.fontSize}px JetBrainsMono Nerd Font`;

          const opacity =
            (30 * (this.trailChars.length - (i + 1))) / this.trailChars.length;

          ctx.fillStyle = `rgb(${config.trailFillColor} / ${opacity}%)`;

          ctx.shadowColor = `rgb(${config.trailShadowColor})`;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowBlur = 4;

          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);

          ctx.fillText(char, this.x, this.y - config.fontSize * (i + 1));

          ctx.restore();
        });
      }
    }

    const maxChars =
      config.density * Math.floor(canvas.width / config.fontSize);
    const spaceBetweenChars = canvas.width / maxChars;

    const chars = Array(maxChars)
      .fill(0)
      .map(
        (_, i) =>
          new RainColumn({
            x: spaceBetweenChars * (i + 1),
          }),
      );

    return () => {
      ctx.save();
      ctx.fillStyle = "rgb(5 16 1 / 75%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      chars.forEach((c) => {
        c.update();
        c.draw();
      });
    };
  }, [
    config.bottomMargin,
    config.chars,
    config.density,
    config.fontSize,
    config.leadingCharFillColor,
    config.leadingCharShadowColor,
    config.trailFillColor,
    config.trailLength,
    config.trailShadowColor,
    screenSize.height,
    screenSize.width,
  ]);

  useAnimation({
    animationFn: animateCallback(),
  });

  return (
    <canvas ref={canvasRef} className="bg-zinc-950">
      Canvas is not supported in your browser.
    </canvas>
  );
}

function getRandomChar(chars: string[]) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function getRandomInt(start: number, end: number): number {
  const range = end - start + 1;
  return Math.floor(Math.random() * range) + start;
}
