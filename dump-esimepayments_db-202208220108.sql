-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: esimepayments_db
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `hash` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_ipn_id` int(11) NOT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `user_ipn_id` (`user_ipn_id`),
  CONSTRAINT `user_account_ipn_fk` FOREIGN KEY (`user_ipn_id`) REFERENCES `users` (`user_ipn_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES
(62,'$2b$10$2DALe9rqqyYRslQXlU9kMe3rK.fDoHxlR/AzfZpXzwR180onJuhxC','$2b$10$2DALe9rqqyYRslQXlU9kMe',2015080061,0),
(71,'$2b$10$9JwfKeF1Jp666HpXY3M/5uD5d17yRy6NTBAUljDz5i53bp8T4pRkW','$2b$10$9JwfKeF1Jp666HpXY3M/5u',2015080062,0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch_office`
--

DROP TABLE IF EXISTS `branch_office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch_office` (
  `office_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mercadopago_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`office_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_office`
--

LOCK TABLES `branch_office` WRITE;
/*!40000 ALTER TABLE `branch_office` DISABLE KEYS */;
INSERT INTO `branch_office` VALUES
(1,'ESIME Culhuacán',48769177);
/*!40000 ALTER TABLE `branch_office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,'Test',0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_details`
--

DROP TABLE IF EXISTS `contact_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_details` (
  `contact_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_ipn_id` int(11) DEFAULT NULL,
  `student_ipn_id` int(11) DEFAULT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`contact_details_id`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `phone` (`phone`),
  KEY `user_ipn_fk` (`user_ipn_id`),
  KEY `student_ipn_fk` (`student_ipn_id`),
  CONSTRAINT `student_ipn_fk` FOREIGN KEY (`student_ipn_id`) REFERENCES `students` (`student_ipn_id`) ON DELETE CASCADE,
  CONSTRAINT `user_ipn_fk` FOREIGN KEY (`user_ipn_id`) REFERENCES `users` (`user_ipn_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_details`
--

LOCK TABLES `contact_details` WRITE;
/*!40000 ALTER TABLE `contact_details` DISABLE KEYS */;
INSERT INTO `contact_details` VALUES
(79,'apolinar.ortiz1999@gmail.com','5566163068',2015080061,NULL,0),
(88,'iapolinaro1400@alumno.ipn.mx','5589747034',2015080062,NULL,0);
/*!40000 ALTER TABLE `contact_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_products` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_fk` (`product_id`),
  CONSTRAINT `order_fk` FOREIGN KEY (`order_id`) REFERENCES `purchase_order` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `product_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`product_id`),
  KEY `category_fk` (`category_id`),
  CONSTRAINT `category_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'Tramite de prueba','Este es un tramite de prueba. ',10.00,1,0),
(2,'Tramite de prueba 2','Este es un tramite de prueba. ',10.00,1,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchase_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_hash` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `student_ipn_id` int(11) NOT NULL,
  `user_ipn_id` int(11) NOT NULL,
  `payment_type` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `qr_data` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `student_fk` (`student_ipn_id`),
  KEY `user_fk` (`user_ipn_id`),
  CONSTRAINT `student_fk` FOREIGN KEY (`student_ipn_id`) REFERENCES `students` (`student_ipn_id`) ON DELETE CASCADE,
  CONSTRAINT `user_fk` FOREIGN KEY (`user_ipn_id`) REFERENCES `users` (`user_ipn_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session` (
  `sid` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `student_ipn_id` int(11) NOT NULL,
  `name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paternal_lastname` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maternal_lastname` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`student_ipn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`role_id`),
  KEY `role_user_type_fk` (`user_type_id`),
  CONSTRAINT `role_user_type_fk` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`type_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES
(1,'Informática',1,0),
(2,'Directora',1,0),
(3,'Subdirección administrativa',1,0),
(4,'Recursos financieros',2,0),
(5,'Capturista',3,0);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_types` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES
(1,'Administrador',0),
(2,'Supervisor',0),
(3,'Operativo',0);
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_ipn_id` int(11) NOT NULL,
  `name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paternal_lastname` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maternal_lastname` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `deleted` smallint(5) unsigned NOT NULL DEFAULT 0,
  `branch_office_id` int(11) NOT NULL,
  `mercadopago_pos_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_ipn_id`),
  KEY `user_role_fk` (`user_role_id`),
  KEY `branch_office_fk` (`branch_office_id`),
  FULLTEXT KEY `users_name_IDX` (`name`,`paternal_lastname`,`maternal_lastname`),
  CONSTRAINT `branch_office_fk` FOREIGN KEY (`branch_office_id`) REFERENCES `branch_office` (`office_id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_fk` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(2015080061,'Isidro','Apolinar','Ortiz',1,0,1,0),
(2015080062,'Juan','Apolinar','Ortiz',5,0,1,52148436);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'esimepayments_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-22  1:08:21
