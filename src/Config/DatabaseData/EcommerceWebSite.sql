-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 05, 2022 at 01:25 AM
-- Server version: 8.0.31-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `EcommerceWebSite`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `Id` int NOT NULL,
  `UserName` char(255) NOT NULL,
  `Password` char(255) NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `IdCat` int NOT NULL,
  `Name` char(255) NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `GenderIdGender` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`IdCat`, `Name`, `updateTimestamp`, `GenderIdGender`) VALUES
(2, 'Áo khoác', '2022-12-04 17:28:12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Checkout`
--

CREATE TABLE `Checkout` (
  `IdCheckout` int NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `CustomerOrderIdCustomer` int DEFAULT NULL,
  `ProductIdProduct` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CustomerOrder`
--

CREATE TABLE `CustomerOrder` (
  `IdCustomer` int NOT NULL,
  `Name` char(255) NOT NULL,
  `Description` text,
  `Size` char(255) NOT NULL,
  `Quantity` int UNSIGNED NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Gender`
--

CREATE TABLE `Gender` (
  `IdGender` int NOT NULL,
  `Name` char(255) NOT NULL,
  `updateTimestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Gender`
--

INSERT INTO `Gender` (`IdGender`, `Name`, `updateTimestamp`) VALUES
(1, 'Thời trang nam', '2022-12-04 17:18:27');

-- --------------------------------------------------------

--
-- Table structure for table `Image`
--

CREATE TABLE `Image` (
  `id` int NOT NULL,
  `Path` char(255) NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `ProductIdProduct` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Image`
--

INSERT INTO `Image` (`id`, `Path`, `updateTimestamp`, `ProductIdProduct`) VALUES
(1, 'Prod_1/img1.jpg', '2022-12-04 17:56:15', 1),
(2, 'Prod_1/img2.jpg', '2022-12-04 17:56:15', 1),
(3, 'Prod_1/img3.jpg', '2022-12-04 17:56:15', 1),
(4, 'Prod_2/img1.jpg', '2022-12-04 17:57:56', 2),
(5, 'Prod_2/img2.jpg', '2022-12-04 17:57:56', 2),
(6, 'Prod_2/img3.jpg', '2022-12-04 17:57:56', 2),
(7, 'Prod_3/img1.jpg', '2022-12-04 17:58:39', 3),
(8, 'Prod_3/img2.jpg', '2022-12-04 17:58:39', 3),
(9, 'Prod_3/img3.jpg', '2022-12-04 17:58:39', 3),
(10, 'Prod_4/img1.jpg', '2022-12-04 17:59:41', 4),
(11, 'Prod_4/img2.jpg', '2022-12-04 17:59:41', 4),
(12, 'Prod_4/img3.jpg', '2022-12-04 17:59:41', 4);

-- --------------------------------------------------------

--
-- Table structure for table `PhoneNumber`
--

CREATE TABLE `PhoneNumber` (
  `id` int NOT NULL,
  `PhoneNumber` char(255) NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `CustomerOrderIdCustomer` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `IdProduct` int NOT NULL,
  `Name` char(255) NOT NULL,
  `Description` text NOT NULL,
  `Price` int UNSIGNED NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `CategoryIdCat` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`IdProduct`, `Name`, `Description`, `Price`, `updateTimestamp`, `CategoryIdCat`) VALUES
(1, 'Áo nỉ, áo khoác hoodie gấu scrub siêu ngầu nam nữ phong cách thời trang', 'San Pham long thu cuc dep', 550000, '2022-12-04 17:34:44', 2),
(2, 'Áo khoác bomber nam dáng đẹp thể thao', 'Ao khoac nam cuc dep cho mua dong', 1000000, '2022-12-04 17:40:16', 2),
(3, 'Áo khoác dù nam hai mặt cực đẹp', 'Ao khoac du nam cho moi thoi tiet', 600000, '2022-12-04 17:40:16', 2),
(4, 'Áo khoác nam thêu logo cao cấp chất dù 2 lớp dày dặn thoải mái đi mưa', 'Ao khoac du cho moi thoi tiet', 700000, '2022-12-04 17:40:16', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Size`
--

CREATE TABLE `Size` (
  `IdSize` int NOT NULL,
  `Name` char(255) NOT NULL,
  `Quantity` int NOT NULL,
  `updateTimestamp` datetime NOT NULL,
  `ProductIdProduct` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Size`
--

INSERT INTO `Size` (`IdSize`, `Name`, `Quantity`, `updateTimestamp`, `ProductIdProduct`) VALUES
(1, 'M', 24, '2022-12-04 17:47:14', 1),
(2, 'L', 23, '2022-12-04 17:47:14', 1),
(3, 'XL', 25, '2022-12-04 17:47:14', 1),
(4, 'XXL', 20, '2022-12-04 17:47:14', 1),
(5, 'M', 22, '2022-12-04 17:48:24', 2),
(6, 'L', 20, '2022-12-04 17:48:24', 2),
(7, 'XL', 21, '2022-12-04 17:48:24', 2),
(8, 'XXL', 20, '2022-12-04 17:48:24', 2),
(9, 'M', 20, '2022-12-04 17:49:15', 3),
(10, 'L', 10, '2022-12-04 17:49:15', 3),
(11, 'XL', 11, '2022-12-04 17:49:15', 3),
(12, 'XXL', 20, '2022-12-04 17:49:15', 3),
(13, 'M', 25, '2022-12-04 17:50:03', 4),
(14, 'L', 15, '2022-12-04 17:50:03', 4),
(15, 'XL', 16, '2022-12-04 17:50:03', 4),
(16, 'XXL', 25, '2022-12-04 17:50:03', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`),
  ADD UNIQUE KEY `UserName` (`UserName`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`IdCat`),
  ADD UNIQUE KEY `IdCat` (`IdCat`),
  ADD KEY `GenderIdGender` (`GenderIdGender`);

--
-- Indexes for table `Checkout`
--
ALTER TABLE `Checkout`
  ADD PRIMARY KEY (`IdCheckout`),
  ADD UNIQUE KEY `IdCheckout` (`IdCheckout`),
  ADD UNIQUE KEY `Checkout_ProductIdProduct_CustomerOrderIdCustomer_unique` (`CustomerOrderIdCustomer`,`ProductIdProduct`),
  ADD KEY `ProductIdProduct` (`ProductIdProduct`);

--
-- Indexes for table `CustomerOrder`
--
ALTER TABLE `CustomerOrder`
  ADD PRIMARY KEY (`IdCustomer`),
  ADD UNIQUE KEY `IdCustomer` (`IdCustomer`);

--
-- Indexes for table `Gender`
--
ALTER TABLE `Gender`
  ADD PRIMARY KEY (`IdGender`),
  ADD UNIQUE KEY `IdGender` (`IdGender`);

--
-- Indexes for table `Image`
--
ALTER TABLE `Image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductIdProduct` (`ProductIdProduct`);

--
-- Indexes for table `PhoneNumber`
--
ALTER TABLE `PhoneNumber`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CustomerOrderIdCustomer` (`CustomerOrderIdCustomer`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`IdProduct`),
  ADD UNIQUE KEY `IdProduct` (`IdProduct`),
  ADD KEY `CategoryIdCat` (`CategoryIdCat`);

--
-- Indexes for table `Size`
--
ALTER TABLE `Size`
  ADD PRIMARY KEY (`IdSize`),
  ADD UNIQUE KEY `IdSize` (`IdSize`),
  ADD KEY `ProductIdProduct` (`ProductIdProduct`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `IdCat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Checkout`
--
ALTER TABLE `Checkout`
  MODIFY `IdCheckout` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CustomerOrder`
--
ALTER TABLE `CustomerOrder`
  MODIFY `IdCustomer` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Gender`
--
ALTER TABLE `Gender`
  MODIFY `IdGender` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Image`
--
ALTER TABLE `Image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `PhoneNumber`
--
ALTER TABLE `PhoneNumber`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `IdProduct` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Size`
--
ALTER TABLE `Size`
  MODIFY `IdSize` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Category`
--
ALTER TABLE `Category`
  ADD CONSTRAINT `Category_ibfk_1` FOREIGN KEY (`GenderIdGender`) REFERENCES `Gender` (`IdGender`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Checkout`
--
ALTER TABLE `Checkout`
  ADD CONSTRAINT `Checkout_ibfk_1` FOREIGN KEY (`CustomerOrderIdCustomer`) REFERENCES `CustomerOrder` (`IdCustomer`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Checkout_ibfk_2` FOREIGN KEY (`ProductIdProduct`) REFERENCES `Product` (`IdProduct`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Image`
--
ALTER TABLE `Image`
  ADD CONSTRAINT `Image_ibfk_1` FOREIGN KEY (`ProductIdProduct`) REFERENCES `Product` (`IdProduct`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `PhoneNumber`
--
ALTER TABLE `PhoneNumber`
  ADD CONSTRAINT `PhoneNumber_ibfk_1` FOREIGN KEY (`CustomerOrderIdCustomer`) REFERENCES `CustomerOrder` (`IdCustomer`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`CategoryIdCat`) REFERENCES `Category` (`IdCat`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Size`
--
ALTER TABLE `Size`
  ADD CONSTRAINT `Size_ibfk_1` FOREIGN KEY (`ProductIdProduct`) REFERENCES `Product` (`IdProduct`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
