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
  REPORT_ID INTEGER,
  REPORT_ASSOC_NAME VARCHAR(120),
  REPORT_NAME VARCHAR(120),
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

CREATE TABLE list2(
   id INT(11) AUTO_INCREMENT NOT NULL,
   procreator VARCHAR (120),
   country VARCHAR (120),
   over_vol_purchases FLOAT,
   market_share FLOAT,
   vol_sales_kg FLOAT,
   vol_sales_m FLOAT,
   count_sales INTEGER,
   PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE list3 (
  id INT(11) AUTO_INCREMENT NOT NULL,
  region VARCHAR (120),
  supply_dol FLOAT,
  market_share FLOAT,
  supply_kg FLOAT,
  supply_m FLOAT ,
  count_supplies INTEGER ,
  PRIMARY KEY (id))
  ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE list4 (
  id INT(11) AUTO_INCREMENT NOT NULL,
  num_m2 INTEGER,
  company_d INTEGER,
  firm_name VARCHAR (150),
  firm_address VARCHAR (250),
  firm_phone VARCHAR (50),
  m_field INTEGER,
  c_owner VARCHAR (120),
  address_c_owner  VARCHAR (250),
  overall_sales_dol FLOAT,
  market_share FLOAT,
  vol_sales_m FLOAT,
  count_sales INTEGER,
  PRIMARY KEY (id))
  ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE list5 (
  id INT(11) AUTO_INCREMENT NOT NULL,
  g081 INTEGER,
  s_firm_name VARCHAR (150),
  s_firm_address VARCHAR (250),
  r_firm_name VARCHAR (150),
  r_firm_address VARCHAR (250),
  manufacturer VARCHAR (120),
  r_country VARCHAR (120),
  s_country VARCHAR (120),
  code_tn_ved  INTEGER,
  description TEXT,
  t_shipment VARCHAR (50),
  shipment_vol_kg FLOAT,
  shipment_vol_m2 FLOAT,
  c_currency VARCHAR (25),
  shipment_cost FLOAT,
  cost_price_dol FLOAT,
  shipment_date VARCHAR(80),
  PRIMARY KEY (id))
  ENGINE = InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE reports (
  id INT(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR (120),
  assocName VARCHAR (120),
  dCreated VARCHAR (120),
  PRIMARY KEY (id)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

SELECT * FROM reports;
SELECT * FROM users;
SELECT * FROM otchet_nomer_1_r_customers;
SELECT * FROM otchet_za_11_11_2017_c_preferences;
SELECT * FROM admin WHERE NAME='admin' AND PASSWORD=md5('hello');
INSERT INTO admin(NAME, EMAIL, PASSWORD) VALUES ('admin2', 'test@mail.ru', md5('hell2'));
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Мутко Андрей Владимирович', 'andrey@gmail.com', md5('andrey123'), 'andrey123');
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Агафонов Сергей Викторович', 'andrey@gmail.com', md5('serg123'), 'serg123');
INSERT INTO users(NAME, EMAIL, PASSWORD_MD5, PASSWORD) VALUES ('Демьянов Павел Егорович', 'pashebor@gmail.com', md5('ltvmzyjd'), 'ltvmzyjd');
DROP TABLE noviy_otchet_r_exporters;
DROP TABLE reports;
DROP TABLE posledniy_otchet_r_provider;
DELETE FROM users WHERE id = 12;
ALTER TABLE reports DROP COLUMN owner_name;
UPDATE users SET REPORT_ID=NULL, REPORT_ASSOC_NAME=NULL, REPORT_NAME=NULL WHERE ID= 3;
/*r_customers // r_manufact // r_provider // r_exporters //c_preferences*/