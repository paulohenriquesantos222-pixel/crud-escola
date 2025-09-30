const express = require('express')
const router = express.Router()

let alunos = [
  {
    id: 1,
    nome: "João Silva",
    cpf: "12345678901",
    email: "joao@escola.com",
    telefone: "11999999999",
    dataNascimento: "2000-01-15"
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    cpf: "98765432100",
    email: "maria@escola.com",
    telefone: "21988888888",
    dataNascimento: "1999-05-20"
  }
]

router.post('/', (req, res) => {
  const { nome, cpf, email, telefone, dataNascimento } = req.body

  if (!nome || !cpf || !email || !telefone || !dataNascimento) {
    return res.status(400).json({ 
      error: "nome, cpf, email, telefone e dataNascimento são obrigatórios!" 
    })
  }

  const alunoExistente = alunos.find(aluno => aluno.cpf == cpf)
  if (alunoExistente) {
    return res.status(409).json({ error: "CPF já cadastrado!" })
  }

  const novoAluno = {
    id: Date.now(), 
    nome,
    cpf,
    email,
    telefone,
    dataNascimento
  }

  alunos.push(novoAluno)

  res.status(201).json({ message: "Aluno cadastrado com sucesso!", novoAluno })
})

router.get('/', (req, res) => {
  res.json(alunos)
})

router.get('/:id', (req, res) => {
  const idRecebido = req.params.id
  const aluno = alunos.find(a => a.id == idRecebido)

  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado!" })
  }

  res.json(aluno)
})

router.put('/:id', (req, res) => {
  const idRecebido = req.params.id
  const { nome, email, telefone, dataNascimento } = req.body

  if (!nome || !email || !telefone || !dataNascimento) {
    return res.status(400).json({ 
      error: "nome, email, telefone e dataNascimento são obrigatórios!" 
    })
  }

  const aluno = alunos.find(a => a.id == idRecebido)
  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado!" })
  }

  aluno.nome = nome
  aluno.email = email
  aluno.telefone = telefone
  aluno.dataNascimento = dataNascimento

  res.json({ message: "Aluno atualizado com sucesso!" })
})

router.delete('/:id', (req, res) => {
  const idRecebido = req.params.id
  const aluno = alunos.find(a => a.id == idRecebido)

  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado!" })
  }

  alunos = alunos.filter(a => a.id != idRecebido)

  res.json({ message: "Aluno excluído com sucesso!" })
})

module.exports = router
