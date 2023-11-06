-- Active: 1699130728912@@127.0.0.1@3306@thebradery
CREATE DATABASE TheBradery
    CHARACTER SET = 'utf8mb4'
    COLLATE 'utf8mb4_general_ci';

--CREATE TABLE user (
    --id INT AUTO_INCREMENT PRIMARY KEY,
   -- first_name VARCHAR(50) NOT NULL,
    --last_name VARCHAR(50) NOT NULL,
    --pseudo VARCHAR(50) NOT NULL,
    --password VARCHAR(255) NOT NULL
--);

CREATE TABLE commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- user_id INT NOT NULL,  Clé étrangère "user"
    date_commande DATETIME NOT NULL,
    prix_total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE commande_article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT NOT NULL, -- Clé étrangère table "commande"
    products_id INT NOT NULL, -- Clé étrangère table "produit"
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_commande FOREIGN KEY (commande_id) REFERENCES commande (id),
    CONSTRAINT fk_product FOREIGN KEY (products_id) REFERENCES Products (id));
    
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory INT NOT NULL
);

INSERT INTO Products (name, price, inventory) VALUES 
    ('T-shirt Blanc', 19.99, 100),
    ('Jean Slim Noir', 49.99, 75),
    ('Chaussures de Sport', 89.99, 50),
    ('Veste en Cuir', 199.99, 25),
    ("Robe d'Été", 29.99, 60),
    ('Cravate en Soie', 24.99, 40),
    ('Sac à Main', 59.99, 30),
    ('Chapeau Panama', 34.99, 20),
    ('Écharpe en Laine', 29.99, 45),
    ('Ceinture en Cuir', 39.99, 70),
    ('Montre Classique', 149.99, 15),
    ('Bottes en Cuir', 99.99, 40),
    ('Lunettes de Soleil', 79.99, 50),
    ('Chemise à Carreaux', 44.99, 55),
    ('Pull-over Gris', 64.99, 35),
    ('Short en Jean', 39.99, 60),
    ("Sandales d'Été", 49.99, 40),
    ('Bijoux Fantaisie', 14.99, 85),
    ('Pantalon Chino', 54.99, 50),
    ('Blouse Florale', 39.99, 40);

