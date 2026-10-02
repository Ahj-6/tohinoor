import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getRoles } from "../../../services/roleService.js";

import "./Roles.css";

export default function RolesList() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRoles = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getRoles();

      setRoles(data || []);
    } catch (err) {
      console.error("Error loading roles:", err);

      setError(
        err?.response?.data?.message ||
          "خطا در دریافت نقش‌ها.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleAdd = () => {
    navigate("/admin/roles/new");
  };

  const handleEdit = (role) => {
    navigate(`/admin/roles/${role.id}/edit`);
  };

  return (
    <div className="roles-page">
      {/* Page Header */}
      <div className="roles-page-header">
        <div className="roles-page-title">
          <h1>نقش‌ها</h1>

          <div className="roles-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            <span>/</span>
            <span>نقش‌ها</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="roles-card">
        <div className="roles-card-header">
          <div className="roles-card-title">
            نمایش نقش‌ها
          </div>

          <button
            type="button"
            className="roles-add-button"
            onClick={handleAdd}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن نقش</span>
          </button>
        </div>

        <div className="roles-card-body">
          {loading ? (
            <div className="roles-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : error ? (
            <div className="roles-error">
              <span>{error}</span>

              <button
                type="button"
                onClick={loadRoles}
              >
                تلاش مجدد
              </button>
            </div>
          ) : roles.length === 0 ? (
            <div className="roles-state">
              <i className="bi bi-inbox" />
              <span>
                هیچ نقشی ثبت نشده است.
              </span>
            </div>
          ) : (
            <div className="roles-table-wrapper">
              <table className="roles-table">
                <thead>
                  <tr>
                    <th className="col-number">
                      ردیف
                    </th>

                    <th className="col-name">
                      نام نقش
                    </th>

                    <th className="col-name-eng">
                      نام انگلیسی
                    </th>

                    <th className="col-description">
                      توضیحات
                    </th>

                    <th className="col-actions">
                      عملیات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {roles.map((role, index) => (
                    <tr key={role.id}>
                      {/* NUMBER */}
                      <td className="text-center">
                        {index + 1}
                      </td>

                      {/* NAME */}
                      <td className="role-name">
                        {role.name || "—"}
                      </td>

                      {/* NAME ENG */}
                      <td className="role-name-eng">
                        {role.name_eng || "—"}
                      </td>

                      {/* DESCRIPTION */}
                      <td className="role-description">
                        {role.description || "—"}
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="roles-table__actions">
                          <button
                            type="button"
                            className="role-edit-button"
                            onClick={() =>
                              handleEdit(role)
                            }
                            title="ویرایش"
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
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