import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PlanetForm from "./PlanetForm.jsx";

import {
  createPlanet,
  deletePlanet,
  getPlanets,
  updatePlanet,
} from "../../../services/planetService.js";

import { getElements } from "../../../services/elementService.js";
import { getGunas } from "../../../services/gunaService.js";
import { getNatures } from "../../../services/natureService.js";

import "./Planets.css";

export default function PlanetsList() {
  const [planets, setPlanets] = useState([]);

  const [natures, setNatures] = useState([]);
  const [gunas, setGunas] = useState([]);
  const [elements, setElements] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingPlanet, setEditingPlanet] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const [planetsData, naturesData, gunasData, elementsData] =
        await Promise.all([
          getPlanets(),
          getNatures(),
          getGunas(),
          getElements(),
        ]);

      setPlanets(planetsData);
      setNatures(naturesData);
      setGunas(gunasData);
      setElements(elementsData);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات سیارات با خطا مواجه شد.",
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

  const handleSaved = (savedPlanet) => {
    setPlanets((current) => {
      const exists = current.some((item) => item.id === savedPlanet.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedPlanet.id ? savedPlanet : item,
        );
      }

      return [...current, savedPlanet];
    });

    setEditingPlanet(null);
  };

  const handleDelete = async (id) => {
    const planet = planets.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${planet?.name || "این سیاره"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deletePlanet(id);

      setPlanets((current) => current.filter((item) => item.id !== id));

      if (editingPlanet?.id === id) {
        setEditingPlanet(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف سیاره با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const savePlanet = async (payload) => {
    if (editingPlanet?.id) {
      return updatePlanet(editingPlanet.id, payload);
    }

    return createPlanet(payload);
  };

  const startCreate = () => {
    setEditingPlanet({
      id: null,
      ...{
        name: "",
        name_eng: "",
        name_arabic: "",
        name_sanskrit: "",
        image: "",
        icon: "",
        symbol: "",
        nature_id: null,
        guna_1_id: null,
        guna_2_id: null,
        element_1_id: null,
        element_2_id: null,
      },
    });
  };

  return (
    <div className="planets-page">
      {/* Page Header */}
      <div className="planets-page-header">
        <div className="planets-page-title">
          <h1>سیارات</h1>

          <div className="planets-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            {/* <a href="/admin">داشبورد</a> */}

            <span>/</span>

            <Link to="/admin/astrology">استرولوژی</Link>
            {/* <a href="/admin/astrology">استرولوژی</a> */}

            <span>/</span>

            <span>سیارات</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingPlanet && (
        <div className="planets-form-wrapper">
          <PlanetForm
            planet={editingPlanet.id ? editingPlanet : null}
            natures={natures}
            gunas={gunas}
            elements={elements}
            savePlanet={savePlanet}
            onSaved={handleSaved}
            onCancel={() => setEditingPlanet(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="planets-card">
        <div className="planets-card-header">
          <div className="planets-card-title">نمایش سیارات</div>

          <button
            type="button"
            className="planets-add-button"
            onClick={startCreate}
            disabled={Boolean(editingPlanet)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن سیاره</span>
          </button>
        </div>

        <div className="planets-card-body">
          {loading ? (
            <div className="planets-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />

              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="planets-error">
              <span>{loadError}</span>

              <button type="button" onClick={loadData}>
                تلاش مجدد
              </button>
            </div>
          ) : planets.length === 0 ? (
            <div className="planets-state">
              <i className="bi bi-inbox" />

              <span>هنوز سیاره‌ای ثبت نشده است.</span>
            </div>
          ) : (
            <div className="planets-table-wrapper">
              <table className="planets-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>

                    <th>نام سیاره</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th>طبیعت</th>

                    <th>گونا</th>

                    <th>عنصر</th>

                    <th className="col-symbol">نماد</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {planets.map((planet, index) => (
                    <tr key={planet.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="planet-name">{planet.name}</td>

                      <td className="planet-name-eng" dir="ltr">
                        {planet.name_eng}
                      </td>

                      <td>{findName(natures, planet.nature_id)}</td>

                      <td>
                        <div className="planet-relation-stack">
                          <span>{findName(gunas, planet.guna_1_id)}</span>

                          {planet.guna_2_id && (
                            <span>{findName(gunas, planet.guna_2_id)}</span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="planet-relation-stack">
                          <span>{findName(elements, planet.element_1_id)}</span>

                          {planet.element_2_id && (
                            <span>
                              {findName(elements, planet.element_2_id)}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="planet-symbol">{planet.symbol}</td>

                      <td>
                        <div className="planet-actions">
                          <button
                            type="button"
                            className="planet-edit-button"
                            onClick={() => setEditingPlanet(planet)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="planet-delete-button"
                            onClick={() => handleDelete(planet.id)}
                            disabled={deletingId === planet.id}
                          >
                            {deletingId === planet.id ? (
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
