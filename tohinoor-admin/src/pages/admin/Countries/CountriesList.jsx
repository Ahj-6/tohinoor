import { useCallback, useEffect, useState } from 'react';

import CountryForm from './CountryForm.jsx';

import {
    createCountry,
    deleteCountry,
    getCountries,
    updateCountry,
} from '../../../services/countryService.js';

import './Countries.css';

export default function CountriesList() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    const [editingCountry, setEditingCountry] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const loadCountries = useCallback(async () => {
        setLoading(true);
        setLoadError('');

        try {
            const data = await getCountries();
            setCountries(data);
        } catch (error) {
            setLoadError(
                error?.response?.data?.message ||
                'دریافت اطلاعات کشورها با خطا مواجه شد.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCountries();
    }, [loadCountries]);

    const handleSaved = (savedCountry) => {
        setCountries((current) => {
            const exists = current.some(
                (item) => item.id === savedCountry.id,
            );

            if (exists) {
                return current.map((item) =>
                    item.id === savedCountry.id
                        ? savedCountry
                        : item,
                );
            }

            return [...current, savedCountry];
        });

        setEditingCountry(null);
    };

    const handleDelete = async (id) => {
        const country = countries.find(
            (item) => item.id === id,
        );

        const confirmed = window.confirm(
            `آیا از حذف «${country?.name || 'این کشور'}» اطمینان دارید؟`,
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);

        try {
            await deleteCountry(id);

            setCountries((current) =>
                current.filter((item) => item.id !== id),
            );

            if (editingCountry?.id === id) {
                setEditingCountry(null);
            }
        } catch (error) {
            window.alert(
                error?.response?.data?.message ||
                'حذف کشور با خطا مواجه شد.',
            );
        } finally {
            setDeletingId(null);
        }
    };

    const saveCountry = async (payload) => {
        if (editingCountry?.id) {
            return updateCountry(
                editingCountry.id,
                payload,
            );
        }

        return createCountry(payload);
    };

    const startCreate = () => {
        setEditingCountry({
            id: null,
            name: '',
            name_eng: '',
        });
    };

    return (
        <div className="countries-page">

            {/* Page Header */}
            <div className="countries-page-header">
                <div className="countries-page-title">
                    <h1>کشورها</h1>

                    <div className="countries-breadcrumb">
                        <a href="/admin">
                            داشبورد
                        </a>

                        <span>/</span>

                        <a href="/admin/astrology">
                            استرولوژی
                        </a>

                        <span>/</span>

                        <span>کشورها</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            {editingCountry && (
                <div className="countries-form-wrapper">
                    <CountryForm
                        country={
                            editingCountry.id
                                ? editingCountry
                                : null
                        }
                        saveCountry={saveCountry}
                        onSaved={handleSaved}
                        onCancel={() =>
                            setEditingCountry(null)
                        }
                    />
                </div>
            )}

            {/* Main Card */}
            <div className="countries-card">

                <div className="countries-card-header">

                    <div className="countries-card-title">
                        نمایش کشورها
                    </div>

                    <button
                        type="button"
                        className="countries-add-button"
                        onClick={startCreate}
                        disabled={Boolean(editingCountry)}
                    >
                        <i className="bi bi-plus-lg" />
                        <span>افزودن کشور</span>
                    </button>

                </div>

                <div className="countries-card-body">

                    {loading ? (
                        <div className="countries-state">
                            <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                            />

                            <span>
                                در حال دریافت اطلاعات...
                            </span>
                        </div>
                    ) : loadError ? (
                        <div className="countries-error">
                            <span>{loadError}</span>

                            <button
                                type="button"
                                onClick={loadCountries}
                            >
                                تلاش مجدد
                            </button>
                        </div>
                    ) : countries.length === 0 ? (
                        <div className="countries-state">
                            <i className="bi bi-inbox" />

                            <span>
                                هنوز کشوری ثبت نشده است.
                            </span>
                        </div>
                    ) : (
                        <div className="countries-table-wrapper">
                            <table className="countries-table">

                                <thead>
                                    <tr>
                                        <th className="col-number">
                                            ردیف
                                        </th>

                                        <th>
                                            نام کشور
                                        </th>

                                        <th className="col-english">
                                            نام انگلیسی
                                        </th>

                                        <th className="col-actions">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {countries.map(
                                        (country, index) => (
                                            <tr key={country.id}>

                                                <td className="text-center">
                                                    {index + 1}
                                                </td>

                                                <td className="country-name">
                                                    {country.name}
                                                </td>

                                                <td
                                                    className="country-name-eng"
                                                    // dir="ltr"
                                                >
                                                    {country.name_eng}
                                                </td>

                                                <td>
                                                    <div className="country-actions">

                                                        <button
                                                            type="button"
                                                            className="country-edit-button"
                                                            onClick={() =>
                                                                setEditingCountry(
                                                                    country,
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId !==
                                                                null
                                                            }
                                                        >
                                                            <i className="bi bi-pencil" />
                                                            <span>
                                                                ویرایش
                                                            </span>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="country-delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    country.id,
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                country.id
                                                            }
                                                        >
                                                            {deletingId ===
                                                            country.id ? (
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <>
                                                                    <i className="bi bi-trash" />
                                                                    <span>
                                                                        حذف
                                                                    </span>
                                                                </>
                                                            )}
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ),
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