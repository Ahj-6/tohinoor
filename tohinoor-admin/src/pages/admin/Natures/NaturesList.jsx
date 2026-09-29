import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import NatureForm from "./NatureForm.jsx";

import {
  createNature,
  deleteNature,
  getNatures,
  updateNature,
} from "../../../services/natureService.js";

import "./Natures.css";

export default function NaturesList() {
  const [natures, setNatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingNature, setEditingNature] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadNatures = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await getNatures();
      setNatures(data);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات طبیعت‌ها با خطا مواجه شد.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNatures();
  }, [loadNatures]);

  const handleSaved = (savedNature) => {
    setNatures((current) => {
      const exists = current.some((item) => item.id === savedNature.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedNature.id ? savedNature : item,
        );
      }

      return [...current, savedNature];
    });

    setEditingNature(null);
  };

  const handleDelete = async (id) => {
    const nature = natures.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${nature?.name || "این طبیعت"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteNature(id);

      setNatures((current) => current.filter((item) => item.id !== id));

      if (editingNature?.id === id) {
        setEditingNature(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف طبیعت با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const saveNature = async (payload) => {
    if (editingNature?.id) {
      return updateNature(editingNature.id, payload);
    }

    return createNature(payload);
  };

  const startCreate = () => {
    setEditingNature({
      id: null,
      name: "",
      name_eng: "",
    });
  };

  return (
    <div className="natures-page">
      {/* Page Header */}
      <div className="natures-page-header">
        <div className="natures-page-title">
          <h1>طبیعت‌ها</h1>

          <div className="natures-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            {/* <a href="/admin">داشبورد</a> */}

            <span>/</span>

            <Link to="/admin/astrology">استرولوژی</Link>
            {/* <a href="/admin/astrology">استرولوژی</a> */}

            <span>/</span>

            <span>طبیعت‌ها</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingNature && (
        <div className="natures-form-wrapper">
          <NatureForm
            nature={editingNature.id ? editingNature : null}
            saveNature={saveNature}
            onSaved={handleSaved}
            onCancel={() => setEditingNature(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="natures-card">
        <div className="natures-card-header">
          <div className="natures-card-title">نمایش طبیعت‌ها</div>

          <button
            type="button"
            className="natures-add-button"
            onClick={startCreate}
            disabled={Boolean(editingNature)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن طبیعت</span>
          </button>
        </div>

        <div className="natures-card-body">
          {loading ? (
            <div className="natures-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />

              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="natures-error">
              <span>{loadError}</span>

              <button type="button" onClick={loadNatures}>
                تلاش مجدد
              </button>
            </div>
          ) : natures.length === 0 ? (
            <div className="natures-state">
              <i className="bi bi-inbox" />

              <span>هنوز طبیعتی ثبت نشده است.</span>
            </div>
          ) : (
            <div className="natures-table-wrapper">
              <table className="natures-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>

                    <th>نام طبیعت</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {natures.map((nature, index) => (
                    <tr key={nature.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="nature-name">{nature.name}</td>

                      <td className="nature-name-eng" dir="ltr">
                        {nature.name_eng}
                      </td>

                      <td>
                        <div className="nature-actions">
                          <button
                            type="button"
                            className="nature-edit-button"
                            onClick={() => setEditingNature(nature)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="nature-delete-button"
                            onClick={() => handleDelete(nature.id)}
                            disabled={deletingId === nature.id}
                          >
                            {deletingId === nature.id ? (
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
