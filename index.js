const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "aula_signo",
  password: "ds564",
  port: 5432,
});

app.use(express.json());

// Rotas para pegar por id
app.get("/usuario", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM usuario");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os usuários" });
  }
});

app.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM usuario WHERE id = $1", [
      id,
    ]);
    res.json(
      rows.length > 0
        ? { message: "Usuario encontrado!", rows }
        : { message: "Usuario não encontrado" }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar o usuário" });
  }
});

// Rota para criar um novo usuário
app.post("/usuario", async (req, res) => {
  const { nome, sobrenome, datanascimento, email } = req.body;
  const idade = CalculateAge(new Date(datanascimento));
  const signo = Signo(new Date(datanascimento));

  try {
    await pool.query(
      "INSERT INTO usuario (nome, sobrenome, datanascimento, email, idade, signo) VALUES ($1, $2, $3, $4, $5, $6)",
      [nome, sobrenome, datanascimento, email, idade, signo]
    );
    res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar o usuário" });
  }
});

// Rota para editar um usuário
app.put("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, datanascimento, email } = req.body;
  const idade = CalculateAge(new Date(datanascimento));
  const signo = Signo(new Date(datanascimento));

  try {
    await pool.query(
      "UPDATE usuario SET nome = $1, sobrenome = $2, datanascimento = $3, email = $4, idade = $5, signo = $6 WHERE id = $7",
      [nome, sobrenome, datanascimento, email, idade, signo, id]
    );
    res.json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar o usuário" });
  }
});

// Rota para deletar um usuário

app.delete("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM usuario WHERE id = $1", [id]);
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o usuário" });
  }
});

// Rota da porta 3000
app.listen(PORT, () => {
  console.log(`Server rodando perfeitamente na porta ${PORT}`);
});

// Função para calcular o signo
const Signo = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
    return "Áries";
  } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
    return "Touro";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "Gêmeos";
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Câncer";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leão";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgem";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Libra";
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Escorpião";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagitário";
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricórnio";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquário";
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "Peixes";
  }
};

// Função para calcular a idade
const CalculateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Rota de teste
app.get("/", (req, res) => {
  res.send("A rota está funcionando perfeitamente!");
});
