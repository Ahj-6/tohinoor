import { useParams } from "react-router-dom";
import "./PersonDetail.css";

import PageShellT from "../../components/layout/PageShellT";
import { people } from "../../data/people";

import PersonInfoCard from "../../components/PersonDetail/PersonInfoCard";
import ChartCard from "../../components/PersonDetail/ChartCard";
import BioCard from "../../components/PersonDetail/BioCard";

export default function PersonDetail() {
  const { slug } = useParams();
  const person = people.find((p) => p.slug === slug);

  if (!person) {
    return (
      <PageShellT>
        <p className="person-detail__not-found">فردی با این مشخصات یافت نشد.</p>
      </PageShellT>
    );
  }

  return (
  <PageShellT>
      <div className="person-detail">
        <PersonInfoCard person={person} />
        <ChartCard chart={person.chart} />
        <BioCard paragraphs={person.bio} />
      </div>
    </PageShellT>
  );
}