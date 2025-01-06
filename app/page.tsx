"use client";

import { useEffect, useRef } from "react";

export const dynamic = "force-dynamic";

// prettier-ignore
const MATRIX_CHARS = [
    // Katakana (Half-width)
    'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ',
    'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ',
    'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ',
    'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ',
    'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ',
    'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ',
    'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ',
    'ﾔ', 'ﾕ', 'ﾖ',
    'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ',
    'ﾜ', 'ｦ', 'ﾝ',
    // // Hiragana
    // 'あ', 'い', 'う', 'え', 'お',
    // 'か', 'き', 'く', 'け', 'こ',
    // 'さ', 'し', 'す', 'せ', 'そ',
    // 'た', 'ち', 'つ', 'て', 'と',
    // 'な', 'に', 'ぬ', 'ね', 'の',
    // 'は', 'ひ', 'ふ', 'へ', 'ほ',
    // 'ま', 'み', 'む', 'め', 'も',
    // 'や', 'ゆ', 'よ',
    // 'ら', 'り', 'る', 'れ', 'ろ',
    // 'わ', 'を', 'ん',
    // // Latin Alphabet (Uppercase)
    // 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    // 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    // 'U', 'V', 'W', 'X', 'Y', 'Z',
    // // Greek Letters
    'Α', 'Β', 'Γ', 'Δ', 'Ε',
    'Ζ', 'Η', 'Θ', 'Ι', 'Κ',
    'Λ', 'Μ', 'Ν', 'Ξ', 'Ο',
    'Π', 'Ρ', 'Σ', 'Τ', 'Υ',
    'Φ', 'Χ', 'Ψ', 'Ω',
    // // Cyrillic Letters
    // 'А', 'Б', 'В', 'Г', 'Д',
    // 'Е', 'Ё', 'Ж', 'З', 'И',
    // 'Й', 'К', 'Л', 'М', 'Н',
    // 'О', 'П', 'Р', 'С', 'Т',
    // 'У', 'Ф', 'Х', 'Ц', 'Ч',
    // 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
    // 'Э', 'Ю', 'Я',
    // // Chinese Characters
    // '中', '国', '文', '字', '雨', '電', '話', '車', '山', '水',
    // // Numbers
    // '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    // // Symbols
    // '!', '@', '//', '$', '%', '^', '&', '*', '(', ')',
    // '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\',
    // ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/',
    // '~', '`', '✓', '✔', '✕', '✖', '★', '☆', '○', '●',
    // // Mathematical Symbols
    // '∞', '≠', '≡', '≤', '≥', '±', '∑', '∏', '∫', '√',
    // '∆', '∇', '∂', '∈', '∉', '∅', '∧', '∨', '⊕', '⊗',
    // // Miscellaneous Symbols
    // '♠', '♣', '♥', '♦', '♤', '♧', '♡', '♢', '☺', '☻',
    // '♂', '♀', '♪', '♫', '☼', '§', '¤', '©', '®', '™'
]

/** Amount of characters trailing behind */
const TRAIL_LENGTH = 5;

/** Font size in pixels */
const FONT_SIZE = 30;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const getNewPosY = (currentPosY: number, multiplier?: number) => {
      const bottomMargin = FONT_SIZE * (TRAIL_LENGTH + 1); // +1 comes from the head char

      if (currentPosY > canvas.height + bottomMargin) return -20;
      return currentPosY + 1 * (multiplier ?? 1);
    };

    class Char {
      x: number;
      y: number;
      ySpeedMultiplier: number;
      char: string;
      trailChars: string[];

      constructor(args: { x: number }) {
        if (!ctx || !canvas) throw new Error("Canvas or Context is undefined.");

        this.x = args.x;

        this.y = getRandomInt(0, canvas?.height);

        this.ySpeedMultiplier = getRandomFloat(1, 1.5);

        this.char = getRandomChar(MATRIX_CHARS);
        this.trailChars = Array(TRAIL_LENGTH)
          .fill(0)
          .map(() => getRandomChar(MATRIX_CHARS));

        // update character every few hundred ms
        setInterval(() => {
          this.char = getRandomChar(MATRIX_CHARS);
        }, 200 * this.ySpeedMultiplier);
      }

      draw() {
        if (!ctx || !canvas) throw new Error("Canvas or Context is undefined.");

        ctx.save();

        ctx.font = `${FONT_SIZE}px JetBrainsMono Nerd Font`;
        ctx.fillStyle = "lightgreen";
        ctx.shadowColor = "lime";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 8;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.fillText(this.char, this.x, this.y);

        this.y = getNewPosY(this.y, this.ySpeedMultiplier);

        ctx.restore();

        this.drawTrail();
      }

      drawTrail() {
        if (!ctx || !canvas) throw new Error("Canvas or Context is undefined.");

        this.trailChars.forEach((char, i) => {
          ctx.save();

          ctx.font = `${FONT_SIZE}px JetBrainsMono Nerd Font`;

          const opacity =
            (100 * (this.trailChars.length - (i + 1))) / this.trailChars.length;

          ctx.fillStyle = `rgb(144 238 144 / ${opacity}%)`;

          ctx.shadowColor = "lime";
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowBlur = 8;
          ctx.fillText(char, this.x, this.y - 30 * (i + 1));

          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);

          ctx.restore();
        });
      }
    }

    const charWidth = 15;

    const maxChars = Math.floor(canvas.width / charWidth);

    const chars = Array(maxChars)
      .fill(0)
      .map(
        (_, i) =>
          new Char({
            x: charWidth * (i + 1),
          }),
      );

    const draw = () => {
      ctx.save();
      ctx.fillStyle = "rgb(5 16 1 / 75%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      chars.forEach((c) => c.draw());
    };

    const interval = setInterval(draw, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="bg-zinc-950">
        Canvas is not supported in your browser.
      </canvas>
    </div>
  );
}

function getRandomChar(chars: string[]) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function getRandomInt(start: number, end: number): number {
  const range = end - start + 1;
  return Math.floor(Math.random() * range) + start;
}

function getRandomFloat(start: number, end: number): number {
  return Math.random() * (end - start) + start;
}
