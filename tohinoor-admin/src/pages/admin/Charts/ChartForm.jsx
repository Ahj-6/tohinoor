import { useEffect, useState } from 'react';

import {
    createChart,
    updateChart,
} from '../../../services/chartService.js';

const emptyForm = {
    chart_type_id: '',
    image: null,
};

export default function ChartForm({
    personId,
    chart,
    chartTypes,
    saving,
    setSaving,
    onSaved,
    onCancel,
}) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (chart) {
            setForm({
                chart_type_id: String(chart.chart_type_id),
                image: null,
            });

            setPreviewUrl(chart.image_url || '');
        } else {
            setForm(emptyForm);
            setPreviewUrl('');
        }

        setErrors({});
    }, [chart]);

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

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

    const handleImageChange = (event) => {
        const file = event.target.files?.[0] || null;

        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }

        setForm((current) => ({
            ...current,
            image: file,
        }));

        setErrors((current) => ({
            ...current,
            image: undefined,
        }));

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(chart?.image_url || '');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = {};

        if (!form.chart_type_id) {
            nextErrors.chart_type_id = 'انتخاب نوع چارت الزامی است.';
        }

        if (!chart && !form.image) {
            nextErrors.image = 'انتخاب تصویر چارت الزامی است.';
        }

        if (form.image && form.image.size > 5 * 1024 * 1024) {
            nextErrors.image = 'حجم تصویر نباید بیشتر از ۵ مگابایت باشد.';
        }

        if (form.image) {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/webp',
            ];

            if (!allowedTypes.includes(form.image.type)) {
                nextErrors.image =
                    'فرمت تصویر باید JPG، PNG یا WEBP باشد.';
            }
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        try {
            setSaving(true);
            setErrors({});

            if (chart) {
                await updateChart({
                    id: chart.id,
                    personId,
                    chartTypeId: form.chart_type_id,
                    image: form.image,
                });
            } else {
                await createChart({
                    personId,
                    chartTypeId: form.chart_type_id,
                    image: form.image,
                });
            }

            onSaved();
        } catch (requestError) {
            console.error(requestError);

            const responseErrors =
                requestError?.response?.data?.errors || {};

            setErrors({
                ...responseErrors,
                general:
                    requestError?.response?.data?.message ||
                    'ذخیره چارت با خطا مواجه شد.',
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="chart-form-card">
            <div className="chart-form-card__header">
                <div>
                    <h2>
                        {chart ? 'ویرایش چارت' : 'افزودن چارت جدید'}
                    </h2>

                    <p>
                        {chart
                            ? 'اطلاعات چارت را ویرایش کنید.'
                            : 'نوع چارت و تصویر مربوط به آن را ثبت کنید.'}
                    </p>
                </div>

                <button
                    type="button"
                    className="btn-close"
                    onClick={onCancel}
                    disabled={saving}
                    aria-label="بستن"
                />
            </div>

            {errors.general && (
                <div className="alert alert-danger">
                    {Array.isArray(errors.general)
                        ? errors.general.join(' ')
                        : errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-12 col-lg-6">
                        <label
                            htmlFor="chart-type-id"
                            className="form-label"
                        >
                            نوع چارت
                        </label>

                        <select
                            id="chart-type-id"
                            name="chart_type_id"
                            className={`form-select ${
                                errors.chart_type_id ? 'is-invalid' : ''
                            }`}
                            value={form.chart_type_id}
                            onChange={handleChange}
                            disabled={saving}
                        >
                            <option value="">انتخاب کنید</option>

                            {chartTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                    {item.name_eng
                                        ? ` - ${item.name_eng}`
                                        : ''}
                                </option>
                            ))}
                        </select>

                        {errors.chart_type_id && (
                            <div className="invalid-feedback">
                                {Array.isArray(errors.chart_type_id)
                                    ? errors.chart_type_id.join(' ')
                                    : errors.chart_type_id}
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-6">
                        <label
                            htmlFor="chart-image"
                            className="form-label"
                        >
                            تصویر چارت
                        </label>

                        <input
                            id="chart-image"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                            className={`form-control ${
                                errors.image ? 'is-invalid' : ''
                            }`}
                            onChange={handleImageChange}
                            disabled={saving}
                        />

                        <div className="form-text">
                            فرمت‌های مجاز: JPG، PNG، WEBP — حداکثر ۵ مگابایت
                        </div>

                        {errors.image && (
                            <div className="invalid-feedback">
                                {Array.isArray(errors.image)
                                    ? errors.image.join(' ')
                                    : errors.image}
                            </div>
                        )}
                    </div>

                    {previewUrl && (
                        <div className="col-12">
                            <div className="chart-form-preview">
                                <div className="chart-form-preview__title">
                                    پیش‌نمایش تصویر
                                </div>

                                <img
                                    src={previewUrl}
                                    alt="پیش‌نمایش چارت"
                                    className="chart-form-preview__image"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="chart-form-card__footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={saving}
                    >
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
                                {chart ? 'ذخیره تغییرات' : 'ذخیره چارت'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}