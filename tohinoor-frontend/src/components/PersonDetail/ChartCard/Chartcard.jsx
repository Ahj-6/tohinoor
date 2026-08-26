import "./ChartCard.css";

export default function ChartCard({ chart }) {
  return (
    <section className="chart-card">
      <h2 className="chart-card__title">چارت {chart.title}</h2>

      <div className="chart-card__image">
        <img src={chart.image} alt={`چارت ${chart.title}`} />
      </div>
    </section>
  );
}