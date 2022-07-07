DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS etps;
DROP TABLE IF EXISTS financing_plan;
DROP TABLE IF EXISTS nft;


CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    birth_date TIMESTAMP NOT NULL,
    post_addr VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    city VARCHAR(200) NOT NULL,
	street_addr VARCHAR(200) NOT NULL,
    phone_number VARCHAR(200) NOT NULL,
    mail_addr VARCHAR(200) NOT NULL,
    pwd VARCHAR(200) NOT NULL,
    entreprise VARCHAR(200),
    mensuality TIMESTAMP,
    yearly_income FLOAT NOT NULL,
    verified BOOLEAN NOT NULL,
    is_banned BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS etps(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	access_code INT NOT NULL,
    entreprise VARCHAR(200) NOT NULL,
    is_banned BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS financing_plan(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rate_interest FLOAT NOT NULL,
    rate_insurance FLOAT NOT NULL,
    contribution FLOAT NOT NULL,
    monthly_loan FLOAT NOT NULL,
    housing_price FLOAT NOT NULL,
    user_risk FLOAT NOT NULL,
    user_id INT NOT NULL,
    nft_id INT NOT NULL,
    validate BOOLEAN NOT NULL,
    etps VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS nft(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nftUri VARCHAR(200) NOT NULL,
    creator_etps VARCHAR(200) NOT NULL,
    price FLOAT NOT NULL

);

