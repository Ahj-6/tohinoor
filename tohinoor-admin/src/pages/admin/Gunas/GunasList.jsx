import { useCallback, useEffect, useState } from "react";

import GunaForm from "./GunaForm.jsx";

import {
  createGuna,
  deleteGuna,
  getGunas,
  updateGuna,
} from "../../../services/gunaService.js";

import "./Gunas.css";

export default function GunasList() {
  const [gunas, setGunas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingGuna, setEditingGuna] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadGunas = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await getGunas();
      setGunas(data);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات گوناها با خطا مواجه شد.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGunas();
  }, [loadGunas]);

  const handleSaved = (savedGuna) => {
    setGunas((current) => {
      const exists = current.some((item) => item.id === savedGuna.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedGuna.id ? savedGuna : item,
        );
      }

      return [...current, savedGuna];
    });

    setEditingGuna(null);
  };

  const handleDelete = async (id) => {
    const guna = gunas.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${guna?.name || "این گونا"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteGuna(id);

      setGunas((current) => current.filter((item) => item.id !== id));

      if (editingGuna?.id === id) {
        setEditingGuna(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف گونا با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const saveGuna = async (payload) => {
    if (editingGuna?.id) {
      return updateGuna(editingGuna.id, payload);
    }

    return createGuna(payload);
  };

  const startCreate = () => {
    setEditingGuna({
      id: null,
      name: "",
      name_eng: "",
    });
  };

  return (
    <div className="gunas-page">
      {/* Page Header */}
      <div className="gunas-page-header">
        <div className="gunas-page-title">
          <h1>گوناها</h1>

          <div className="gunas-breadcrumb">
            <a href="/admin">داشبورد</a>

            <span>/</span>

            <a href="/admin/astrology">استرولوژی</a>

            <span>/</span>

            <span>گوناها</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingGuna && (
        <div className="gunas-form-wrapper">
          <GunaForm
            guna={editingGuna.id ? editingGuna : null}
            saveGuna={saveGuna}
            onSaved={handleSaved}
            onCancel={() => setEditingGuna(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="gunas-card">
        <div className="gunas-card-header">
          <div className="gunas-card-title">نمایش گوناها</div>

          <button
            type="button"
            className="gunas-add-button"
            onClick={startCreate}
            disabled={Boolean(editingGuna)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن گونا</span>
          </button>
        </div>

        <div className="gunas-card-body">
          {loading ? (
            <div className="gunas-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />

              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="gunas-error">
              <span>{loadError}</span>

              <button type="button" onClick={loadGunas}>
                تلاش مجدد
              </button>
            </div>
          ) : gunas.length === 0 ? (
            <div className="gunas-state">
              <i className="bi bi-inbox" />

              <span>هنوز گونایی ثبت نشده است.</span>
            </div>
          ) : (
            <div className="gunas-table-wrapper">
              <table className="gunas-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>

                    <th>نام گونا</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {gunas.map((guna, index) => (
                    <tr key={guna.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="guna-name">{guna.name}</td>

                      <td className="guna-name-eng" dir="ltr">
                        {guna.name_eng}
                      </td>

                      <td>
                        <div className="guna-actions">
                          <button
                            type="button"
                            className="guna-edit-button"
                            onClick={() => setEditingGuna(guna)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="guna-delete-button"
                            onClick={() => handleDelete(guna.id)}
                            disabled={deletingId === guna.id}
                          >
                            {deletingId === guna.id ? (
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
