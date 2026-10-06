import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

import "./SearchBox.css";
import "./SearchBox-responsive.css";

export default function SearchBox({
  placeholder = "جستجو در لیست زایچه‌ها",
  value = "",
  onChange,
  onSubmit,
  suggestions = [],
  onSuggestionClick,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);

  const showSuggestions =
    isFocused && value.trim().length > 0 && suggestions.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hide suggestions after pressing Enter / submitting the search.
    setIsFocused(false);
    inputRef.current?.blur();

    onSubmit?.();
  };

  const handleSuggestionMouseDown = (person) => {
    onSuggestionClick?.(person);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 100);
        }}
        autoComplete="off"
        aria-label={placeholder}
        role="combobox"
        aria-expanded={showSuggestions}
      />

      <button
        className="search-box__submit"
        type="submit"
        aria-label="جستجو"
      >
        <BiSearch />
      </button>

      {showSuggestions && (
        <div className="search-box__suggestions" role="listbox">
          {suggestions.map((person) => (
            <button
              key={person.id}
              type="button"
              className="search-box__suggestion"
              onMouseDown={() => handleSuggestionMouseDown(person)}
            >
              <span className="search-box__suggestion-name-fa">
                {person.nameFa}
              </span>

              <span className="search-box__suggestion-name-en">
                {person.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}