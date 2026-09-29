import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import ElementForm from "./ElementForm.jsx";

import {
  createElement,
  deleteElement,
  getElements,
  updateElement,
} from "../../../services/elementService.js";

import "./Elements.css";

export default function ElementsList() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [editingElement, setEditingElement] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadElements = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await getElements();
      setElements(data);
    } catch (error) {
      setLoadError(
        error?.response?.data?.message ||
          "دریافت اطلاعات عناصر با خطا مواجه شد.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadElements();
  }, [loadElements]);

  const handleSaved = (savedElement) => {
    setElements((current) => {
      const exists = current.some((item) => item.id === savedElement.id);

      if (exists) {
        return current.map((item) =>
          item.id === savedElement.id ? savedElement : item,
        );
      }

      return [...current, savedElement];
    });

    setEditingElement(null);
  };

  const handleDelete = async (id) => {
    const element = elements.find((item) => item.id === id);

    const confirmed = window.confirm(
      `آیا از حذف «${element?.name || "این عنصر"}» اطمینان دارید؟`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteElement(id);

      setElements((current) => current.filter((item) => item.id !== id));

      if (editingElement?.id === id) {
        setEditingElement(null);
      }
    } catch (error) {
      window.alert(
        error?.response?.data?.message || "حذف عنصر با خطا مواجه شد.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const saveElement = async (payload) => {
    if (editingElement?.id) {
      return updateElement(editingElement.id, payload);
    }

    return createElement(payload);
  };

  const startCreate = () => {
    setEditingElement({
      id: null,
      name: "",
      name_eng: "",
      description: "",
    });
  };

  return (
    <div className="elements-page">
      {/* Page Header */}
      <div className="elements-page-header">
        <div className="elements-page-title">
          <h1>عناصر</h1>

          <div className="elements-breadcrumb">
            <Link to="/admin">داشبورد</Link>
            {/* <a href="/admin">داشبورد</a> */}

            <span>/</span>

            <Link to="/admin/astrology">استرولوژی</Link>
            {/* <a href="/admin/astrology">استرولوژی</a> */}

            <span>/</span>

            <span>عناصر</span>
          </div>
        </div>
      </div>

      {/* Form */}
      {editingElement && (
        <div className="elements-form-wrapper">
          <ElementForm
            element={editingElement.id ? editingElement : null}
            saveElement={saveElement}
            onSaved={handleSaved}
            onCancel={() => setEditingElement(null)}
          />
        </div>
      )}

      {/* Main Card */}
      <div className="elements-card">
        {/* Card Header */}
        <div className="elements-card-header">
          <div className="elements-card-title">نمایش عناصر</div>

          <button
            type="button"
            className="elements-add-button"
            onClick={startCreate}
            disabled={Boolean(editingElement)}
          >
            <i className="bi bi-plus-lg" />
            <span>افزودن عنصر</span>
          </button>
        </div>

        {/* Card Body */}
        <div className="elements-card-body">
          {loading ? (
            <div className="elements-state">
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
              <span>در حال دریافت اطلاعات...</span>
            </div>
          ) : loadError ? (
            <div className="elements-error">
              <span>{loadError}</span>

              <button type="button" onClick={loadElements}>
                تلاش مجدد
              </button>
            </div>
          ) : elements.length === 0 ? (
            <div className="elements-state">
              <i className="bi bi-inbox" />

              <span>هنوز عنصری ثبت نشده است.</span>
            </div>
          ) : (
            <div className="elements-table-wrapper">
              <table className="elements-table">
                <thead>
                  <tr>
                    <th className="col-number">ردیف</th>

                    <th>نام عنصر</th>

                    <th className="col-english">نام انگلیسی</th>

                    <th className="col-description">توضیحات</th>

                    <th className="col-actions">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {elements.map((element, index) => (
                    <tr key={element.id}>
                      <td className="text-center">{index + 1}</td>

                      <td className="element-name">{element.name}</td>

                      <td className="element-name-eng" dir="ltr">
                        {element.name_eng}
                      </td>

                      <td className="element-description">
                        {element.description || "—"}
                      </td>

                      <td>
                        <div className="element-actions">
                          <button
                            type="button"
                            className="element-edit-button"
                            onClick={() => setEditingElement(element)}
                            disabled={deletingId !== null}
                          >
                            <i className="bi bi-pencil" />
                            <span>ویرایش</span>
                          </button>

                          <button
                            type="button"
                            className="element-delete-button"
                            onClick={() => handleDelete(element.id)}
                            disabled={deletingId === element.id}
                          >
                            {deletingId === element.id ? (
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
