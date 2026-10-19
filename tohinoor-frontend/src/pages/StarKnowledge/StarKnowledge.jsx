import { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import "./StarKnowledge.css";
import "./StarKnowledge-responsive.css";

import PageShell from "../../components/layout/PageShell";
import PageHero from "../../components/page/PageHero";
import ZodiacHeroContent from "../../components/page/ZodiacHeroContent/ZodiacHeroContent";

import heroImage from "../../assets/images/backgrounds/star-knowledge.jpg";

import SearchBox from "../../components/common/SearchBox/SearchBox";
import PersonList from "../../components/StarKnowledge/PersonList";
import ZodiacFilter from "../../components/StarKnowledge/ZodiacFilter";

import { zodiacSigns } from "../../constants/zodiacSigns";
import { getPeople } from "../../services/peopleService";

const PEOPLE_PER_PAGE = 14;

function normalizeSearchText(value = "") {
  return value
    .trim()
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ");
}

function matchesPerson(person, query) {
  const search = normalizeSearchText(query);

  if (!search) {
    return true;
  }

  return [
    person.name,
    person.nameFa,
    person.name_eng,
    person.slug,
  ].some((value) => normalizeSearchText(value).includes(search));
}

export default function StarKnowledge() {
  const navigate = useNavigate();
  const { zodiac } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("q") || "";
  const selectedZodiac = zodiac ? zodiacSigns[zodiac] : null;

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [searchInput, setSearchInput] = useState(queryFromUrl);
  const [suggestions, setSuggestions] = useState([]);

  // شماره صفحه از URL خوانده می‌شود.
  const pageFromUrl = Number.parseInt(
    searchParams.get("page") || "1",
    10
  );

  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0
      ? pageFromUrl
      : 1;

  // دریافت افراد از API
  useEffect(() => {
    let active = true;

    const fetchPeople = async () => {
      try {
        setLoading(true);
        setLoadError(false);

        const data = await getPeople();

        if (active) {
          setPeople(data || []);
        }
      } catch (error) {
        console.error("Error fetching people:", error);

        if (active) {
          setLoadError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPeople();

    return () => {
      active = false;
    };
  }, []);

  // هماهنگ نگه داشتن ورودی جستجو با URL
  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  // پیشنهادهای جستجو
  useEffect(() => {
    const query = searchInput.trim();

    if (!query) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const result = people
        .filter((person) => matchesPerson(person, query))
        .slice(0, 6);

      setSuggestions(result);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchInput, people]);

  // جستجو و فیلتر افراد
  const filteredPeople = useMemo(() => {
    return people
      .filter((person) => {
        const matchesSearch = matchesPerson(person, queryFromUrl);

        const matchesZodiac =
          !selectedZodiac ||
          Number(person.zodiac?.id) === Number(selectedZodiac.id);

        return matchesSearch && matchesZodiac;
      })
      .sort((a, b) =>
        (a.nameEng || a.name_eng || "").localeCompare(
          b.nameEng || b.name_eng || "",
          "en",
          { sensitivity: "base" }
        )
      );
  }, [people, queryFromUrl, selectedZodiac]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPeople.length / PEOPLE_PER_PAGE)
  );

  // اگر تعداد نتایج کم شد و صفحه فعلی دیگر وجود نداشت،
  // به آخرین صفحه معتبر برمی‌گردیم.
  useEffect(() => {
    if (currentPage <= totalPages) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);

    if (totalPages === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(totalPages));
    }

    setSearchParams(nextParams, { replace: true });
  }, [
    currentPage,
    totalPages,
    searchParams,
    setSearchParams,
  ]);

  // ثبت جستجو و شروع از صفحه اول
  const handleSearchSubmit = () => {
    const query = normalizeSearchText(searchInput);

    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  // حذف فیلترها و بازگشت به همه زایچه‌ها
  const handleClearAllFilters = () => {
    navigate("/star-knowledge");
  };

  // انتخاب پیشنهاد جستجو
  const handleSuggestionClick = (person) => {
    navigate(`/star-knowledge/person/${person.slug}`);
  };

  // تغییر صفحه و نگه داشتن عبارت جستجو
  const handlePageChange = (page) => {
    const nextPage = Math.max(
      1,
      Math.min(page, totalPages)
    );

    const nextParams = new URLSearchParams(searchParams);

    if (nextPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }

    setSearchParams(nextParams);
  };

  const hasSearch = queryFromUrl.trim().length > 0;
  const hasZodiacFilter = Boolean(selectedZodiac);
  const hasFilter = hasSearch || hasZodiacFilter;

  // همه Hookها پیش از این شرط اجرا شده‌اند.
  if (zodiac && !selectedZodiac) {
    return <Navigate to="/404" replace />;
  }

  return (
    <PageShell>
      {selectedZodiac ? (
        <PageHero
          backgroundImage={heroImage}
          variant="zodiac"
        >
          <ZodiacHeroContent zodiac={selectedZodiac} />
        </PageHero>
      ) : (
        <PageHero
          title="دانش ستارگان"
          subtitle="بایگانی زایچه‌ها"
          backgroundImage={heroImage}
        />
      )}

      <div className="star-knowledge__content">
        <section className="search-box__content">
          <SearchBox
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSubmit={handleSearchSubmit}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </section>

        {loading ? (
          <section className="person-list">
            <p className="person-list__empty">
              در حال دریافت اطلاعات افراد...
            </p>
          </section>
        ) : loadError ? (
          <section className="person-list">
            <p className="person-list__empty">
              دریافت اطلاعات افراد با خطا مواجه شد.
            </p>
          </section>
        ) : (
          <PersonList
            people={filteredPeople}
            title={
              selectedZodiac
                ? `زایچه‌های ${selectedZodiac.name}`
                : hasSearch
                  ? "نتایج جستجو"
                  : "همه زایچه‌ها"
            }
            filterActive={hasFilter}
            onClearFilter={handleClearAllFilters}
            currentPage={currentPage}
            pageSize={PEOPLE_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}

        <hr />

        <section className="zodiac-filter">
          <ZodiacFilter />
        </section>
      </div>
    </PageShell>
  );
}
