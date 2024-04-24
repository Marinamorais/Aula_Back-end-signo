CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    datanascimento DATE NOT NULL,
    email VARCHAR(150) NOT NULL,
    idade INTEGER NOT NULL,
    signo VARCHAR(20) NOT NULL
);

// criação da função de calcular signo

CREATE FUNCTION calcula_signo(data_nascimento DATE) RETURNS VARCHAR AS $$
DECLARE
    signo VARCHAR(20);
BEGIN
    SELECT CASE
        WHEN data_nascimento BETWEEN '2000-01-20' AND '2000-02-18' THEN 'Aquário'
        WHEN data_nascimento BETWEEN '2000-02-19' AND '2000-03-20' THEN 'Peixes'
        WHEN data_nascimento BETWEEN '2000-03-21' AND '2000-04-19' THEN 'Áries'
        WHEN data_nascimento BETWEEN '2000-04-20' AND '2000-05-20' THEN 'Touro'
        WHEN data_nascimento BETWEEN '2000-05-21' AND '2000-06-21' THEN 'Gêmeos'
        WHEN data_nascimento BETWEEN '2000-06-22' AND '2000-07-22' THEN 'Câncer'
        WHEN data_nascimento BETWEEN '2000-07-23' AND '2000-08-22' THEN 'Leão'
        WHEN data_nascimento BETWEEN '2000-08-23' AND '2000-09-22' THEN 'Virgem'
        WHEN data_nascimento BETWEEN '2000-09-23' AND '2000-10-23' THEN 'Libra'
        WHEN data_nascimento BETWEEN '2000-10-24' AND '2000-11-21' THEN 'Escorpião'
        WHEN data_nascimento BETWEEN '2000-11-22' AND '2000-12-21' THEN 'Sagitário'
        ELSE 'Capricórnio'
    END INTO signo;
    RETURN signo;
END;
$$ LANGUAGE plpgsql;

// criação da função de calcular idade
CREATE function calcula_idade(data_nascimento DATE) RETURNS INTEGER AS $$
DECLARE
    idade INTEGER;
BEGIN
    SELECT EXTRACT(YEAR FROM AGE(NOW(), data_nascimento)) INTO idade;
    RETURN idade;
END;
$$ LANGUAGE plpgsql;

//criação do insert

INSERT INTO usuario (nome, sobrenome, datanascimento, email, idade, signo) VALUES ('Marina', 'Morais', '2006-04-24', 'marinamorais@gmail.com', calcula_idade('2006-04-24'), calcula_signo('2006-04-24'));