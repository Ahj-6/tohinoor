import "./StarKnowledge.css";
import "./StarKnowledge-responsive.css";

import PageShell from "../../components/layout/PageShell";
import PageHero from "../../components/page/PageHero";
// import SectionHeader from "../../components/page/SectionHeader";
import PersonList from "../../components/StarKnowledge/PersonList";

import heroImage from "../../assets/images/backgrounds/star-knowledge.png";

export default function StarKnowledge() {
  return (
    <PageShell>
      <PageHero
        title="دانش ستارگان"
        subtitle="بایگانی زایچه‌ها"
        backgroundImage={heroImage}
      />

      <div className="star-knoledge__content">
        {/* <SectionHeader title="نمایش زایچه‌ها" subtitle="جستجو و فیلتر" />

        <section className="zodiac-filter">Zodiac Filter</section>

        <section className="search-box">Search Box</section> */}

        <PersonList />
      </div>
    </PageShell>
  );
}
