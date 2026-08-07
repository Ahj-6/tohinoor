import "./SearchBox.css";
import "./SearchBox-responsive.css";

import { BiSearch } from "react-icons/bi";

export default function SearchBox({
  placeholder = "جستجو در لیست زایچه‌ها",
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
