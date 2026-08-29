import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./StarKnowledge.css";
import "./StarKnowledge-responsive.css";

import PageShell from "../../components/layout/PageShell";
import PageHero from "../../components/page/PageHero";
import heroImage from "../../assets/images/backgrounds/star-knowledge.jpg";
import SearchBox from "../../components/common/SearchBox/SearchBox";
import { people } from "../../data/people";
import PersonList from "../../components/StarKnowledge/PersonList";
import ZodiacFilter from "../../components/StarKnowledge/ZodiacFilter";

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
    person.slug,
  ].some((value) =>
    normalizeSearchText(value).includes(search)
  );
}

export default function StarKnowledge() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(queryFromUrl);
  const [suggestions, setSuggestions] = useState([]);

  /*
   * Keep the input synchronized with the URL.
   * This matters when the user uses browser Back/Forward.
   */
  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  /*
   * Temporary local suggestion search.
   *
   * Later this block can be replaced with an API request
   * such as:
   *
   * GET /api/people/suggestions?q=tesla
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

  const filteredPeople = useMemo(() => {
    return people.filter((person) =>
      matchesPerson(person, queryFromUrl)
    );
  }, [queryFromUrl]);

  const handleSearchSubmit = () => {
    const query = normalizeSearchText(searchInput);

    if (!query) {
      setSearchParams({});
      return;
    }

    setSearchParams({ q: query });
  };

  const handleSuggestionClick = (person) => {
    navigate(`/star-knowledge/${person.slug}`);
  };

  const hasSearch = queryFromUrl.trim().length > 0;

  return (
    <PageShell>
      <PageHero
        title="دانش ستارگان"
        subtitle="بایگانی زایچه‌ها"
        backgroundImage={heroImage}
      />

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

        <PersonList
          people={filteredPeople}
          title={hasSearch ? "نتایج جستجو" : "همه زایچه‌ها"}
        />

        <hr />

        <section className="zodiac-filter">
          <ZodiacFilter />
        </section>
      </div>
    </PageShell>
  );
}