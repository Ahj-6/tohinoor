import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRoles } from "../../../services/roleService.js";

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

      setError(err?.response?.data?.message || "خطا در دریافت نقش‌ها.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="container-fluid py-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">نقش‌ها</h3>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/admin/roles/new")}
          >
            <i className="bi bi-plus-lg me-1" />
            افزودن نقش
          </button>
        </div>

        <div className="card-body">
          {loading && (
            <div className="text-center py-4">در حال دریافت اطلاعات...</div>
          )}

          {!loading && error && (
            <div className="alert alert-danger mb-0">{error}</div>
          )}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>نام نقش</th>
                    <th>نام انگلیسی</th>
                    <th>توضیحات</th>
                    <th className="text-center">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {roles.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        هیچ نقشی ثبت نشده است.
                      </td>
                    </tr>
                  ) : (
                    roles.map((role, index) => (
                      <tr key={role.id}>
                        <td>{index + 1}</td>

                        <td>{role.name}</td>

                        <td>
                          <code>{role.name_eng}</code>
                        </td>

                        <td>{role.description || "-"}</td>

                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-warning"
                            onClick={() =>
                              navigate(`/admin/roles/${role.id}/edit`)
                            }
                            title="ویرایش"
                          >
                            <i className="bi bi-pencil" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
