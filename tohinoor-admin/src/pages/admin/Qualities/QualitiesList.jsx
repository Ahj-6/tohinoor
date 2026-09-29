import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import QualityForm from "./QualityForm.jsx";

import {
  createQuality,
  deleteQuality,
  getQualities,
  updateQuality,
} from "../../../services/qualityService.js";

import "./Qualities.css";

export default function QualitiesList() {
  const [qualities, setQualities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingQuality, setEditingQuality] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadQualities = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await getQualities();
      setQualities(data);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات کیفیت‌ها با خطا مواجه شد.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQualities();
  }, [loadQualities]);

  const handleSaved = (savedQuality) => {
    setQualities((current) => {
      const exists = current.some((item) => item.id === savedQuality.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedQuality.id ? savedQuality : item,
        );
      }

      return [...current, savedQuality];
    });

    setEditingQuality(null);
  };

  const handleDelete = async (id) => {
    const quality = qualities.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${quality?.name || "این کیفیت"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteQuality(id);

      setQualities((current) => current.filter((item) => item.id !== id));

      if (editingQuality?.id === id) {
        setEditingQuality(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف کیفیت با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const saveQuality = async (payload) => {
    if (editingQuality?.id) {
      return updateQuality(editingQuality.id, payload);
    }

    return createQuality(payload);
  };

  const startCreate = () => {
    setEditingQuality({
      id: null,
      name: "",
      name_eng: "",
    });
  };

  return (
    <div className="qualities-page">
      {/* Page Header */}
      <div className="qualities-page-header">
        <div className="qualities-page-title">
          <h1>کیفیت‌ها</h1>

          <div className="qualities-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            {/* <a href="/admin">داشبورد</a> */}

            <span>/</span>

            <Link to="/admin/astrology">استرولوژی</Link>
            {/* <a href="/admin/astrology">استرولوژی</a> */}

            <span>/</span>

            <span>کیفیت‌ها</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingQuality && (
        <div className="qualities-form-wrapper">
          <QualityForm
            quality={editingQuality.id ? editingQuality : null}
            saveQuality={saveQuality}
            onSaved={handleSaved}
            onCancel={() => setEditingQuality(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="qualities-card">
        <div className="qualities-card-header">
          <div className="qualities-card-title">نمایش کیفیت‌ها</div>

          <button
            type="button"
            className="qualities-add-button"
            onClick={startCreate}
            disabled={Boolean(editingQuality)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن کیفیت</span>
          </button>
        </div>

        <div className="qualities-card-body">
          {loading ? (
            <div className="qualities-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />

              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="qualities-error">
              <span>{loadError}</span>

              <button type="button" onClick={loadQualities}>
                تلاش مجدد
              </button>
            </div>
          ) : qualities.length === 0 ? (
            <div className="qualities-state">
              <i className="bi bi-inbox" />

              <span>هنوز کیفیتی ثبت نشده است.</span>
            </div>
          ) : (
            <div className="qualities-table-wrapper">
              <table className="qualities-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>

                    <th>نام کیفیت</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {qualities.map((quality, index) => (
                    <tr key={quality.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="quality-name">{quality.name}</td>

                      <td className="quality-name-eng" dir="ltr">
                        {quality.name_eng}
                      </td>

                      <td>
                        <div className="quality-actions">
                          <button
                            type="button"
                            className="quality-edit-button"
                            onClick={() => setEditingQuality(quality)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="quality-delete-button"
                            onClick={() => handleDelete(quality.id)}
                            disabled={deletingId === quality.id}
                          >
                            {deletingId === quality.id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              />
                            ) : (
                              <>
                                <i className="bi bi-trash" />
                                <span>حذف</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
