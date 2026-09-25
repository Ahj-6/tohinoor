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
import { people } from "../../data/people";
import PersonList from "../../components/StarKnowledge/PersonList";
import ZodiacFilter from "../../components/StarKnowledge/ZodiacFilter";

import { zodiacSigns } from "../../constants/zodiacSigns";

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

  return [person.name, person.nameFa, person.slug].some((value) =>
    normalizeSearchText(value).includes(search),
  );
}

export default function StarKnowledge() {
  const navigate = useNavigate();

  // Zodiac comes from URL path:
  // /star-knowledge/aries
  const { zodiac } = useParams();

  // Search still comes from query string:
  // /star-knowledge/aries?q=tesla
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("q") || "";

  const selectedZodiac = zodiac ? zodiacSigns[zodiac] : null;

  if (zodiac && !selectedZodiac) {
    return <Navigate to="/404" replace />;
  }

  const [searchInput, setSearchInput] = useState(queryFromUrl);
  const [suggestions, setSuggestions] = useState([]);

  /*
   * Keep search input synchronized with URL.
   */
  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  /*
   * Local suggestion search.
   * Later this can be replaced with API request.
   */
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
  }, [searchInput]);

  /*
   * Main filtering:
   * 1. Search
   * 2. Zodiac
   */
  const filteredPeople = useMemo(() => {
    return people
      .filter((person) => {
        const matchesSearch = matchesPerson(person, queryFromUrl);

        const matchesZodiac =
          !selectedZodiac || person.zodiac === selectedZodiac.key;

        return matchesSearch && matchesZodiac;
      })
      .sort((a, b) => a.nameFa.localeCompare(b.nameFa, "fa"));
  }, [queryFromUrl, selectedZodiac]);

  /*
   * Search Submit
   *
   * Keep current zodiac path and
   * only update ?q=...
   */
  const handleSearchSubmit = () => {
    const query = normalizeSearchText(searchInput);

    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  /*
   * Clicking a suggestion opens PersonDetail.
   */
  const handleSuggestionClick = (person) => {
    navigate(`/star-knowledge/person/${person.slug}`);
  };

  const hasSearch = queryFromUrl.trim().length > 0;

  return (
    <PageShell>
      {/* =========================
          Hero
      ========================= */}

      {selectedZodiac ? (
        <PageHero backgroundImage={heroImage} variant="zodiac">
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
        {/* =========================
            Search
        ========================= */}

        <section className="search-box__content">
          <SearchBox
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSubmit={handleSearchSubmit}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </section>

        {/* =========================
            People
        ========================= */}

        <PersonList
          people={filteredPeople}
          title={
            selectedZodiac
              ? `زایچه‌های ${selectedZodiac.name}`
              : hasSearch
                ? "نتایج جستجو"
                : "همه زایچه‌ها"
          }
        />

        <hr />

        {/* =========================
            Zodiac Filter
        ========================= */}

        <section className="zodiac-filter">
          <ZodiacFilter />
        </section>
      </div>
    </PageShell>
  );
}
