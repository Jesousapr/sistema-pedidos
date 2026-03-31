import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    api.get('/produtos').then(res => setProdutos(res.data));
  }, []);

  const adicionarAoCarrinho = (produto) => {
    const existe = carrinho.find(i => i.produto_id === produto.id);
    if (existe) {
      setCarrinho(carrinho.map(i =>
        i.produto_id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
      ));
    } else {
      setCarrinho([...carrinho, { produto_id: produto.id, nome: produto.nome, preco_unitario: produto.preco, quantidade: 1 }]);
    }
  };

  const finalizarPedido = async () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    try {
      await api.post('/pedidos', { usuario_id: usuario.id, itens: carrinho });
      alert('Pedido realizado com sucesso!');
      setCarrinho([]);
    } catch (err) {
      alert('Erro ao realizar pedido');
    }
  };

  const sair = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Cardápio</h2>
        <div>
          <a href="/pedidos" style={{ marginRight: 10 }}>Meus Pedidos</a>
          <button onClick={sair} style={{ padding: '6px 12px', cursor: 'pointer' }}>Sair</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
        {produtos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
            <h3>{p.nome}</h3>
            <p>{p.descricao}</p>
            <p style={{ fontWeight: 'bold' }}>R$ {p.preco}</p>
            <button onClick={() => adicionarAoCarrinho(p)}
              style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: 4 }}>
              Adicionar
            </button>
          </div>
        ))}
      </div>

      {carrinho.length > 0 && (
        <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
          <h3>Carrinho</h3>
          {carrinho.map(i => (
            <p key={i.produto_id}>{i.nome} x{i.quantidade} — R$ {(i.preco_unitario * i.quantidade).toFixed(2)}</p>
          ))}
          <p style={{ fontWeight: 'bold' }}>
            Total: R$ {carrinho.reduce((acc, i) => acc + i.preco_unitario * i.quantidade, 0).toFixed(2)}
          </p>
          <button onClick={finalizarPedido}
            style={{ padding: '10px 20px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: 4 }}>
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
}
