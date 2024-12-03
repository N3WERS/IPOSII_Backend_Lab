CREATE TABLE users (
    id SERIAL PRIMARY key,
    name VARCHAR(128),
    password VARCHAR(256)
);

-- Таблица сотрудников
CREATE TABLE Employees (
    employee_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    salary NUMERIC(10, 2) NOT NULL
);

-- Таблица вольеров
CREATE TABLE Enclosures (
    enclosure_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    animal_class TEXT NOT NULL,
    capacity INT NOT NULL,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE SET NULL
);

-- Таблица животных
CREATE TABLE Animals (
    animal_id SERIAL PRIMARY KEY,
    species TEXT NOT NULL,
    name TEXT NOT NULL,
    color TEXT,
    age INT,
    habitat TEXT,
    notes TEXT,
    diet_id INT,
    enclosure_id INT,
    FOREIGN KEY (diet_id) REFERENCES Diets(diet_id) ON DELETE SET NULL,
    FOREIGN KEY (enclosure_id) REFERENCES Enclosures(enclosure_id) ON DELETE CASCADE
);

-- Таблица рационов питания
CREATE TABLE Diets (
    diet_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

-- Таблица обслуживания вольеров
CREATE TABLE EnclosureMaintenance (
    maintenance_id SERIAL PRIMARY KEY,
    enclosure_id INT NOT NULL,
    employee_id INT NOT NULL,
    bonus NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (enclosure_id) REFERENCES Enclosures(enclosure_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

-- Добавляем пользователя
INSERT INTO Users (username, password) 
VALUES ('admin', 'pass');

-- Добавляем сотрудника
INSERT INTO Employees (name, salary) 
VALUES ('John Doe', 50000);

-- Добавляем вольер
INSERT INTO Enclosures (name, animal_class, capacity, employee_id) 
VALUES ('Savannah Habitat', 'Mammals', 10, 1);

-- Добавляем рацион питания
INSERT INTO Diets (description) 
VALUES ('Herbivore diet: grass, fruits, and vegetables');

-- Добавляем животное
INSERT INTO Animals (species, name, color, age, habitat, notes, diet_id, enclosure_id) 
VALUES ('Giraffe', 'Jerry', 'Spotted', 5, 'African Savannah', 'Calm and friendly', 1, 1);

-- Добавляем обслуживание вольера
INSERT INTO EnclosureMaintenance (enclosure_id, employee_id, bonus) 
VALUES (1, 1, 500);