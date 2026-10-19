
import "./PersonList.css";
import "./PersonList-responsive.css";

import { FaArrowLeft } from "react-icons/fa";

import PersonCard from "../PersonCard";
import SectionHeader from "../../page/SectionHeader";

function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const items = [1];

  if (currentPage > 3) {
    items.push("start-ellipsis");
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let page = startPage; page <= endPage; page++) {
    items.push(page);
  }

  if (currentPage < totalPages - 2) {
    items.push("end-ellipsis");
  }

  items.push(totalPages);

  return items;
}

export default function PersonList({
  people,
  title = "همه زایچه‌ها",
  filterActive = false,
  onClearFilter,
  currentPage = 1,
  pageSize = 12,
  onPageChange,
}) {
  const totalPages = Math.ceil(people.length / pageSize);

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const startIndex = (safeCurrentPage - 1) * pageSize;

  const visiblePeople = people.slice(
    startIndex,
    startIndex + pageSize
  );

  const paginationItems = getPaginationItems(
    safeCurrentPage,
    totalPages
  );

  const showPagination =
    typeof onPageChange === "function" && totalPages > 1;

  return (
    <section className="person-list">
      <SectionHeader
        title={title}
        badge={`${people.length.toLocaleString("fa-IR")} نفر`}
        showClear={filterActive}
        onClear={onClearFilter}
      />

      {people.length > 0 ? (
        <>
          <div className="person-list__grid">
            {visiblePeople.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
              />
            ))}
          </div>

          {/* شماره صفحات */}
          {showPagination && (
            <nav
              className="person-list__pagination"
              aria-label="صفحه‌بندی زایچه‌ها"
              dir="rtl"
            >
              <button
                type="button"
                className="person-list__page-button person-list__page-navigation"
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  onPageChange(safeCurrentPage - 1)
                }
              >
                قبلی
              </button>

              <div className="person-list__page-numbers">
                {paginationItems.map((item) => {
                  if (typeof item !== "number") {
                    return (
                      <span
                        className="person-list__ellipsis"
                        key={item}
                        aria-hidden="true"
                      >
                        …
                      </span>
                    );
                  }

                  const isActive = item === safeCurrentPage;

                  return (
                    <button
                      type="button"
                      key={item}
                      className={`person-list__page-button ${
                        isActive
                          ? "person-list__page-button--active"
                          : ""
                      }`}
                      aria-label={`صفحه ${item}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => onPageChange(item)}
                    >
                      {item.toLocaleString("fa-IR")}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="person-list__page-button person-list__page-navigation"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  onPageChange(safeCurrentPage + 1)
                }
              >
                بعدی
              </button>
            </nav>
          )}

          {/* <p className="person-list__page-info">
            نمایش{" "}
            {(startIndex + 1).toLocaleString("fa-IR")}
            {" تا "}
            {Math.min(
              startIndex + pageSize,
              people.length
            ).toLocaleString("fa-IR")}
            {" از "}
            {people.length.toLocaleString("fa-IR")}
            {" زایچه"}
          </p> */}
        </>
      ) : (
        <p className="person-list__empty">
          موردی مطابق عبارت جستجو پیدا نشد.
        </p>
      )}

      {filterActive && (
        <div className="person-list__back-wrapper">
          <button
            type="button"
            className="person-list__back-button"
            onClick={onClearFilter}
          >
            <FaArrowLeft />
            <span>بازگشت به همه زایچه‌ها</span>
          </button>
        </div>
      )}
    </section>
  );
}
