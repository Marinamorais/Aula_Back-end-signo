CREATE TABLE usuario (
    id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    datanascimento DATE NOT NULL,
    email VARCHAR(150) NOT NULL,
    idade INTEGER NOT NULL,
    signo VARCHAR(20) NOT NULL
);
