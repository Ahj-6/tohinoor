import api from "../api/axios";

/**
 * دریافت لیست تمام نشانه‌های زودیاک همراه با اطلاعات مرتبط (سیاره حکمران، عنصر و ...)
 */
export const getZodiacSigns = async () => {
  const response = await api.get("/zodiac-signs");
  return response.data;
};

/**
 * دریافت اطلاعات یک نشانه‌ی زودیاک مشخص بر اساس نام انگلیسی/شناسه
 * @param {string|number} identifier
 */
export const getZodiacSignById = async (identifier) => {
  const response = await api.get(`/zodiac-signs/${identifier}`);
  return response.data;
};