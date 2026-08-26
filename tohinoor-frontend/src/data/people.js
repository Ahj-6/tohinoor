import AbrahamLincoln from "../assets/images/people/AbrahamLincoln.jpg";
import AbrahamLincolnChart from "../assets/images/people/AbrahamLincoln-chart.png";

import NikolaTesla from "../assets/images/people/NikolaTesla.jpg";
import NikolaTeslaChart from "../assets/images/people/NikolaTesla-chart.png";

import AnandamayiMa from "../assets/images/people/AnandamayiMa.jpg";
import AnandamayiMaChart from "../assets/images/people/Anandamayi Ma-chart.png";

import Krishnamurt from "../assets/images/people/Krishnamurt.jpg";
import KrishnamurtChart from "../assets/images/people/Krishnamurt-Chart.png";

import Mozart from "../assets/images/people/Mozart.jpg";
import MozartChart from "../assets/images/people/Mozart-chart.png";

// NOTE: nameFa / birthTime / birthPlace / timezone / bio are new fields
// needed for the Person Detail page. Only Krishnamurt is filled in below
// as a working example — the other four still need this data added
// (this will eventually come from the API resource instead of being
// hardcoded here).

export const people = [
  {
    id: 1,
    name: "Abraham Lincoln",
    nameFa: "آبراهام لینکلن",
    slug: "abraham-lincoln",
    photo: AbrahamLincoln,
    chart: { image: AbrahamLincolnChart, title: "D1" },
    birthDate: "1809-02-12",
    birthTime: "12:30 AM",
    birthPlace: {
      city: "مادانه پله",
      country: "هند",
      lat: "13n33",
      lng: "78e30",
    },
    timezone: "MMT m80e1730",
    zodiac: "aquarius",
    country: "United States",
    gender: "male",
    rating: "B",
    bio: [
      "هویت و جایگاه فکری : جیدو کریشنا مورتی (۱۸۹۵–۱۹۸۶) فیلسوف و معلم معنوی هندی بود که بخاطر آموزه‌هایش درباره آزادی ذهنی، خودشناسی و رهایی از سیستم‌های مذهبی و اجتماعی شناخته می‌شود. او هیچ سازمان مذهبی یا فرقه‌ای را تاسیس نکرد و آموزه‌هایش بر تجربه مستقیم، مشاهده و تفکر مستقل فردی تأکید داشت.",
      "تولد و خانواده : کریشنا مورتی در مادانا پله، هند، در خانواده‌ای متوسط هندو متولد شد. پدرش مشغول به کار در امور دولتی بود و مادرش زنانگی معنوی و آموزه‌های سنتی هندی را به فرزندانش منتقل می‌کرد. دوران کودکی او با فضایی مذهبی و فرهنگی غنی اما محدود همراه بود.",
    ],
  },
  {
    id: 2,
    name: "Nikola Tesla",
    nameFa: "نیکولا تسلا",
    slug: "nikola-tesla",
    photo: NikolaTesla,
    chart: { image: NikolaTeslaChart, title: "D1" },
    birthDate: "1856-06-28",
    birthTime: "12:30 AM",
    birthPlace: {
      city: "مادانه پله",
      country: "هند",
      lat: "13n33",
      lng: "78e30",
    },
    timezone: "MMT m80e1730",
    zodiac: "aries",
    country: "Croatia",
    gender: "male",
    rating: "B",
    bio: [
      "هویت و جایگاه فکری : جیدو کریشنا مورتی (۱۸۹۵–۱۹۸۶) فیلسوف و معلم معنوی هندی بود که بخاطر آموزه‌هایش درباره آزادی ذهنی، خودشناسی و رهایی از سیستم‌های مذهبی و اجتماعی شناخته می‌شود. او هیچ سازمان مذهبی یا فرقه‌ای را تاسیس نکرد و آموزه‌هایش بر تجربه مستقیم، مشاهده و تفکر مستقل فردی تأکید داشت.",
      "تولد و خانواده : کریشنا مورتی در مادانا پله، هند، در خانواده‌ای متوسط هندو متولد شد. پدرش مشغول به کار در امور دولتی بود و مادرش زنانگی معنوی و آموزه‌های سنتی هندی را به فرزندانش منتقل می‌کرد. دوران کودکی او با فضایی مذهبی و فرهنگی غنی اما محدود همراه بود.",
    ],
  },
  {
    id: 3,
    name: "Anandamayi Ma",
    nameFa: "آناندا مای ما",
    slug: "anandamayi-ma",
    photo: AnandamayiMa,
    chart: { image: AnandamayiMaChart, title: "D1" },
    birthDate: "1896-04-30",
    birthTime: "12:30 AM",
    birthPlace: {
      city: "مادانه پله",
      country: "هند",
      lat: "13n33",
      lng: "78e30",
    },
    timezone: "MMT m80e1730",
    zodiac: "pisces",
    country: "Bangladesh",
    gender: "female",
    rating: "B",
    bio: [
      "هویت و جایگاه فکری : جیدو کریشنا مورتی (۱۸۹۵–۱۹۸۶) فیلسوف و معلم معنوی هندی بود که بخاطر آموزه‌هایش درباره آزادی ذهنی، خودشناسی و رهایی از سیستم‌های مذهبی و اجتماعی شناخته می‌شود. او هیچ سازمان مذهبی یا فرقه‌ای را تاسیس نکرد و آموزه‌هایش بر تجربه مستقیم، مشاهده و تفکر مستقل فردی تأکید داشت.",
      "تولد و خانواده : کریشنا مورتی در مادانا پله، هند، در خانواده‌ای متوسط هندو متولد شد. پدرش مشغول به کار در امور دولتی بود و مادرش زنانگی معنوی و آموزه‌های سنتی هندی را به فرزندانش منتقل می‌کرد. دوران کودکی او با فضایی مذهبی و فرهنگی غنی اما محدود همراه بود.",
    ],
  },
  {
    id: 4,
    name: "Jiddu Krishnamurti",
    nameFa: "جیدو کریشنا مورتی",
    slug: "krishnamurt",
    photo: Krishnamurt,
    chart: { image: KrishnamurtChart, title: "D1" },
    birthDate: "1895-05-12",
    birthTime: "12:30 AM",
    birthPlace: {
      city: "مادانه پله",
      country: "هند",
      lat: "13n33",
      lng: "78e30",
    },
    timezone: "MMT m80e1730",
    zodiac: "aries",
    country: "India",
    gender: "male",
    rating: "B",
    bio: [
      "هویت و جایگاه فکری : جیدو کریشنا مورتی (۱۸۹۵–۱۹۸۶) فیلسوف و معلم معنوی هندی بود که بخاطر آموزه‌هایش درباره آزادی ذهنی، خودشناسی و رهایی از سیستم‌های مذهبی و اجتماعی شناخته می‌شود. او هیچ سازمان مذهبی یا فرقه‌ای را تاسیس نکرد و آموزه‌هایش بر تجربه مستقیم، مشاهده و تفکر مستقل فردی تأکید داشت.",
      "تولد و خانواده : کریشنا مورتی در مادانا پله، هند، در خانواده‌ای متوسط هندو متولد شد. پدرش مشغول به کار در امور دولتی بود و مادرش زنانگی معنوی و آموزه‌های سنتی هندی را به فرزندانش منتقل می‌کرد. دوران کودکی او با فضایی مذهبی و فرهنگی غنی اما محدود همراه بود.",
    ],
  },
  {
    id: 5,
    name: "Wolfgang Amadeus Mozart",
    nameFa: "ولفگانگ آمادئوس موتسارت",
    slug: "mozart",
    photo: Mozart,
    chart: { image: MozartChart, title: "D1" },
    birthDate: "1756-01-27",
    birthTime: "12:30 AM",
    birthPlace: {
      city: "مادانه پله",
      country: "هند",
      lat: "13n33",
      lng: "78e30",
    },
    timezone: "MMT m80e1730",
    zodiac: "leo",
    country: "Austria",
    gender: "male",
    rating: "AA",
    bio: [
      "هویت و جایگاه فکری : جیدو کریشنا مورتی (۱۸۹۵–۱۹۸۶) فیلسوف و معلم معنوی هندی بود که بخاطر آموزه‌هایش درباره آزادی ذهنی، خودشناسی و رهایی از سیستم‌های مذهبی و اجتماعی شناخته می‌شود. او هیچ سازمان مذهبی یا فرقه‌ای را تاسیس نکرد و آموزه‌هایش بر تجربه مستقیم، مشاهده و تفکر مستقل فردی تأکید داشت.",
      "تولد و خانواده : کریشنا مورتی در مادانا پله، هند، در خانواده‌ای متوسط هندو متولد شد. پدرش مشغول به کار در امور دولتی بود و مادرش زنانگی معنوی و آموزه‌های سنتی هندی را به فرزندانش منتقل می‌کرد. دوران کودکی او با فضایی مذهبی و فرهنگی غنی اما محدود همراه بود.",
    ],
  },
];