import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import ZodiacSignForm from "./ZodiacSignForm.jsx";

import {
  createZodiacSign,
  deleteZodiacSign,
  getZodiacSigns,
  updateZodiacSign,
} from "../../../services/zodiacSignService.js";

import { getPlanets } from "../../../services/planetService.js";
import { getElements } from "../../../services/elementService.js";
import { getQualities } from "../../../services/qualityService.js";

import "./ZodiacSigns.css";

export default function ZodiacSignsList() {
  const [zodiacSigns, setZodiacSigns] = useState([]);

  const [planets, setPlanets] = useState([]);
  const [elements, setElements] = useState([]);
  const [qualities, setQualities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingZodiacSign, setEditingZodiacSign] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const [zodiacSignsData, planetsData, elementsData, qualitiesData] =
        await Promise.all([
          getZodiacSigns(),
          getPlanets(),
          getElements(),
          getQualities(),
        ]);

      setZodiacSigns(zodiacSignsData);
      setPlanets(planetsData);
      setElements(elementsData);
      setQualities(qualitiesData);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات نشانه‌های زودیاک با خطا مواجه شد.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const findName = (items, id) => {
    if (!id) {
      return "—";
    }

    return items.find((item) => Number(item.id) === Number(id))?.name || "—";
  };

  const handleSaved = (savedZodiacSign) => {
    setZodiacSigns((current) => {
      const exists = current.some((item) => item.id === savedZodiacSign.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedZodiacSign.id ? savedZodiacSign : item,
        );
      }

      return [...current, savedZodiacSign];
    });

    setEditingZodiacSign(null);
  };

  const handleDelete = async (id) => {
    const zodiacSign = zodiacSigns.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${zodiacSign?.name || "این نشانه"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteZodiacSign(id);

      setZodiacSigns((current) => current.filter((item) => item.id !== id));

      if (editingZodiacSign?.id === id) {
        setEditingZodiacSign(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف نشانه زودیاک با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const saveZodiacSign = async (payload) => {
    if (editingZodiacSign?.id) {
      return updateZodiacSign(editingZodiacSign.id, payload);
    }

    return createZodiacSign(payload);
  };

  const startCreate = () => {
    setEditingZodiacSign({
      id: null,
      name: "",
      name_eng: "",
      name_arabic: "",
      name_sanskrit: "",
      image: "",
      icon: "",
      symbol: "",
      planet_id: "",
      element_id: "",
      quality_id: "",
    });
  };

  return (
    <div className="zodiac-signs-page">
      {/* Page Header */}
      <div className="zodiac-signs-page-header">
        <div className="zodiac-signs-page-title">
          <h1>نشانه‌های زودیاک</h1>

          <div className="zodiac-signs-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            {/* <a href="/admin">داشبورد</a> */}

            <span>/</span>

            <Link to="/admin/astrology">استرولوژی</Link>
            {/* <a href="/admin/astrology">استرولوژی</a> */}

            <span>/</span>

            <span>نشانه‌های زودیاک</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingZodiacSign && (
        <div className="zodiac-signs-form-wrapper">
          <ZodiacSignForm
            zodiacSign={editingZodiacSign.id ? editingZodiacSign : null}
            planets={planets}
            elements={elements}
            qualities={qualities}
            saveZodiacSign={saveZodiacSign}
            onSaved={handleSaved}
            onCancel={() => setEditingZodiacSign(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="zodiac-signs-card">
        <div className="zodiac-signs-card-header">
          <div className="zodiac-signs-card-title">نمایش نشانه‌های زودیاک</div>

          <button
            type="button"
            className="zodiac-signs-add-button"
            onClick={startCreate}
            disabled={Boolean(editingZodiacSign)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن نشانه</span>
          </button>
        </div>

        <div className="zodiac-signs-card-body">
          {loading ? (
            <div className="zodiac-signs-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />

              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="zodiac-signs-error">
              <span>{loadError}</span>

              <button type="button" onClick={loadData}>
                تلاش مجدد
              </button>
            </div>
          ) : zodiacSigns.length === 0 ? (
            <div className="zodiac-signs-state">
              <i className="bi bi-inbox" />

              <span>هنوز نشانه‌ای ثبت نشده است.</span>
            </div>
          ) : (
            <div className="zodiac-signs-table-wrapper">
              <table className="zodiac-signs-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>

                    <th>نام</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th>سیاره حکمران</th>

                    <th>عنصر</th>

                    <th>کیفیت</th>

                    <th className="col-symbol">نماد</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {zodiacSigns.map((zodiacSign, index) => (
                    <tr key={zodiacSign.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="zodiac-sign-name">{zodiacSign.name}</td>

                      <td className="zodiac-sign-name-eng" dir="ltr">
                        {zodiacSign.name_eng}
                      </td>

                      <td>{findName(planets, zodiacSign.planet_id)}</td>

                      <td>{findName(elements, zodiacSign.element_id)}</td>

                      <td>{findName(qualities, zodiacSign.quality_id)}</td>

                      <td className="zodiac-sign-symbol">
                        {zodiacSign.symbol}
                      </td>

                      <td>
                        <div className="zodiac-sign-actions">
                          <button
                            type="button"
                            className="zodiac-sign-edit-button"
                            onClick={() => setEditingZodiacSign(zodiacSign)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />

                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="zodiac-sign-delete-button"
                            onClick={() => handleDelete(zodiacSign.id)}
                            disabled={deletingId === zodiacSign.id}
                          >
                            {deletingId === zodiacSign.id ? (
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
