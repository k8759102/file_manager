-- FileManager.users definition

CREATE TABLE `users` (
  `UserID` int unsigned NOT NULL AUTO_INCREMENT,
  `LoginID` varbinary(128) NOT NULL COMMENT 'LoginID는 E-Mail 로 관리합니다. ',
  `Password` binary(64) NOT NULL,
  `PwdSalt` varchar(20) NOT NULL COMMENT '사용자 별로 임의로 생성되어 저장되는 값이다. 솔트키는 사용자가 입력한 비밀번호문자열과 합해져 Password 칼럼에 해싱되어 저장된다. 예) Password = SHA2 (솔트키 + 사용자 입력 비밀번호, 256 )',
  `FirstNmae` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `IsActive` bit(1) NOT NULL,
  `CreateUserID` int unsigned NOT NULL,
  `CreateDate` date NOT NULL,
  `UpdateUserID` int unsigned DEFAULT NULL,
  `UpdateDate` date DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UIX_Users` (`LoginID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;