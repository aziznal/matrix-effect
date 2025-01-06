"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import { useEffect, useRef, useState } from "react";

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
    // Hiragana
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん',
    // Latin Alphabet (Uppercase)
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    // Greek Letters
    'Α', 'Β', 'Γ', 'Δ', 'Ε',
    'Ζ', 'Η', 'Θ', 'Ι', 'Κ',
    'Λ', 'Μ', 'Ν', 'Ξ', 'Ο',
    'Π', 'Ρ', 'Σ', 'Τ', 'Υ',
    'Φ', 'Χ', 'Ψ', 'Ω',
    // Cyrillic Letters
    'А', 'Б', 'В', 'Г', 'Д',
    'Е', 'Ё', 'Ж', 'З', 'И',
    'Й', 'К', 'Л', 'М', 'Н',
    'О', 'П', 'Р', 'С', 'Т',
    'У', 'Ф', 'Х', 'Ц', 'Ч',
    'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
    'Э', 'Ю', 'Я',
    // Chinese Characters
    '中', '国', '文', '字', '雨', '電', '話', '車', '山', '水',
    // Numbers
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    // Symbols
    '!', '@', '//', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\',
    ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/',
    '~', '`', '✓', '✔', '✕', '✖', '★', '☆', '○', '●',
    // Mathematical Symbols
    '∞', '≠', '≡', '≤', '≥', '±', '∑', '∏', '∫', '√',
    '∆', '∇', '∂', '∈', '∉', '∅', '∧', '∨', '⊕', '⊗',
    // Miscellaneous Symbols
    '♠', '♣', '♥', '♦', '♤', '♧', '♡', '♢', '☺', '☻',
    '♂', '♀', '♪', '♫', '☼', '§', '¤', '©', '®', '™'
]

const FONT_SIZE = 24;

export default function Home() {
  const { screenWidth, screenHeight } = useScreenSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rowCount = Math.ceil(screenHeight / (FONT_SIZE + 1));
  const colCount = Math.ceil(screenWidth / FONT_SIZE);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const getNewPosY = (currentPosY: number, multiplier?: number) => {
      if (currentPosY > canvas.height + 40) return -20;
      return currentPosY + 1 * (multiplier ?? 1);
    };

    const drawChar = (x: number) => {
      let y = getRandomInt(0, canvas.height);

      const ySpeedMultiplier = getRandomFloat(1, 3);

      let char = getRandomChar(MATRIX_CHARS);

      setInterval(() => {
        char = getRandomChar(MATRIX_CHARS);
      }, 350 * ySpeedMultiplier);

      const draw = () => {
        ctx.font = "30px JetBrainsMono Nerd Font";

        ctx.fillText(char, x, y);

        ctx.fillStyle = "lightgreen";
        ctx.shadowColor = "green";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 12;

        y = getNewPosY(y, ySpeedMultiplier);
      };

      return {
        draw,
      };
    };

    const chars = Array(45)
      .fill(0)
      .map((_, i) => drawChar(20 * (i + 1)));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  return (
    <div
      className="flex leading-none font-mono overflow-x-clip"
      style={{
        fontSize: FONT_SIZE,
      }}
    >
      {Array(colCount)
        .fill(0)
        .map((_, i) => (
          <div key={`col-${i}`} className="flex flex-col">
            {Array(rowCount)
              .fill(0)
              .map((_, j) => (
                <Char key={`col-${i}row-${j}`} index={j} />
              ))}
          </div>
        ))}
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

const Char: React.FC<{ index: number }> = ({}) => {
  const [char, setChar] = useState(getRandomChar(MATRIX_CHARS));

  useEffect(() => {
    const interval = setInterval(
      () => {
        setChar(getRandomChar(MATRIX_CHARS));
      },
      getRandomInt(200, 500),
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="antialiased text-green-400"
      style={{
        width: `${FONT_SIZE}px`,
        height: `${FONT_SIZE}px`,
        opacity: getRandomFloat(0, 1),
        textShadow: "0 0 5px #fff",
      }}
    >
      {char}
    </span>
  );
};
