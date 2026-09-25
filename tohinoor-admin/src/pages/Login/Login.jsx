import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.jsx';
import './Login.css';

export default function Login() {
  const {
    isAuthenticated,
    canAccessAdminPanel,
    loading,
    login,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const forbidden =
    new URLSearchParams(location.search).get('error') === 'forbidden';

  useEffect(() => {
    if (!forbidden) return;

    setError('این حساب دسترسی ورود به پنل مدیریت را ندارد.');
  }, [forbidden]);

  // اگر کاربر قبلاً وارد شده، مستقیماً به داشبورد برود
  if (!loading && isAuthenticated && canAccessAdminPanel) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSubmitting(true);

    try {
      const nextUser = await login(username.trim(), password);

      const nextRoleId = Number(nextUser?.role_id);
      const adminRoleId = Number(
        import.meta.env.VITE_ADMIN_ROLE_ID || 1
      );
      const operatorRoleId = Number(
        import.meta.env.VITE_OPERATOR_ROLE_ID || 2
      );

      if (![adminRoleId, operatorRoleId].includes(nextRoleId)) {
        setError('این حساب برای ورود به پنل مدیریت مجاز نیست.');

        sessionStorage.removeItem('tohinoor_token');
        sessionStorage.removeItem('tohinoor_user');

        return;
      }

      const from = location.state?.from?.pathname || '/admin';

      navigate(from, { replace: true });
    } catch (requestError) {
      const status = requestError.response?.status;
      const message = requestError.response?.data?.message;

      if (status === 422) {
        setError(
          message || 'نام کاربری یا رمز عبور صحیح نیست.'
        );
      } else if (status === 403) {
        setError(
          message || 'دسترسی شما به پنل مدیریت مجاز نیست.'
        );
      } else {
        setError(
          'ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page bg-body-tertiary">
      <div className="login-box">

        {/* Login Card */}
        <div className="card card-outline card-danger login-card">

          {/* Header */}
          <div className="card-header text-center">
            <h1 className="mb-1 login-brand">
              تهی‌نور
            </h1>

            <p className="text-muted mb-0 login-subtitle">
              پنل مدیریت
            </p>
          </div>

          {/* Body */}
          <div className="card-body">

            <p className="login-box-msg">
              برای ورود به پنل مدیریت وارد شوید
            </p>

            {/* Error */}
            {error && (
              <div
                className="alert alert-danger login-alert"
                role="alert"
              >
                <i className="bi bi-exclamation-circle me-2" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="نام کاربری"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  autoComplete="username"
                  required
                  autoFocus
                />

                <div className="input-group-text">
                  <span className="bi bi-person" />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  رمز عبور
                </label>

                <div className="password-field">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    aria-label={
                      showPassword
                        ? 'مخفی کردن رمز عبور'
                        : 'نمایش رمز عبور'
                    }
                  >
                    <i
                      className={`bi ${
                        showPassword
                          ? 'bi-eye-slash'
                          : 'bi-eye'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <div className="mb-2">
                <button
                  type="submit"
                  className="btn btn-danger w-100 login-button"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      />
                      در حال ورود...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-left me-2" />
                      ورود
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </main>
  );
}