"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";

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

  const rowCount = Math.ceil(screenHeight / (FONT_SIZE + 1));
  const colCount = Math.ceil(screenWidth / FONT_SIZE);

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
