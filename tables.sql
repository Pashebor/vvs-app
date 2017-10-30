CREATE TABLE admin(
  ID INT(11) AUTO_INCREMENT NOT NULL,
  NAME VARCHAR(120),
  EMAIL VARCHAR(120),
  PASSWORD VARCHAR(120),
  PRIMARY KEY (ID)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE users(
  ID INT(11) AUTO_INCREMENT NOT NULL,
  NAME VARCHAR(120),
  EMAIL VARCHAR(120),
  PASSWORD_MD5 VARCHAR(120),
  PASSWORD VARCHAR(120),
  PRIMARY KEY (ID)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE list1(
   id INT(11) AUTO_INCREMENT NOT NULL,
   firm_name VARCHAR (120),
   recipient_address VARCHAR (250),
   recipient_country VARCHAR (120),
   over_vol_purchases FLOAT,
   market_share FLOAT,
   vol_purchases_m FLOAT,
   vol_purchases_kg FLOAT,
   count_purchases INTEGER,
   PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE reports (
  id INT(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR (120),
  assocName VARCHAR (120),
  dCreated VARCHAR (120),
  PRIMARY KEY (id)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

SELECT * FROM admin;
SELECT * FROM reports;
SELECT * FROM noviy_test_foreign_rating;
SELECT * FROM admin WHERE NAME='admin' AND PASSWORD=md5('hello');
INSERT INTO admin(NAME, EMAIL, PASSWORD) VALUES ('admin2', 'test@mail.ru', md5('hell2'));
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Мутко Андрей Владимирович', 'andrey@gmail.com', md5('andrey123'), 'andrey123');
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Агафонов Сергей Викторович', 'andrey@gmail.com', md5('serg123'), 'serg123');
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Демьянов Павел Егорович', 'pashebor@gmail.com', md5('ltvmzyjd'), 'ltvmzyjd');
DROP TABLE users;
DROP TABLE reports;
DROP TABLE test;
DELETE FROM users WHERE id = 12;
SHOWTABLE;
/*_foreign_rating // overall_rating //*/