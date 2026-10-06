-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 05, 2026 at 03:39 PM
-- Server version: 10.11.19-MariaDB-cll-lve
-- PHP Version: 8.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tohinoorir_tohinoordb`
--

-- --------------------------------------------------------

--
-- Table structure for table `birth_accuracies`
--

CREATE TABLE `birth_accuracies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_eng` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `birth_accuracies`
--

INSERT INTO `birth_accuracies` (`id`, `code`, `name`, `name_eng`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'AA', 'دقیق دقیق', 'Accurate accurate', 'Data as recorded by the family or state. This includes BC (birth certificate), and BR (birth record), that which is not an official document but a quote of the birth record from the Registrar or Bureau of Records, the baptismal certificate, family Bible, or baby book. These data reflect the best available accuracy.', '2026-08-30 13:34:24', '2026-09-24 14:50:49', NULL),
(2, 'A', 'دقیق', 'Accurate', 'Data as quoted by the person, kin, friend, or associate. These data all come from someone\'s memory, family legend, or hearsay. The quote may be substantiated by a qualifying statement such as, \"My grandfather wanted me to be born on his birthday and my mother said that I almost made it. I was born three minutes before midnight.\" When the information comes from an astrologer\'s client, it is considered reliable, since a client is investing money for the astrologer\'s time and expertise. When the quote is from a public figure given in public, it may be questionable. Please keep in mind that public figures, especially politicians, answer a question in public to be accommodating; therefore, the time given may not be accurate. When the quote is from one of a group of people who were asked casually, it might be questionable. Rounded-off time such as 6 AM or midnight might also be questionable.\n\nTaeger data groups: 2M,2F,2P,2R', '2026-09-24 14:52:21', '2026-09-24 14:52:21', NULL),
(3, 'B', 'زندگینامه', 'Biography', 'Biography. When these data are substantiated by a quote that qualifies the information, they are considered reliable. An example: \"His grandmother arrived at 9 in the morning and barely had time to remove her coat before mother gave birth.\" Or, \"Though she claims to have been born in 1946, state records clearly give September 5, 1942\" or, \"family legend reports \'before noon\'.\" When the quote is vague, such as, \"It was a wild and stormy night,\" a specific time may simply reflect the biographer\'s literary license. At times public figures lie about their age. Biographers who market scandal and gossip may actually create misinformation for the sake of book sales.\nAutobiaography falls usually under rating A, as \"data quoted by person\".\nWhen data from books are specifically attributed to birth records, they are given a Rodden Rating of \"AA\".\n\nTaeger data groups: 2B', '2026-09-24 14:54:46', '2026-09-24 14:54:46', NULL),
(4, 'C', 'احتیاط', 'Caution', 'Caution, no source. These data are also listed as \"OSNK, Original Source Not Known\". They are undocumented data, often given in magazines or journals, with no source, or an ambiguous source such as \"personal\" or \"archives.\" When a magazine, journal, or astrologer, is quoted without the original source of the information, the quote is a reference, not a source. There is no way to know if the datum is valid. If the person making the quote was proven unreliable in the past, any future quote automatically falls in the C category unless attributed to a specific source. Rectified data from an approximate birth time have a valid place in astrology and fall in the C category unless there are contradictory rectified times, which nudges it into DD.\n\nTaeger data group: 3', '2026-09-24 14:55:11', '2026-09-24 14:55:11', NULL),
(5, 'DD', 'داده کثیف', 'Dirty Data', 'Two or more conflicting quotes that are unqualified. These data are offered as a reference in order to document their lack of reliability and prevent their being presented elsewhere as factual. They are often sincere attempts to find a birth time that have met with ambiguous results. In many cases, the presentation of Dirty Data leads to the discovery of an accurate source and the data are updated to a category of greater accuracy.\n\nTaeger data group: 4', '2026-09-24 14:55:41', '2026-09-24 14:55:41', NULL),
(6, 'X', 'X', 'X', 'Data with no time of birth. Untimed data may be of interest in the examination of planetary patterns. It can also form the basis for a solar chart. Rectified times that don\'t start from an approximate time are still given an X rating.', '2026-09-24 14:56:23', '2026-09-24 14:56:23', NULL),
(7, 'XX', 'XX', 'XX', 'Data without a known or confirmed date. Historic figures or certain current news figures may be of interest even with speculative birth dates.', '2026-09-24 14:56:39', '2026-09-24 14:56:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_eng` varchar(255) DEFAULT NULL,
  `author` varchar(150) DEFAULT NULL,
  `translator` varchar(150) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `display_order` smallint(6) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book_people`
--

CREATE TABLE `book_people` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `charts`
--

CREATE TABLE `charts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `chart_type_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `charts`
--

INSERT INTO `charts` (`id`, `person_id`, `chart_type_id`, `image`, `created_at`, `updated_at`) VALUES
(2, 3, 1, 'charts/V19YojkMxu9yW5zKvz0BIFEbwBpZ6VWW927cWo4m.png', '2026-09-25 03:21:21', '2026-09-25 03:21:21'),
(3, 4, 1, 'charts/sZzfD2OKjjDNVLpdQmcdEhdX78RnhlBgaPW2f0hk.png', '2026-09-25 08:48:11', '2026-09-25 08:48:11'),
(4, 2, 1, 'charts/dK4KqS83OBSvv7F6Kmm4ANOSKxwOnEmKSkd8gEuq.png', '2026-10-01 07:29:09', '2026-10-03 03:59:15'),
(5, 5, 1, 'charts/IHcT66fo4ZghVgUmnGKQYkofD0E18XopbDTj5odr.png', '2026-10-01 11:18:41', '2026-10-01 11:18:41'),
(6, 6, 1, 'charts/dzQvz9j36U748iTiKZsd6TLxFE4i8iys9hGWiVih.png', '2026-10-01 11:31:19', '2026-10-01 11:31:19'),
(8, 8, 1, 'charts/i1zc2hE6AqDq0WreUIZ8MrSHb9IzDMBZdENSTmbl.png', '2026-10-02 11:35:28', '2026-10-02 13:47:36'),
(9, 9, 1, 'charts/wqRHalcfmD8xNZBEbKtObaEx6SjnzYDSfkbCsy6k.png', '2026-10-03 05:17:00', '2026-10-03 05:17:00'),
(10, 10, 1, 'charts/6aAw0a0DwVV2Y9KlWfyarPSTRH5AAV6mAahF9RoM.png', '2026-10-03 05:26:55', '2026-10-03 05:26:55'),
(11, 11, 1, 'charts/SIO7iqayEVc7o60xS1laNxA892wOoZ6EaGBhTdWD.png', '2026-10-03 05:34:59', '2026-10-03 05:34:59'),
(12, 12, 1, 'charts/0Lok5uyuOYiA7qaz9NDf6uLoK1kkhWOzXqoXzZ6k.png', '2026-10-03 05:43:48', '2026-10-03 05:43:48'),
(13, 13, 1, 'charts/3zPiVSkEzlWfSOXqYcYAKvV7E4Rjo1wFNM5OJfvs.png', '2026-10-05 02:30:51', '2026-10-05 02:30:51'),
(14, 14, 1, 'charts/1A68C1L8xm02J9aTakIerCjbB7gO4quIuiZX8Gj7.png', '2026-10-05 02:36:32', '2026-10-05 02:36:32'),
(15, 15, 1, 'charts/yerWzbozX5bKLXdYDaUb31F8OdgcxkdBz1O9GfAK.png', '2026-10-05 02:53:17', '2026-10-05 02:53:17'),
(16, 16, 1, 'charts/pyzO4WpSOvr2dscDlGvM3YL6VrDqS4JQvoNfHNae.png', '2026-10-05 03:00:55', '2026-10-05 03:00:55'),
(17, 17, 1, 'charts/VJ5Xy76an46odL6HVRc5cAlwzoEJQe5AoJmRkTMQ.png', '2026-10-05 03:06:21', '2026-10-05 03:06:21'),
(18, 18, 1, 'charts/cIQHV2TyIDod5oz4O46qcLyNJd4UQmJcL1VVxs12.png', '2026-10-05 07:50:59', '2026-10-05 07:50:59');

-- --------------------------------------------------------

--
-- Table structure for table `chart_types`
--

CREATE TABLE `chart_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `name_eng` varchar(20) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chart_types`
--

INSERT INTO `chart_types` (`id`, `name`, `name_eng`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'نمودار تولد', 'D1', NULL, '2026-09-22 16:13:10', '2026-09-24 09:02:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_eng` varchar(100) NOT NULL,
  `latitude` varchar(20) NOT NULL,
  `longitude` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `country_id`, `name`, `name_eng`, `latitude`, `longitude`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'تهران', 'Tehran', '35.6892000', '51.3890000', '2026-08-30 13:33:43', '2026-09-24 12:00:14', '2026-09-24 12:00:14'),
(2, 3, 'کنتاکی، هاجن‌ویل', 'Kentucky, Hodgenville', '37n34', '85w44', '2026-09-24 12:39:44', '2026-09-24 12:39:44', NULL),
(3, 4, 'خئورا', 'Kheora', '23n47', '91e05', '2026-09-24 13:28:56', '2026-09-24 13:28:56', NULL),
(4, 5, 'سیمیلجان', 'Smiljan', '44n35', '15e19', '2026-10-01 11:08:50', '2026-10-01 11:08:50', NULL),
(5, 6, 'زالتسبورگ', 'Salzburg', '47n48', '13e02', '2026-10-01 11:30:08', '2026-10-01 11:30:08', NULL),
(6, 7, 'مادانه پله', 'Madanapalle', '13n33', '78e30', '2026-10-01 11:33:47', '2026-10-01 11:34:20', NULL),
(7, 3, 'ویرجینیا غربی، بلوفیلد', 'West Virginia, Bluefield', '37n16', '81w13', '2026-10-02 14:02:33', '2026-10-02 14:02:33', NULL),
(8, 3, 'ایلینوی، شیکاگو', 'Illinois, Chicago', '41n51', '87w39', '2026-10-03 05:19:13', '2026-10-03 05:19:13', NULL),
(9, 3, 'نیوجرسی، هابوکن', 'New Jersey, Hoboken', '40n45', '74w02', '2026-10-03 05:28:04', '2026-10-03 05:28:04', NULL),
(10, 3, 'کالیفرنیا، سانفرانسیسکو', 'California, San Francisco', '37n47', '122w25', '2026-10-05 02:29:29', '2026-10-05 02:29:29', NULL),
(11, 8, 'سومور', 'Saumur', '47n16', '0w05', '2026-10-05 02:38:40', '2026-10-05 02:38:40', NULL),
(12, 3, 'کانزاس، ایچیسن', 'Kansas, Atchison', '39n34', '95w07', '2026-10-05 03:08:23', '2026-10-05 03:08:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_eng` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `name_eng`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ایران', 'Iran', '2026-08-30 13:33:31', '2026-09-23 01:29:39', NULL),
(2, 'آلمان', 'germany', '2026-09-23 01:29:58', '2026-09-23 01:29:58', NULL),
(3, 'ایالات متحده آمریکا', 'US', '2026-09-24 10:55:19', '2026-09-24 10:55:19', NULL),
(4, 'بنگلادش', 'Bangladesh', '2026-09-24 13:27:42', '2026-09-24 13:27:42', NULL),
(5, 'کرواسی', 'Croatia', '2026-10-01 11:07:20', '2026-10-01 11:07:20', NULL),
(6, 'اتریش', 'Austria', '2026-10-01 11:28:35', '2026-10-01 11:28:35', NULL),
(7, 'هند', 'India', '2026-10-01 11:32:33', '2026-10-01 11:32:33', NULL),
(8, 'فرانسه', 'France', '2026-10-05 02:38:01', '2026-10-05 02:38:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `elements`
--

CREATE TABLE `elements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `name_eng` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `elements`
--

INSERT INTO `elements` (`id`, `name`, `name_eng`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'اتر', 'ether', 'عنصر اتر', '2026-08-30 13:35:21', '2026-10-03 03:58:27', NULL),
(2, 'باد', 'wind', 'عنصر باد', '2026-09-22 09:34:12', '2026-09-23 12:42:44', NULL),
(3, 'آتش', 'fire', 'عنصر آتش', '2026-09-23 12:43:03', '2026-09-23 12:43:03', NULL),
(4, 'آب', 'water', 'عنصر آب', '2026-09-23 12:43:20', '2026-09-23 12:43:20', NULL),
(5, 'خاک', 'earth', 'عنصر خاک', '2026-09-23 12:45:34', '2026-10-02 18:28:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `name_eng` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` (`id`, `name`, `name_eng`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'مرد', 'male', '2026-08-30 13:37:11', '2026-08-30 13:37:11', NULL),
(2, 'زن', 'female', '2026-09-23 02:08:18', '2026-09-23 02:08:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gunas`
--

CREATE TABLE `gunas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `name_eng` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gunas`
--

INSERT INTO `gunas` (`id`, `name`, `name_eng`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ساتوا', 'sattva', '2026-08-30 13:35:35', '2026-09-22 09:59:01', NULL),
(2, 'راجاس', 'rajas', '2026-09-22 09:59:29', '2026-09-22 09:59:29', NULL),
(3, 'تاماس', 'tamas', '2026-09-23 12:52:45', '2026-09-23 12:52:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_07_23_142146_create_elements_table', 1),
(5, '2026_07_24_092251_create_personal_access_tokens_table', 1),
(6, '2026_08_18_135819_create_natures_table', 1),
(7, '2026_08_18_175223_create_gunas_table', 1),
(8, '2026_08_18_224828_create_qualities_table', 1),
(9, '2026_08_19_084535_create_roles_table', 1),
(10, '2026_08_19_160125_create_planets_table', 1),
(11, '2026_08_22_202513_create_zodiac_signs_table', 1),
(12, '2026_08_23_085627_create_chart_types_table', 1),
(13, '2026_08_23_212023_create_countries_table', 1),
(15, '2026_08_24_115858_create_birth_accuracies_table', 1),
(16, '2026_08_24_172522_create_genders_table', 1),
(17, '2026_08_25_131553_create_people_table', 1),
(18, '2026_08_25_223524_create_charts_table', 1),
(19, '2026_08_26_150229_add_role_id_to_users_table', 1),
(20, '2026_08_30_104640_create_books_table', 2),
(21, '2026_08_30_112905_create_book_people_table', 3),
(22, '2026_08_30_171734_create_movies_table', 4),
(23, '2026_08_30_214602_create_movie_people_table', 5),
(24, '2026_08_31_103257_create_sample_analyses_table', 6),
(25, '2026_08_23_213620_create_cities_table', 1),
(26, '2026_09_30_142856_add_slug_to_people_table', 7),
(27, '2026_10_01_164820_remove_soft_deletes_from_people_and_charts_tables', 8);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_eng` varchar(255) DEFAULT NULL,
  `director` varchar(150) DEFAULT NULL,
  `release_year` year(4) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `display_order` smallint(6) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie_people`
--

CREATE TABLE `movie_people` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `movie_id` bigint(20) UNSIGNED NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `natures`
--

CREATE TABLE `natures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `name_eng` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `natures`
--

INSERT INTO `natures` (`id`, `name`, `name_eng`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'سعد', 'Benefic', '2026-08-30 13:35:28', '2026-09-23 12:50:24', NULL),
(2, 'سعد اصغر', 'Lesser Benefic', '2026-09-22 09:47:03', '2026-09-23 12:50:46', NULL),
(3, 'سعد اکبر', 'Greater Benefic', '2026-09-23 12:51:02', '2026-09-23 12:51:02', NULL),
(4, 'نحس', 'Malefic', '2026-09-23 12:51:20', '2026-09-23 12:51:20', NULL),
(5, 'نحس اصغر', 'Lesser Malefic', '2026-09-23 12:51:37', '2026-09-23 12:51:37', NULL),
(6, 'نحس اکبر', 'Greater Malefic', '2026-09-23 12:51:53', '2026-09-23 12:51:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `name_eng` varchar(150) NOT NULL,
  `slug` varchar(180) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `gender_id` bigint(20) UNSIGNED DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `birth_time` time DEFAULT NULL,
  `country_id` bigint(20) UNSIGNED DEFAULT NULL,
  `city_id` bigint(20) UNSIGNED DEFAULT NULL,
  `time_zone` varchar(255) DEFAULT NULL,
  `zodiac_sign_id` bigint(20) UNSIGNED DEFAULT NULL,
  `birth_accuracy_id` bigint(20) UNSIGNED DEFAULT NULL,
  `biography` longtext DEFAULT NULL,
  `wikipedia_url` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `name_eng`, `slug`, `image`, `gender_id`, `birth_date`, `birth_time`, `country_id`, `city_id`, `time_zone`, `zodiac_sign_id`, `birth_accuracy_id`, `biography`, `wikipedia_url`, `status`, `created_at`, `updated_at`) VALUES
(2, 'آبراهام لینکلن', 'Abraham Lincoln', 'abraham-lincoln', 'people/UoB29BOySVhHfSRMcr0otngMDyepebt0opaE3RNp.jpg', 1, '1809-02-12', '06:54:00', 3, 2, 'LMT m85w44', 11, 3, 'آبراهام لینکلن (۱۸۰۹–۱۸۶۵) شانزدهمین رئیس‌جمهور ایالات متحده آمریکا بود که در خانواده‌ای فقیر در ایالت کنتاکی به دنیا آمد و با تلاش و مطالعه شخصی به وکالت و سپس سیاست روی آورد. او در سال ۱۸۶۱ رئیس‌جمهور شد و در دوران جنگ داخلی آمریکا رهبری کشور را بر عهده داشت. لینکلن با مخالفت با گسترش برده‌داری و صدور «اعلامیه آزادی بردگان» نقش مهمی در پایان برده‌داری ایفا کرد و برای حفظ اتحاد ایالات متحده تلاش کرد. او در سال ۱۸۶۵، اندکی پس از پایان جنگ داخلی، در تئاتر فورد در واشنگتن توسط جان ویلکس بوث ترور شد و به یکی از مشهورترین و تأثیرگذارترین شخصیت‌های تاریخ آمریکا تبدیل شد.', 'https://fa.wikipedia.org/wiki/%D8%A2%D8%A8%D8%B1%D8%A7%D9%87%D8%A7%D9%85_%D9%84%DB%8C%D9%86%DA%A9%D9%84%D9%86', 1, '2026-09-24 12:42:37', '2026-10-05 02:16:01'),
(3, 'آناندا مای ما', 'Anandamayi Ma', 'anandamayi-ma', 'people/q5JRVsGEgpdsbndGbz7AzGdpkbvXRL9GgYFRL4cf.jpg', 2, '1896-04-30', '03:45:00', 4, 3, 'LST m88e20', 12, 3, 'آناندا مایی ما (۱۸۹۶–۱۹۸۲) از عارفان و شخصیت‌های معنوی برجسته هند در قرن بیستم بود که در بنگال به دنیا آمد و از کودکی حالاتی عمیق از نیایش و معنویت را تجربه می‌کرد. او بدون آنکه خود را پیرو یک مکتب خاص بداند، بر عشق الهی، خودشناسی، مراقبه و وحدت معنوی تأکید داشت و به دلیل حضور معنوی و سخنانش پیروان بسیاری در هند و دیگر نقاط جهان پیدا کرد. آموزه‌های او بیشتر بر تجربه مستقیم حقیقت، پذیرش زندگی و شناخت ذات الهی در درون انسان استوار بود. آناندا مایی ما در طول زندگی خود سفرهای بسیاری انجام داد و با افراد مختلف از اقشار گوناگون دیدار کرد و آشرام‌هایی نیز در نقاط مختلف هند شکل گرفت. او در سال ۱۹۸۲ درگذشت و همچنان به‌عنوان یکی از چهره‌های برجسته معنویت هند معاصر شناخته می‌شود.', 'https://en.wikipedia.org/wiki/Anandamayi_Ma', 1, '2026-09-24 13:23:12', '2026-10-05 02:17:05'),
(4, 'جیدو کریشنا مورتی', 'Jiddu Krishnamurti', 'jiddu-krishnamurti', 'people/fvNufkUYbfSJ7yq4X6D5sbYEmx6xEviF0gbXrDKl.jpg', 1, '1895-05-12', '00:30:00', 7, 6, 'MMT m80e1730', 10, 3, 'جیدو کریشنامورتی (۱۸۹۵–۱۹۸۶) فیلسوف، سخنران و آموزگار معنوی هندی بود که در جوانی توسط انجمن تئوسوفی به‌عنوان شخصیتی با نقش معنوی ویژه معرفی شد، اما بعدها از این جایگاه فاصله گرفت و اعلام کرد که حقیقت را نمی‌توان در قالب هیچ سازمان، دین یا آموزه‌ای محدود کرد. او در سراسر زندگی خود در کشورهای مختلف سخنرانی کرد و درباره موضوعاتی مانند آزادی ذهن، خودشناسی، ترس، رابطه، مراقبه و رهایی از شرطی‌شدگی‌های فکری سخن گفت. کریشنامورتی تأکید داشت که انسان باید بدون تکیه بر اقتدار بیرونی و بدون پیروی کورکورانه از دیگران، ذهن و رفتار خود را مستقیماً مشاهده و بررسی کند. او در سال ۱۹۸۶ در کالیفرنیا درگذشت و آثار و سخنرانی‌هایش همچنان در زمینه فلسفه و معنویت مورد مطالعه قرار می‌گیرد.', 'https://fa.wikipedia.org/wiki/%D8%AC%DB%8C%D8%AF%D9%88_%DA%A9%D8%B1%DB%8C%D8%B4%D9%86%D8%A7%D9%85%D9%88%D8%B1%D8%AA%DB%8C', 1, '2026-09-25 06:34:56', '2026-10-05 02:18:00'),
(5, 'نیکولا تسلا', 'Nikola Tesla', 'nikola-tesla', 'people/Jar1G0k0nssgb1TnjZY6N8WB3mTx2Z9iTeJvNZoJ.jpg', 1, '1856-06-28', '00:00:00', 5, 4, 'LMT m15e 19', 1, 3, 'نیکولا تسلا (۱۸۵۶–۱۹۴۳) مخترع، مهندس برق و دانشمند صرب‌تبار بود که بیشتر به‌خاطر نقش مهمش در توسعه سیستم برق جریان متناوب (AC) شهرت دارد. او در امپراتوری اتریش، در خانواده‌ای صرب به دنیا آمد و از کودکی علاقه زیادی به علوم و اختراع داشت. تسلا مدتی با توماس ادیسون همکاری کرد، اما بعدها مسیر مستقلی در پیش گرفت و با اختراعات و پژوهش‌های خود در زمینه موتورهای القایی، انتقال برق و میدان‌های مغناطیسی دوار، پایه‌های فناوری برق مدرن را تقویت کرد. او همچنین در زمینه ارتباطات بی‌سیم و انتقال انرژی آزمایش‌های پیشگامانه‌ای انجام داد. تسلا سال‌های پایانی زندگی خود را در نیویورک در انزوا و مشکلات مالی گذراند و در سال ۱۹۴۳ درگذشت؛ با این حال، امروزه یکی از بزرگ‌ترین مخترعان و پیشگامان تاریخ مهندسی برق شناخته می‌شود.', 'https://fa.wikipedia.org/wiki/%D9%86%DB%8C%DA%A9%D9%88%D9%84%D8%A7_%D8%AA%D8%B3%D9%84%D8%A7', 1, '2026-10-01 11:13:00', '2026-10-05 02:19:38'),
(6, 'ولفگانگ آمادئوس موتسارت', 'Wolfgang Amadeus Mozart', 'wolfgang-amadeus-mozart', 'people/Prp2OUyjExjzfbNs1ZfixVWHWPrdQld6FtW9oDD3.jpg', 1, '1756-01-27', '20:00:00', 6, 5, 'BC/BR in hand', 5, 1, 'ولفگانگ آمادئوس موتسارت (۱۷۵۶–۱۷۹۱) آهنگساز نابغه اتریشی و یکی از بزرگ‌ترین چهره‌های تاریخ موسیقی کلاسیک بود که از کودکی استعداد خارق‌العاده‌ای در موسیقی نشان داد و از همان سال‌های خردسالی همراه پدرش در اروپا به اجرای موسیقی پرداخت. او در طول زندگی کوتاه خود بیش از ۶۰۰ اثر در زمینه‌های مختلف، از جمله سمفونی، کنسرتو، موسیقی مجلسی، اپرا و موسیقی مذهبی، خلق کرد و آثاری چون فلوت سحرآمیز، دون ژوان و ازدواج فیگارو از مشهورترین ساخته‌های او هستند. موتسارت در سال‌های پایانی زندگی در وین با مشکلات مالی و بیماری دست‌وپنجه نرم کرد و در ۳۵سالگی درگذشت؛ با این حال، نبوغ، تنوع و تأثیر آثار او باعث شد جایگاهی ماندگار در تاریخ موسیقی جهان پیدا کند.', 'https://fa.wikipedia.org/wiki/%D9%88%D9%84%D9%81%DA%AF%D8%A7%D9%86%DA%AF_%D8%A2%D9%85%D8%A7%D8%AF%D8%A6%D9%88%D8%B3_%D9%85%D9%88%D8%AA%D8%B3%D8%A7%D8%B1%D8%AA', 1, '2026-10-01 11:21:40', '2026-10-05 02:20:36'),
(8, 'جان فوربز نش', 'John Forbes Nash Jr.', 'john-forbes-nash-jr', 'people/lExNTslAOWN0QFTKC8lVqyqSSzFsAq1amTejFBqj.jpg', 1, '1928-06-13', '07:00:00', 3, 7, 'EST h5w', 3, 1, 'جان فوربز نش جونیور (John Forbes Nash Jr.) ریاضی‌دان برجستهٔ آمریکایی و برندهٔ جایزه نوبل اقتصاد در سال ۱۹۹۴ بود که برجسته‌ترین دستاوردهای او در زمینهٔ نظریهٔ بازی‌ها، هندسه دیفرانسیل و معادلات دیفرانسیل جزئی شکل گرفت. او در ۱۹ سالگی مدرک کارشناسی و کارشناسی‌ارشد خود را از دانشگاه کارنگی ملون دریافت کرد و در سن ۲۲ سالگی، با ارائه‌ٔ مفهوم «تعادل نش» (Nash Equilibrium) در مقطع دکتری دانشگاه پرینستون، انقلابی در تحلیل ریاضی تصمیم‌گیری‌های استراتژیک در اقتصاد، علم سیاست و سایر علوم زیستی پدید آورد. زندگی او فراتر از نقش‌آفرینی در تالارهای دانشگاهی، مبارزه‌ای طولانی و جانکاه با بیماری اسکیزوفرنی بود که چند دهه طول کشید و الهام‌بخش کتاب و فیلم سینمایی معروف «یک ذهن زیبا» (A Beautiful Mind) شد. نش علاوه بر نوبل اقتصاد، موفق به کسب «جایزه آبل» (از معتبرترین جوایز ریاضی جهان) در سال ۲۰۱۵ شد و تنها فردی در تاریخ است که هر دو این جوایز ارزنده‌ را تصاحب کرده است.', 'https://fa.wikipedia.org/wiki/%D8%AC%D8%A7%D9%86_%D9%81%D9%88%D8%B1%D8%A8%D8%B2_%D9%86%D8%B4', 1, '2026-10-02 11:30:15', '2026-10-05 02:17:27'),
(9, 'والت دیزنی', 'Walter Elias Disney', 'walter-elias-disney', 'people/tOa4Ek9Ou28AO3aECORIoxY1kuVOgGLBwjnRI9MM.jpg', 1, '1901-12-05', '00:35:00', 3, 8, 'CST h6w', 6, 2, 'والت دیزنی (۱۹۰۱–۱۹۶۶)، کارآفرین، انیماتور و تهیه‌کنندهٔ آمریکایی و یکی از تأثیرگذارترین چهره‌های تاریخ انیمیشن بود. او در سال ۱۹۲۳ به همراه برادرش روی دیزنی شرکت Walt Disney Productions را بنیان گذاشت و با خلق شخصیت‌هایی مانند میکی ماوس به شهرت جهانی رسید. دیزنی در توسعهٔ انیمیشن‌های بلند نقش مهمی داشت و آثاری مانند سفیدبرفی و هفت کوتوله، پینوکیو و سیندرلا را تولید کرد. او همچنین ایدهٔ ساخت پارک‌های تفریحی دیزنی را مطرح کرد که نخستین نمونهٔ آن، دیزنی‌لند در سال ۱۹۵۵ در کالیفرنیا افتتاح شد. والت دیزنی در سال ۱۹۶۶ درگذشت، اما میراث هنری و تجاری او همچنان در سراسر جهان ادامه دارد.', 'https://fa.wikipedia.org/wiki/%D9%88%D8%A7%D9%84%D8%AA_%D8%AF%DB%8C%D8%B2%D9%86%DB%8C', 1, '2026-10-03 05:15:47', '2026-10-05 02:20:15'),
(10, 'فرانک سیناترا', 'Frank Sinatra', 'frank-sinatra', 'people/tf8vLjfGYs7BooijWwREqYUa4kJf1JXlPB0fsMUY.jpg', 1, '1915-12-12', '03:00:00', 3, NULL, 'EST h5w', 7, 2, 'فرانک سیناترا (۱۹۱۵–۱۹۹۸) خواننده، بازیگر و هنرمند مشهور آمریکایی بود که به‌عنوان یکی از برجسته‌ترین خوانندگان موسیقی عامه‌پسند قرن بیستم شناخته می‌شود. او در خانواده‌ای ایتالیایی‌تبار در نیوجرسی متولد شد و فعالیت هنری خود را از دههٔ ۱۹۳۰ آغاز کرد و با صدای منحصربه‌فرد و شیوهٔ خاص اجرای ترانه‌ها به شهرت رسید. سیناترا در دهه‌های ۱۹۴۰ و ۱۹۵۰ به یکی از محبوب‌ترین خوانندگان آمریکا تبدیل شد و در کنار موسیقی، در فیلم‌هایی مانند از اینجا تا ابدیت نیز بازی کرد و برای آن اسکار گرفت. او در طول چند دهه فعالیت، آثار ماندگاری مانند My Way، Fly Me to the Moon و New York, New York را اجرا کرد و علاوه بر موفقیت هنری، به یکی از نمادهای فرهنگی موسیقی و سینمای آمریکا تبدیل شد. سیناترا در سال ۱۹۹۸ در لس‌آنجلس درگذشت.', 'https://fa.wikipedia.org/wiki/%D9%81%D8%B1%D8%A7%D9%86%DA%A9_%D8%B3%DB%8C%D9%86%D8%A7%D8%AA%D8%B1%D8%A7', 1, '2026-10-03 05:26:16', '2026-10-03 05:26:16'),
(11, 'آلن تورینگ', 'Alan Turing', 'alan-turing', 'people/lVcTDLyYh20puN7ZrvYHjc9TNeW1vmYKOiDPmEj5.jpg', 1, '1912-06-23', '02:15:00', NULL, NULL, 'GMT h0e', 2, 2, 'آلن تورینگ (۱۹۱۲–۱۹۵۴) ریاضی‌دان، منطق‌دان و دانشمند بریتانیایی بود که از پیشگامان علوم کامپیوتر و هوش مصنوعی به شمار می‌رود. او در سال ۱۹۱۲ در لندن متولد شد و با ارائهٔ مفهوم «ماشین تورینگ» نقش مهمی در شکل‌گیری مبانی نظری محاسبات ایفا کرد. در جریان جنگ جهانی دوم، تورینگ در مرکز رمزگشایی بریتانیا در بلچلی پارک فعالیت کرد و در شکستن کدهای رمزگذاری‌شدهٔ آلمان، به‌ویژه رمز Enigma، نقش مهمی داشت. پس از جنگ نیز به توسعهٔ رایانه‌های اولیه و پژوهش دربارهٔ هوش مصنوعی پرداخت و آزمونی که امروزه با نام «آزمون تورینگ» شناخته می‌شود را مطرح کرد. زندگی او در سال‌های پایانی تحت تأثیر پیگرد قانونی به دلیل همجنس‌گرا بودن قرار گرفت و تورینگ در سال ۱۹۵۴ درگذشت؛ دهه‌ها بعد، از او به‌عنوان یکی از چهره‌های مهم تاریخ علوم کامپیوتر یاد شد.', 'https://fa.wikipedia.org/wiki/%D8%A2%D9%84%D9%86_%D8%AA%D9%88%D8%B1%DB%8C%D9%86%DA%AF', 1, '2026-10-03 05:34:04', '2026-10-05 02:16:32'),
(12, 'آنجلینا جولی', 'Angelina Jolie', 'angelina-jolie', 'people/AWMI0UrYhhMD6opFT0yi6ABCFMkpcmX8MJnCSyna.jpg', 2, '1975-06-04', '09:09:00', 3, NULL, 'PDT h7w', 4, 1, 'آنجلینا جولی (متولد ۱۹۷۵) بازیگر، فیلم‌ساز و فعال بشردوست آمریکایی است که در لس‌آنجلس، کالیفرنیا به دنیا آمد. او فعالیت حرفه‌ای خود را در دههٔ ۱۹۹۰ آغاز کرد و با بازی در فیلم‌هایی مانند Girl, Interrupted، Lara Croft: Tomb Raider و Mr. & Mrs. Smith به شهرت جهانی رسید و برای بازی در Girl, Interrupted جایزهٔ اسکار بهترین بازیگر نقش مکمل زن را دریافت کرد. جولی در کنار بازیگری به کارگردانی و تهیه‌کنندگی نیز پرداخت و فیلم‌هایی مانند In the Land of Blood and Honey و Unbroken را ساخت. او همچنین سال‌ها در زمینهٔ امور بشردوستانه و کمک به پناهندگان فعالیت کرده و به‌عنوان سفیر حسن‌نیت و سپس نمایندهٔ ویژهٔ کمیساریای عالی سازمان ملل متحد برای پناهندگان فعالیت داشته است.', 'https://fa.wikipedia.org/wiki/%D8%A2%D9%86%D8%AC%D9%84%DB%8C%D9%86%D8%A7_%D8%AC%D9%88%D9%84%DB%8C', 1, '2026-10-03 05:42:46', '2026-10-05 02:14:51'),
(13, 'بروس لی', 'Bruce Lee', 'bruce-lee', 'people/vYQll0EwRMLn8LhHrdDL6Fs84uwMyg035iKv3T3O.jpg', 1, '1940-11-27', '07:12:00', 3, 10, 'PST h8w', 8, 1, 'بروس لی (Bruce Lee؛ ۱۹۴۰–۱۹۷۳) استاد برجستهٔ هنرهای رزمی، بازیگر، فیلسوف و بنیان‌گذار سبک «جیت کان دو» بود که به‌عنوان یکی از تاثیرگذارترین چهره‌های فرهنگی قرن بیستم و نماد جهانی سینمای رزمی شناخته می‌شود. او که در سانفرانسیسکو متولد شد و در هنگ‌کنگ و آمریکا رشد یافت، با ترکیب تکنیک‌های اصیل کنگ‌فو وین‌چون با نگاهی مدرن و کاربردی، مرزهای سنتی هنرهای رزمی را کنار زد و به پدر هنرهای رزمی ترکیبی (MMA) معروف شد. بروس لی با ایفای نقش در فیلم‌های ماندگاری همچون اژدها وارد می‌شود و رئیس بزرگ، نه تنها نژادپرستی و کلیشه‌های رایج علیه آسیایی‌ها در سینمای هالیوود را در هم شکست، بلکه شور و اشتیاق جهانی برای یادگیری هنرهای رزمی شرق ایجاد کرد. درگذشت ناگهانی و مرموز او در سن ۳۲ سالگی، نامش را به اسطوره‌ای جاودانه در تاریخ ورزش و سینما تبدیل ساخت.', 'https://fa.wikipedia.org/wiki/%D8%A8%D8%B1%D9%88%D8%B3_%D9%84%DB%8C', 1, '2026-10-05 02:25:45', '2026-10-05 02:31:01'),
(14, 'کوکو شنل', 'Coco Chanel', 'coco-chanel', 'people/6wnn0lmjNavxV33LMmlkXLALp5J4J4XEzvYYFMnS.jpg', 2, '1883-08-19', '16:00:00', 8, 11, 'LMT m0w05', 9, 1, 'گابریل «کوکو» شنل (Gabrielle \"Coco\" Chanel؛ ۱۸۸۳–۱۹۷۱) طراح مد پیشگام فرانسوی و بنیان‌گذار برند جهانی «شنل» بود که دنیای مد و پوشاک زنانه در قرن بیستم را دگرگون کرد. او که دوران کودکی دشواری را پس از مرگ مادرش در یک پرورشگاه گذراند، خیاطی را همان‌جا آموخت و با خلاقیت استثنایی خود توانست کرست‌های تنگ و لباس‌های تکلف‌آمیز زنانه را کنار بزند و سبک مدرن، راحت و در عین حال شیکی متناسب با سبک زندگی زنان فعال معرفی کند. نوآوری‌های ساختارشکنانهٔ او مانند «پیراهن کوتاه مشکی» (Little Black Dress)، کت‌وشلوارهای فاستونی زنانه و عطر افسانه‌ای Chanel No. 5، نه‌تنها تعریفی تازه از ظرافت و زیبایی ارائه داد، بلکه به نمادی از استقلال و رهایی زنان تبدیل شد و نام او را به‌عنوان تنها طراح مد در فهرست ۱۰۰ فرد تأثیرگذار قرن بیستم مجلهٔ تایم ثبت کرد.', 'https://fa.wikipedia.org/wiki/%DA%A9%D9%88%DA%A9%D9%88_%D8%B4%D9%86%D9%84', 1, '2026-10-05 02:35:39', '2026-10-05 02:46:09'),
(15, 'هیلاری کلینتون', 'Hillary Clinton', 'hillary-clinton', 'people/oUWPlvp0WUqvmVRk8a5h3igRlpYtCwLpNdmVgM6E.jpg', 2, '1947-10-26', '18:45:00', 3, 8, 'CST h6w', 2, 1, 'هیلاری رودهام کلینتون (Hillary Rodham Clinton؛ متولد ۱۹۴۷) حقوق‌دان، سیاستمدار برجستهٔ آمریکایی و نخستین زن در تاریخ ایالات متحده است که توانست به‌عنوان نامزد نهایی یکی از احزاب اصلی (حزب دمکرات) در انتخابات ریاست‌جمهوری سال ۲۰۱۶ به رقابت بپردازد. او پس از فارغ‌التحصیلی از دانشکده حقوق ییل و فعالیت در حوزهٔ حقوق کودکان و زنان، با انتخاب همسرش بیل کلینتون به‌عنوانی ۶۷امین بانوی اول آمریکا (۱۹۹۳–۲۰۰۱) وارد عرصهٔ سیاست سراسری شد و نقش پررنگی در اصلاحات نظام سلامت ایفا کرد. هیلاری سپس به‌عنوان سناتور ایالت نیویورک (۲۰۰۱–۲۰۰۹) و شصت‌وهفتمین وزیر امور خارجه ایالات متحده در دورهٔ باراک اوباما (۲۰۰۹–۲۰۱۳) خدمت کرد؛ دورانی که با تعاملات پیچیده دیپلماتیک و چالش‌های بزرگی همچون جنبش‌های بهار عربی همراه بود. وی با کارنامه‌ای پرفرازونشیب شامل دستاوردهای تاریخی در تمکین حقوق زنان و همچنین جنجال‌هایی نظیر ماجرای سرور ایمیل‌های شخصی، یکی از تأثیرگذارترین و در عین حال پراختلاف‌ترین چهره‌های سیاسی معاصر آمریکا محسوب می‌شود.', 'https://fa.wikipedia.org/wiki/%D9%87%DB%8C%D9%84%D8%A7%D8%B1%DB%8C_%DA%A9%D9%84%DB%8C%D9%86%D8%AA%D9%88%D9%86', 1, '2026-10-05 02:52:39', '2026-10-05 02:55:04'),
(16, 'بیل گیتس', 'Bill Gates', 'gates-bill', 'people/yGSXlubDe9j4i1mw3VbhlEL4J8Iynz4smJkBUyDl.jpg', 1, '1955-10-28', '22:00:00', 3, NULL, 'PST h8w', 4, 2, 'بیل گیتس (Bill Gates؛ متولد ۱۹۵۵) کارآفرین، برنامه‌نویس و نیکوکار برجستهٔ آمریکایی است که با بنیان‌گذاری شرکت «مایکروسافت» در سال ۱۹۷۵ به همراه دوست دوران کودکی‌اش پل آلن، نقش کلیدی و تحول‌آفرینی در انقلاب رایانه‌های شخصی ایفا کرد. او که از دانشگاه هاروارد انصراف داد تا تمام تمرکز خود را روی توسعهٔ نرم‌افزار بگذارد، با عرضهٔ سیستم‌عامل‌های MS-DOS و سپس مایکروسافت ویندو، موفق شد دنیای پردازش رایانه‌ای را همگانی کند و برای سال‌های متمادی عنوان ثروتمندترین فرد جهان را به خود اختصاص دهد. گیتس در سال ۲۰۰۰ با کناره‌گیری تدریجی از مدیریت اجرایی مایکروسافت، بنیاد خیریه «بیل و ملیندا گیتس» را تأسیس کرد و بخش اعظم ثروت و وقت خود را وقف مبارزه با بیماری‌های واگیردار مانند فلج اطفال و مالاریا، بهبود بهداشت جهانی، ارتقای آموزش و مقابله با تغییرات اقلیمی ساخت.', 'https://fa.wikipedia.org/wiki/%D8%A8%DB%8C%D9%84_%DA%AF%DB%8C%D8%AA%D8%B3', 1, '2026-10-05 02:59:46', '2026-10-05 08:07:44'),
(17, 'آملیا ارهارت', 'Amelia Earhart', 'amelia-earhart', 'people/36lwDkKACTnCwZruLMkHYwCE4xHqmjqk8QtDUF2H.jpg', 2, '1897-07-24', '23:30:00', 3, 12, 'CST h6w', 1, 1, 'آمیلیا اِرهارت (Amelia Earhart؛ ۱۸۹۷–۱۹۳۷) خلبان پیشگام آمریکایی و از پرآوازه‌ترین چهره‌های تاریخ هوانوردی بود که به‌عنوان نخستین زنی که پرواز تک‌نفره بر فراز اقیانوس اطلس را در سال ۱۹۳۲ با موفقیت انجام داد، به شهرتی جهانی دست یافت. او علاوه بر ثبت چندین رکورد سرعت و ارتفاع در پرواز، کتاب‌های پرفروشی درباره تجربه پروازهایش به نگارش درآورد، سازمان بین‌المللی زنان خلبان موسوم به «Ninety-Nines» را پایه‌گذاری کرد و پرشورانه از حقوق برابر زنان و ترویج نقش آنان در صنعت هوانوردی دفاع نمود. ارهارت در سال ۱۹۳۷ هنگام تلاش برای ثبت رکورد نخستین پرواز دور دنیای زنان، به همراه ناوبُردش فرد نونان در حوالی جزیره هاولند در اقیانوس آرام به‌طور ناگهانی ناپدید شد؛ ناپدید شدنی مرموز که پس از ده‌ها سال جستجو همچنان یکی از بزرگ‌ترین و جذاب‌ترین رازهای تاریخ باقی مانده است.', 'https://fa.wikipedia.org/wiki/%D8%A2%D9%85%D9%84%DB%8C%D8%A7_%D8%A7%D8%B1%D9%87%D8%A7%D8%B1%D8%AA', 1, '2026-10-05 03:05:56', '2026-10-05 03:08:43'),
(18, 'مارگارت تاچر', 'Margaret Thatcher', 'margaret-thatcher', 'people/cvI8vsfDSjvhYyQ1V4KBmdbgEu8oDlfpsgkLKOQI.jpg', 2, '1925-10-13', '09:00:00', NULL, NULL, 'GMT h0e', 7, 2, 'مارگارت تاچر (Margaret Thatcher؛ ۱۹۲۵–۲۰۱۳) سیاستمدار برجستهٔ بریتانیایی بود که به‌عنوان نخستین نخست‌وزیر زن بریتانیا (۱۹۷۹–۱۹۹۰) و رهبر حزب محافظه‌کار، طولانی‌ترین دورهٔ نخست‌وزیری این کشور در قرن بیستم را به نام خود ثبت کرد. او که به دلیل ارادهٔ پولادین، صراحت کلام و خط‌مشی سیاسی قاطعانه و سرسختانه‌اش به «بانوی آهنین» (Iron Lady) شهرت یافت، با اجرای اصلاحات اقتصادی گسترده و رادیکال مبتنی بر بازار آزاد، خصوصی‌سازی شرکت‌های دولتی، کاهش قدرت اتحادیه‌های کارگری و کاهش هزینه‌های عمومی—موسوم به «تاچریسم»—ساختار اقتصادی و اجتماعی بریتانیا را بازآفرینی کرد. مواضع قاطعانهٔ او در بازپسی جزایر فالکلند در سال ۱۹۸۲ و ایستادگی سرسختانه‌اش در برابر بلوک شرق در دوران جنگ سرد، او را به یکی از تأثیرگذارترین و در عین حال بحث‌برانگیزترین رهبران سیاسی جهان در نیمه دوم قرن بیستم تبدیل کرد.', 'https://fa.wikipedia.org/wiki/%D9%85%D8%A7%D8%B1%DA%AF%D8%A7%D8%B1%D8%AA_%D8%AA%D8%A7%DA%86%D8%B1', 1, '2026-10-05 07:50:32', '2026-10-05 07:52:34');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'api-token', '4857d6efca60956918266b03406df1aa0f2300de9a26b79a0035fba4a8d360b0', '[\"*\"]', NULL, NULL, '2026-08-27 07:40:37', '2026-08-27 07:40:37'),
(6, 'App\\Models\\User', 1, 'api-token', '728d7f2a3e63f5324e9bed1f7a5c994dc41c283708f3bf53bb1652fc9ac0f71d', '[\"*\"]', NULL, NULL, '2026-09-02 05:44:22', '2026-09-02 05:44:22'),
(7, 'App\\Models\\User', 1, 'api-token', '4c3b91510aa705ee65169098b9bad04d708a30439b903666353fed883ab8078e', '[\"*\"]', '2026-09-02 05:51:26', NULL, '2026-09-02 05:51:03', '2026-09-02 05:51:26'),
(8, 'App\\Models\\User', 1, 'api-token', 'd437ea9b06701e4bff1e705a69b18a39ce2e5c3c146245eafb73c509b69109b4', '[\"*\"]', '2026-09-02 05:53:18', NULL, '2026-09-02 05:51:33', '2026-09-02 05:53:18'),
(9, 'App\\Models\\User', 1, 'api-token', '8e7ec9e283f62f8f8731d7cea8dd443d050a41f6442b8f2d1f8ec02cda56a169', '[\"*\"]', '2026-09-02 06:08:11', NULL, '2026-09-02 05:53:24', '2026-09-02 06:08:11'),
(10, 'App\\Models\\User', 1, 'api-token', '62f8280461193b6fabaf94f30e5fb160823cf9829d4df51e16f92543e1d5d251', '[\"*\"]', '2026-09-02 06:10:34', NULL, '2026-09-02 06:08:18', '2026-09-02 06:10:34'),
(11, 'App\\Models\\User', 1, 'api-token', '9dc185cda716e7cd41cac8b5b4caad46d973ee441c96b7c7908f7eeb708513cf', '[\"*\"]', '2026-09-02 06:13:24', NULL, '2026-09-02 06:10:41', '2026-09-02 06:13:24'),
(12, 'App\\Models\\User', 1, 'api-token', 'f207882da86b747d7c6b2bb1f7b53300fbafaaf69554a4a8229ab990263c09fa', '[\"*\"]', '2026-09-02 06:16:45', NULL, '2026-09-02 06:13:32', '2026-09-02 06:16:45'),
(13, 'App\\Models\\User', 1, 'api-token', 'd1962135280821c1cf2b368e0ff02ec7d1a0e42b22315e1c84e29a37feff8123', '[\"*\"]', '2026-09-02 06:18:19', NULL, '2026-09-02 06:17:01', '2026-09-02 06:18:19'),
(14, 'App\\Models\\User', 1, 'api-token', 'ce887a6c5a025394afd9fb3d61c340be2c5e35f761e64771ed2756124429a56a', '[\"*\"]', '2026-09-02 06:23:13', NULL, '2026-09-02 06:18:24', '2026-09-02 06:23:13'),
(15, 'App\\Models\\User', 1, 'api-token', '32e2b565000903a93bc638e1030eaa019d9b2c54a111c28ded61342f14a1bf5b', '[\"*\"]', '2026-09-02 06:32:24', NULL, '2026-09-02 06:24:20', '2026-09-02 06:32:24'),
(16, 'App\\Models\\User', 1, 'api-token', 'd46e13e660554541da6b65bcb9894343d0af9812091478bdc30a693568924a06', '[\"*\"]', '2026-09-02 06:32:44', NULL, '2026-09-02 06:32:31', '2026-09-02 06:32:44'),
(17, 'App\\Models\\User', 1, 'api-token', '329935e8b2f4e18fdf16db6eefe90e0f0be75f1696c104d4e386c18c265a009e', '[\"*\"]', '2026-09-02 06:49:30', NULL, '2026-09-02 06:46:52', '2026-09-02 06:49:30'),
(18, 'App\\Models\\User', 1, 'api-token', '7c46a3cc0967458ddab882ccd82fdb8106987b6b982b4876620f1e2b4b7ea207', '[\"*\"]', '2026-09-02 06:55:21', NULL, '2026-09-02 06:49:40', '2026-09-02 06:55:21'),
(19, 'App\\Models\\User', 1, 'api-token', '1806e36a90df9d85bd5e34bf0a02f681471f1735daa04bb1891823e48137a28b', '[\"*\"]', '2026-09-02 06:55:48', NULL, '2026-09-02 06:55:30', '2026-09-02 06:55:48'),
(20, 'App\\Models\\User', 1, 'api-token', 'a5c3c98ee6e248c1c58616c2c0f7b8cef1adae2fec36f8dd4b4d8a940156e4fb', '[\"*\"]', '2026-09-02 06:57:24', NULL, '2026-09-02 06:57:06', '2026-09-02 06:57:24'),
(21, 'App\\Models\\User', 1, 'api-token', '8937f23a35f56f352ab605900cd5d7f08927374603e0c0b9310f03198ee5d06f', '[\"*\"]', '2026-09-02 06:57:50', NULL, '2026-09-02 06:57:30', '2026-09-02 06:57:50'),
(22, 'App\\Models\\User', 1, 'api-token', 'ac8bc9dbaa18a97a998524edf7b0016885ef0938406cc1abfb5d7adb6f10bf41', '[\"*\"]', '2026-09-02 11:18:45', NULL, '2026-09-02 06:57:57', '2026-09-02 11:18:45'),
(23, 'App\\Models\\User', 1, 'api-token', '504df0ab64e79c46c179b9adbfa1388c752c2885f39aa58a796f6eb295067370', '[\"*\"]', '2026-09-03 10:08:44', NULL, '2026-09-03 08:52:10', '2026-09-03 10:08:44'),
(24, 'App\\Models\\User', 1, 'api-token', 'ca9dcec1aae16a484096fc0d0d148c4457b3e1bc8667ad23bcc3a859a73d2cc1', '[\"*\"]', '2026-09-03 10:32:03', NULL, '2026-09-03 10:30:38', '2026-09-03 10:32:03'),
(25, 'App\\Models\\User', 1, 'api-token', '7815cd338b365575a1b164ee8b8aef9041d94a38a09d8b30a96c158cd314d612', '[\"*\"]', '2026-09-03 10:32:31', NULL, '2026-09-03 10:32:15', '2026-09-03 10:32:31'),
(26, 'App\\Models\\User', 1, 'api-token', 'ed3e77fc32564cba1833bef6b2cb8970556482d622f0221d6e2e5c2b2364621d', '[\"*\"]', '2026-09-03 10:33:26', NULL, '2026-09-03 10:32:35', '2026-09-03 10:33:26'),
(27, 'App\\Models\\User', 1, 'api-token', '15f776c9e7fc724e03a71b9dd4680dd77b8fb05883647f94d357816691941cfa', '[\"*\"]', '2026-09-03 10:34:42', NULL, '2026-09-03 10:33:31', '2026-09-03 10:34:42'),
(28, 'App\\Models\\User', 1, 'api-token', '07c7c083f147f49a3a31f8a46e7acb51ce1d8b4098485bffe65aad225ea6822e', '[\"*\"]', '2026-09-03 10:36:53', NULL, '2026-09-03 10:36:49', '2026-09-03 10:36:53'),
(30, 'App\\Models\\User', 1, 'api-token', '146d4f526207cb1b9d937d51454992be7cef1ed9e43e40c9c9dd2d2b4e3e999e', '[\"*\"]', '2026-09-03 10:40:01', NULL, '2026-09-03 10:37:21', '2026-09-03 10:40:01'),
(31, 'App\\Models\\User', 1, 'api-token', '1f2df1623b755bbce82b60982cb14518290514b49d509eaa4f0fb76c9bf3b7ee', '[\"*\"]', '2026-09-03 10:40:10', NULL, '2026-09-03 10:40:09', '2026-09-03 10:40:10'),
(32, 'App\\Models\\User', 1, 'api-token', '5ef0be972fbad57621390d0e4276b86d4a03924d73728a8cd9d1c76c1777b0ae', '[\"*\"]', '2026-09-03 10:46:38', NULL, '2026-09-03 10:40:19', '2026-09-03 10:46:38'),
(33, 'App\\Models\\User', 1, 'api-token', '9c686df02c3a50ce30b07f448bbd2e0f2498a4bb58f05d8004d16b0470f63cdf', '[\"*\"]', '2026-09-03 10:49:38', NULL, '2026-09-03 10:46:50', '2026-09-03 10:49:39'),
(37, 'App\\Models\\User', 1, 'api-token', '3bdcb55c7686ec560b5fe265decd9f0f147113c60bb870910d290dbe4d7a0ff0', '[\"*\"]', NULL, NULL, '2026-09-03 12:32:17', '2026-09-03 12:32:17'),
(38, 'App\\Models\\User', 1, 'api-token', '5d14e9c5c25ebb71714dacd1af3d0d9d20c515e0de66a94881c0b4c7d96eb46a', '[\"*\"]', NULL, NULL, '2026-09-03 14:51:24', '2026-09-03 14:51:24'),
(39, 'App\\Models\\User', 1, 'api-token', '11ad3211cdee49b2ed3d8a552f2ed7c17b9670b59f0377fdf37fbdc3f28df394', '[\"*\"]', NULL, NULL, '2026-09-04 13:44:09', '2026-09-04 13:44:09'),
(41, 'App\\Models\\User', 1, 'api-token', '40b97f92c63962cf1d43d2ddd68fda8cd4b774d0e159aac56a1d6740adb3a3b0', '[\"*\"]', NULL, NULL, '2026-09-22 04:09:08', '2026-09-22 04:09:08'),
(43, 'App\\Models\\User', 1, 'api-token', '805bb7d2e5befc0ef72cb7e1b973b4202360bfd685a4f30dc247a653f644e464', '[\"*\"]', NULL, NULL, '2026-09-22 08:53:28', '2026-09-22 08:53:28'),
(44, 'App\\Models\\User', 1, 'api-token', '543d9348225a50c1c2a4ba3d8f18c4574d2d794a3f4413cbbfc2fac92a1425b5', '[\"*\"]', NULL, NULL, '2026-09-22 09:05:42', '2026-09-22 09:05:42'),
(45, 'App\\Models\\User', 1, 'api-token', 'a106c8912e11eadd4196e64f12e6b019b6980c8d8aac48f1b16745504fe2bd00', '[\"*\"]', NULL, NULL, '2026-09-22 14:19:22', '2026-09-22 14:19:22'),
(46, 'App\\Models\\User', 1, 'api-token', '8c206fd0a757d57714f8d68853dce8b3bd2fdaf0fddd4a7cf30e73eb576c24dd', '[\"*\"]', NULL, NULL, '2026-09-23 11:45:14', '2026-09-23 11:45:14'),
(47, 'App\\Models\\User', 1, 'api-token', 'b035e9e39184938cac5b4f3b88f7e9403111c28698766474f43f4e741def033a', '[\"*\"]', NULL, NULL, '2026-09-24 18:11:40', '2026-09-24 18:11:40'),
(48, 'App\\Models\\User', 1, 'api-token', 'fd40ff0220e493f816d07ec5db8f5745ebdded99908e309370e8b5dfd65ae7fc', '[\"*\"]', NULL, NULL, '2026-09-25 03:28:26', '2026-09-25 03:28:26'),
(49, 'App\\Models\\User', 1, 'api-token', '4d443ee504d6abd8aad2cb851eea0486c416ef0e3c4f767d43ecc910ae84f9c0', '[\"*\"]', NULL, NULL, '2026-09-25 08:41:41', '2026-09-25 08:41:41'),
(53, 'App\\Models\\User', 1, 'api-token', 'a38bb73d742740a6fc9f0590780b9bb3984c9ffeb9fc4c10edefc2c8c807b3c8', '[\"*\"]', '2026-09-28 12:12:09', NULL, '2026-09-28 12:10:38', '2026-09-28 12:12:09'),
(56, 'App\\Models\\User', 1, 'api-token', '586515cf0e22a846b6a810a3d6548b2424d69cf29c2db9b66faffadfbf3ab249', '[\"*\"]', NULL, NULL, '2026-09-30 02:43:15', '2026-09-30 02:43:15'),
(57, 'App\\Models\\User', 1, 'api-token', '9fbc9f837e839c238285f9c56d2742154d4f427da54e4a44fcf0e3a5861e46b3', '[\"*\"]', NULL, NULL, '2026-09-30 17:10:20', '2026-09-30 17:10:20'),
(58, 'App\\Models\\User', 1, 'api-token', '2619847c113854d3f79c8e0908d6087e5ef0815c2ffa448b1b087b882d447739', '[\"*\"]', '2026-10-02 05:12:12', NULL, '2026-10-01 01:48:38', '2026-10-02 05:12:12'),
(61, 'App\\Models\\User', 3, 'api-token', 'e40c785db2ec55315a2bc7cf1b4741f0973d8554c7924da34f19c21eb4df2e1d', '[\"*\"]', NULL, NULL, '2026-10-01 17:23:34', '2026-10-01 17:23:34'),
(62, 'App\\Models\\User', 3, 'api-token', '98c6af10698659efda30b95947c877812b92adfff3e8be3005d5dac14ae7bda7', '[\"*\"]', NULL, NULL, '2026-10-01 17:23:46', '2026-10-01 17:23:46'),
(63, 'App\\Models\\User', 3, 'api-token', 'b0c48d5dca726f9a29b4a07a47011fd61b03ee2dad69759b1588465a5d9fb23e', '[\"*\"]', NULL, NULL, '2026-10-01 17:24:15', '2026-10-01 17:24:15'),
(64, 'App\\Models\\User', 1, 'api-token', '352d69af02ce790b27e3709e5a3b8d821e06ba08eb27987b04f7b5100fa4a853', '[\"*\"]', '2026-10-02 05:01:32', NULL, '2026-10-01 17:26:08', '2026-10-02 05:01:32'),
(65, 'App\\Models\\User', 2, 'api-token', 'f19f20f52dd9b83c0d635e8ae4edc10f2272184c79218283c94d4f1b5b234e60', '[\"*\"]', NULL, NULL, '2026-10-02 08:59:48', '2026-10-02 08:59:48'),
(66, 'App\\Models\\User', 2, 'api-token', '1de2d9e587d265ddcfa087c1ec64ae2378352e634592b535dd0c21155f2f357b', '[\"*\"]', NULL, NULL, '2026-10-02 09:04:53', '2026-10-02 09:04:53'),
(67, 'App\\Models\\User', 2, 'api-token', '4e9e8e1ffd849079487f26c59241758610536b78d4588f81c92cca8077b9e3fa', '[\"*\"]', NULL, NULL, '2026-10-02 11:21:29', '2026-10-02 11:21:29'),
(68, 'App\\Models\\User', 2, 'api-token', '15605ee758d18ed27f51fdebc27e0b25ba2aae71e8e808e07495af83ce90ffd6', '[\"*\"]', '2026-10-02 13:10:03', NULL, '2026-10-02 11:22:36', '2026-10-02 13:10:03'),
(72, 'App\\Models\\User', 1, 'api-token', '9043097c7078a41c5ecd7e70465953b5489c7b75b2993420da8e0aa4867e845b', '[\"*\"]', '2026-10-02 13:49:49', NULL, '2026-10-02 13:49:41', '2026-10-02 13:49:49'),
(75, 'App\\Models\\User', 1, 'api-token', '33f87bb22690ac44ba5ffd52a14d6a23e10d65d704c79e3fc2260c17ea59b975', '[\"*\"]', NULL, NULL, '2026-10-02 18:25:59', '2026-10-02 18:25:59'),
(77, 'App\\Models\\User', 2, 'api-token', '659622c4d82f2c5a4fead69f2cc908a3cbe5df142d5385a1f28e7c62c27e2e0f', '[\"*\"]', '2026-10-03 03:27:09', NULL, '2026-10-02 18:39:50', '2026-10-03 03:27:09'),
(80, 'App\\Models\\User', 1, 'api-token', '448e0fd28037d81419b97e6a05ed8fe021b93c9af6f8bbfaedc373cf85b7c8d4', '[\"*\"]', '2026-10-03 05:52:10', NULL, '2026-10-03 05:37:29', '2026-10-03 05:52:10'),
(81, 'App\\Models\\User', 1, 'api-token', '087ee52a24ced7e79cd0846b493a19130ff4d488414fd8817feba9282e03d4c0', '[\"*\"]', '2026-10-03 15:44:10', NULL, '2026-10-03 15:41:03', '2026-10-03 15:44:10'),
(83, 'App\\Models\\User', 2, 'api-token', '51972f31143e8319c2c43dd6190da2db420222c783d526c1264a60ab3a7e58a7', '[\"*\"]', '2026-10-04 03:18:51', NULL, '2026-10-04 03:18:39', '2026-10-04 03:18:51'),
(84, 'App\\Models\\User', 2, 'api-token', 'a6e8fad4c7085deb8804e2c02d165c5b11b9fec771979863c200969109e6cf33', '[\"*\"]', '2026-10-04 14:17:09', NULL, '2026-10-04 03:40:20', '2026-10-04 14:17:09'),
(87, 'App\\Models\\User', 1, 'api-token', '66394c57cfa001ea8581b1d0790a1a43dff9fcda83ab9189ef48e976c866166d', '[\"*\"]', '2026-10-04 11:51:25', NULL, '2026-10-04 11:49:52', '2026-10-04 11:51:25'),
(88, 'App\\Models\\User', 2, 'api-token', 'f3e554aa0cfc018c1c819ded9f60930798d3ce63672a5037d181acbe74a031fa', '[\"*\"]', '2026-10-04 14:39:58', NULL, '2026-10-04 11:51:39', '2026-10-04 14:39:58'),
(89, 'App\\Models\\User', 2, 'api-token', '0263261ec988f9fd1e876c1567347b0c1d2095445a4834080bf01b514b30feb6', '[\"*\"]', '2026-10-04 13:46:54', NULL, '2026-10-04 13:42:00', '2026-10-04 13:46:54'),
(90, 'App\\Models\\User', 2, 'api-token', '8e6409fee809fe1d8ef4e2f4185b441ac2f7dd78655c4340be2349c1f0a1bd7e', '[\"*\"]', '2026-10-04 13:54:59', NULL, '2026-10-04 13:53:10', '2026-10-04 13:54:59'),
(91, 'App\\Models\\User', 2, 'api-token', 'b045f7efd60deaf08598638afeb51f8ffa252d9dcddb50c7241e8b43b52763d7', '[\"*\"]', '2026-10-04 14:14:24', NULL, '2026-10-04 14:13:58', '2026-10-04 14:14:24'),
(95, 'App\\Models\\User', 2, 'api-token', '627b43722bd98fcc1a7b4396c0056c57f328b67f334ac1d04d0294d5289441fc', '[\"*\"]', '2026-10-05 08:37:58', NULL, '2026-10-05 02:48:56', '2026-10-05 08:37:58'),
(96, 'App\\Models\\User', 1, 'api-token', '0f68c63422d395b2bab9c2ead99a8c73b7c9db365e54ea0191d0af40320edf98', '[\"*\"]', '2026-10-05 05:03:38', NULL, '2026-10-05 05:01:20', '2026-10-05 05:03:38');

-- --------------------------------------------------------

--
-- Table structure for table `planets`
--

CREATE TABLE `planets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `name_eng` varchar(20) NOT NULL,
  `name_arabic` varchar(20) DEFAULT NULL,
  `name_sanskrit` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `symbol` varchar(255) NOT NULL,
  `nature_id` bigint(20) UNSIGNED DEFAULT NULL,
  `guna_1_id` bigint(20) UNSIGNED DEFAULT NULL,
  `guna_2_id` bigint(20) UNSIGNED DEFAULT NULL,
  `element_1_id` bigint(20) UNSIGNED DEFAULT NULL,
  `element_2_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `planets`
--

INSERT INTO `planets` (`id`, `name`, `name_eng`, `name_arabic`, `name_sanskrit`, `image`, `icon`, `symbol`, `nature_id`, `guna_1_id`, `guna_2_id`, `element_1_id`, `element_2_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'خورشید', 'sun', 'شمس', 'سوریا', 'sun.png', 'sun.png', 'sun.png', 4, 1, 2, 3, 2, '2026-08-30 13:36:14', '2026-09-24 03:05:14', NULL),
(2, 'ماه', 'moon', 'قمر', 'چاندرا', 'moon.png', 'moon.png', 'moon.png', 1, 1, 3, 4, 2, '2026-09-24 03:04:58', '2026-09-24 03:04:58', NULL),
(3, 'بهرام', 'mars', 'مریخ', 'مانگالا', 'mars.png', 'mars.png', 'mars.png', 5, 3, 2, 3, 5, '2026-09-24 03:07:08', '2026-09-24 03:07:08', NULL),
(4, 'تیر', 'mercury', 'عطارد', 'بودا', 'mercury.png', 'mercury.png', 'mercury.png', 1, 2, 1, 5, 2, '2026-09-24 03:08:32', '2026-09-24 03:09:02', NULL),
(5, 'هرمز', 'jupiter', 'مشتری', 'گورو', 'jupyter.png', 'jupyter.png', 'jupyter.png', 3, 1, 1, 1, 4, '2026-09-24 03:10:53', '2026-09-24 03:10:53', NULL),
(6, 'ناهید', 'venus', 'زهره', 'شوکرا', 'venus.png', 'venus.png', 'venus.png', 2, 2, 1, 4, 2, '2026-09-24 03:12:11', '2026-09-24 03:12:11', NULL),
(7, 'کیوان', 'saturn', 'زحل', 'شانی', 'saturn.png', 'saturn.png', 'saturn.png', 6, 3, 3, 2, 5, '2026-09-24 08:21:28', '2026-09-24 08:21:28', NULL),
(8, 'سر اژدها', 'north node', 'راس جوزهرین', 'راهو', NULL, NULL, 'rahu', 6, 3, 3, 2, 5, '2026-09-24 08:24:24', '2026-09-24 08:24:24', NULL),
(9, 'دم اژدها', 'south node', 'ذنب جوزهرین', 'کیتو', NULL, NULL, 'ketu', 5, 3, 2, 3, 2, '2026-09-24 08:25:54', '2026-09-24 08:25:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `qualities`
--

CREATE TABLE `qualities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `name_eng` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qualities`
--

INSERT INTO `qualities` (`id`, `name`, `name_eng`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'متحرک', 'Movable', '2026-08-30 13:36:40', '2026-10-03 04:01:05', NULL),
(2, 'ثابت', 'Fixed', '2026-09-23 12:55:53', '2026-09-23 12:56:17', NULL),
(3, 'دوگانه', 'Dual', '2026-09-23 12:57:05', '2026-09-23 12:57:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `name_eng` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `name_eng`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'مدیر', 'admin', 'مدیر سیستم', '2026-08-27 04:03:12', '2026-08-27 04:03:12', NULL),
(2, 'اپراتور', 'operator', 'اپراتور', '2026-09-28 11:47:26', '2026-09-28 11:47:26', NULL),
(3, 'شاگرد', 'student', 'شاگرد', '2026-09-28 11:48:11', '2026-09-28 11:48:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sample_analyses`
--

CREATE TABLE `sample_analyses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `person_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `pdf` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `display_order` smallint(6) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2xLDWAOAC8hsejNvxDmrzb7LDQ2mNWyr63JpS5Mc', NULL, '::1', 'PostmanRuntime/2.4.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMVdoNnpkam01U1gwcFdhak9KdjZzcjJFczQ0Q3lwZTF5OTNYbGZZYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3QvdG9oaW5vb3IvdG9oaW5vb3ItYXBpL3B1YmxpYyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788109711),
('djstUbfqvxlnN9oCygB9sDeh7G0HjliDRcQ9nfTs', NULL, '::1', 'PostmanRuntime/2.7.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic3BmZEVkcFBNVWNFOHBtV2lnbktLTVdyWWlOYzNWYUpZS3VEWWxxcSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3QvdG9oaW5vb3IvdG9oaW5vb3ItYXBpL3B1YmxpYyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1790286810),
('mK0MKf33BwXLfmgNRLx0xJnC7LgeamU1ECzfZCwy', NULL, '::1', 'PostmanRuntime/7.56.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXBmQW9xdGI3QlZ2eGcwS0laTVNGMGlSMWg3dGRHQVhxelpCWWFrNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3QvdG9oaW5vb3IvdG9oaW5vb3ItYXBpL3B1YmxpYyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787815960),
('UR1qzpZ3rqnlbwrZ54TpEm9E9onOkYB8red3gvMG', NULL, '::1', 'PostmanRuntime/7.56.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmlyb2VSYkx0S0xkUFJhYjJwYlhJSlZZVENBdkRMNGVCNjVnRVcxZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3QvdG9oaW5vb3IvdG9oaW5vb3ItYXBpL3B1YmxpYyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788089160),
('WXgG64NNoXUnyXQBLE3S5kV6dQ9s0KrVLNxXfoTI', NULL, '::1', 'PostmanRuntime/2.6.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSnNnck03Yk10QmRhR01XVkJmaU9XVHo1bEVWRmd1Z09IU2RTNlM5SSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3QvdG9oaW5vb3IvdG9oaW5vb3ItYXBpL3B1YmxpYyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1790101503);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `password`, `role_id`, `status`, `last_login_at`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'مدیر سیستم', 'admin', 'admin@example.com', '$2y$10$OPdduOjZuEEVJh1DkAUqFuPMMd4/tx4EuMre0q1qalhmwrV9.bSca', 1, 1, '2026-10-05 05:01:20', NULL, '2026-08-27 04:03:19', '2026-10-05 05:01:20', NULL),
(2, 'استاد', 'mreza', 'mreza@gmail.com', '$2y$12$nftD2AA2Trt1N6Rve6qQ6.CCWgw2em5EC7Am6T.mPlyt23Z0zc5rq', 2, 1, '2026-10-05 02:48:56', NULL, '2026-09-30 02:25:27', '2026-10-05 02:48:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zodiac_signs`
--

CREATE TABLE `zodiac_signs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `name_eng` varchar(20) NOT NULL,
  `name_arabic` varchar(20) DEFAULT NULL,
  `name_sanskrit` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `symbol` varchar(255) NOT NULL,
  `planet_id` bigint(20) UNSIGNED NOT NULL,
  `element_id` bigint(20) UNSIGNED NOT NULL,
  `quality_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zodiac_signs`
--

INSERT INTO `zodiac_signs` (`id`, `name`, `name_eng`, `name_arabic`, `name_sanskrit`, `image`, `icon`, `symbol`, `planet_id`, `element_id`, `quality_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'قوچ', 'aris', 'حمل', 'mesha', 'aries.svg', 'aries.png', 'aries.png', 3, 3, 1, '2026-08-30 13:36:46', '2026-09-24 08:38:33', NULL),
(2, 'گاو', 'Taurus', 'ثور', 'vrishabha', 'taurus.svg', 'taurus.png', 'taurus.png', 6, 5, 2, '2026-09-24 08:38:18', '2026-09-24 08:38:18', NULL),
(3, 'دوپیکر', 'gemini', 'جوزا', 'mithuna', 'gemini.svg', 'gemini.png', 'gemini.png', 4, 2, 3, '2026-09-24 08:39:54', '2026-09-24 08:39:54', NULL),
(4, 'خرچنگ', 'cancer', 'سرطان', 'karka/kataka', 'cancer.svg', 'cancer.png', 'cancer.png', 2, 4, 1, '2026-09-24 08:41:27', '2026-09-24 08:41:27', NULL),
(5, 'شیر', 'leo', 'اسد', 'simha', 'leo.svg', 'leo.png', 'leo.png', 1, 3, 2, '2026-09-24 08:42:25', '2026-09-24 08:42:25', NULL),
(6, 'خوشه', 'virgo', 'سنبله', 'kanya', 'virgo.svg', 'virgo.png', 'virgo.png', 4, 5, 3, '2026-09-24 08:44:45', '2026-09-24 08:44:45', NULL),
(7, 'ترازو', 'libra', 'میزان', 'tula', 'libra.svg', 'libra.png', 'libra.png', 6, 2, 1, '2026-09-24 08:48:49', '2026-09-24 08:48:49', NULL),
(8, 'کژدم', 'Scorpion', 'عقرب', 'vrishchika', 'scorpio.svg', 'scorpio.png', 'scorpio.png', 3, 4, 2, '2026-09-24 08:55:08', '2026-09-24 08:55:08', NULL),
(9, 'کمان', 'sagittarius', 'قوس', 'dhanus', 'sagittarius.svg', 'sagittarius.png', 'sagittarius.png', 5, 3, 3, '2026-09-24 08:56:32', '2026-09-24 08:56:32', NULL),
(10, 'بز', 'capricorn', 'جدی', 'makara', 'capricorn.svg', 'capricorn.png', 'capricorn.png', 7, 5, 1, '2026-09-24 08:57:38', '2026-09-24 08:57:38', NULL),
(11, 'آبریزان', 'aquarius', 'دلو', 'kumbha', 'aquarius.svg', 'aquarius.png', 'aquarius.png', 7, 2, 2, '2026-09-24 08:58:58', '2026-09-24 08:58:58', NULL),
(12, 'دو ماهی', 'pisces', 'حوت', 'mina', 'pisces.svg', 'pisces.png', 'pisces.png', 5, 4, 3, '2026-09-24 09:00:19', '2026-09-24 09:00:19', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `birth_accuracies`
--
ALTER TABLE `birth_accuracies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `birth_accuracies_code_unique` (`code`),
  ADD UNIQUE KEY `birth_accuracies_name_eng_unique` (`name_eng`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_people`
--
ALTER TABLE `book_people`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `book_people_book_id_person_id_unique` (`book_id`,`person_id`),
  ADD KEY `book_people_person_id_foreign` (`person_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `charts`
--
ALTER TABLE `charts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `charts_person_id_chart_type_id_unique` (`person_id`,`chart_type_id`),
  ADD KEY `charts_chart_type_id_foreign` (`chart_type_id`);

--
-- Indexes for table `chart_types`
--
ALTER TABLE `chart_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `chart_types_name_eng_unique` (`name_eng`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cities_country_id_name_eng_unique` (`country_id`,`name_eng`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `countries_name_eng_unique` (`name_eng`);

--
-- Indexes for table `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `elements_name_eng_unique` (`name_eng`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `genders_name_eng_unique` (`name_eng`);

--
-- Indexes for table `gunas`
--
ALTER TABLE `gunas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gunas_name_eng_unique` (`name_eng`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie_people`
--
ALTER TABLE `movie_people`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `movie_people_movie_id_person_id_unique` (`movie_id`,`person_id`),
  ADD KEY `movie_people_person_id_foreign` (`person_id`);

--
-- Indexes for table `natures`
--
ALTER TABLE `natures`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `natures_name_eng_unique` (`name_eng`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `people_slug_unique` (`slug`),
  ADD KEY `people_gender_id_foreign` (`gender_id`),
  ADD KEY `people_country_id_foreign` (`country_id`),
  ADD KEY `people_city_id_foreign` (`city_id`),
  ADD KEY `people_zodiac_sign_id_foreign` (`zodiac_sign_id`),
  ADD KEY `people_birth_accuracy_id_foreign` (`birth_accuracy_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `planets`
--
ALTER TABLE `planets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `planets_name_eng_unique` (`name_eng`),
  ADD KEY `planets_nature_id_foreign` (`nature_id`),
  ADD KEY `planets_guna_1_id_foreign` (`guna_1_id`),
  ADD KEY `planets_guna_2_id_foreign` (`guna_2_id`),
  ADD KEY `planets_element_1_id_foreign` (`element_1_id`),
  ADD KEY `planets_element_2_id_foreign` (`element_2_id`);

--
-- Indexes for table `qualities`
--
ALTER TABLE `qualities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `qualities_name_eng_unique` (`name_eng`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_eng_unique` (`name_eng`);

--
-- Indexes for table `sample_analyses`
--
ALTER TABLE `sample_analyses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sample_analyses_person_id_index` (`person_id`),
  ADD KEY `sample_analyses_user_id_index` (`user_id`),
  ADD KEY `sample_analyses_display_order_index` (`display_order`),
  ADD KEY `sample_analyses_status_index` (`status`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_index` (`role_id`);

--
-- Indexes for table `zodiac_signs`
--
ALTER TABLE `zodiac_signs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `zodiac_signs_name_eng_unique` (`name_eng`),
  ADD KEY `zodiac_signs_planet_id_foreign` (`planet_id`),
  ADD KEY `zodiac_signs_element_id_foreign` (`element_id`),
  ADD KEY `zodiac_signs_quality_id_foreign` (`quality_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `birth_accuracies`
--
ALTER TABLE `birth_accuracies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `book_people`
--
ALTER TABLE `book_people`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `charts`
--
ALTER TABLE `charts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `chart_types`
--
ALTER TABLE `chart_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `elements`
--
ALTER TABLE `elements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gunas`
--
ALTER TABLE `gunas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `movie_people`
--
ALTER TABLE `movie_people`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `natures`
--
ALTER TABLE `natures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `planets`
--
ALTER TABLE `planets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `qualities`
--
ALTER TABLE `qualities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sample_analyses`
--
ALTER TABLE `sample_analyses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zodiac_signs`
--
ALTER TABLE `zodiac_signs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book_people`
--
ALTER TABLE `book_people`
  ADD CONSTRAINT `book_people_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `book_people_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`);

--
-- Constraints for table `charts`
--
ALTER TABLE `charts`
  ADD CONSTRAINT `charts_chart_type_id_foreign` FOREIGN KEY (`chart_type_id`) REFERENCES `chart_types` (`id`),
  ADD CONSTRAINT `charts_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`);

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Constraints for table `movie_people`
--
ALTER TABLE `movie_people`
  ADD CONSTRAINT `movie_people_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `movie_people_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`);

--
-- Constraints for table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `people_birth_accuracy_id_foreign` FOREIGN KEY (`birth_accuracy_id`) REFERENCES `birth_accuracies` (`id`),
  ADD CONSTRAINT `people_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `people_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `people_gender_id_foreign` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`),
  ADD CONSTRAINT `people_zodiac_sign_id_foreign` FOREIGN KEY (`zodiac_sign_id`) REFERENCES `zodiac_signs` (`id`);

--
-- Constraints for table `planets`
--
ALTER TABLE `planets`
  ADD CONSTRAINT `planets_element_1_id_foreign` FOREIGN KEY (`element_1_id`) REFERENCES `elements` (`id`),
  ADD CONSTRAINT `planets_element_2_id_foreign` FOREIGN KEY (`element_2_id`) REFERENCES `elements` (`id`),
  ADD CONSTRAINT `planets_guna_1_id_foreign` FOREIGN KEY (`guna_1_id`) REFERENCES `gunas` (`id`),
  ADD CONSTRAINT `planets_guna_2_id_foreign` FOREIGN KEY (`guna_2_id`) REFERENCES `gunas` (`id`),
  ADD CONSTRAINT `planets_nature_id_foreign` FOREIGN KEY (`nature_id`) REFERENCES `natures` (`id`);

--
-- Constraints for table `sample_analyses`
--
ALTER TABLE `sample_analyses`
  ADD CONSTRAINT `sample_analyses_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`),
  ADD CONSTRAINT `sample_analyses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `zodiac_signs`
--
ALTER TABLE `zodiac_signs`
  ADD CONSTRAINT `zodiac_signs_element_id_foreign` FOREIGN KEY (`element_id`) REFERENCES `elements` (`id`),
  ADD CONSTRAINT `zodiac_signs_planet_id_foreign` FOREIGN KEY (`planet_id`) REFERENCES `planets` (`id`),
  ADD CONSTRAINT `zodiac_signs_quality_id_foreign` FOREIGN KEY (`quality_id`) REFERENCES `qualities` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
