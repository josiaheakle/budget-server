CREATE DATABASE budget_app;

USE budget_app;

CREATE TABLE users (
  id VARCHAR(128) PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE budgets (
  id VARCHAR(128) PRIMARY KEY,
  type ENUM('actual', 'projected'),
  ownerId VARCHAR(128) NOT NULL,
  startDate DATE,
  endDate DATE,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (ownerId) REFERENCES users(id)
);

CREATE TABLE expenseCategories (
  id VARCHAR(128) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE expenses (
  id VARCHAR(128) PRIMARY KEY,
  amount FLOAT,
  categoryId VARCHAR(128) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (categoryId) REFERENCES expenseCategories(id)
);