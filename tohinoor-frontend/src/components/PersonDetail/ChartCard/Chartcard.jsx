import "./ChartCard.css";

export default function ChartCard({ charts = [] }) {
  const d1Chart = charts.find(
    (chart) => chart.chart_type?.name_eng === "D1",
  );

  if (!d1Chart) {
    return null;
  }

  return (
    <section className="chart-card">
      <h2 className="chart-card__title">
        نمودار تولد (D1)
      </h2>

      <div className="chart-card__image">
        <img
          src={d1Chart.image_url}
          alt="چارت D1"
        />
      </div>
    </section>
  );
}