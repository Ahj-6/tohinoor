import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./PersonDetail.css";

import PageShellT from "../../components/layout/PageShellT";

import PersonInfoCard from "../../components/PersonDetail/PersonInfoCard";
import ChartCard from "../../components/PersonDetail/ChartCard";
import BioCard from "../../components/PersonDetail/BioCard";

// import { getPersonBySlugOrId } from "../../services/peopleService";
import { getPersonBySlug } from "../../services/peopleService";
import { FaArrowLeft } from "react-icons/fa";

export default function PersonDetail() {
  const { slug } = useParams();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        setError(false);

        // const data = await getPersonBySlugOrId(slug);
        const data = await getPersonBySlug(slug);

        if (!data) {
          setError(true);
          return;
        }

        setPerson(data);
      } catch (err) {
        console.error("Error fetching person detail:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPerson();
    }
  }, [slug]);

  if (loading) {
    return (
      <PageShellT>
        <div className="person-detail-loading">
          در حال دریافت اطلاعات فرد...
        </div>
      </PageShellT>
    );
  }

  if (error || !person) {
    return <Navigate to="/404" replace />;
  }

  return (
    <PageShellT>
      <div className="person-detail">

        {/* Person */}
        <PersonInfoCard person={person} />

        {/* Charts */}
        {person.charts?.length > 0 && (
          <ChartCard charts={person.charts} />
        )}

        {/* Biography */}
        <BioCard
          paragraphs={person.bio}
          wikipediaUrl={person.wikipedia_url}
        />

        {/* Back Button */}
        <div className="person-detail__back">
          <Link
            to="/star-knowledge"
            className="person-detail__back-button"
          >
            {/* <span className="person-detail__back-icon" aria-hidden="true">
              ←
            </span> */}
            <FaArrowLeft />

            <span>بازگشت به دانش ستارگان</span>
          </Link>
        </div>
      </div>
    </PageShellT>
  );
}