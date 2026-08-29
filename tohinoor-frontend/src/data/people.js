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
    birthTime: "06:54 AM",
    birthPlace: {
      city: " Kentucky, Hodgenville",
      country: "US",
      lat: "37n34",
      lng: " 85w44",
    },
    timezone: "LMT m85w44",
    zodiac: "aquarius",
    country: "United States",
    gender: "male",
    rating: "B",
    bio: [
      "آبراهام لینکلن (۱۸۰۹–۱۸۶۵) شانزدهمین رئیس‌جمهور ایالات متحده آمریکا بود که در خانواده‌ای فقیر در ایالت کنتاکی به دنیا آمد و با تلاش و مطالعه شخصی به وکالت و سپس سیاست روی آورد. او در سال ۱۸۶۱ رئیس‌جمهور شد و در دوران جنگ داخلی آمریکا رهبری کشور را بر عهده داشت. لینکلن با مخالفت با گسترش برده‌داری و صدور «اعلامیه آزادی بردگان» نقش مهمی در پایان برده‌داری ایفا کرد و برای حفظ اتحاد ایالات متحده تلاش کرد. او در سال ۱۸۶۵، اندکی پس از پایان جنگ داخلی، در تئاتر فورد در واشنگتن توسط جان ویلکس بوث ترور شد و به یکی از مشهورترین و تأثیرگذارترین شخصیت‌های تاریخ آمریکا تبدیل شد."    
    ],
    wikipedia_url: "https://fa.wikipedia.org/wiki/%D8%A2%D8%A8%D8%B1%D8%A7%D9%87%D8%A7%D9%85_%D9%84%DB%8C%D9%86%DA%A9%D9%84%D9%86"
  },
  {
    id: 2,
    name: "Nikola Tesla",
    nameFa: "نیکولا تسلا",
    slug: "nikola-tesla",
    photo: NikolaTesla,
    chart: { image: NikolaTeslaChart, title: "D1" },
    birthDate: "1856-06-28",
    birthTime: "00:00 AM",
    birthPlace: {
      city: "Smiljan",
      country: "Croatia",
      lat: "44n35",
      lng: "15e19",
    },
    timezone: "LMT m15e19",
    zodiac: "aries",
    country: "Croatia",
    gender: "male",
    rating: "B",
    bio: [
      "نیکولا تسلا (۱۸۵۶–۱۹۴۳) مخترع، مهندس برق و دانشمند صرب‌تبار بود که بیشتر به‌خاطر نقش مهمش در توسعه سیستم برق جریان متناوب (AC) شهرت دارد. او در امپراتوری اتریش، در خانواده‌ای صرب به دنیا آمد و از کودکی علاقه زیادی به علوم و اختراع داشت. تسلا مدتی با توماس ادیسون همکاری کرد، اما بعدها مسیر مستقلی در پیش گرفت و با اختراعات و پژوهش‌های خود در زمینه موتورهای القایی، انتقال برق و میدان‌های مغناطیسی دوار، پایه‌های فناوری برق مدرن را تقویت کرد. او همچنین در زمینه ارتباطات بی‌سیم و انتقال انرژی آزمایش‌های پیشگامانه‌ای انجام داد. تسلا سال‌های پایانی زندگی خود را در نیویورک در انزوا و مشکلات مالی گذراند و در سال ۱۹۴۳ درگذشت؛ با این حال، امروزه یکی از بزرگ‌ترین مخترعان و پیشگامان تاریخ مهندسی برق شناخته می‌شود."
    ],
    wikipedia_url: "https://fa.wikipedia.org/wiki/%D9%86%DB%8C%DA%A9%D9%88%D9%84%D8%A7_%D8%AA%D8%B3%D9%84%D8%A7"
  },
  {
    id: 3,
    name: "Anandamayi Ma",
    nameFa: "آناندا مای ما",
    slug: "anandamayi-ma",
    photo: AnandamayiMa,
    chart: { image: AnandamayiMaChart, title: "D1" },
    birthDate: "1896-04-30",
    birthTime: "03:45 AM",
    birthPlace: {
      city: "Kheora",
      country: "Bangladesh",
      lat: "23n47",
      lng: " 91e05",
    },
    timezone: "LST m88e20",
    zodiac: "pisces",
    country: "Bangladesh",
    gender: "female",
    rating: "B",
    bio: [
      "آناندا مایی ما (۱۸۹۶–۱۹۸۲) از عارفان و شخصیت‌های معنوی برجسته هند در قرن بیستم بود که در بنگال به دنیا آمد و از کودکی حالاتی عمیق از نیایش و معنویت را تجربه می‌کرد. او بدون آنکه خود را پیرو یک مکتب خاص بداند، بر عشق الهی، خودشناسی، مراقبه و وحدت معنوی تأکید داشت و به دلیل حضور معنوی و سخنانش پیروان بسیاری در هند و دیگر نقاط جهان پیدا کرد. آموزه‌های او بیشتر بر تجربه مستقیم حقیقت، پذیرش زندگی و شناخت ذات الهی در درون انسان استوار بود. آناندا مایی ما در طول زندگی خود سفرهای بسیاری انجام داد و با افراد مختلف از اقشار گوناگون دیدار کرد و آشرام‌هایی نیز در نقاط مختلف هند شکل گرفت. او در سال ۱۹۸۲ درگذشت و همچنان به‌عنوان یکی از چهره‌های برجسته معنویت هند معاصر شناخته می‌شود."
    ],
    wikipedia_url: "https://en.wikipedia.org/wiki/Anandamayi_Ma"
  },
  {
    id: 4,
    name: "Jiddu Krishnamurti",
    nameFa: "جیدو کریشنا مورتی",
    slug: "krishnamurt",
    photo: Krishnamurt,
    chart: { image: KrishnamurtChart, title: "D1" },
    birthDate: "1895-05-12",
    birthTime: "00:30 AM",
    birthPlace: {
      city: "Madanapalle",
      country: "India",
      lat: "13n33",
      lng: "78e30",
    },
    timezone: "MMT m80e1730",
    zodiac: "capricorn",
    country: "India",
    gender: "male",
    rating: "B",
    bio: [
      "جیدو کریشنامورتی (۱۸۹۵–۱۹۸۶) فیلسوف، سخنران و آموزگار معنوی هندی بود که در جوانی توسط انجمن تئوسوفی به‌عنوان شخصیتی با نقش معنوی ویژه معرفی شد، اما بعدها از این جایگاه فاصله گرفت و اعلام کرد که حقیقت را نمی‌توان در قالب هیچ سازمان، دین یا آموزه‌ای محدود کرد. او در سراسر زندگی خود در کشورهای مختلف سخنرانی کرد و درباره موضوعاتی مانند آزادی ذهن، خودشناسی، ترس، رابطه، مراقبه و رهایی از شرطی‌شدگی‌های فکری سخن گفت. کریشنامورتی تأکید داشت که انسان باید بدون تکیه بر اقتدار بیرونی و بدون پیروی کورکورانه از دیگران، ذهن و رفتار خود را مستقیماً مشاهده و بررسی کند. او در سال ۱۹۸۶ در کالیفرنیا درگذشت و آثار و سخنرانی‌هایش همچنان در زمینه فلسفه و معنویت مورد مطالعه قرار می‌گیرد."
    ],
    wikipedia_url: "https://fa.wikipedia.org/wiki/%D8%AC%DB%8C%D8%AF%D9%88_%DA%A9%D8%B1%DB%8C%D8%B4%D9%86%D8%A7%D9%85%D9%88%D8%B1%D8%AA%DB%8C"
  },
  {
    id: 5,
    name: "Wolfgang Amadeus Mozart",
    nameFa: "ولفگانگ آمادئوس موتسارت",
    slug: "mozart",
    photo: Mozart,
    chart: { image: MozartChart, title: "D1" },
    birthDate: "1756-01-27",
    birthTime: "08:00 PM",
    birthPlace: {
      city: "Salzburg",
      country: "Austria",
      lat: "47n48",
      lng: "13e02",
    },
    timezone: "BC/BR in hand",
    zodiac: "leo",
    country: "Austria",
    gender: "male",
    rating: "AA",
    bio: [
      "ولفگانگ آمادئوس موتسارت (۱۷۵۶–۱۷۹۱) آهنگساز نابغه اتریشی و یکی از بزرگ‌ترین چهره‌های تاریخ موسیقی کلاسیک بود که از کودکی استعداد خارق‌العاده‌ای در موسیقی نشان داد و از همان سال‌های خردسالی همراه پدرش در اروپا به اجرای موسیقی پرداخت. او در طول زندگی کوتاه خود بیش از ۶۰۰ اثر در زمینه‌های مختلف، از جمله سمفونی، کنسرتو، موسیقی مجلسی، اپرا و موسیقی مذهبی، خلق کرد و آثاری چون فلوت سحرآمیز، دون ژوان و ازدواج فیگارو از مشهورترین ساخته‌های او هستند. موتسارت در سال‌های پایانی زندگی در وین با مشکلات مالی و بیماری دست‌وپنجه نرم کرد و در ۳۵سالگی درگذشت؛ با این حال، نبوغ، تنوع و تأثیر آثار او باعث شد جایگاهی ماندگار در تاریخ موسیقی جهان پیدا کند."
    ],
    wikipedia_url: "https://fa.wikipedia.org/wiki/%D9%88%D9%84%D9%81%DA%AF%D8%A7%D9%86%DA%AF_%D8%A2%D9%85%D8%A7%D8%AF%D8%A6%D9%88%D8%B3_%D9%85%D9%88%D8%AA%D8%B3%D8%A7%D8%B1%D8%AA"
  },
];