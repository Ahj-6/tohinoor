import { NavLink } from 'react-router-dom';

function LinkItem({ to, icon, children, onNavigate }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        end={to === '/admin'}
        onClick={onNavigate}
        className={({ isActive }) =>
          `nav-link${isActive ? ' active' : ''}`
        }
      >
        <i className={`nav-icon bi ${icon}`} />
        <p>{children}</p>
      </NavLink>
    </li>
  );
}

export default function Sidebar() {
  const closeOnNavigate = () => {
    if (window.innerWidth < 992) {
      document.body.classList.remove('sidebar-open');
    }
  };

  return (
    <aside
      className="app-sidebar bg-body-secondary shadow"
      data-bs-theme="dark"
    >
      {/* Brand */}
      <div className="sidebar-brand">
        <NavLink
          to="/admin"
          className="brand-link text-decoration-none"
          onClick={closeOnNavigate}
        >
          <span className="brand-text fw-light">
            TOHINOOR ADMIN
          </span>
        </NavLink>
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-wrapper">
        <nav
          className="mt-2"
          aria-label="منوی اصلی پنل"
        >
          <ul
            className="nav sidebar-menu flex-column"
            role="menu"
          >
            {/* 1. Dashboard */}
            <LinkItem
              to="/admin"
              icon="bi-speedometer2"
              onNavigate={closeOnNavigate}
            >
              داشبورد
            </LinkItem>

            {/* 2. Astrology */}
            <LinkItem
              to="/admin/astrology"
              icon="bi-stars"
              onNavigate={closeOnNavigate}
            >
              استرولوژی
            </LinkItem>

            {/* 3. People */}
            <LinkItem
              to="/admin/people"
              icon="bi-people"
              onNavigate={closeOnNavigate}
            >
              افراد
            </LinkItem>

            {/* 4. Books */}
            <LinkItem
              to="/admin/books"
              icon="bi-book"
              onNavigate={closeOnNavigate}
            >
              کتاب‌ها
            </LinkItem>

            {/* 5. Movies */}
            <LinkItem
              to="/admin/movies"
              icon="bi-film"
              onNavigate={closeOnNavigate}
            >
              فیلم‌ها
            </LinkItem>

            {/* 6. Member Samples */}
            <LinkItem
              to="/admin/sample-analyses"
              icon="bi-journal-richtext"
              onNavigate={closeOnNavigate}
            >
              نمونه کار اعضا
            </LinkItem>

            {/* 7. Users */}
            <LinkItem
              to="/admin/users"
              icon="bi-person-gear"
              onNavigate={closeOnNavigate}
            >
              کاربران
            </LinkItem>

            {/* 8. Roles */}
            <LinkItem
              to="/admin/roles"
              icon="bi-shield-lock"
              onNavigate={closeOnNavigate}
            >
              نقش‌ها
            </LinkItem>
          </ul>
        </nav>
      </div>
    </aside>
  );
}