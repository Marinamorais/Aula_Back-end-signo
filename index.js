const express = require('express');
const { Pool } = require('pg'); // Importe Pool do pacote 'pg'

const app = express();
const PORT = 3000;

// Conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'aula_back',
    password: 'ds564',
    port: 5432,
});

app.use(express.json());


// Rota de teste
app.get('/', (req, res) => {
    res.send('A rota está funcionando perfeitamente!');
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Server rodando perfeitamente na porta ${PORT}`);
});