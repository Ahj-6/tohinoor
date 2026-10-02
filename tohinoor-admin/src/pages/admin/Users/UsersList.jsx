import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getUsers,
  deleteUser,
} from "../../../services/userService.js";

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
        err?.response?.data?.message ||
          "خطا در دریافت اطلاعات کاربران.",
      );
    } finally {
      setLoading(false);
    }
  }

  function getRoleName(roleId) {
    const role = roles.find(
      (item) => Number(item.id) === Number(roleId),
    );

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
        currentUsers.filter(
          (item) => item.id !== user.id,
        ),
      );
    } catch (err) {
      console.error("Error deleting user:", err);

      window.alert(
        err?.response?.data?.message ||
          "حذف کاربر انجام نشد.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="users-page">
      {/* Page Header */}
      <div className="users-page-header">
        <div className="users-page-title">
          <h1>کاربران</h1>

          <div className="users-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            <span>/</span>
            <span>کاربران</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="users-card">
        <div className="users-card-header">
          <div className="users-card-title">
            نمایش کاربران
          </div>

          <button
            type="button"
            className="users-add-button"
            onClick={handleAdd}
          >
            <i className="bi bi-person-plus" />
            <span>افزودن کاربر</span>
          </button>
        </div>

        <div className="users-card-body">
          {loading ? (
            <div className="users-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : error ? (
            <div className="users-error">
              <span>{error}</span>

              <button
                type="button"
                onClick={loadData}
              >
                تلاش مجدد
              </button>
            </div>
          ) : users.length === 0 ? (
            <div className="users-state">
              <i className="bi bi-inbox" />
              <span>
                کاربری برای نمایش وجود ندارد.
              </span>
            </div>
          ) : (
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th className="col-number">
                      ردیف
                    </th>

                    <th className="col-full-name">
                      نام و نام خانوادگی
                    </th>

                    <th className="col-username">
                      نام کاربری
                    </th>

                    <th className="col-email">
                      ایمیل
                    </th>

                    <th className="col-role">
                      نقش
                    </th>

                    <th className="col-status">
                      وضعیت
                    </th>

                    <th className="col-last-login">
                      آخرین ورود
                    </th>

                    <th className="col-actions">
                      عملیات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      {/* NUMBER */}
                      <td className="text-center">
                        {index + 1}
                      </td>

                      {/* FULL NAME */}
                      <td className="user-full-name">
                        {user.full_name || "—"}
                      </td>

                      {/* USERNAME */}
                      <td className="user-username">
                        {user.username || "—"}
                      </td>

                      {/* EMAIL */}
                      <td className="user-email">
                        {user.email || "—"}
                      </td>

                      {/* ROLE */}
                      <td>
                        <span className="user-role">
                          {getRoleName(user.role_id)}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="text-center">
                        {user.status ? (
                          <span className="user-status user-status--active">
                            فعال
                          </span>
                        ) : (
                          <span className="user-status user-status--inactive">
                            غیرفعال
                          </span>
                        )}
                      </td>

                      {/* LAST LOGIN */}
                      <td className="user-last-login">
                        {formatLastLogin(
                          user.last_login_at,
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="users-table__actions">
                          <button
                            type="button"
                            className="user-edit-button"
                            onClick={() =>
                              handleEdit(user)
                            }
                            disabled={
                              deletingId === user.id
                            }
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="user-delete-button"
                            onClick={() =>
                              handleDelete(user)
                            }
                            disabled={
                              deletingId === user.id
                            }
                          >
                            {deletingId === user.id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <>
                                <i className="bi bi-trash" />
                                <span>حذف</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}