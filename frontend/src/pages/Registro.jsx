import { useState } from 'react';
import api from '../services/api';

export default function Registro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/registro', { nome, email, senha });
      window.location.href = '/';
    } catch (err) {
      setErro('Erro ao criar conta');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>Criar Conta</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleRegistro}>
        <input type="text" placeholder="Nome" value={nome}
          onChange={e => setNome(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <input type="password" placeholder="Senha" value={senha}
          onChange={e => setSenha(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }} />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Cadastrar
        </button>
      </form>
      <p>Já tem conta? <a href="/">Login</a></p>
    </div>
  );
}
