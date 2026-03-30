const express = require('express');
const router = express.Router();
const supabase = require('../database');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*, itens_pedido(*, produtos(*))');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { usuario_id, itens } = req.body;
  try {
    const total = itens.reduce((acc, item) => acc + item.preco_unitario * item.quantidade, 0);
    const { data: pedido, error: erroPedido } = await supabase
      .from('pedidos')
      .insert([{ usuario_id, total }])
      .select();
    if (erroPedido) return res.status(400).json({ error: erroPedido.message });
    const itensPedido = itens.map(item => ({
      pedido_id: pedido[0].id,
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      preco_unitario: item.preco_unitario
    }));
    const { error: erroItens } = await supabase.from('itens_pedido').insert(itensPedido);
    if (erroItens) return res.status(400).json({ error: erroItens.message });
    res.status(201).json({ message: 'Pedido criado!', pedido: pedido[0] });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { data, error } = await supabase
    .from('pedidos')
    .update({ status })
    .eq('id', id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;
