import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createRole,
  getRole,
  updateRole,
} from "../../../services/roleService.js";

export default function RoleForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    name_eng: "",
    description: "",
  });

  const systemRoleNames = ["admin", "operator", "student"];

  const isSystemRole = isEdit && systemRoleNames.includes(form.name_eng);


  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    const loadRole = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getRole(id);

        setForm({
          name: data?.name || "",
          name_eng: data?.name_eng || "",
          description: data?.description || "",
        });
      } catch (err) {
        console.error("Error loading role:", err);

        setError(err?.response?.data?.message || "خطا در دریافت اطلاعات نقش.");
      } finally {
        setLoading(false);
      }
    };

    loadRole();
  }, [id, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setValidationErrors({});

      const payload = {
        name: form.name.trim(),
        name_eng: form.name_eng.trim(),
        description: form.description.trim(),
      };

      if (isEdit) {
        await updateRole(id, payload);
      } else {
        await createRole(payload);
      }

      navigate("/admin/roles");
    } catch (err) {
      console.error("Error saving role:", err);

      if (err?.response?.status === 422) {
        setValidationErrors(err.response.data?.errors || {});

        setError(err.response.data?.message || "اطلاعات وارد شده معتبر نیست.");
      } else {
        setError(err?.response?.data?.message || "ذخیره نقش انجام نشد.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-3">
        <div className="card">
          <div className="card-body text-center py-5">
            در حال دریافت اطلاعات...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title mb-0">
            {isEdit ? "ویرایش نقش" : "افزودن نقش"}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="role-name" className="form-label">
                  نام نقش
                </label>

                <input
                  id="role-name"
                  type="text"
                  name="name"
                  className={`form-control${
                    validationErrors.name ? " is-invalid" : ""
                  }`}
                  value={form.name}
                  onChange={handleChange}
                />

                {validationErrors.name && (
                  <div className="invalid-feedback">
                    {validationErrors.name[0]}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="role-name-eng" className="form-label">
                  نام انگلیسی
                </label>

                <input
                  id="role-name-eng"
                  type="text"
                  name="name_eng"
                  className={`form-control${
                    validationErrors.name_eng ? " is-invalid" : ""
                  }`}
                  value={form.name_eng}
                  onChange={handleChange}
                  dir="ltr"
                  disabled={isSystemRole}
                />
                {isSystemRole && (
                  <div className="form-text">
                    نام انگلیسی نقش‌های سیستمی قابل تغییر نیست.
                  </div>
                )}

                {validationErrors.name_eng && (
                  <div className="invalid-feedback">
                    {validationErrors.name_eng[0]}
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="role-description" className="form-label">
                  توضیحات
                </label>

                <textarea
                  id="role-description"
                  name="description"
                  rows="4"
                  className={`form-control${
                    validationErrors.description ? " is-invalid" : ""
                  }`}
                  value={form.description}
                  onChange={handleChange}
                />

                {validationErrors.description && (
                  <div className="invalid-feedback">
                    {validationErrors.description[0]}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-footer d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <i className="bi bi-check-lg me-1" />

              {saving ? "در حال ذخیره..." : "ذخیره"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              disabled={saving}
              onClick={() => navigate("/admin/roles")}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
