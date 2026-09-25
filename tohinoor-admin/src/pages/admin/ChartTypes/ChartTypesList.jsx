import { useCallback, useEffect, useState } from 'react';

import ChartTypeForm from './ChartTypeForm.jsx';

import {
    createChartType,
    deleteChartType,
    getChartTypes,
    updateChartType,
} from '../../../services/chartTypeService.js';

import './ChartTypes.css';

export default function ChartTypesList() {
    const [chartTypes, setChartTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    const [editingChartType, setEditingChartType] =
        useState(null);

    const [deletingId, setDeletingId] = useState(null);

    const loadChartTypes = useCallback(async () => {
        setLoading(true);
        setLoadError('');

        try {
            const data = await getChartTypes();
            setChartTypes(data);
        } catch (error) {
            setLoadError(
                error?.response?.data?.message ||
                'دریافت اطلاعات انواع چارت با خطا مواجه شد.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadChartTypes();
    }, [loadChartTypes]);

    const handleSaved = (savedChartType) => {
        setChartTypes((current) => {
            const exists = current.some(
                (item) => item.id === savedChartType.id,
            );

            if (exists) {
                return current.map((item) =>
                    item.id === savedChartType.id
                        ? savedChartType
                        : item,
                );
            }

            return [...current, savedChartType];
        });

        setEditingChartType(null);
    };

    const handleDelete = async (id) => {
        const chartType = chartTypes.find(
            (item) => item.id === id,
        );

        const confirmed = window.confirm(
            `آیا از حذف «${chartType?.name || 'این نوع چارت'}» اطمینان دارید؟`,
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);

        try {
            await deleteChartType(id);

            setChartTypes((current) =>
                current.filter((item) => item.id !== id),
            );

            if (editingChartType?.id === id) {
                setEditingChartType(null);
            }
        } catch (error) {
            window.alert(
                error?.response?.data?.message ||
                'حذف نوع چارت با خطا مواجه شد.',
            );
        } finally {
            setDeletingId(null);
        }
    };

    const saveChartType = async (payload) => {
        if (editingChartType?.id) {
            return updateChartType(
                editingChartType.id,
                payload,
            );
        }

        return createChartType(payload);
    };

    const startCreate = () => {
        setEditingChartType({
            id: null,
            name: '',
            name_eng: '',
            description: '',
        });
    };

    return (
        <div className="chart-types-page">

            {/* Page Header */}
            <div className="chart-types-page-header">
                <div className="chart-types-page-title">
                    <h1>انواع چارت</h1>

                    <div className="chart-types-breadcrumb">
                        <a href="/admin">
                            داشبورد
                        </a>

                        <span>/</span>

                        <a href="/admin/astrology">
                            استرولوژی
                        </a>

                        <span>/</span>

                        <span>انواع چارت</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            {editingChartType && (
                <div className="chart-types-form-wrapper">
                    <ChartTypeForm
                        chartType={
                            editingChartType.id
                                ? editingChartType
                                : null
                        }
                        saveChartType={saveChartType}
                        onSaved={handleSaved}
                        onCancel={() =>
                            setEditingChartType(null)
                        }
                    />
                </div>
            )}

            {/* Main Card */}
            <div className="chart-types-card">

                <div className="chart-types-card-header">

                    <div className="chart-types-card-title">
                        نمایش انواع چارت
                    </div>

                    <button
                        type="button"
                        className="chart-types-add-button"
                        onClick={startCreate}
                        disabled={Boolean(
                            editingChartType,
                        )}
                    >
                        <i className="bi bi-plus-lg" />
                        <span>افزودن نوع چارت</span>
                    </button>

                </div>

                <div className="chart-types-card-body">

                    {loading ? (
                        <div className="chart-types-state">
                            <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                            />

                            <span>
                                در حال دریافت اطلاعات...
                            </span>
                        </div>
                    ) : loadError ? (
                        <div className="chart-types-error">
                            <span>{loadError}</span>

                            <button
                                type="button"
                                onClick={loadChartTypes}
                            >
                                تلاش مجدد
                            </button>
                        </div>
                    ) : chartTypes.length === 0 ? (
                        <div className="chart-types-state">
                            <i className="bi bi-inbox" />

                            <span>
                                هنوز نوع چارتی ثبت نشده است.
                            </span>
                        </div>
                    ) : (
                        <div className="chart-types-table-wrapper">
                            <table className="chart-types-table">

                                <thead>
                                    <tr>
                                        <th className="col-number">
                                            ردیف
                                        </th>

                                        <th>
                                            نام نوع چارت
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
                                    {chartTypes.map(
                                        (
                                            chartType,
                                            index,
                                        ) => (
                                            <tr
                                                key={
                                                    chartType.id
                                                }
                                            >
                                                <td className="text-center">
                                                    {index + 1}
                                                </td>

                                                <td className="chart-type-name">
                                                    {
                                                        chartType.name
                                                    }
                                                </td>

                                                <td
                                                    className="chart-type-name-eng"
                                                    dir="ltr"
                                                >
                                                    {
                                                        chartType.name_eng
                                                    }
                                                </td>

                                                <td className="chart-type-description">
                                                    {
                                                        chartType.description ||
                                                        '—'
                                                    }
                                                </td>

                                                <td>
                                                    <div className="chart-type-actions">

                                                        <button
                                                            type="button"
                                                            className="chart-type-edit-button"
                                                            onClick={() =>
                                                                setEditingChartType(
                                                                    chartType,
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
                                                            className="chart-type-delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    chartType.id,
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                chartType.id
                                                            }
                                                        >
                                                            {deletingId ===
                                                            chartType.id ? (
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