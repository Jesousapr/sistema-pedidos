# Sistema de Pedidos

Sistema web completo para gerenciamento de pedidos, desenvolvido com arquitetura em nuvem.

## 🔗 Links

- **Frontend:** https://sistema-pedidos-tau.vercel.app
- **Backend:** https://sistema-pedidos-backend-z6y3.onrender.com
- **Swagger:** https://sistema-pedidos-backend-z6y3.onrender.com/api-docs

## 🛠️ Tecnologias

- **Frontend:** React + Vite (Vercel)
- **Backend:** Node.js + Express (Render)
- **Banco de Dados:** PostgreSQL (Supabase)
- **Container:** Docker
- **CI/CD:** GitHub Actions

## 🏗️ Arquitetura
```
Frontend (Vercel)
      ↓
Backend API REST (Render + Docker)
      ↓
Banco de Dados (Supabase)
```

## 🚀 Como rodar localmente

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 Variáveis de Ambiente

### Backend (.env)
```
PORT=3000
SUPABASE_URL=sua_url
SUPABASE_KEY=sua_chave
JWT_SECRET=sua_senha_secreta
```

## 📌 Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| POST | /api/auth/registro | Criar usuário |
| POST | /api/auth/login | Login |
| GET | /api/produtos | Listar produtos |
| POST | /api/produtos | Criar produto |
| PUT | /api/produtos/:id | Atualizar produto |
| DELETE | /api/produtos/:id | Deletar produto |
| GET | /api/pedidos | Listar pedidos |
| POST | /api/pedidos | Criar pedido |
| PUT | /api/pedidos/:id/status | Atualizar status |

## 👤 Autor

- Emanuel
