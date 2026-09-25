import { useCallback, useEffect, useState } from 'react';

import GenderForm from './GenderForm.jsx';

import {
    createGender,
    deleteGender,
    getGenders,
    updateGender,
} from '../../../services/genderService.js';

import './Genders.css';

export default function GendersList() {
    const [genders, setGenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    const [editingGender, setEditingGender] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const loadGenders = useCallback(async () => {
        setLoading(true);
        setLoadError('');

        try {
            const data = await getGenders();
            setGenders(data);
        } catch (error) {
            setLoadError(
                error?.response?.data?.message ||
                'دریافت اطلاعات جنسیت‌ها با خطا مواجه شد.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadGenders();
    }, [loadGenders]);

    const handleSaved = (savedGender) => {
        setGenders((current) => {
            const exists = current.some(
                (item) => item.id === savedGender.id,
            );

            if (exists) {
                return current.map((item) =>
                    item.id === savedGender.id
                        ? savedGender
                        : item,
                );
            }

            return [...current, savedGender];
        });

        setEditingGender(null);
    };

    const handleDelete = async (id) => {
        const gender = genders.find(
            (item) => item.id === id,
        );

        const confirmed = window.confirm(
            `آیا از حذف «${gender?.name || 'این جنسیت'}» اطمینان دارید؟`,
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);

        try {
            await deleteGender(id);

            setGenders((current) =>
                current.filter((item) => item.id !== id),
            );

            if (editingGender?.id === id) {
                setEditingGender(null);
            }
        } catch (error) {
            window.alert(
                error?.response?.data?.message ||
                'حذف جنسیت با خطا مواجه شد.',
            );
        } finally {
            setDeletingId(null);
        }
    };

    const saveGender = async (payload) => {
        if (editingGender?.id) {
            return updateGender(
                editingGender.id,
                payload,
            );
        }

        return createGender(payload);
    };

    const startCreate = () => {
        setEditingGender({
            id: null,
            name: '',
            name_eng: '',
        });
    };

    return (
        <div className="genders-page">

            {/* Page Header */}
            <div className="genders-page-header">
                <div className="genders-page-title">
                    <h1>جنسیت‌ها</h1>

                    <div className="genders-breadcrumb">
                        <a href="/admin">
                            داشبورد
                        </a>

                        <span>/</span>

                        <a href="/admin/astrology">
                            استرولوژی
                        </a>

                        <span>/</span>

                        <span>جنسیت‌ها</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            {editingGender && (
                <div className="genders-form-wrapper">
                    <GenderForm
                        gender={
                            editingGender.id
                                ? editingGender
                                : null
                        }
                        saveGender={saveGender}
                        onSaved={handleSaved}
                        onCancel={() =>
                            setEditingGender(null)
                        }
                    />
                </div>
            )}

            {/* Main Card */}
            <div className="genders-card">

                <div className="genders-card-header">

                    <div className="genders-card-title">
                        نمایش جنسیت‌ها
                    </div>

                    <button
                        type="button"
                        className="genders-add-button"
                        onClick={startCreate}
                        disabled={Boolean(editingGender)}
                    >
                        <i className="bi bi-plus-lg" />
                        <span>افزودن جنسیت</span>
                    </button>

                </div>

                <div className="genders-card-body">

                    {loading ? (
                        <div className="genders-state">
                            <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                            />

                            <span>
                                در حال دریافت اطلاعات...
                            </span>
                        </div>
                    ) : loadError ? (
                        <div className="genders-error">
                            <span>{loadError}</span>

                            <button
                                type="button"
                                onClick={loadGenders}
                            >
                                تلاش مجدد
                            </button>
                        </div>
                    ) : genders.length === 0 ? (
                        <div className="genders-state">
                            <i className="bi bi-inbox" />

                            <span>
                                هنوز جنسیتی ثبت نشده است.
                            </span>
                        </div>
                    ) : (
                        <div className="genders-table-wrapper">
                            <table className="genders-table">

                                <thead>
                                    <tr>
                                        <th className="col-number">
                                            ردیف
                                        </th>

                                        <th>
                                            نام جنسیت
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
                                    {genders.map(
                                        (gender, index) => (
                                            <tr key={gender.id}>

                                                <td className="text-center">
                                                    {index + 1}
                                                </td>

                                                <td className="gender-name">
                                                    {gender.name}
                                                </td>

                                                <td
                                                    className="gender-name-eng"
                                                    dir="ltr"
                                                >
                                                    {gender.name_eng}
                                                </td>

                                                <td>
                                                    <div className="gender-actions">

                                                        <button
                                                            type="button"
                                                            className="gender-edit-button"
                                                            onClick={() =>
                                                                setEditingGender(
                                                                    gender,
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
                                                            className="gender-delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    gender.id,
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                gender.id
                                                            }
                                                        >
                                                            {deletingId ===
                                                            gender.id ? (
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