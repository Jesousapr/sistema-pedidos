import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api.get('/pedidos').then(res => setPedidos(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Meus Pedidos</h2>
        <a href="/produtos">Voltar ao Cardápio</a>
      </div>
      {pedidos.length === 0 && <p>Nenhum pedido encontrado.</p>}
      {pedidos.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <p><strong>Pedido:</strong> {p.id}</p>
          <p><strong>Status:</strong> {p.status}</p>
          <p><strong>Total:</strong> R$ {p.total}</p>
          <p><strong>Data:</strong> {new Date(p.criado_em).toLocaleDateString('pt-BR')}</p>
        </div>
      ))}
    </div>
  );
}
