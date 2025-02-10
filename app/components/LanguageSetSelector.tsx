import { CharsetsList } from "@/lib/charsets";
import { useConfiguration } from "./Configuration";
import { cn } from "@/lib/utils";

export function LanguageSetSelector() {
  const config = useConfiguration();

  const isCharsetActive = (chars: string[]) => {
    return chars.every((char) => config.chars.includes(char));
  };

  const toggleCharset = (chars: string[]) => {
    if (isCharsetActive(chars)) {
      config.setChars(config.chars.filter((char) => !chars.includes(char)));
    } else {
      config.setChars([...config.chars, ...chars]);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <p className="mb-3 w-[250px] text-balance">
        Tap / Click a language to toggle its characters{"'"} presence in the
        digital rain
      </p>

      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-4">
        {CharsetsList.map((charset) => (
          <Charset
            key={charset.name}
            isActive={isCharsetActive(charset.chars)}
            onClick={() => toggleCharset(charset.chars)}
            symbol={charset.symbol}
            name={charset.name}
          />
        ))}
      </div>
    </div>
  );
}

// TODO: enable logging all chars of a lang to the console

const Charset: React.FC<{
  isActive?: boolean;
  onClick: () => void;

  symbol: string;
  name: string;
}> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={cn(
        "flex h-[70px] flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border border-green-800 text-center hover:bg-green-950",
        props.isActive && "bg-green-800 hover:bg-green-700",
      )}
    >
      <div className="text-2xl">{props.symbol}</div>

      <div className="text-center text-sm">{props.name}</div>
    </div>
  );
};
