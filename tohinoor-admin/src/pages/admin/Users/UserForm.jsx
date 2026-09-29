import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    createUser,
    getUser,
    updateUser,
} from "../../../services/userService.js";

import { getRoles } from "../../../services/roleService.js";

import "./Users.css";

export default function UserForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);

    const [loadError, setLoadError] = useState("");
    const [saveError, setSaveError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
        role_id: "",
        status: true,
    });

    useEffect(() => {
        loadFormData();
    }, [id]);

    async function loadFormData() {
        setLoading(true);
        setLoadError("");

        try {
            const rolesPromise = getRoles();

            if (isEditMode) {
                const [rolesData, user] = await Promise.all([
                    rolesPromise,
                    getUser(id),
                ]);

                setRoles(rolesData || []);

                setForm({
                    full_name: user?.full_name || "",
                    username: user?.username || "",
                    email: user?.email || "",
                    password: "",
                    role_id: user?.role_id
                        ? String(user.role_id)
                        : "",
                    status: Boolean(user?.status),
                });
            } else {
                const rolesData = await rolesPromise;

                setRoles(rolesData || []);
            }
        } catch (error) {
            console.error("User form load error:", error);

            setLoadError(
                error?.response?.data?.message ||
                "دریافت اطلاعات فرم کاربر با خطا مواجه شد."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setSaveError("");

        if (!form.full_name.trim()) {
            setSaveError("نام و نام خانوادگی را وارد کنید.");
            return;
        }

        if (!form.username.trim()) {
            setSaveError("نام کاربری را وارد کنید.");
            return;
        }

        if (!isEditMode && !form.password) {
            setSaveError("رمز عبور را وارد کنید.");
            return;
        }

        if (!form.role_id) {
            setSaveError("نقش کاربر را انتخاب کنید.");
            return;
        }

        setSaving(true);

        try {
            const payload = {
                full_name: form.full_name.trim(),
                username: form.username.trim(),
                email: form.email.trim() || null,
                role_id: Number(form.role_id),
                status: form.status,
            };

            /*
             * هنگام ویرایش اگر رمز عبور خالی باشد،
             * اصلاً password را به API ارسال نمی‌کنیم.
             */
            if (form.password) {
                payload.password = form.password;
            }

            if (isEditMode) {
                await updateUser(id, payload);
            } else {
                await createUser({
                    ...payload,
                    password: form.password,
                });
            }

            navigate("/admin/users");
        } catch (error) {
            console.error("Save user error:", error);

            const validationErrors =
                error?.response?.data?.errors;

            if (validationErrors) {
                const firstError = Object.values(validationErrors)
                    .flat()
                    .find(Boolean);

                setSaveError(
                    firstError ||
                    "اطلاعات واردشده معتبر نیست."
                );
            } else {
                setSaveError(
                    error?.response?.data?.message ||
                    "ذخیره کاربر با خطا مواجه شد."
                );
            }
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="users-page">

                <div className="users-page-header">
                    <div className="users-page-title">
                        <h1>
                            {isEditMode
                                ? "ویرایش کاربر"
                                : "افزودن کاربر"}
                        </h1>

                        <div className="users-breadcrumb">
                            <a
                                href="/admin"
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate("/admin");
                                }}
                            >
                                داشبورد
                            </a>

                            <span>/</span>

                            <a
                                href="/admin/users"
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate("/admin/users");
                                }}
                            >
                                کاربران
                            </a>

                            <span>/</span>

                            <span>
                                {isEditMode
                                    ? "ویرایش"
                                    : "افزودن"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="users-card">
                    <div className="users-state">
                        <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                        />

                        <span>
                            در حال دریافت اطلاعات...
                        </span>
                    </div>
                </div>

            </div>
        );
    }

    if (loadError) {
        return (
            <div className="users-page">

                <div className="users-page-header">
                    <div className="users-page-title">
                        <h1>
                            {isEditMode
                                ? "ویرایش کاربر"
                                : "افزودن کاربر"}
                        </h1>

                        <div className="users-breadcrumb">
                            <a
                                href="/admin"
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate("/admin");
                                }}
                            >
                                داشبورد
                            </a>

                            <span>/</span>

                            <a
                                href="/admin/users"
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate("/admin/users");
                                }}
                            >
                                کاربران
                            </a>

                            <span>/</span>

                            <span>
                                {isEditMode
                                    ? "ویرایش"
                                    : "افزودن"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="users-card">
                    <div className="users-error">

                        <span>
                            {loadError}
                        </span>

                        <button
                            type="button"
                            onClick={loadFormData}
                        >
                            تلاش مجدد
                        </button>

                    </div>
                </div>

            </div>
        );
    }

    return (
        <div className="users-page">

            {/* Page Header */}
            <div className="users-page-header">

                <div className="users-page-title">

                    <h1>
                        {isEditMode
                            ? "ویرایش کاربر"
                            : "افزودن کاربر"}
                    </h1>

                    <div className="users-breadcrumb">

                        <a
                            href="/admin"
                            onClick={(event) => {
                                event.preventDefault();
                                navigate("/admin");
                            }}
                        >
                            داشبورد
                        </a>

                        <span>/</span>

                        <a
                            href="/admin/users"
                            onClick={(event) => {
                                event.preventDefault();
                                navigate("/admin/users");
                            }}
                        >
                            کاربران
                        </a>

                        <span>/</span>

                        <span>
                            {isEditMode
                                ? "ویرایش"
                                : "افزودن"}
                        </span>

                    </div>

                </div>

            </div>

            {/* Form Card */}
            <div className="users-card user-form-card">

                <div className="users-card-header">

                    <div className="users-card-title">
                        اطلاعات کاربر
                    </div>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="user-form-body">

                        {saveError && (
                            <div className="alert alert-danger">
                                {saveError}
                            </div>
                        )}

                        {/* --------------------------------
                            Basic Information
                        -------------------------------- */}

                        <div className="user-form-section">

                            <div className="user-form-section-title">
                                <i className="bi bi-person" />

                                <span>
                                    اطلاعات کاربر
                                </span>
                            </div>

                            <div className="row g-3">

                                <div className="col-md-6">

                                    <label
                                        htmlFor="full_name"
                                        className="form-label"
                                    >
                                        نام و نام خانوادگی
                                        <span className="text-danger">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        className="form-control"
                                        value={form.full_name}
                                        onChange={handleChange}
                                        maxLength={150}
                                        autoComplete="name"
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        نام کاربری
                                        <span className="text-danger">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        value={form.username}
                                        onChange={handleChange}
                                        maxLength={50}
                                        autoComplete="username"
                                        dir="ltr"
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        ایمیل
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                        maxLength={255}
                                        autoComplete="email"
                                        dir="ltr"
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label
                                        htmlFor="role_id"
                                        className="form-label"
                                    >
                                        نقش
                                        <span className="text-danger">
                                            {" "}*
                                        </span>
                                    </label>

                                    <select
                                        id="role_id"
                                        name="role_id"
                                        className="form-select"
                                        value={form.role_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            انتخاب نقش
                                        </option>

                                        {roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.id}
                                            >
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* --------------------------------
                            Password
                        -------------------------------- */}

                        <div className="user-form-section">

                            <div className="user-form-section-title">
                                <i className="bi bi-key" />

                                <span>
                                    رمز عبور
                                </span>
                            </div>

                            <div className="row g-3">

                                <div className="col-md-6">

                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        رمز عبور

                                        {!isEditMode && (
                                            <span className="text-danger">
                                                {" "}*
                                            </span>
                                        )}
                                    </label>

                                    <div className="user-password-field">

                                        <input
                                            id="password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                            value={form.password}
                                            onChange={handleChange}
                                            minLength={8}
                                            autoComplete={
                                                isEditMode
                                                    ? "new-password"
                                                    : "new-password"
                                            }
                                            dir="ltr"
                                            placeholder={
                                                isEditMode
                                                    ? "برای تغییر وارد کنید"
                                                    : ""
                                            }
                                        />

                                        <button
                                            type="button"
                                            className="user-password-toggle"
                                            onClick={() =>
                                                setShowPassword(
                                                    (current) =>
                                                        !current
                                                )
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "مخفی کردن رمز عبور"
                                                    : "نمایش رمز عبور"
                                            }
                                        >
                                            <i
                                                className={
                                                    showPassword
                                                        ? "bi bi-eye-slash"
                                                        : "bi bi-eye"
                                                }
                                            />
                                        </button>

                                    </div>

                                    <div className="form-text">
                                        حداقل ۸ کاراکتر
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* --------------------------------
                            Status
                        -------------------------------- */}

                        <div className="user-form-section">

                            <div className="user-form-section-title">
                                <i className="bi bi-shield-check" />

                                <span>
                                    وضعیت حساب
                                </span>
                            </div>

                            <div className="form-check form-switch">

                                <input
                                    id="status"
                                    name="status"
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={form.status}
                                    onChange={handleChange}
                                />

                                <label
                                    htmlFor="status"
                                    className="form-check-label"
                                >
                                    حساب کاربر فعال باشد
                                </label>

                            </div>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="user-form-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                navigate("/admin/users")
                            }
                            disabled={saving}
                        >
                            <i className="bi bi-x-lg me-1" />

                            انصراف
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                        >

                            {saving ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-1"
                                        aria-hidden="true"
                                    />

                                    در حال ذخیره...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-lg me-1" />

                                    ذخیره
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}