import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import CityForm from "./CityForm.jsx";

import {
  createCity,
  deleteCity,
  getCities,
  updateCity,
} from "../../../services/cityService.js";

import { getCountries } from "../../../services/countryService.js";

import "./Cities.css";

export default function CitiesList() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingCity, setEditingCity] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const [citiesData, countriesData] = await Promise.all([
        getCities(),
        getCountries(),
      ]);

      setCities(citiesData);
      setCountries(countriesData);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات شهرها با خطا مواجه شد.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const findCountryName = (countryId) => {
    if (!countryId) {
      return "—";
    }

    return (
      countries.find((country) => Number(country.id) === Number(countryId))
        ?.name || "—"
    );
  };

  const handleSaved = (savedCity) => {
    setCities((current) => {
      const exists = current.some((item) => item.id === savedCity.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedCity.id ? savedCity : item,
        );
      }

      return [...current, savedCity];
    });

    setEditingCity(null);
  };

  const handleDelete = async (id) => {
    const city = cities.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${city?.name || "این شهر"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteCity(id);

      setCities((current) => current.filter((item) => item.id !== id));

      if (editingCity?.id === id) {
        setEditingCity(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف شهر با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const saveCity = async (payload) => {
    if (editingCity?.id) {
      return updateCity(editingCity.id, payload);
    }

    return createCity(payload);
  };

  const startCreate = () => {
    setEditingCity({
      id: null,
      country_id: "",
      name: "",
      name_eng: "",
      latitude: "",
      longitude: "",
    });
  };

  return (
    <div className="cities-page">
      {/* Page Header */}
      <div className="cities-page-header">
        <div className="cities-page-title">
          <h1>شهرها</h1>

          <div className="cities-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            {/* <a href="/admin">داشبورد</a> */}

            <span>/</span>

            <Link to="/admin/astrology">استرولوژی</Link>
            {/* <a href="/admin/astrology">استرولوژی</a> */}

            <span>/</span>

            <span>شهرها</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingCity && (
        <div className="cities-form-wrapper">
          <CityForm
            city={editingCity.id ? editingCity : null}
            countries={countries}
            saveCity={saveCity}
            onSaved={handleSaved}
            onCancel={() => setEditingCity(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="cities-card">
        <div className="cities-card-header">
          <div className="cities-card-title">نمایش شهرها</div>

          <button
            type="button"
            className="cities-add-button"
            onClick={startCreate}
            disabled={Boolean(editingCity)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن شهر</span>
          </button>
        </div>

        <div className="cities-card-body">
          {loading ? (
            <div className="cities-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />

              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="cities-error">
              <span>{loadError}</span>

              <button type="button" onClick={loadData}>
                تلاش مجدد
              </button>
            </div>
          ) : cities.length === 0 ? (
            <div className="cities-state">
              <i className="bi bi-inbox" />

              <span>هنوز شهری ثبت نشده است.</span>
            </div>
          ) : (
            <div className="cities-table-wrapper">
              <table className="cities-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>

                    <th>نام شهر</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th>کشور</th>

                    <th className="col-coordinate">عرض</th>

                    <th className="col-coordinate">طول</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {cities.map((city, index) => (
                    <tr key={city.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="city-name">{city.name}</td>

                      <td className="city-name-eng" dir="ltr">
                        {city.name_eng}
                      </td>

                      <td>{findCountryName(city.country_id)}</td>

                      <td className="city-coordinate" dir="ltr">
                        {city.latitude}
                      </td>

                      <td className="city-coordinate" dir="ltr">
                        {city.longitude}
                      </td>

                      <td>
                        <div className="city-actions">
                          <button
                            type="button"
                            className="city-edit-button"
                            onClick={() => setEditingCity(city)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="city-delete-button"
                            onClick={() => handleDelete(city.id)}
                            disabled={deletingId === city.id}
                          >
                            {deletingId === city.id ? (
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
