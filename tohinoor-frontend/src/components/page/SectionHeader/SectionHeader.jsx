import "./SectionHeader.css";
import "./SectionHeader-responsive.css";

import { FaTimes } from "react-icons/fa";

export default function SectionHeader({
  title,
  badge,
  showClear = false,
  onClear,
}) {
  return (
    <div className="section-header">
      <div className="section-header__title-wrapper">
        {showClear && (
          <button
            type="button"
            className="section-header__clear"
            onClick={onClear}
            aria-label="پاک کردن جستجو"
            title="پاک کردن جستجو"
          >
            <FaTimes />
          </button>
        )}

        <h2 className="section-header__title">{title}</h2>
      </div>

      {badge && (
        <span className="section-header__badge">
          {badge}
        </span>
      )}
    </div>
  );
}