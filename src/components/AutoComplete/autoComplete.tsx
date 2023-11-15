import React, { useState } from "react";
import Input, { InputProps } from "../Input/input";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => React.ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  fetchSuggestions,
  onSelect,
  value,
  renderOption,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const result = fetchSuggestions(value);
      if (result instanceof Promise) {
        result.then(setSuggestions);
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, idx) => {
          return (
            <li onClick={() => handleSelect(item)} key={idx}>
              {renderTemplate(item)}
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
