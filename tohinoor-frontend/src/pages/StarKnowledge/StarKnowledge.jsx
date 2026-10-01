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

  return [person.name, person.nameFa, person.name_eng, person.slug].some(
    (value) => normalizeSearchText(value).includes(search),
  );
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

  /*
  |--------------------------------------------------------------------------
  | Validate zodiac route
  |--------------------------------------------------------------------------
  */

  if (zodiac && !selectedZodiac) {
    return <Navigate to="/404" replace />;
  }

  /*
  |--------------------------------------------------------------------------
  | Fetch people from API
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setLoadError(false);

        const data = await getPeople();

        setPeople(data || []);
      } catch (error) {
        console.error("Error fetching people:", error);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Sync search input with URL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  /*
  |--------------------------------------------------------------------------
  | Search suggestions
  |--------------------------------------------------------------------------
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
  }, [searchInput, people]);

  /*
  |--------------------------------------------------------------------------
  | Filter people
  |--------------------------------------------------------------------------
  */

  const filteredPeople = useMemo(() => {
    return people
      .filter((person) => {
        const matchesSearch = matchesPerson(person, queryFromUrl);

        const matchesZodiac =
          !selectedZodiac ||
          person.zodiac?.slug === selectedZodiac.key;

        return matchesSearch && matchesZodiac;
      })
      .sort((a, b) =>
        (a.nameFa || a.name || "").localeCompare(
          b.nameFa || b.name || "",
          "fa",
        ),
      );
  }, [people, queryFromUrl, selectedZodiac]);

  /*
  |--------------------------------------------------------------------------
  | Search submit
  |--------------------------------------------------------------------------
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
  |--------------------------------------------------------------------------
  | Suggestion click
  |--------------------------------------------------------------------------
  */

  const handleSuggestionClick = (person) => {
    navigate(`/star-knowledge/person/${person.slug}`);
  };

  const hasSearch = queryFromUrl.trim().length > 0;

  return (
    <PageShell>
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