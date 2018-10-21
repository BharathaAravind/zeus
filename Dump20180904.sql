-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: zeus
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE IF NOT EXISTS `zeus` ;

USE `zeus`;
--
-- Table structure for table `CategoryTable`
--

DROP TABLE IF EXISTS `CategoryTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `CategoryTable` (
  `CATEGORYTBID` int(11) NOT NULL AUTO_INCREMENT,
  `VIDEOID` int(11) DEFAULT NULL,
  `CATEGORYDESC` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CATEGORYTBID`),
  KEY `VIDEOIDFK_idx` (`VIDEOID`),
  CONSTRAINT `VIDEOIDFK` FOREIGN KEY (`VIDEOID`) REFERENCES `videotable` (`videotbid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CategoryTable`
--

LOCK TABLES `CategoryTable` WRITE;
/*!40000 ALTER TABLE `CategoryTable` DISABLE KEYS */;
INSERT INTO `CategoryTable` VALUES (1,1,'Education'),(2,2,'Science'),(3,2,'Technology'),(4,3,'Entertainment');
/*!40000 ALTER TABLE `CategoryTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserPreferencesTable`
--

DROP TABLE IF EXISTS `UserPreferencesTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserPreferencesTable` (
  `USERPREFTBID` int(11) NOT NULL AUTO_INCREMENT,
  `USERID` int(11) DEFAULT NULL,
  `CATEGORYDESC` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`USERPREFTBID`),
  KEY `USERIDFK_idx` (`USERID`),
  CONSTRAINT `USERIDFK` FOREIGN KEY (`USERID`) REFERENCES `usertable` (`usertbid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserPreferencesTable`
--

LOCK TABLES `UserPreferencesTable` WRITE;
/*!40000 ALTER TABLE `UserPreferencesTable` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserPreferencesTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserTable`
--

DROP TABLE IF EXISTS `UserTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserTable` (
  `USERTBID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(45) DEFAULT NULL,
  `PASSWORD` varchar(45) DEFAULT NULL,
  `PHONENO` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`USERTBID`),
  UNIQUE KEY `EMAIL_UNIQUE` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserTable`
--

LOCK TABLES `UserTable` WRITE;
/*!40000 ALTER TABLE `UserTable` DISABLE KEYS */;
INSERT INTO `UserTable` VALUES (1,'haritha.cbit2010@gmail.com','test1','8129449014'),(2,'abharath@gmail.com','test2','3126084376'),(3,'shivteja@gmail.com','test3','6502509331'),(4,'abc@gmail.com','test4','1111111111');
/*!40000 ALTER TABLE `UserTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoTable`
--

DROP TABLE IF EXISTS `VideoTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `VideoTable` (
  `VIDEOTBID` int(11) NOT NULL,
  `VIDEONAME` varchar(45) DEFAULT NULL,
  `VIDEODESC` varchar(100) DEFAULT NULL,
  `VIDEOLINK` varchar(500) DEFAULT NULL,
  `UPLOADEDBY` int(11) DEFAULT NULL,
  `VIEWS` int(11) DEFAULT NULL,
  PRIMARY KEY (`VIDEOTBID`),
  KEY `UPL_idx` (`UPLOADEDBY`),
  CONSTRAINT `UploadedbyFK` FOREIGN KEY (`UPLOADEDBY`) REFERENCES `usertable` (`usertbid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoTable`
--

LOCK TABLES `VideoTable` WRITE;
/*!40000 ALTER TABLE `VideoTable` DISABLE KEYS */;
INSERT INTO `VideoTable` VALUES (1,'dailyroutines','dailyroutines of people','https://www.youtube.com/watch?v=Xb02qGHngb0',1,1000),(2,'TedX','How cancer cells communicate','https://www.youtube.com/watch?v=762c6pFpoqg',1,2000),(3,'SharkTank','Shark Tank Kevin oLeary gets into an argument!','https://www.youtube.com/watch?v=Kgk7mjnRx-4',2,3000),(4,'EllenShow','Ellen Couldn’t Believe This Amazon Service Is Real','https://www.youtube.com/watch?v=07kkUVphTFg',3,4000);
/*!40000 ALTER TABLE `VideoTable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-04  9:55:39