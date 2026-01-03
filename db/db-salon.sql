/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - salon
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`salon` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `salon`;

/*Table structure for table `klijent` */

DROP TABLE IF EXISTS `klijent`;

CREATE TABLE `klijent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `lozinka` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `klijent` */

insert  into `klijent`(`id`,`ime`,`prezime`,`email`,`lozinka`) values 
(1,'Milica','Zivkovic','milica@gmail.com','123'),
(2,'Katarina','Ivezic','katarina@gmail.com','321'),
(3,'Maja','Djuric','maja@gmail.com','249');

/*Table structure for table `manikirka` */

DROP TABLE IF EXISTS `manikirka`;

CREATE TABLE `manikirka` (
  `idZaposleni` int(11) NOT NULL,
  `brojManikirSertifikata` varchar(30) DEFAULT NULL,
  `tipTretmana` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idZaposleni`),
  CONSTRAINT `manikirka_ibfk_1` FOREIGN KEY (`idZaposleni`) REFERENCES `zaposleni` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `manikirka` */

insert  into `manikirka`(`idZaposleni`,`brojManikirSertifikata`,`tipTretmana`) values 
(3,'MNK2015','izlivanje'),
(4,'MNK2020','gel');

/*Table structure for table `rezervacija` */

DROP TABLE IF EXISTS `rezervacija`;

CREATE TABLE `rezervacija` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsluge` int(11) NOT NULL,
  `idKlijenta` int(11) NOT NULL,
  `idZaposlenog` int(11) NOT NULL,
  `napomena` varchar(100) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `datumRezervacije` date NOT NULL,
  `datumUsluge` date NOT NULL,
  `vremeUsluge` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsluge` (`idUsluge`),
  KEY `idKlijenta` (`idKlijenta`),
  KEY `idZaposlenog` (`idZaposlenog`),
  CONSTRAINT `rezervacija_ibfk_1` FOREIGN KEY (`idUsluge`) REFERENCES `usluga` (`id`),
  CONSTRAINT `rezervacija_ibfk_2` FOREIGN KEY (`idKlijenta`) REFERENCES `klijent` (`id`),
  CONSTRAINT `rezervacija_ibfk_3` FOREIGN KEY (`idZaposlenog`) REFERENCES `zaposleni` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `rezervacija` */

/*Table structure for table `sminkerka` */

DROP TABLE IF EXISTS `sminkerka`;

CREATE TABLE `sminkerka` (
  `idZaposleni` int(11) NOT NULL,
  `tipTehnike` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idZaposleni`),
  CONSTRAINT `sminkerka_ibfk_1` FOREIGN KEY (`idZaposleni`) REFERENCES `zaposleni` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `sminkerka` */

insert  into `sminkerka`(`idZaposleni`,`tipTehnike`) values 
(1,'soft glam'),
(2,'natural');

/*Table structure for table `tipusluge` */

DROP TABLE IF EXISTS `tipusluge`;

CREATE TABLE `tipusluge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tipusluge` */

insert  into `tipusluge`(`id`,`naziv`) values 
(1,'sminkanje'),
(2,'manikir');

/*Table structure for table `usluga` */

DROP TABLE IF EXISTS `usluga`;

CREATE TABLE `usluga` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idTipa` int(11) NOT NULL,
  `naziv` varchar(50) NOT NULL,
  `opis` varchar(50) DEFAULT NULL,
  `trajanjeUsluge` int(11) DEFAULT NULL,
  `cena` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTipa` (`idTipa`),
  CONSTRAINT `usluga_ibfk_1` FOREIGN KEY (`idTipa`) REFERENCES `tipusluge` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usluga` */

insert  into `usluga`(`id`,`idTipa`,`naziv`,`opis`,`trajanjeUsluge`,`cena`) values 
(1,1,'Prirodna sminka','Jednostavna sminka za svakodnevne prilike koja cin',45,4000),
(2,1,'Sminka za mladu','Sminka za vas poseban dan',120,9000),
(3,1,'Sminka za maturu','Jaca sminka za vasu posebnu noc',90,5000),
(4,2,'Izlivanje','Uredan i precizan manikir za duzinu koju zelite',120,4000),
(5,2,'Rubber baza','Jednostavni i lepi nokti',90,3000),
(6,2,'Gel lak','Prirodna varijanta za svaki dan ali i za posebne p',90,3200),
(7,2,'Vestacki','',80,3500);

/*Table structure for table `vlasnica` */

DROP TABLE IF EXISTS `vlasnica`;

CREATE TABLE `vlasnica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `lozinka` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `vlasnica` */

insert  into `vlasnica`(`id`,`ime`,`prezime`,`email`,`lozinka`) values 
(1,'Slavica','Karadjordjevic','slavica@gmail.com','slavica');

/*Table structure for table `zaposleni` */

DROP TABLE IF EXISTS `zaposleni`;

CREATE TABLE `zaposleni` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) NOT NULL,
  `prezime` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `lozinka` varchar(30) NOT NULL,
  `radniStaz` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `zaposleni` */

insert  into `zaposleni`(`id`,`ime`,`prezime`,`email`,`lozinka`,`radniStaz`) values 
(1,'Nevena','Nikolic','nevena@gmail.com','nevena',5),
(2,'Andjela','Jovanovic','andjela@gmail.com','andjela',8),
(3,'Jovana','Lazic','jovana@gmail.com','jovana',15),
(4,'Nikolina','Markovic','nikolina@gmail.com','nikolina',3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
