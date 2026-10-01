import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getPersonCharts,
  deleteChart,
} from "../../../services/chartService.js";
import { getPersonBySlug } from "../../../services/peopleService.js";
import { getChartTypes } from "../../../services/chartTypeService.js";

import ChartForm from "./ChartForm.jsx";
import "./Charts.css";

export default function ChartsList() {
  const { personSlug } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [charts, setCharts] = useState([]);
  const [chartTypes, setChartTypes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingChart, setEditingChart] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      // --------------------------------
      // دریافت فرد و انواع چارت
      // --------------------------------

      const [currentPerson, types] = await Promise.all([
        getPersonBySlug(personSlug),
        getChartTypes(),
      ]);

      if (!currentPerson) {
        setError("فرد مورد نظر پیدا نشد.");
        setPerson(null);
        setCharts([]);
        setChartTypes([]);
        return;
      }

      // --------------------------------
      // دریافت چارت‌های همین فرد
      // --------------------------------

      const personCharts = await getPersonCharts(currentPerson.id);

      setPerson(currentPerson);
      setCharts(personCharts || []);
      setChartTypes(types || []);
    } catch (requestError) {
      console.error(requestError);
      setError("دریافت اطلاعات چارت‌ها با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [personSlug]);

  const chartTypeMap = useMemo(() => {
    return new Map(chartTypes.map((item) => [Number(item.id), item]));
  }, [chartTypes]);

  const availableChartTypes = useMemo(() => {
    const usedTypeIds = new Set(
      charts.map((chart) => Number(chart.chart_type_id)),
    );

    if (editingChart) {
      usedTypeIds.delete(Number(editingChart.chart_type_id));
    }

    return chartTypes.filter((item) => !usedTypeIds.has(Number(item.id)));
  }, [chartTypes, charts, editingChart]);

  const handleCreate = () => {
    setEditingChart(null);
    setFormOpen(true);
    setError("");
  };

  const handleEdit = (chart) => {
    setEditingChart(chart);
    setFormOpen(true);
    setError("");
  };

  const handleCancel = () => {
    setEditingChart(null);
    setFormOpen(false);
  };

  const handleSaved = async () => {
    setFormOpen(false);
    setEditingChart(null);
    await loadData();
  };

  const handleDelete = async (chart) => {
    const chartType = chartTypeMap.get(Number(chart.chart_type_id));

    const confirmed = window.confirm(
      `آیا از حذف چارت «${chartType?.name || "بدون عنوان"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await deleteChart(chart.id);
      await loadData();
    } catch (requestError) {
      console.error(requestError);
      setError("حذف چارت با خطا مواجه شد.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="charts-page">
        <div className="alert alert-light border">در حال دریافت اطلاعات...</div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="charts-page">
        <div className="alert alert-danger">
          {error || "فرد مورد نظر پیدا نشد."}
        </div>

        <Link to="/admin/people" className="btn btn-secondary">
          <i className="bi bi-arrow-right me-1" />
          بازگشت به افراد
        </Link>
      </div>
    );
  }

  return (
    <div className="charts-page">
      <div className="charts-page__header">
        <div>
          <div className="charts-page__breadcrumb">
            <Link to="/admin">داشبورد</Link>
            <span>/</span>
            <Link to="/admin/people">افراد</Link>
            <span>/</span>
            <span>چارت‌ها</span>
          </div>

          <h1>چارت‌های {person.name}</h1>

          {person.name_eng && (
            <div className="charts-page__person-name">{person.name_eng}</div>
          )}
        </div>

        <div className="charts-page__actions">
          <Link to="/admin/people" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-right me-1" />
            بازگشت
          </Link>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreate}
            disabled={saving || availableChartTypes.length === 0}
          >
            <i className="bi bi-plus-lg me-1" />
            افزودن چارت
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {formOpen && (
        <ChartForm
          personId={person.id}
          chart={editingChart}
          chartTypes={availableChartTypes}
          saving={saving}
          onSaved={handleSaved}
          onCancel={handleCancel}
          setSaving={setSaving}
        />
      )}

      {!formOpen && charts.length === 0 && (
        <div className="charts-empty">
          <div className="charts-empty__icon">
            <i className="bi bi-bar-chart-line" />
          </div>

          <h3>هنوز چارتی برای این فرد ثبت نشده است.</h3>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreate}
            disabled={availableChartTypes.length === 0}
          >
            <i className="bi bi-plus-lg me-1" />
            افزودن اولین چارت
          </button>
        </div>
      )}

      {!formOpen && charts.length > 0 && (
        <div className="row g-4">
          {charts.map((chart) => {
            const chartType = chartTypeMap.get(Number(chart.chart_type_id));

            return (
              <div key={chart.id} className="col-12 col-md-6 col-xl-4">
                <div className="chart-card">
                  <div className="chart-card__image-wrapper">
                    {chart.image_url ? (
                      <img
                        src={chart.image_url}
                        alt={chartType?.name || "تصویر چارت"}
                        className="chart-card__image"
                      />
                    ) : (
                      <div className="chart-card__no-image">
                        <i className="bi bi-image" />
                        <span>تصویر ندارد</span>
                      </div>
                    )}
                  </div>

                  <div className="chart-card__body">
                    <h2>{chartType?.name || "نوع چارت نامشخص"}</h2>

                    {chartType?.name_eng && (
                      <div className="chart-card__english">
                        {chartType.name_eng}
                      </div>
                    )}

                    <div className="chart-card__actions">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(chart)}
                        disabled={saving}
                      >
                        <i className="bi bi-pencil me-1" />
                        ویرایش
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(chart)}
                        disabled={saving}
                      >
                        <i className="bi bi-trash me-1" />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {charts.length > 0 && availableChartTypes.length === 0 && !formOpen && (
        <div className="alert alert-info mt-4">
          برای همه انواع چارت موجود، قبلاً چارت ثبت شده است.
        </div>
      )}
    </div>
  );
}
