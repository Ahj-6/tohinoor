import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers, deleteUser } from "../../../services/userService.js";
import { getRoles } from "../../../services/roleService.js";

import "./Users.css";

export default function UsersList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [usersData, rolesData] = await Promise.all([
        getUsers(),
        getRoles(),
      ]);

      setUsers(usersData || []);
      setRoles(rolesData || []);
    } catch (err) {
      console.error("Error loading users:", err);

      setError(
        err?.response?.data?.message || "خطا در دریافت اطلاعات کاربران.",
      );
    } finally {
      setLoading(false);
    }
  }

  function getRoleName(roleId) {
    const role = roles.find((item) => item.id === roleId);

    return role?.name_eng || role?.name || "—";
  }

  function formatLastLogin(lastLoginAt) {
    if (!lastLoginAt) {
      return "—";
    }

    return new Date(lastLoginAt).toLocaleString("fa-IR");
  }

  function handleAdd() {
    navigate("/admin/users/new");
  }

  function handleEdit(user) {
    navigate(`/admin/users/${user.id}/edit`);
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `آیا از حذف کاربر «${user.full_name}» مطمئن هستید؟`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(user.id);

      await deleteUser(user.id);

      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== user.id),
      );
    } catch (err) {
      console.error("Error deleting user:", err);

      alert(err?.response?.data?.message || "حذف کاربر انجام نشد.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="users-page">
        <div className="users-page__loading">
          در حال دریافت اطلاعات کاربران...
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="users-page__header">
        <div>
          <h1 className="users-page__title">کاربران</h1>

          <p className="users-page__description">مدیریت کاربران سیستم</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card users-card">
        <div className="card-header">
          <h3 className="card-title">فهرست کاربران</h3>
          
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            <i className="bi bi-person-plus me-1"></i>
            افزودن کاربر
          </button>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 users-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>نام و نام خانوادگی</th>
                  <th>نام کاربری</th>
                  <th>ایمیل</th>
                  <th>نقش</th>
                  <th>وضعیت</th>
                  <th>آخرین ورود</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      کاربری برای نمایش وجود ندارد.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>

                      <td>
                        <strong>{user.full_name || "—"}</strong>
                      </td>

                      <td>{user.username || "—"}</td>

                      <td>{user.email || "—"}</td>

                      <td>
                        <span className="badge bg-secondary">
                          {getRoleName(user.role_id)}
                        </span>
                      </td>

                      <td>
                        {user.status ? (
                          <span className="badge bg-success">فعال</span>
                        ) : (
                          <span className="badge bg-danger">غیرفعال</span>
                        )}
                      </td>

                      <td>{formatLastLogin(user.last_login_at)}</td>

                      <td>
                        <div className="users-table__actions">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(user)}
                            title="ویرایش"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(user)}
                            disabled={deletingId === user.id}
                            title="حذف"
                          >
                            {deletingId === user.id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              <i className="bi bi-trash"></i>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
