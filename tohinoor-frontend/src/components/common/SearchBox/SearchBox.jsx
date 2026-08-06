import "./SearchBox.css";

import { BiSearch } from "react-icons/bi";

export default function SearchBox({
  placeholder = "جستجو...",
  value,
  onChange,
}) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      <BiSearch />
    </div>
  );
}
