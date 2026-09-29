import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  name: "",
  name_eng: "",
  image: null,

  gender_id: "",
  birth_date: "",
  birth_time: "",

  country_id: "",
  city_id: "",

  time_zone: "",

  zodiac_sign_id: "",
  birth_accuracy_id: "",

  biography: "",
  wikipedia_url: "",

  status: true,
};

const formatBirthDateForDisplay = (value) => {
  if (!value) {
    return "";
  }

  const digits = String(value).replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 4) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 4)} / ${digits.slice(4)}`;
  }

  return `${digits.slice(0, 4)} / ${digits.slice(4, 6)} / ${digits.slice(6, 8)}`;
};

const normalizeBirthDateForApi = (value) => {
  const digits = String(value).replace(/\D/g, "").slice(0, 8);

  if (digits.length !== 8) {
    return value || null;
  }

  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
};

export default function PersonForm({
  person,
  genders,
  countries,
  cities,
  zodiacSigns,
  birthAccuracies,
  onSaved,
  onCancel,
  savePerson,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const isEditing = Boolean(person);

  const filteredCities = useMemo(() => {
    if (!form.country_id) {
      return [];
    }

    return cities.filter(
      (city) => Number(city.country_id) === Number(form.country_id),
    );
  }, [cities, form.country_id]);

  useEffect(() => {
    if (person) {
      setForm({
        name: person.name || "",
        name_eng: person.name_eng || "",
        image: null,

        gender_id: person.gender_id ? String(person.gender_id) : "",

        birth_date: formatBirthDateForDisplay(
          person.birth_date
            ? String(person.birth_date).substring(0, 10)
            : "",
        ),

        birth_time: person.birth_time
          ? String(person.birth_time)
          : "",

        country_id: person.country_id
          ? String(person.country_id)
          : "",

        city_id: person.city_id
          ? String(person.city_id)
          : "",

        time_zone: person.time_zone || "",

        zodiac_sign_id: person.zodiac_sign_id
          ? String(person.zodiac_sign_id)
          : "",

        birth_accuracy_id: person.birth_accuracy_id
          ? String(person.birth_accuracy_id)
          : "",

        biography: person.biography || "",
        wikipedia_url: person.wikipedia_url || "",

        status:
          person.status === undefined
            ? true
            : Boolean(person.status),
      });

      setImagePreview(person.image_url || "");
    } else {
      setForm(emptyForm);
      setImagePreview("");
    }

    setErrors({});
  }, [person]);

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    const nextValue =
      type === "checkbox"
        ? checked
        : value;

    setForm((current) => ({
      ...current,
      [name]: nextValue,

      ...(name === "country_id"
        ? { city_id: "" }
        : {}),
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,

      ...(name === "country_id"
        ? { city_id: undefined }
        : {}),
    }));
  };

  const renderError = (field) => {
    if (!errors[field]) {
      return null;
    }

    const fieldErrors = Array.isArray(errors[field])
      ? errors[field]
      : [errors[field]];

    return fieldErrors.map((error, index) => (
      <div
        className="invalid-feedback"
        key={index}
      >
        {error}
      </div>
    ));
  };

  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0] || null;

    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setForm((current) => ({
      ...current,
      image: file,
    }));

    setErrors((current) => ({
      ...current,
      image: undefined,
    }));

    if (file) {
      setImagePreview(
        URL.createObjectURL(file),
      );
    } else {
      setImagePreview(
        person?.image_url || "",
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setErrors({});

    const formData = new FormData();

    formData.append(
      "name",
      form.name,
    );

    formData.append(
      "name_eng",
      form.name_eng,
    );

    if (form.image) {
      formData.append(
        "image",
        form.image,
      );
    }

    if (form.gender_id) {
      formData.append(
        "gender_id",
        form.gender_id,
      );
    }

    const birthDate =
      normalizeBirthDateForApi(
        form.birth_date,
      );

    if (birthDate) {
      formData.append(
        "birth_date",
        birthDate,
      );
    }

    if (form.birth_time) {
      formData.append(
        "birth_time",
        form.birth_time,
      );
    }

    if (form.country_id) {
      formData.append(
        "country_id",
        form.country_id,
      );
    }

    if (form.city_id) {
      formData.append(
        "city_id",
        form.city_id,
      );
    }

    if (form.time_zone) {
      formData.append(
        "time_zone",
        form.time_zone,
      );
    }

    if (form.zodiac_sign_id) {
      formData.append(
        "zodiac_sign_id",
        form.zodiac_sign_id,
      );
    }

    if (form.birth_accuracy_id) {
      formData.append(
        "birth_accuracy_id",
        form.birth_accuracy_id,
      );
    }

    if (form.biography) {
      formData.append(
        "biography",
        form.biography,
      );
    }

    if (form.wikipedia_url) {
      formData.append(
        "wikipedia_url",
        form.wikipedia_url,
      );
    }

    formData.append(
      "status",
      form.status ? "1" : "0",
    );

    // Laravel method spoofing for PUT + FormData
    if (isEditing && person?.id) {
      formData.append(
        "_method",
        "PUT",
      );
    }

    try {
      const savedPerson =
        await savePerson(formData);

      onSaved(savedPerson);

      if (!isEditing) {
        setForm(emptyForm);
        setImagePreview("");
      }
    } catch (error) {
      const validationErrors =
        error?.response?.data?.errors;

      if (validationErrors) {
        setErrors(validationErrors);
      } else {
        setErrors({
          general:
            error?.response?.data?.message ||
            "خطایی هنگام ذخیره اطلاعات رخ داد.",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-sm person-form-card">
      <div className="card-header">
        <h3 className="card-title mb-0">
          {isEditing
            ? "ویرایش فرد"
            : "افزودن فرد جدید"}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          {errors.general && (
            <div className="alert alert-danger">
              {errors.general}
            </div>
          )}

          {/* =========================
                اطلاعات اصلی
          ========================== */}

          <div className="person-form-section">
            <div className="person-form-section-title">
              <i className="bi bi-person" />
              <span>اطلاعات اصلی</span>
            </div>

            <div className="row g-3">

              {/* Name */}
              <div className="col-12 col-md-6">
                <label
                  htmlFor="person-name"
                  className="form-label"
                >
                  نام
                </label>

                <input
                  id="person-name"
                  type="text"
                  name="name"
                  className={`form-control ${
                    errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.name}
                  onChange={handleChange}
                  maxLength={150}
                  disabled={saving}
                />

                {renderError("name")}
              </div>

              {/* English Name */}
              <div className="col-12 col-md-6">
                <label
                  htmlFor="person-name-eng"
                  className="form-label"
                >
                  نام انگلیسی
                </label>

                <input
                  id="person-name-eng"
                  type="text"
                  name="name_eng"
                  className={`form-control ${
                    errors.name_eng
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.name_eng}
                  onChange={handleChange}
                  maxLength={150}
                  disabled={saving}
                />

                {renderError("name_eng")}
              </div>

              {/* Image */}
              <div className="col-12">
                <label
                  htmlFor="person-image"
                  className="form-label"
                >
                  تصویر فرد
                </label>

                <input
                  id="person-image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  className={`form-control ${
                    errors.image
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleImageChange}
                  disabled={saving}
                />

                <div className="form-text">
                  فرمت‌های مجاز: JPG، PNG، WEBP — حداکثر ۵ مگابایت
                </div>

                {renderError("image")}

                {imagePreview && (
                  <div className="person-image-preview">
                    <img
                      src={imagePreview}
                      alt="پیش‌نمایش تصویر فرد"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =========================
                اطلاعات تولد
          ========================== */}

          <div className="person-form-section">
            <div className="person-form-section-title">
              <i className="bi bi-calendar3" />
              <span>اطلاعات تولد</span>
            </div>

            <div className="row g-3">

              {/* Gender */}
              <div className="col-12 col-md-4">
                <label
                  htmlFor="person-gender"
                  className="form-label"
                >
                  جنسیت
                </label>

                <select
                  id="person-gender"
                  name="gender_id"
                  className={`form-select ${
                    errors.gender_id
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.gender_id}
                  onChange={handleChange}
                  disabled={saving}
                >
                  <option value="">
                    انتخاب جنسیت
                  </option>

                  {genders.map((gender) => (
                    <option
                      key={gender.id}
                      value={gender.id}
                    >
                      {gender.name}
                    </option>
                  ))}
                </select>

                {renderError("gender_id")}
              </div>

              {/* Birth Date */}
              <div className="col-12 col-md-4">
                <label
                  htmlFor="person-birth-date"
                  className="form-label"
                >
                  تاریخ تولد
                </label>

                <input
                  id="person-birth-date"
                  type="text"
                  name="birth_date"
                  className={`form-control ${
                    errors.birth_date
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.birth_date}
                  onChange={(event) => {
                    const value =
                      formatBirthDateForDisplay(
                        event.target.value,
                      );

                    setForm((current) => ({
                      ...current,
                      birth_date: value,
                    }));

                    setErrors((current) => ({
                      ...current,
                      birth_date: undefined,
                    }));
                  }}
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="YYYY / MM / DD"
                  disabled={saving}
                />

                {renderError("birth_date")}
              </div>

              {/* Birth Time */}
              <div className="col-12 col-md-4">
                <label
                  htmlFor="person-birth-time"
                  className="form-label"
                >
                  ساعت تولد
                </label>

                <input
                  id="person-birth-time"
                  type="text"
                  name="birth_time"
                  className={`form-control ${
                    errors.birth_time
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.birth_time}
                  onChange={handleChange}
                  disabled={saving}
                />

                {renderError("birth_time")}
              </div>

              {/* Country */}
              <div className="col-12 col-md-4">
                <label
                  htmlFor="person-country"
                  className="form-label"
                >
                  کشور تولد
                </label>

                <select
                  id="person-country"
                  name="country_id"
                  className={`form-select ${
                    errors.country_id
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.country_id}
                  onChange={handleChange}
                  disabled={saving}
                >
                  <option value="">
                    انتخاب کشور
                  </option>

                  {countries.map((country) => (
                    <option
                      key={country.id}
                      value={country.id}
                    >
                      {country.name_eng}
                    </option>
                  ))}
                </select>

                {renderError("country_id")}
              </div>

              {/* City */}
              <div className="col-12 col-md-4">
                <label
                  htmlFor="person-city"
                  className="form-label"
                >
                  شهر تولد
                </label>

                <select
                  id="person-city"
                  name="city_id"
                  className={`form-select ${
                    errors.city_id
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.city_id}
                  onChange={handleChange}
                  disabled={
                    saving ||
                    !form.country_id
                  }
                >
                  <option value="">
                    {form.country_id
                      ? "انتخاب شهر"
                      : "ابتدا کشور را انتخاب کنید"}
                  </option>

                  {filteredCities.map((city) => (
                    <option
                      key={city.id}
                      value={city.id}
                    >
                      {city.name_eng}
                    </option>
                  ))}
                </select>

                {renderError("city_id")}
              </div>

              {/* Time Zone */}
              <div className="col-12 col-md-4">
                <label
                  htmlFor="person-time-zone"
                  className="form-label"
                >
                  منطقه زمانی
                </label>

                <input
                  id="person-time-zone"
                  type="text"
                  name="time_zone"
                  className={`form-control ${
                    errors.time_zone
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.time_zone}
                  onChange={handleChange}
                  maxLength={255}
                  disabled={saving}
                />

                {renderError("time_zone")}
              </div>

              {/* Zodiac Sign */}
              <div className="col-12 col-md-6">
                <label
                  htmlFor="person-zodiac-sign"
                  className="form-label"
                >
                  طالع فرد
                </label>

                <select
                  id="person-zodiac-sign"
                  name="zodiac_sign_id"
                  className={`form-select ${
                    errors.zodiac_sign_id
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.zodiac_sign_id}
                  onChange={handleChange}
                  disabled={saving}
                >
                  <option value="">
                    انتخاب نشانه زودیاک
                  </option>

                  {zodiacSigns.map(
                    (zodiacSign) => (
                      <option
                        key={zodiacSign.id}
                        value={zodiacSign.id}
                      >
                        {zodiacSign.id} -{" "}
                        {zodiacSign.name_eng}
                      </option>
                    ),
                  )}
                </select>

                {renderError("zodiac_sign_id")}
              </div>

              {/* Birth Accuracy */}
              <div className="col-12 col-md-6">
                <label
                  htmlFor="person-birth-accuracy"
                  className="form-label"
                >
                  دقت اطلاعات تولد
                </label>

                <select
                  id="person-birth-accuracy"
                  name="birth_accuracy_id"
                  className={`form-select ${
                    errors.birth_accuracy_id
                      ? "is-invalid"
                      : ""
                  }`}
                  value={
                    form.birth_accuracy_id
                  }
                  onChange={handleChange}
                  disabled={saving}
                >
                  <option value="">
                    انتخاب دقت تولد
                  </option>

                  {birthAccuracies.map(
                    (accuracy) => (
                      <option
                        key={accuracy.id}
                        value={accuracy.id}
                      >
                        {accuracy.code}
                      </option>
                    ),
                  )}
                </select>

                {renderError(
                  "birth_accuracy_id",
                )}
              </div>
            </div>
          </div>

          {/* =========================
                اطلاعات تکمیلی
          ========================== */}

          <div className="person-form-section">
            <div className="person-form-section-title">
              <i className="bi bi-card-text" />
              <span>اطلاعات تکمیلی</span>
            </div>

            <div className="row g-3">

              {/* Biography */}
              <div className="col-12">
                <label
                  htmlFor="person-biography"
                  className="form-label"
                >
                  زندگی‌نامه / توضیحات
                </label>

                <textarea
                  id="person-biography"
                  name="biography"
                  className={`form-control ${
                    errors.biography
                      ? "is-invalid"
                      : ""
                  }`}
                  rows="6"
                  value={form.biography}
                  onChange={handleChange}
                  disabled={saving}
                />

                {renderError("biography")}
              </div>

              {/* Wikipedia */}
              <div className="col-12">
                <label
                  htmlFor="person-wikipedia"
                  className="form-label"
                >
                  لینک ویکی‌پدیا
                </label>

                <input
                  id="person-wikipedia"
                  type="url"
                  name="wikipedia_url"
                  className={`form-control ${
                    errors.wikipedia_url
                      ? "is-invalid"
                      : ""
                  }`}
                  value={form.wikipedia_url}
                  onChange={handleChange}
                  maxLength={255}
                  disabled={saving}
                  dir="ltr"
                  placeholder="https://..."
                />

                {renderError("wikipedia_url")}
              </div>

              {/* Status */}
              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    id="person-status"
                    type="checkbox"
                    name="status"
                    className="form-check-input"
                    checked={form.status}
                    onChange={handleChange}
                    disabled={saving}
                  />

                  <label
                    htmlFor="person-status"
                    className="form-check-label"
                  >
                    فرد فعال است
                  </label>
                </div>

                {renderError("status")}
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex gap-2">
          <button
            type="submit"
            className={
              isEditing
                ? "btn btn-warning"
                : "btn btn-primary"
            }
            disabled={saving}
          >
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  aria-hidden="true"
                />
                در حال ذخیره...
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-1" />
                {isEditing
                  ? "ذخیره تغییرات"
                  : "افزودن فرد"}
              </>
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={saving}
            >
              انصراف
            </button>
          )}
        </div>
      </form>
    </div>
  );
}