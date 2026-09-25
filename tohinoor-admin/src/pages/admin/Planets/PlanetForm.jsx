import { useEffect, useState } from 'react';

const emptyForm = {
    name: '',
    name_eng: '',
    name_arabic: '',
    name_sanskrit: '',
    image: '',
    icon: '',
    symbol: '',
    nature_id: '',
    guna_1_id: '',
    guna_2_id: '',
    element_1_id: '',
    element_2_id: '',
};

export default function PlanetForm({
    planet,
    natures,
    gunas,
    elements,
    onSaved,
    onCancel,
    savePlanet,
}) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const isEditing = Boolean(planet);

    useEffect(() => {
        if (planet) {
            setForm({
                name: planet.name || '',
                name_eng: planet.name_eng || '',
                name_arabic: planet.name_arabic || '',
                name_sanskrit: planet.name_sanskrit || '',
                image: planet.image || '',
                icon: planet.icon || '',
                symbol: planet.symbol || '',
                nature_id: planet.nature_id
                    ? String(planet.nature_id)
                    : '',
                guna_1_id: planet.guna_1_id
                    ? String(planet.guna_1_id)
                    : '',
                guna_2_id: planet.guna_2_id
                    ? String(planet.guna_2_id)
                    : '',
                element_1_id: planet.element_1_id
                    ? String(planet.element_1_id)
                    : '',
                element_2_id: planet.element_2_id
                    ? String(planet.element_2_id)
                    : '',
            });
        } else {
            setForm(emptyForm);
        }

        setErrors({});
    }, [planet]);

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

        const payload = {
            ...form,
            nature_id: form.nature_id || null,
            guna_1_id: form.guna_1_id || null,
            guna_2_id: form.guna_2_id || null,
            element_1_id: form.element_1_id || null,
            element_2_id: form.element_2_id || null,
        };

        try {
            const savedPlanet = await savePlanet(payload);

            onSaved(savedPlanet);

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

    const renderError = (field) => {
        if (!errors[field]) {
            return null;
        }

        return errors[field].map((error, index) => (
            <div
                className="invalid-feedback"
                key={index}
            >
                {error}
            </div>
        ));
    };

    return (
        <div className="card shadow-sm planet-form-card">
            <div className="card-header">
                <h3 className="card-title mb-0">
                    {isEditing
                        ? 'ویرایش سیاره'
                        : 'افزودن سیاره جدید'}
                </h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="card-body">

                    {errors.general && (
                        <div className="alert alert-danger">
                            {errors.general}
                        </div>
                    )}

                    <div className="row g-3">

                        {/* Name */}
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="planet-name"
                                className="form-label"
                            >
                                نام
                            </label>

                            <input
                                id="planet-name"
                                type="text"
                                name="name"
                                className={`form-control ${
                                    errors.name
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.name}
                                onChange={handleChange}
                                maxLength={20}
                                disabled={saving}
                            />

                            {renderError('name')}
                        </div>

                        {/* English Name */}
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="planet-name-eng"
                                className="form-label"
                            >
                                نام انگلیسی
                            </label>

                            <input
                                id="planet-name-eng"
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

                            {renderError('name_eng')}
                        </div>

                        {/* Arabic */}
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="planet-name-arabic"
                                className="form-label"
                            >
                                نام عربی
                            </label>

                            <input
                                id="planet-name-arabic"
                                type="text"
                                name="name_arabic"
                                className={`form-control ${
                                    errors.name_arabic
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.name_arabic}
                                onChange={handleChange}
                                maxLength={20}
                                disabled={saving}
                            />

                            {renderError('name_arabic')}
                        </div>

                        {/* Sanskrit */}
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="planet-name-sanskrit"
                                className="form-label"
                            >
                                نام سانسکریت
                            </label>

                            <input
                                id="planet-name-sanskrit"
                                type="text"
                                name="name_sanskrit"
                                className={`form-control ${
                                    errors.name_sanskrit
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.name_sanskrit}
                                onChange={handleChange}
                                maxLength={20}
                                disabled={saving}
                            />

                            {renderError('name_sanskrit')}
                        </div>

                        {/* Image */}
                        <div className="col-12 col-md-4">
                            <label
                                htmlFor="planet-image"
                                className="form-label"
                            >
                                مسیر تصویر
                            </label>

                            <input
                                id="planet-image"
                                type="text"
                                name="image"
                                className={`form-control ${
                                    errors.image
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.image}
                                onChange={handleChange}
                                maxLength={255}
                                disabled={saving}
                                dir="ltr"
                            />

                            {renderError('image')}
                        </div>

                        {/* Icon */}
                        <div className="col-12 col-md-4">
                            <label
                                htmlFor="planet-icon"
                                className="form-label"
                            >
                                مسیر آیکن
                            </label>

                            <input
                                id="planet-icon"
                                type="text"
                                name="icon"
                                className={`form-control ${
                                    errors.icon
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.icon}
                                onChange={handleChange}
                                maxLength={255}
                                disabled={saving}
                                dir="ltr"
                            />

                            {renderError('icon')}
                        </div>

                        {/* Symbol */}
                        <div className="col-12 col-md-4">
                            <label
                                htmlFor="planet-symbol"
                                className="form-label"
                            >
                                نماد
                            </label>

                            <input
                                id="planet-symbol"
                                type="text"
                                name="symbol"
                                className={`form-control ${
                                    errors.symbol
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.symbol}
                                onChange={handleChange}
                                maxLength={255}
                                disabled={saving}
                            />

                            {renderError('symbol')}
                        </div>

                        {/* Nature */}
                        <div className="col-12 col-md-4">
                            <label
                                htmlFor="planet-nature"
                                className="form-label"
                            >
                                طبیعت
                            </label>

                            <select
                                id="planet-nature"
                                name="nature_id"
                                className={`form-select ${
                                    errors.nature_id
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.nature_id}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="">
                                    انتخاب طبیعت
                                </option>

                                {natures.map((nature) => (
                                    <option
                                        key={nature.id}
                                        value={nature.id}
                                    >
                                        {nature.name}
                                    </option>
                                ))}
                            </select>

                            {renderError('nature_id')}
                        </div>

                        {/* Guna 1 */}
                        <div className="col-12 col-md-4">
                            <label
                                htmlFor="planet-guna-1"
                                className="form-label"
                            >
                                گونای اول
                            </label>

                            <select
                                id="planet-guna-1"
                                name="guna_1_id"
                                className={`form-select ${
                                    errors.guna_1_id
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.guna_1_id}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="">
                                    انتخاب گونای اول
                                </option>

                                {gunas.map((guna) => (
                                    <option
                                        key={guna.id}
                                        value={guna.id}
                                    >
                                        {guna.name}
                                    </option>
                                ))}
                            </select>

                            {renderError('guna_1_id')}
                        </div>

                        {/* Guna 2 */}
                        <div className="col-12 col-md-4">
                            <label
                                htmlFor="planet-guna-2"
                                className="form-label"
                            >
                                گونای دوم
                            </label>

                            <select
                                id="planet-guna-2"
                                name="guna_2_id"
                                className={`form-select ${
                                    errors.guna_2_id
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.guna_2_id}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="">
                                    انتخاب گونای دوم
                                </option>

                                {gunas.map((guna) => (
                                    <option
                                        key={guna.id}
                                        value={guna.id}
                                    >
                                        {guna.name}
                                    </option>
                                ))}
                            </select>

                            {renderError('guna_2_id')}
                        </div>

                        {/* Element 1 */}
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="planet-element-1"
                                className="form-label"
                            >
                                عنصر اول
                            </label>

                            <select
                                id="planet-element-1"
                                name="element_1_id"
                                className={`form-select ${
                                    errors.element_1_id
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.element_1_id}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="">
                                    انتخاب عنصر اول
                                </option>

                                {elements.map((element) => (
                                    <option
                                        key={element.id}
                                        value={element.id}
                                    >
                                        {element.name}
                                    </option>
                                ))}
                            </select>

                            {renderError('element_1_id')}
                        </div>

                        {/* Element 2 */}
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="planet-element-2"
                                className="form-label"
                            >
                                عنصر دوم
                            </label>

                            <select
                                id="planet-element-2"
                                name="element_2_id"
                                className={`form-select ${
                                    errors.element_2_id
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.element_2_id}
                                onChange={handleChange}
                                disabled={saving}
                            >
                                <option value="">
                                    انتخاب عنصر دوم
                                </option>

                                {elements.map((element) => (
                                    <option
                                        key={element.id}
                                        value={element.id}
                                    >
                                        {element.name}
                                    </option>
                                ))}
                            </select>

                            {renderError('element_2_id')}
                        </div>

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
                                    : 'افزودن سیاره'}
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