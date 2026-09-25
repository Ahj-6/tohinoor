import { useEffect, useState } from 'react';

const emptyForm = {
    name: '',
    name_eng: '',
};

export default function GenderForm({
    gender,
    onSaved,
    onCancel,
    saveGender,
}) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const isEditing = Boolean(gender);

    useEffect(() => {
        if (gender) {
            setForm({
                name: gender.name || '',
                name_eng: gender.name_eng || '',
            });
        } else {
            setForm(emptyForm);
        }

        setErrors({});
    }, [gender]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: undefined,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setErrors({});

        try {
            const savedGender = await saveGender(form);

            onSaved(savedGender);

            if (!isEditing) {
                setForm(emptyForm);
            }
        } catch (error) {
            const validationErrors =
                error?.response?.data?.errors;

            if (validationErrors) {
                setErrors(validationErrors);
            } else {
                setErrors({
                    general:
                        error?.response?.data?.message ||
                        'خطایی هنگام ذخیره اطلاعات رخ داد.',
                });
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="card shadow-sm gender-form-card">
            <div className="card-header">
                <h3 className="card-title mb-0">
                    {isEditing
                        ? 'ویرایش جنسیت'
                        : 'افزودن جنسیت جدید'}
                </h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="card-body">

                    {errors.general && (
                        <div className="alert alert-danger">
                            {errors.general}
                        </div>
                    )}

                    <div className="mb-3">
                        <label
                            htmlFor="gender-name"
                            className="form-label"
                        >
                            نام جنسیت
                        </label>

                        <input
                            id="gender-name"
                            type="text"
                            name="name"
                            className={`form-control ${
                                errors.name ? 'is-invalid' : ''
                            }`}
                            value={form.name}
                            onChange={handleChange}
                            maxLength={20}
                            disabled={saving}
                        />

                        {errors.name?.map((error, index) => (
                            <div
                                className="invalid-feedback"
                                key={index}
                            >
                                {error}
                            </div>
                        ))}
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="gender-name-eng"
                            className="form-label"
                        >
                            نام انگلیسی
                        </label>

                        <input
                            id="gender-name-eng"
                            type="text"
                            name="name_eng"
                            className={`form-control ${
                                errors.name_eng
                                    ? 'is-invalid'
                                    : ''
                            }`}
                            value={form.name_eng}
                            onChange={handleChange}
                            maxLength={20}
                            disabled={saving}
                            dir="ltr"
                        />

                        {errors.name_eng?.map((error, index) => (
                            <div
                                className="invalid-feedback"
                                key={index}
                            >
                                {error}
                            </div>
                        ))}
                    </div>

                </div>

                <div className="card-footer d-flex gap-2">
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
                                {isEditing
                                    ? 'ذخیره تغییرات'
                                    : 'افزودن جنسیت'}
                            </>
                        )}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={saving}
                        >
                            انصراف
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}