import "./Dashboard.css"

const stats = [
  {
    label: 'استرولوژی',
    value: '—',
    icon: 'bi-stars',
    className: 'text-bg-secondary',
    gridClass: 'col-12 col-sm-6 col-xl-3',
  },
  {
    label: 'افراد',
    value: '—',
    icon: 'bi-people',
    className: 'text-bg-success',
    gridClass: 'col-12 col-sm-6 col-xl-3',
  },
  {
    label: 'کتاب‌ها',
    value: '—',
    icon: 'bi-book',
    className: 'text-bg-warning',
    gridClass: 'col-12 col-sm-6 col-xl-3',
  },
  {
    label: 'فیلم‌ها',
    value: '—',
    icon: 'bi-film',
    className: 'text-bg-danger',
    gridClass: 'col-12 col-sm-6 col-xl-3',
  },
  {
    label: 'نمونه کار اعضا',
    value: '—',
    icon: 'bi-journal-richtext',
    className: 'text-bg-primary',
    gridClass: 'col-12',
  },
];

export default function Dashboard() {
  return (
    <>
      {/* Page Title */}
      <div className="row mb-3">
        <div className="col-12">
          <h1 className="m-0">داشبورد</h1>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-3 dashboard-stats">
        {stats.map((stat) => (
          <div
            className={stat.gridClass}
            key={stat.label}
          >
            <div className={`small-box dashboard-box ${stat.className}`}>
              <div className="inner">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>

              <div className="icon">
                <i className={`bi ${stat.icon}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}