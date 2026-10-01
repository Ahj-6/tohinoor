import api from "../api/axios";

/**
 * تبدیل داده‌های خام API به فرمت مورد نیاز فرانت
 */
  const formatPersonData = (person) => {
    if (!person) {
      return null;
    }

    return {
      ...person,

      // -------------------------------------------------
      // Names
      // -------------------------------------------------
      nameFa: person.name || "",
      nameEng: person.name_eng || "",

      // -------------------------------------------------
      // Image
      // -------------------------------------------------
      photo: person.image_url || null,

      // -------------------------------------------------
      // Zodiac
      // -------------------------------------------------
      zodiac: person.zodiac || null,

      // -------------------------------------------------
      // Birth Accuracy / Rate
      // -------------------------------------------------
      birth_accuracy: person.birth_accuracy || null,

      // -------------------------------------------------
      // Birth information
      // -------------------------------------------------
      birthDate: person.birth_date || null,
      birthTime: person.birth_time || null,
      timezone: person.time_zone || null,

      // -------------------------------------------------
      // Birth Place
      // -------------------------------------------------
      birthPlace: {
        country: person.country?.name_eng || "",
        city: person.city?.name_eng || "",
        lat: person.city?.latitude ?? null,
        lng: person.city?.longitude ?? null,
      },

      // -------------------------------------------------
      // Charts
      // -------------------------------------------------
      charts: Array.isArray(person.charts)
        ? person.charts
        : [],

      // -------------------------------------------------
      // Biography
      // -------------------------------------------------
      bio: Array.isArray(person.biography)
        ? person.biography
        : person.biography
          ? person.biography.split("\n\n")
          : [],
    };
  };

/**
 * دریافت لیست افراد (با اطمینان از خروجی آرایه‌ای)
 */
export const getPeople = async (params = {}) => {
  const response = await api.get("/people", { params });
  const resData = response.data;

  let rawList = [];

  if (Array.isArray(resData)) {
    rawList = resData;
  } else if (resData && Array.isArray(resData.data)) {
    rawList = resData.data;
  }

  return rawList.map(formatPersonData);
};

/**
 * دریافت جزئیات یک فرد با slug یا id
 */
// export const getPersonBySlugOrId = async (identifier) => {
//   try {
//     // تلاش برای دریافت مستقیم با slug یا id
//     const response = await api.get(`/people/${identifier}`);
//     const data = response.data?.data || response.data;
//     return formatPersonData(data);
//   } catch (error) {
//     // اگر روت /people/{slug} وجود نداشت، در لیست افراد جستجو می‌کنیم
//     if (error.response && error.response.status === 404) {
//       const allPeople = await getPeople();
//       const found = allPeople.find(
//         (p) => String(p.slug) === String(identifier) || String(p.id) === String(identifier)
//       );
//       if (found) return found;
//     }
//     throw error;
//   }
// };

export const getPersonBySlug = async (slug) => {
  const response = await api.get(
    `/people/${encodeURIComponent(slug)}`,
  );

  const data = response.data?.data || response.data;

  return formatPersonData(data);
};