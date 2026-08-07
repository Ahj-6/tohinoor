import "./StarKnowledge.css";
import "./StarKnowledge-responsive.css";

import PageShell from "../../components/layout/PageShell";
import PageHero from "../../components/page/PageHero";
import heroImage from "../../assets/images/backgrounds/star-knowledge.png";
import SearchBox from "../../components/common/SearchBox/SearchBox";
import { people } from "../../data/people";
import PersonList from "../../components/StarKnowledge/PersonList";
import ZodiacFilter from "../../components/StarKnowledge/ZodiacFilter";

export default function StarKnowledge() {
  return (
    <PageShell>
      <PageHero
        title="دانش ستارگان"
        subtitle="بایگانی زایچه‌ها"
        backgroundImage={heroImage}
      />

      <div className="star-knowledge__content">
        <section className="search-box__content">
          <SearchBox />
        </section>

        {/* <PersonList /> */}
        <PersonList people={people} />

        <hr />

        <section className="zodiac-filter">
          <ZodiacFilter />
        </section>
      </div>
    </PageShell>
  );
}
