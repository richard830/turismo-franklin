DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL, 
	route VARCHAR(255) NULL, 
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL 
);

INSERT INTO roles (
	name, 
	route,
	created_at,
	updated_at
)
VALUES(
	'CLIENTE',
	'client/products/list',
	'2022-06-09',
	'2022-06-09'
);

INSERT INTO roles (
	name, 
	route,
	created_at,
	updated_at
)
VALUES(
	'HOTEL',
	'restaurant/orders/list',
	'2022-06-09',
	'2022-06-09'
);

INSERT INTO roles (
	name, 
	route,
	created_at,
	updated_at
)
VALUES(
	'REPARTIDOR',
	'delivery/orders/list',
	'2022-06-09',
	'2022-06-09'
);


DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,	
	id_sub_category BIGINT NOT NULL,
	id_category BIGINT NOT NULL,
	address VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	whatsapp VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_sub_category) REFERENCES sub_categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE

);

-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
-- 	id BIGSERIAL PRIMARY KEY,
-- 	email VARCHAR(255) NOT NULL UNIQUE,
-- 	name VARCHAR(255) NOT NULL,
-- 	lastname VARCHAR(255) NOT NULL,
-- 	phone VARCHAR(80) NOT NULL UNIQUE,
-- 	cedula VARCHAR(80) NOT NULL UNIQUE,
-- 	image VARCHAR(255) NULL,	
-- 	notification_token VARCHAR(255) NULL,	
-- 	password VARCHAR(255) NOT NULL,
-- 	is_available BOOLEAN NULL,
-- 	session_token VARCHAR(255) NULL,
-- 	created_at TIMESTAMP(0) NOT NULL,
-- 	updated_at TIMESTAMP(0) NOT NULL
-- );


DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	icon VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS sub_categories CASCADE;
CREATE TABLE sub_categories (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS products CASCADE;
-- CREATE TABLE products(
-- 	id BIGSERIAL PRIMARY KEY,
-- 	name VARCHAR(180) NOT NULL UNIQUE,
-- 	description VARCHAR(255) NOT NULL,
-- 	price DECIMAL DEFAULT 0,
-- 	image1 VARCHAR(255) NULL,
-- 	image2 VARCHAR(255) NULL,
-- 	image3 VARCHAR(255) NULL,
-- 	id_category BIGINT NOT NULL,
-- 	id_sub_categories BIGINT NOT NULL,
-- 	created_at TIMESTAMP(0) NOT NULL,
-- 	updated_at TIMESTAMP(0) NOT NULL,
-- 	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
-- 	FOREIGN KEY(id_sub_categories) REFERENCES sub_categories(id) ON UPDATE CASCADE ON DELETE CASCADE
-- );


DROP TABLE IF EXISTS address CASCADE;
CREATE TABLE address(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	address VARCHAR(255) NULL,
	country VARCHAR(255) NOT NULL,
	cedula VARCHAR(80) NOT NULL,
	arrival VARCHAR(255) NULL,
	hour_arrival VARCHAR(80) NOT NULL,
	departure VARCHAR(255) NULL,
	number_people VARCHAR(80) NULL,
	payment_proof_number VARCHAR(255) NULL,
	image VARCHAR(255) NULL, 
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders(
	id BIGSERIAL PRIMARY KEY,
	id_client BIGINT NOT NULL,
	id_address BIGINT NULL,
	status VARCHAR(90) NOT NULL,
	timestamp BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS order_has_products CASCADE;
CREATE TABLE order_has_products(
	id_order BIGINT NOT NULL,
	id_product BIGINT NOT NULL,
	quantity BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	PRIMARY KEY (id_order, id_product),
	FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

