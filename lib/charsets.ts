// prettier-ignore
const KATAKANA = [
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
];

// prettier-ignore
const HIRAGANA = [
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
];

// prettier-ignore
const LATIN = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
];

// prettier-ignore
const GREEK = [
    'Α', 'Β', 'Γ', 'Δ', 'Ε',
    'Ζ', 'Η', 'Θ', 'Ι', 'Κ',
    'Λ', 'Μ', 'Ν', 'Ξ', 'Ο',
    'Π', 'Ρ', 'Σ', 'Τ', 'Υ',
    'Φ', 'Χ', 'Ψ', 'Ω',
];

// prettier-ignore
const CYRILLIC = [
    'А', 'Б', 'В', 'Г', 'Д',
    'Е', 'Ё', 'Ж', 'З', 'И',
    'Й', 'К', 'Л', 'М', 'Н',
    'О', 'П', 'Р', 'С', 'Т',
    'У', 'Ф', 'Х', 'Ц', 'Ч',
    'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
    'Э', 'Ю', 'Я',
];

// prettier-ignore
const NUMBERS= [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

// prettier-ignore
const SYMBOLS = [
    '!', '@', '//', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\',
    ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/',
    '~', '`', '✓', '✔', '✕', '✖', '★', '☆', '○', '●',
    '♠', '♣', '♥', '♦', '♤', '♧', '♡', '♢', '☺', '☻',
    '♂', '♀', '♪', '♫', '☼', '§', '¤', '©', '®', '™'
];

// prettier-ignore
const MATH_SYMBOLS = [
    '∞', '≠', '≡', '≤', '≥', '±', '∑', '∏', '∫', '√',
    '∆', '∇', '∂', '∈', '∉', '∅', '∧', '∨', '⊕', '⊗',
];

export const Charsets = {
  Katakana: {
    chars: KATAKANA,
    symbol: KATAKANA[4],
  },
  Hiragana: {
    chars: HIRAGANA,
    symbol: HIRAGANA[0],
  },
  Latin: {
    chars: LATIN,
    symbol: LATIN[0],
  },
  Greek: {
    chars: GREEK,
    symbol: GREEK[5],
  },
  Cyrillic: {
    chars: CYRILLIC,
    symbol: CYRILLIC[9],
  },
  Numbers: {
    chars: NUMBERS,
    symbol: NUMBERS[1],
  },
  Symbols: {
    chars: SYMBOLS,
    symbol: SYMBOLS[4],
  },
  MathSymbols: {
    chars: MATH_SYMBOLS,
    symbol: MATH_SYMBOLS[9],
  },
};

export const CharsetsList = Object.entries(Charsets).map(
  ([charsetName, { chars, symbol }]) => ({
    name: charsetName,
    chars,
    symbol,
  }),
);
