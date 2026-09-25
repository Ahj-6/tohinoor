import { useCallback, useEffect, useState } from 'react';

import BirthAccuracyForm from './BirthAccuracyForm.jsx';

import {
    createBirthAccuracy,
    deleteBirthAccuracy,
    getBirthAccuracies,
    updateBirthAccuracy,
} from '../../../services/birthAccuracyService.js';

import './BirthAccuracies.css';

export default function BirthAccuraciesList() {
    const [birthAccuracies, setBirthAccuracies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    const [editingBirthAccuracy, setEditingBirthAccuracy] =
        useState(null);

    const [deletingId, setDeletingId] = useState(null);

    const loadBirthAccuracies = useCallback(async () => {
        setLoading(true);
        setLoadError('');

        try {
            const data = await getBirthAccuracies();
            setBirthAccuracies(data);
        } catch (error) {
            setLoadError(
                error?.response?.data?.message ||
                'دریافت اطلاعات دقت‌های تولد با خطا مواجه شد.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBirthAccuracies();
    }, [loadBirthAccuracies]);

    const handleSaved = (savedBirthAccuracy) => {
        setBirthAccuracies((current) => {
            const exists = current.some(
                (item) => item.id === savedBirthAccuracy.id,
            );

            if (exists) {
                return current.map((item) =>
                    item.id === savedBirthAccuracy.id
                        ? savedBirthAccuracy
                        : item,
                );
            }

            return [...current, savedBirthAccuracy];
        });

        setEditingBirthAccuracy(null);
    };

    const handleDelete = async (id) => {
        const birthAccuracy = birthAccuracies.find(
            (item) => item.id === id,
        );

        const confirmed = window.confirm(
            `آیا از حذف «${birthAccuracy?.name || 'این مورد'}» اطمینان دارید؟`,
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);

        try {
            await deleteBirthAccuracy(id);

            setBirthAccuracies((current) =>
                current.filter((item) => item.id !== id),
            );

            if (editingBirthAccuracy?.id === id) {
                setEditingBirthAccuracy(null);
            }
        } catch (error) {
            window.alert(
                error?.response?.data?.message ||
                'حذف دقت تولد با خطا مواجه شد.',
            );
        } finally {
            setDeletingId(null);
        }
    };

    const saveBirthAccuracy = async (payload) => {
        if (editingBirthAccuracy?.id) {
            return updateBirthAccuracy(
                editingBirthAccuracy.id,
                payload,
            );
        }

        return createBirthAccuracy(payload);
    };

    const startCreate = () => {
        setEditingBirthAccuracy({
            id: null,
            code: '',
            name: '',
            name_eng: '',
            description: '',
        });
    };

    return (
        <div className="birth-accuracies-page">

            {/* Page Header */}
            <div className="birth-accuracies-page-header">
                <div className="birth-accuracies-page-title">
                    <h1>دقت‌های تولد</h1>

                    <div className="birth-accuracies-breadcrumb">
                        <a href="/admin">
                            داشبورد
                        </a>

                        <span>/</span>

                        <a href="/admin/astrology">
                            استرولوژی
                        </a>

                        <span>/</span>

                        <span>دقت‌های تولد</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            {editingBirthAccuracy && (
                <div className="birth-accuracies-form-wrapper">
                    <BirthAccuracyForm
                        birthAccuracy={
                            editingBirthAccuracy.id
                                ? editingBirthAccuracy
                                : null
                        }
                        saveBirthAccuracy={
                            saveBirthAccuracy
                        }
                        onSaved={handleSaved}
                        onCancel={() =>
                            setEditingBirthAccuracy(null)
                        }
                    />
                </div>
            )}

            {/* Main Card */}
            <div className="birth-accuracies-card">

                <div className="birth-accuracies-card-header">

                    <div className="birth-accuracies-card-title">
                        نمایش دقت‌های تولد
                    </div>

                    <button
                        type="button"
                        className="birth-accuracies-add-button"
                        onClick={startCreate}
                        disabled={Boolean(
                            editingBirthAccuracy,
                        )}
                    >
                        <i className="bi bi-plus-lg" />
                        <span>افزودن دقت تولد</span>
                    </button>

                </div>

                <div className="birth-accuracies-card-body">

                    {loading ? (
                        <div className="birth-accuracies-state">
                            <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                            />

                            <span>
                                در حال دریافت اطلاعات...
                            </span>
                        </div>
                    ) : loadError ? (
                        <div className="birth-accuracies-error">
                            <span>{loadError}</span>

                            <button
                                type="button"
                                onClick={loadBirthAccuracies}
                            >
                                تلاش مجدد
                            </button>
                        </div>
                    ) : birthAccuracies.length === 0 ? (
                        <div className="birth-accuracies-state">
                            <i className="bi bi-inbox" />

                            <span>
                                هنوز دقت تولدی ثبت نشده است.
                            </span>
                        </div>
                    ) : (
                        <div className="birth-accuracies-table-wrapper">
                            <table className="birth-accuracies-table">

                                <thead>
                                    <tr>
                                        <th className="col-number">
                                            ردیف
                                        </th>

                                        <th className="col-code">
                                            کد
                                        </th>

                                        <th>
                                            نام
                                        </th>

                                        <th className="col-english">
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
                                    {birthAccuracies.map(
                                        (
                                            birthAccuracy,
                                            index,
                                        ) => (
                                            <tr
                                                key={
                                                    birthAccuracy.id
                                                }
                                            >
                                                <td className="text-center">
                                                    {index + 1}
                                                </td>

                                                <td
                                                    className="birth-accuracy-code"
                                                    // dir="ltr"
                                                >
                                                    {
                                                        birthAccuracy.code
                                                    }
                                                </td>

                                                <td className="birth-accuracy-name">
                                                    {
                                                        birthAccuracy.name
                                                    }
                                                </td>

                                                <td
                                                    className="birth-accuracy-name-eng"
                                                    // dir="ltr"
                                                >
                                                    {
                                                        birthAccuracy.name_eng
                                                    }
                                                </td>

                                                <td className="birth-accuracy-description">
                                                    {
                                                        birthAccuracy.description ||
                                                        '—'
                                                    }
                                                </td>

                                                <td>
                                                    <div className="birth-accuracy-actions">

                                                        <button
                                                            type="button"
                                                            className="birth-accuracy-edit-button"
                                                            onClick={() =>
                                                                setEditingBirthAccuracy(
                                                                    birthAccuracy,
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
                                                            className="birth-accuracy-delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    birthAccuracy.id,
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                birthAccuracy.id
                                                            }
                                                        >
                                                            {deletingId ===
                                                            birthAccuracy.id ? (
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