-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bomics
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bomics` ;

-- -----------------------------------------------------
-- Schema bomics
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bomics` DEFAULT CHARACTER SET utf8 ;
USE `bomics` ;

-- -----------------------------------------------------
-- Table `bomics`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bomics`.`user` (
  `id` VARCHAR(255) NOT NULL,
  `username` VARCHAR(100) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bomics`.`book_collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bomics`.`book_collection` (
  `user_id` VARCHAR(255) NOT NULL,
  `isbn` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NULL,
  `author` VARCHAR(255) NULL,
  `publish_date` DATE NULL,
  `description` MEDIUMTEXT NULL,
  `pagecount` INT NULL,
  `image` TEXT NULL,
  `infoLink` TEXT NULL,
  CONSTRAINT `fk_collection_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `bomics`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `bomics`.`display_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bomics`.`display_books` (
  `class` VARCHAR(155) NULL,
  `isbn` VARCHAR(100) NULL,
  `title` VARCHAR(255) NULL,
  `author` VARCHAR(255) NULL,
  `publish_date` DATE NULL,
  `description` MEDIUMTEXT NULL,
  `pagecount` INT NULL,
  `image` TEXT NULL,
  `infoLink` TEXT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bomics`.`display_comics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bomics`.`display_comics` (
  `class` VARCHAR(100) NULL,
  `id` VARCHAR(255) NULL,
  `title` VARCHAR(255) NULL,
  `image` TEXT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bomics`.`comics_collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bomics`.`comics_collection` (
  `user_id` VARCHAR(255) NOT NULL,
  `id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NULL,
  `image` TEXT NULL,
  CONSTRAINT `fk_comics_collection_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bomics`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- Trigger for duplicates books
DROP TRIGGER IF EXISTS unique_books;
DELIMITER $$
CREATE TRIGGER unique_books
AFTER INSERT ON book_collection
FOR EACH ROW
BEGIN
    DECLARE value_count INT;
    
    SELECT count(*) INTO value_count FROM book_collection WHERE user_id = NEW.user_id AND isbn = NEW.isbn;
    
    IF value_count > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = value_count;
    END IF;
END$$
DELIMITER ;

-- duplicate comics trigger 
DROP TRIGGER IF EXISTS unique_comics;
DELIMITER $$
CREATE TRIGGER unique_comics
AFTER INSERT ON comics_collection
FOR EACH ROW
BEGIN
    DECLARE value_count INT;
    
    SELECT COUNT(*) INTO value_count FROM comics_collection WHERE user_id = NEW.user_id AND id = NEW.id;
    
    IF value_count > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duplicate entry for user_id and id';
    END IF;
END$$
DELIMITER ;


select *  from user;
select * from book_collection;
select * from comics_collection;