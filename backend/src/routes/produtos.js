const express = require('express');
const router = express.Router();
const supabase = require('../database');

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('produtos').select('*').eq('disponivel', true);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;
  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, descricao, preco, categoria }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, categoria, disponivel } = req.body;
  const { data, error } = await supabase
    .from('produtos')
    .update({ nome, descricao, preco, categoria, disponivel })
    .eq('id', id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('produtos').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Produto deletado com sucesso!' });
});

module.exports = router;
