-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 01, 2022 at 09:28 AM
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
  `UserName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(60) NOT NULL,
  `TimeStamp` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`Id`, `UserName`, `Password`, `TimeStamp`) VALUES
(4, 'aaaaa', 'zzzzzz', '2022-11-07 08:48:21'),
(5, 'askdask', 'as8127', '2022-11-07 09:12:31'),
(6, 'aaa88172', 'zzzzzz', '2022-11-07 09:31:12');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `IdCat` int NOT NULL,
  `IdGender` int NOT NULL,
  `Name` text NOT NULL,
  `Modify` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`IdCat`, `IdGender`, `Name`, `Modify`) VALUES
(6, 1, 'Áo khoác', '2022-12-01 08:54:44');

-- --------------------------------------------------------

--
-- Table structure for table `CheckOut`
--

CREATE TABLE `CheckOut` (
  `IdCheckout` int NOT NULL,
  `IdCustomer` int NOT NULL,
  `IdProduct` int NOT NULL,
  `IdSize` int NOT NULL,
  `Quantity` int NOT NULL,
  `IdDelivery` int NOT NULL,
  `Created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CustomerOrders`
--

CREATE TABLE `CustomerOrders` (
  `IdCustomer` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` text NOT NULL,
  `Description` text NOT NULL,
  `Created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DeliveryType`
--

CREATE TABLE `DeliveryType` (
  `IdDelivery` int NOT NULL,
  `DeliveryType` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `DeliveryType`
--

INSERT INTO `DeliveryType` (`IdDelivery`, `DeliveryType`) VALUES
(1, 'Nhanh'),
(2, 'Hỏa tốc');

-- --------------------------------------------------------

--
-- Table structure for table `Gender`
--

CREATE TABLE `Gender` (
  `IdGender` int NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Gender`
--

INSERT INTO `Gender` (`IdGender`, `Name`, `Created`) VALUES
(1, 'Thời trang nam', '2022-11-30 09:32:36'),
(2, 'Thời trang nữ', '2022-11-30 09:32:50');

-- --------------------------------------------------------

--
-- Table structure for table `Images`
--

CREATE TABLE `Images` (
  `IdImage` int NOT NULL,
  `IdProduct` int NOT NULL,
  `Path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PhoneNumber`
--

CREATE TABLE `PhoneNumber` (
  `IdCheckout` int NOT NULL,
  `PhoneNumber` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `IdProduct` int NOT NULL,
  `Name` text NOT NULL,
  `Description` text NOT NULL,
  `Price` int UNSIGNED NOT NULL,
  `IdCat` int NOT NULL,
  `Created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`IdProduct`, `Name`, `Description`, `Price`, `IdCat`, `Created`) VALUES
(1, 'Áo khoác bomber nam dáng thể thao thời trang Zenkcos Men JK 2022', 'sản phẩm: áo khoác nam.\r\nchất liệu mềm mại, thoáng mát, thấm hút mồ hôi.\r\nthiết kế thời trang phù hợp xu hướng hiện nay.\r\nkiểu dáng đơn giản, lịch sự, dễ phối đồ.\r\nđường may chắc chắn tinh tế sắc sảo, thoải mái khi mặc.\r\náo được thiết kế với kiểu dáng đơn giản nhưng không kém phần trẻ trung, phong cách.\r\nthích hợp đi chơi, đi dạo phố.\r\nkích cỡ phù hợp với người dưới 65kg tùy chiều cao\r\nSize XS: cho bạn có cân nặng từ dưới 40kg tùy chiều cao\r\nSize S: cho bạn có cân nặng từ 40-47kg tùy chiều cao\r\nSize M: cho bạn có cân nặng từ 48-55kg tùy chiều cao\r\nSize L: cho bạn có cân nặng dưới 65kg tùy chiều cao', 55200, 6, '2022-12-01 08:58:46');

-- --------------------------------------------------------

--
-- Table structure for table `Quantity`
--

CREATE TABLE `Quantity` (
  `IdSize` int NOT NULL,
  `IdProduct` int NOT NULL,
  `Quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Quantity`
--

INSERT INTO `Quantity` (`IdSize`, `IdProduct`, `Quantity`) VALUES
(1, 1, 25),
(2, 1, 24),
(3, 1, 24),
(4, 1, 24);

-- --------------------------------------------------------

--
-- Table structure for table `ShipThirdParty`
--

CREATE TABLE `ShipThirdParty` (
  `IdShip` int NOT NULL,
  `IdCheckOut` int NOT NULL,
  `TotalPrice` int UNSIGNED NOT NULL,
  `Status` varchar(30) NOT NULL,
  `ExpectedDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Size`
--

CREATE TABLE `Size` (
  `IdSize` int NOT NULL,
  `Size` varchar(20) NOT NULL,
  `Created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Size`
--

INSERT INTO `Size` (`IdSize`, `Size`, `Created`) VALUES
(1, 'M', '2022-12-01 08:59:55'),
(2, 'L', '2022-12-01 08:59:55'),
(3, 'XL', '2022-12-01 09:00:10'),
(4, 'XXL', '2022-12-01 09:00:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UniUserName` (`UserName`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`IdCat`) USING BTREE,
  ADD KEY `IdGender` (`IdGender`);

--
-- Indexes for table `CheckOut`
--
ALTER TABLE `CheckOut`
  ADD PRIMARY KEY (`IdCheckout`),
  ADD KEY `IdCustomer` (`IdCustomer`),
  ADD KEY `IdProduct` (`IdProduct`),
  ADD KEY `IdDelivery` (`IdDelivery`),
  ADD KEY `IdSize` (`IdSize`);

--
-- Indexes for table `CustomerOrders`
--
ALTER TABLE `CustomerOrders`
  ADD PRIMARY KEY (`IdCustomer`);

--
-- Indexes for table `DeliveryType`
--
ALTER TABLE `DeliveryType`
  ADD PRIMARY KEY (`IdDelivery`);

--
-- Indexes for table `Gender`
--
ALTER TABLE `Gender`
  ADD PRIMARY KEY (`IdGender`);

--
-- Indexes for table `Images`
--
ALTER TABLE `Images`
  ADD KEY `IdProduct` (`IdProduct`);

--
-- Indexes for table `PhoneNumber`
--
ALTER TABLE `PhoneNumber`
  ADD KEY `IdCheckout` (`IdCheckout`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`IdProduct`),
  ADD KEY `IdCat` (`IdCat`);

--
-- Indexes for table `Quantity`
--
ALTER TABLE `Quantity`
  ADD KEY `IdSize` (`IdSize`),
  ADD KEY `IdProduct` (`IdProduct`);

--
-- Indexes for table `ShipThirdParty`
--
ALTER TABLE `ShipThirdParty`
  ADD PRIMARY KEY (`IdShip`),
  ADD KEY `IdCheckOut` (`IdCheckOut`);

--
-- Indexes for table `Size`
--
ALTER TABLE `Size`
  ADD PRIMARY KEY (`IdSize`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `IdCat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `CheckOut`
--
ALTER TABLE `CheckOut`
  MODIFY `IdCheckout` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CustomerOrders`
--
ALTER TABLE `CustomerOrders`
  MODIFY `IdCustomer` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DeliveryType`
--
ALTER TABLE `DeliveryType`
  MODIFY `IdDelivery` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Gender`
--
ALTER TABLE `Gender`
  MODIFY `IdGender` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `IdProduct` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ShipThirdParty`
--
ALTER TABLE `ShipThirdParty`
  MODIFY `IdShip` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Size`
--
ALTER TABLE `Size`
  MODIFY `IdSize` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Category`
--
ALTER TABLE `Category`
  ADD CONSTRAINT `Category_ibfk_1` FOREIGN KEY (`IdGender`) REFERENCES `Gender` (`IdGender`);

--
-- Constraints for table `CheckOut`
--
ALTER TABLE `CheckOut`
  ADD CONSTRAINT `CheckOut_ibfk_1` FOREIGN KEY (`IdCustomer`) REFERENCES `CustomerOrders` (`IdCustomer`),
  ADD CONSTRAINT `CheckOut_ibfk_2` FOREIGN KEY (`IdProduct`) REFERENCES `Product` (`IdProduct`),
  ADD CONSTRAINT `CheckOut_ibfk_3` FOREIGN KEY (`IdDelivery`) REFERENCES `DeliveryType` (`IdDelivery`),
  ADD CONSTRAINT `CheckOut_ibfk_4` FOREIGN KEY (`IdSize`) REFERENCES `Size` (`IdSize`);

--
-- Constraints for table `Images`
--
ALTER TABLE `Images`
  ADD CONSTRAINT `Images_ibfk_1` FOREIGN KEY (`IdProduct`) REFERENCES `Product` (`IdProduct`);

--
-- Constraints for table `PhoneNumber`
--
ALTER TABLE `PhoneNumber`
  ADD CONSTRAINT `PhoneNumber_ibfk_1` FOREIGN KEY (`IdCheckout`) REFERENCES `CheckOut` (`IdCheckout`);

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`IdCat`) REFERENCES `Category` (`IdCat`);

--
-- Constraints for table `Quantity`
--
ALTER TABLE `Quantity`
  ADD CONSTRAINT `Quantity_ibfk_1` FOREIGN KEY (`IdSize`) REFERENCES `Size` (`IdSize`),
  ADD CONSTRAINT `Quantity_ibfk_2` FOREIGN KEY (`IdProduct`) REFERENCES `Product` (`IdProduct`);

--
-- Constraints for table `ShipThirdParty`
--
ALTER TABLE `ShipThirdParty`
  ADD CONSTRAINT `ShipThirdParty_ibfk_1` FOREIGN KEY (`IdCheckOut`) REFERENCES `CheckOut` (`IdCheckout`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
