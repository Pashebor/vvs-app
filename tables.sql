CREATE TABLE admin(
  ID INT(11) AUTO_INCREMENT NOT NULL,
  NAME VARCHAR(120),
  EMAIL VARCHAR(120),
  PASSWORD VARCHAR(120),
  PRIMARY KEY (ID)
) ENGINE = InnoDB;

CREATE TABLE users(
  ID INT(11) AUTO_INCREMENT NOT NULL,
  NAME VARCHAR(120),
  EMAIL VARCHAR(120),
  PASSWORD_MD5 VARCHAR(120),
  PASSWORD VARCHAR(120),
  PRIMARY KEY (ID)
) ENGINE = InnoDB;

SELECT * FROM admin;
SELECT * FROM users;
SELECT * FROM admin WHERE NAME='admin' AND PASSWORD=md5('hello');
INSERT INTO admin(NAME, EMAIL, PASSWORD) VALUES ('admin2', 'test@mail.ru', md5('hell2'));
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Мутко Андрей Владимирович', 'andrey@gmail.com', md5('andrey123'), 'andrey123');
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Агафонов Сергей Викторович', 'andrey@gmail.com', md5('serg123'), 'serg123');
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Демьянов Павел Егорович', 'pashebor@gmail.com', md5('ltvmzyjd'), 'ltvmzyjd');
DROP TABLE users;
DELETE FROM users WHERE id = 12;