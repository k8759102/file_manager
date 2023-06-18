-- filemanager.users definition

CREATE TABLE `users` (
  `UserID` int unsigned NOT NULL AUTO_INCREMENT,
  `LoginID` varchar(100) NOT NULL COMMENT 'LoginID는 E-Mail 로 관리합니다. ',
  `Password` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `IsActive` bit(1) NOT NULL DEFAULT b'1',
  `CreateUserID` int unsigned NOT NULL,
  `CreateDate` date NOT NULL,
  `UpdateUserID` int unsigned DEFAULT NULL,
  `UpdateDate` date DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UIX_Users` (`LoginID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;