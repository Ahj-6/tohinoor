import api from "../api/axios";

/**
 * تبدیل داده‌های خام API به فرمت استاندارد مورد نیاز کامپوننت‌های فرانت‌ند
 */
const formatPersonData = (person) => {
  if (!person) return null;

  return {
    ...person,
    // هماهنگ‌سازی نام‌ها برای فرانت
    nameFa: person.name, // نام فارسی
    nameEng: person.name_eng,
    photo: person.image_url || person.image || null,

    // هماهنگ‌سازی چارت برای ChartCard
    chart: person.chart_image_url
      ? { image: person.chart_image_url, title: "D1" }
      : person.chart || null,

    // هماهنگ‌سازی بیوگرافی (اگر رشته بود، آن را به آرایه پاراگراف تبدیل می‌کند)
    bio: Array.isArray(person.biography)
      ? person.biography
      : person.biography
      ? person.biography.split("\n\n") // تفکیک پاراگراف‌ها با اینتر
      : [],
  };
};

/**
 * دریافت لیست افراد
 */
export const getPeople = async (params = {}) => {
  const response = await api.get("/people", { params });
  const data = response.data;

  // اگر پاسخ شامل لیست باشد، تک‌تک داده‌ها را مپ می‌کنیم
  if (Array.isArray(data)) {
    return data.map(formatPersonData);
  } else if (data?.data && Array.isArray(data.data)) {
    // پشتیبانی از حالت Paginated لاراول
    return {
      ...data,
      data: data.data.map(formatPersonData),
    };
  }

  return data;
};

/**
 * دریافت جزئیات یک فرد بر اساس slug یا id
 */
export const getPersonBySlugOrId = async (identifier) => {
  const response = await api.get(`/people/${identifier}`);
  return formatPersonData(response.data);
};