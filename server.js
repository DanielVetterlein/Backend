const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")
const bcrypt = require("bcrypt")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database("./database.db")

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT
    )`
)

app.post("/usuario", async (req, res) => {
    console.log(req.body);


    let nome = req.body.nome
    let email = req.body.emal
    let senha = req.body.senha

    let senhaHash = await bcrypt.hash(senha, 10)
    console.log(senhaHash);

    db.run(`INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)`,
        [nome, email, senhaHash],
        res.json({
            id: this.lastID,
            nome,
            email
        })
    )
})