const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../database');

router.post('/registro', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nome, email, senha: senhaHash }])
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !data) return res.status(401).json({ error: 'Usuário não encontrado' });
    const senhaValida = await bcrypt.compare(senha, data.senha);
    if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });
    const token = jwt.sign(
      { id: data.id, perfil: data.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, usuario: { id: data.id, nome: data.nome, perfil: data.perfil } });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
