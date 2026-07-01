-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2026 at 09:57 PM
-- Server version: 11.8.6-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u696050269_college_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `attachment_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `file_name` varchar(50) NOT NULL,
  `file_url` varchar(50) NOT NULL,
  `upload_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`attachment_id`, `request_id`, `file_name`, `file_url`, `upload_date`) VALUES
(1, 1, 'صورة_الهوية.pdf', 'uploads/id_card.pdf', '2026-06-01'),
(2, 2, 'البطاقة_الجامعية.pdf', 'uploads/student_card.pdf', '2026-06-02'),
(9, 2, '', 'uploads/c8ab5b75b74f7c5c4013dcd489641405.pdf', '2026-06-08'),
(11, 2, 'زمن جلسة 3.pdf', 'uploads/6a272a4dc1435.pdf', '2026-06-08'),
(12, 2, 'زمن جلسة 3.pdf', 'uploads/6a272a861edc3.pdf', '2026-06-08'),
(13, 2, '', 'uploads/4c5702769f6e7733219ee71e647ba8d9.pdf', '2026-06-08'),
(14, 1, '', 'uploads/4d88df541a5746b6f22f5808cac2b817.pdf', '2026-06-08'),
(15, 1, '', 'uploads/a47154d0755823212bbd0a8bc49dc588.pdf', '2026-06-08'),
(16, 1, 'زمن جلسة 3.pdf', 'uploads/6a273995b7539.pdf', '2026-06-08');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `dept_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`dept_id`, `name`) VALUES
(2, 'حواسيب'),
(4, 'قدرة'),
(5, 'تحكم'),
(6, 'Computer Science'),
(7, 'ميكا');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `user_id` int(11) NOT NULL,
  `employee_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`user_id`, `employee_type`) VALUES
(1, 'admin'),
(2, 'admin'),
(5, 'officer'),
(6, 'admin'),
(7, 'admin'),
(8, 'officer');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `log_date` date NOT NULL,
  `old_status` varchar(50) NOT NULL,
  `new_status` varchar(50) NOT NULL,
  `notes` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `tracking_no` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `reason` varchar(50) DEFAULT NULL,
  `req_date` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `user_id`, `service_id`, `dept_id`, `tracking_no`, `status`, `reason`, `req_date`, `updated_at`) VALUES
(1, 1, 3, 2, 'TRK-2026-001', 'approved', 'الحصول على كشف علامات للتقديم على منحة', '2026-06-01', '2026-06-03'),
(2, 7, 4, 5, 'TRK-2026-002', 'pending', 'إصدار بيان وضع أكاديمي', '2026-06-02', '2026-06-05');

-- --------------------------------------------------------

--
-- Table structure for table `request_details`
--

CREATE TABLE `request_details` (
  `detail_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `field` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `name`, `description`) VALUES
(3, 'وضع بيان', 'طلب الحصول على كشف علامات رسمي ومصدق من الكلية.'),
(4, 'نقل مماثل', 'طلب الحصول على كشف علامات رسمي ومصدق من الكلية.'),
(7, 'بيان وضع', 'طلب الحصول على كشف علامات رسمي ومصدق من الكلية.'),
(8, 'نقل مماثل', 'طلب انتقال الطالب من جامعة أو كلية أخرى إلى الكلية مع معادلة المواد التي درسها سابقاً.'),
(9, 'نقل مماثل', 'طلب انتقال الطالب من جامعة أو كلية أخرى إلى الكلية مع معادلة المواد التي درسها سابقاً.'),
(10, 'نقل مماثل', 'طلب انتقال الطالب من جامعة أو كلية أخرى إلى الكلية مع معادلة المواد التي درسها سابقاً.'),
(11, 'نقل مماثل', 'طلب انتقال الطالب من جامعة أو كلية أخرى إلى الكلية مع معادلة المواد التي درسها سابقاً.');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `university_no` varchar(50) NOT NULL,
  `study_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `user_id`, `university_no`, `study_year`) VALUES
(15, 1, 'UNI2024005', 3),
(16, 1, 'UNI2024005', 3),
(17, 2, '21230201', 5),
(18, 4, '21210201', 4),
(19, 1, 'UNI2024005', 4),
(20, 2, 'UNI2024005', 6),
(21, 2, 'UNI2124005', 6),
(22, 2, 'UNI2124005', 5),
(23, 2, 'UNI2124005', 5),
(24, 2, 'UNI2124005', 5),
(25, 2, 'UNI2124005', 5),
(26, 2, 'UNI2124005', 5),
(27, 2, 'UNI2124005', 5),
(28, 1, 'UNI2124005', 5),
(29, 1, 'UNI2124005', 5),
(30, 8, 'UNI2124005', 5),
(31, 8, 'UNI2124005', 5),
(32, 8, 'UNI2124005', 5),
(34, 2, 'UNI2124005', 5),
(35, 2, 'UNI2124005', 5),
(36, 2, 'UNI2124005', 5),
(37, 2, 'UNI2124005', 5),
(38, 3, '21210201', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`) VALUES
(1, 'أحمد محمد', 'ahmad@student.com', '$2y$10$test', 'student'),
(2, 'سارة علي', 'sara@student.com', '$2y$10$test', 'student'),
(3, 'خالد حسن', 'khaled@student.com', '$2y$10$test', 'student'),
(4, 'نور محمود', 'nour@student.com', '$2y$10$test', 'student'),
(5, 'محمد عبدالله', 'm.abdullah@college.com', '$2y$10$test', 'employee'),
(6, 'ريم أحمد', 'reem@college.com', '$2y$10$test', 'employee'),
(7, 'علي يوسف', 'ali@college.com', '$2y$10$test', 'employee'),
(8, 'هدى خالد', 'huda@college.com', '$2y$10$test', 'employee'),
(9, 'Ahmed Ali', 'ahmed@example.com', '$2y$10$H87CZda2Z2Zvmmh5tb3F2uPFzJV3GKR1h88yjL4S7pvR9I2SiiVfG', 'student'),
(10, 'Ali', 'ali@example.com', '$2y$10$O2I5efXl.klfFSc8jZMiQubR9jjPpJv0r/lVeEMRlSB.4zDHjxs/6', 'student'),
(11, 'rama', 'rama@example.com', '$2y$10$dUP1sitspnN3CDWZNE2z1OdHlr5FlibZQA.nphbK7oLIsd1JxpC7K', 'student'),
(12, 'ram', 'ram@example.com', '$2y$10$9whIxHr6FM0qT5zogx.VReaRH6CBREti7.hyR0EC6yviLBHk3GoW2', 'student'),
(13, 'rame', 'rame@example.com', '$2y$10$Xd6Cmid8XRfb1/cswXSP4.EfdJitAZNpzEGdMOA2knBbiRXMnggNW', 'student'),
(14, 'yara', 'yara@example.com', '$2y$10$kEAyzVdHsKMT3UX23UcZW.ToyW/PgxTHXeRCbLC3cj1ed6xB8Q4s2', 'student'),
(15, 'sara', 'sara@example.com', '$2y$10$aljOihmPnsFhNRflcL6DS.OQe4W5QPGpVVpyvSGy7sxQ5NOEjt7Lm', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`attachment_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `request_details`
--
ALTER TABLE `request_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `attachment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `request_details`
--
ALTER TABLE `request_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `requests_ibfk_3` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request_details`
--
ALTER TABLE `request_details`
  ADD CONSTRAINT `request_details_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
