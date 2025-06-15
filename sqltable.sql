-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: academic_system
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academic`
--

DROP TABLE IF EXISTS `academic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '1부터 시작',
  `title` varchar(50) DEFAULT NULL COMMENT '일정 제목',
  `start_date` date DEFAULT NULL COMMENT '일정 시작일',
  `end_date` date DEFAULT NULL COMMENT '일정 종료일',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic`
--

LOCK TABLES `academic` WRITE;
/*!40000 ALTER TABLE `academic` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assign_sub`
--

DROP TABLE IF EXISTS `assign_sub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assign_sub` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '1부터 시작',
  `title` varchar(50) DEFAULT NULL COMMENT '공지 제목',
  `context` text COMMENT '공지 내용',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assign_sub`
--

LOCK TABLES `assign_sub` WRITE;
/*!40000 ALTER TABLE `assign_sub` DISABLE KEYS */;
/*!40000 ALTER TABLE `assign_sub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment`
--
DROP TABLE IF EXISTS `assignment_submission`;
DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '과제ID',
  `lecture_id` VARCHAR(20) DEFAULT NULL COMMENT '학정번호',
  `title` VARCHAR(50) DEFAULT NULL COMMENT '과제 제목',
  `context` TEXT COMMENT '과제 내용',
  `start_date` DATE DEFAULT NULL COMMENT '제출 시작일',
  `end_date` DATE DEFAULT NULL COMMENT '제출 종료일',
  `file` VARCHAR(255) DEFAULT NULL COMMENT '첨부파일 경로',
  `status` INT DEFAULT 0 COMMENT '과제 상태(예: 0=비활성,1=활성)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE TABLE `assignment_submission` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '제출ID',
  `assignment_id` INT NOT NULL COMMENT '과제ID',
  `student_id` VARCHAR(20) NOT NULL COMMENT '학생ID',
  `submit_title` VARCHAR(50) DEFAULT NULL COMMENT '제출 제목',
  `submit_description` TEXT COMMENT '제출 내용',
  `submit_file` VARCHAR(255) DEFAULT NULL COMMENT '제출 파일 경로',
  `submit_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '제출일',
  `status` INT DEFAULT 0 COMMENT '제출 상태(0=미제출,1=제출완료 등)',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '1부터 시작',
  `lecture_id` varchar(20) DEFAULT NULL COMMENT '학정번호',
  `student_id` int DEFAULT NULL COMMENT '학생 ID',
  `date` date DEFAULT NULL COMMENT '출석 날짜',
  `status` int DEFAULT NULL COMMENT '출석 상태',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '1부터 시작',
  `assignment_id` int DEFAULT NULL COMMENT '과제일정',
  `academic_id` int DEFAULT NULL COMMENT '학사일정',
  `type` text COMMENT '과제/학사',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade_manage`
--

DROP TABLE IF EXISTS `grade_manage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade_manage` (
  `student_id` int NOT NULL COMMENT '학생 ID',
  `professor_id` int NOT NULL COMMENT '교수 ID',
  `score` varchar(2) DEFAULT NULL COMMENT '성적',
  PRIMARY KEY (`student_id`,`professor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade_manage`
--

LOCK TABLES `grade_manage` WRITE;
/*!40000 ALTER TABLE `grade_manage` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade_manage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture`
--

DROP TABLE IF EXISTS `lecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture` (
  `id` varchar(20) NOT NULL COMMENT '학정 번호',
  `name` varchar(20) DEFAULT NULL COMMENT '교과목명',
  `professor_id` int DEFAULT NULL COMMENT '담당 교수 ID',
  `room_id` varchar(5) DEFAULT NULL COMMENT '강의실 호수',
  `time` varchar(30) DEFAULT NULL COMMENT '강의시간',
  `student_num` int DEFAULT NULL COMMENT '수강인원',
  `type` varchar(2) DEFAULT NULL COMMENT '전공, 교양',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture`
--

LOCK TABLES `lecture` WRITE;
/*!40000 ALTER TABLE `lecture` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `online_lecture`
--

DROP TABLE IF EXISTS `online_lecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `online_lecture` (
  `lecture_id` varchar(20) DEFAULT NULL COMMENT '학정번호',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '1부터 시작',
  `title` varchar(50) DEFAULT NULL COMMENT '강의 목차',
  `week` int DEFAULT NULL COMMENT '학습 주차',
  `context` text COMMENT '강의 내용',
  `start_date` date DEFAULT NULL COMMENT '수강 시작일',
  `end_date` date DEFAULT NULL COMMENT '수강 종료일',
  `token` int DEFAULT NULL COMMENT '사용자 확인 유무',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `online_lecture`
--

LOCK TABLES `online_lecture` WRITE;
/*!40000 ALTER TABLE `online_lecture` DISABLE KEYS */;
/*!40000 ALTER TABLE `online_lecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `lecture_id` varchar(20) DEFAULT NULL COMMENT '학정번호',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '1부터 시작',
  `created_time` timestamp NULL DEFAULT NULL COMMENT '공지 생성일',
  `title` varchar(50) DEFAULT NULL COMMENT '공지 제목',
  `context` text COMMENT '공지 내용',
  `token` int DEFAULT NULL COMMENT '사용자 확인 유무',
  `file` text COMMENT '첨부파일경로',
  `choice` int DEFAULT NULL COMMENT '사용목적',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (2,'김교수','2000-10-10','010-1234-5678','서울시');
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` varchar(5) NOT NULL COMMENT '강의실 호수',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (3,'스태프','2000-01-01','010-1234-5678','서울시');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'홍길동','1975-03-15','010-1234-5678','서울시',4,'컴퓨터공학');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tuition`
--

DROP TABLE IF EXISTS `tuition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tuition` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '1부터 시작',
  `title` varchar(50) DEFAULT NULL COMMENT '등록금 고지서',
  `file` text COMMENT '고지서첨부파일',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tuition`
--

LOCK TABLES `tuition` WRITE;
/*!40000 ALTER TABLE `tuition` DISABLE KEYS */;
/*!40000 ALTER TABLE `tuition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(30) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'1234',1),(2,'1234',2),(3,'1234',3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-17 13:22:12
