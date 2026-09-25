import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.jsx';

const roleLabels = {
  admin: 'مدیر سیستم',
  operator: 'اپراتور',
  student: 'شاگرد',
};

export default function Header() {
  const { user, roleName, logout } = useAuth();

  const navigate = useNavigate();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const toggleSidebar = (event) => {
    event.preventDefault();

    const isMobile = window.matchMedia(
      '(max-width: 991.98px)'
    ).matches;

    if (isMobile) {
      // Mobile / Tablet
      document.body.classList.toggle('sidebar-open');
    } else {
      // Desktop
      document.body.classList.toggle('sidebar-collapse');
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  const displayRole =
    roleLabels[roleName] ||
    roleName ||
    'کاربر';

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">

        {/* Sidebar Toggle */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              type="button"
              className="nav-link border-0 bg-transparent"
              onClick={toggleSidebar}
              aria-label="باز و بسته کردن منو"
            >
              <i className="bi bi-list" />
            </button>
          </li>
        </ul>

        {/* Title */}
        <span className="navbar-brand mb-0 d-none d-md-inline">
          پنل مدیریت تهی‌نور
        </span>

        {/* User */}
        <ul className="navbar-nav me-auto align-items-center">
          <li className="nav-item position-relative">

            <button
              type="button"
              className="nav-link border-0 bg-transparent"
              onClick={() =>
                setUserMenuOpen((value) => !value)
              }
              aria-expanded={userMenuOpen}
              aria-label="منوی کاربر"
            >
              <span className="d-inline-flex align-items-center gap-1">
                <i className="bi bi-person-circle" />

                <span className="d-none d-sm-inline">
                  {user?.username}
                </span>

                <i className="bi bi-chevron-down small" />
              </span>
            </button>

            {userMenuOpen && (
              <div className="user-menu position-absolute top-100 end-0 bg-body border rounded-2 shadow mt-1">

                <div className="user-menu-header px-3 py-3">

                  <div className="fw-semibold">
                    {user?.full_name || user?.username}
                  </div>

                  <div className="small text-body-secondary">
                    نام کاربری: {user?.username}
                  </div>

                  <div className="small text-body-secondary mt-1">
                    نقش: {displayRole}
                  </div>

                </div>

                <div className="border-top" />

                {/* Logout */}
                <button
                  type="button"
                  className="user-menu-item text-danger"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  {loggingOut ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      />
                      <span>در حال خروج...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-right" />
                      <span>خروج از حساب</span>
                    </>
                  )}
                </button>

              </div>
            )}

          </li>
        </ul>

      </div>
    </nav>
  );
}