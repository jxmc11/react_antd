import React, { useState } from "react";
import Input, { InputProps } from "../Input/input";

interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  fetchSuggestions,
  onSelect,
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const result = fetchSuggestions(value);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    onSelect && onSelect(item);
  };

  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, idx) => {
          return (
            <li onClick={() => handleSelect(item)} key={idx}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="viking-auto-complete">
      <Input value={inputValue} onChange={hanldeChange} {...props} />
      {suggestions.length && generateDropDown()}
    </div>
  );
};

AutoComplete.displayName = "AutoComplete";

export default AutoComplete;
