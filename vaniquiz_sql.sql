-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 03, 2024 lúc 02:46 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vaniquiz`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `text` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`, `created`) VALUES
(1, 1, 'Hand over membership card', 0, '2024-03-03 12:01:54'),
(2, 1, 'Tell your Phone number', 0, '2024-03-03 12:01:54'),
(3, 1, 'Show Vani Barcode on the Home screen', 1, '2024-03-03 12:01:54'),
(4, 2, 'Vani Point', 0, '2024-03-03 12:01:54'),
(5, 2, 'Vani Coin', 1, '2024-03-03 12:01:54'),
(6, 2, 'Vani Money', 0, '2024-03-03 12:01:54'),
(7, 3, 'Leave a 1:1 inquiry\r\n', 0, '2024-03-03 12:01:54'),
(8, 3, 'Run the vani app every day', 0, '2024-03-03 12:01:54'),
(9, 3, 'Play Shake\r\n', 1, '2024-03-03 12:01:54'),
(10, 4, 'Exchange to Voucher', 1, '2024-03-03 12:01:54'),
(11, 4, 'Buy a product at stores\r\n', 0, '2024-03-03 12:01:54'),
(12, 4, ' Exchange to membership points', 1, '2024-03-03 12:01:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` text COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `email`, `password_hash`, `name`, `active`, `created_at`) VALUES
(5, 'vucules@gmail.com', '$2b$10$igUoeI2pemUJmJsnQz7KZOEDyy5YXN.o22bi4U5rlRzZS8B6ybVue', 'Vũ', 1, '2024-03-03 16:32:38'),
(6, 'vucules@gmail.com', '$2b$10$XOcm8UfvTNtEIMMzDQARvuzG.nW5tLnV0RjN/rzntsPf2iqBMYtMO', 'Vũ', 1, '2024-03-03 17:02:12'),
(7, 'vucules@gmail.com', '$2b$10$RkHc7jpUArpdxpzUk.tpxe4LIa31kjc3WMLN3KD3cqbOtYy48Wg9y', 'Vũ', 1, '2024-03-03 17:02:20'),
(8, 'string@gmail.com', '$2b$10$rs3MHYFtgzaglfUVYRIgKOKieZSPjgHvR07/WsIsbG0i4PFHF0sYe', 'string', 1, '2024-03-03 18:34:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `question` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `hint` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `questions`
--

INSERT INTO `questions` (`id`, `title`, `question`, `hint`, `created`) VALUES
(1, 'Quiz 1', 'How can you accumulate and use membership points with vani?', '*To earn/use membership points with vani benefits, scan the Vani Barcode', '2024-03-03 11:56:48'),
(2, 'Quiz 2', 'What is an additional reward when you earn membership points with vani?', '*Earn/use membership points with vani. Open Ice Cream. Get Vani Coins\r\n', '2024-03-03 11:56:48'),
(3, 'Quiz 3', 'There is another way to get Vani Coin. What is it?', '*You can get additional Vani Coins when you play Shake once a day\r\n', '2024-03-03 11:58:20'),
(4, 'Quiz 4', 'How can you use Vani Coin? Please choose 2 answers.', '*Your Vani Coins can be exchanged for other membership points or Vouchers', '2024-03-03 11:58:20');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
