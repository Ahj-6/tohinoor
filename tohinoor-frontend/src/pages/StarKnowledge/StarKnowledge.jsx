import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const zodiacFromUrl = searchParams.get("zodiac") || "";

  const selectedZodiac = zodiacSigns[zodiacFromUrl] || null;

  const [searchInput, setSearchInput] = useState(queryFromUrl);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

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
    return people.filter((person) => {
      const matchesSearch = matchesPerson(
        person,
        queryFromUrl
      );

      const matchesZodiac =
        !selectedZodiac ||
        person.zodiac === selectedZodiac.key;

      return matchesSearch && matchesZodiac;
    });
  }, [queryFromUrl, selectedZodiac]);

  const handleSearchSubmit = () => {
    const query = normalizeSearchText(searchInput);

    const nextParams = {};

    if (query) {
      nextParams.q = query;
    }

    if (zodiacFromUrl) {
      nextParams.zodiac = zodiacFromUrl;
    }

    setSearchParams(nextParams);
  };

  const handleSuggestionClick = (person) => {
    navigate(`/star-knowledge/${person.slug}`);
  };

  const hasSearch = queryFromUrl.trim().length > 0;

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

        <PersonList
          people={filteredPeople}
          title={
            selectedZodiac
              ? `زایچه‌های صورت فلکی ${selectedZodiac.name}`
              : hasSearch
                ? "نتایج جستجو"
                : "همه زایچه‌ها"
          }
        />

        <hr />

        <section className="zodiac-filter">
          <ZodiacFilter />
        </section>

      </div>

    </PageShell>
  );
}