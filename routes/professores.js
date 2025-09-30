const express = require('express')
const router = express.Router()

let professores = [
  {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "11122233344",
    email: "carlos@escola.com",
    telefone: "11977778888",
    materia: "Matemática"
  },
  {
    id: 2,
    nome: "Fernanda Souza",
    cpf: "55566677788",
    email: "fernanda@escola.com",
    telefone: "21966667777",
    materia: "História"
  }
]

router.post('/', (req, res) => {
  const { nome, cpf, email, telefone, materia } = req.body

  if (!nome || !cpf || !email || !telefone || !materia) {
    return res.status(400).json({
      error: "nome, cpf, email, telefone e materia são obrigatórios!"
    })
  }

  const professorExistente = professores.find(prof => prof.cpf == cpf)
  if (professorExistente) {
    return res.status(409).json({ error: "CPF já cadastrado!" })
  }

  const novoProfessor = {
    id: Date.now(),
    nome,
    cpf,
    email,
    telefone,
    materia
  }

  professores.push(novoProfessor)
  res.status(201).json({ message: "Professor cadastrado com sucesso!", novoProfessor })
})

router.get('/', (req, res) => {
  res.json(professores)
})

router.get('/:id', (req, res) => {
  const idRecebido = req.params.id
  const professor = professores.find(p => p.id == idRecebido)

  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado!" })
  }

  res.json(professor)
})

router.put('/:id', (req, res) => {
  const idRecebido = req.params.id
  const { nome, email, telefone, materia } = req.body

  if (!nome || !email || !telefone || !materia) {
    return res.status(400).json({
      error: "nome, email, telefone e materia são obrigatórios!"
    })
  }

  const professor = professores.find(p => p.id == idRecebido)
  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado!" })
  }

  professor.nome = nome
  professor.email = email
  professor.telefone = telefone
  professor.materia = materia

  res.json({ message: "Professor atualizado com sucesso!", professor })
})

router.delete('/:id', (req, res) => {
  const idRecebido = req.params.id
  const professor = professores.find(p => p.id == idRecebido)

  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado!" })
  }

  professores = professores.filter(p => p.id != idRecebido)
  res.json({ message: "Professor excluído com sucesso!" })
})

module.exports = router
