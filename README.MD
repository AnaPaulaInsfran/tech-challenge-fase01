# TECH CHALLENGE 

## FASE 01

### ⚙️ Instalação e Execução
Clonar o repositório
```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

Atualizar seu projeto com as mudanças do repositorio remoto
```bash
git pull
```

Instalar dependências
```bash
npm install
```

Rodar o servidor de desenvolvimento
```bash
npm run dev
```

O projeto estará disponível em:
```bash
http://localhost:3000
```

### 🚀 Fluxo de Uso
Abrir Home (/) → vê saldo e últimas transações.

Abrir Transações (/transactions) → lista todas as transações e formulário para adicionar.

Adicionar transação → preencher formulário e enviar → backend salva em /api/transactions.

Deletar transação → clicar em "Deletar" → backend remove via /api/transactions.

Saldo atualizado → sempre que consultar /api/saldo, o valor é recalculado.

### 📂 Estrutura das Telas
**Home (/)** → Exibe saldo atual e últimas transações.

**Transações (/transactions)** → Lista todas as transações e possui formulário para adicionar novas.

#### _Home Page (pages/index.js)_
Objetivo: Dar boas-vindas ao usuário e mostrar o saldo atual da conta.

**Funcionalidades:**
- Exibe o saldo atual (consultado via /api/saldo).
- Mostra as últimas 5 transações (consultadas via /api/transactions).
- incluir um link para a página de transações (/transactions).

#### _Listagem de Transações (pages/transactions.js)_
- Objetivo: Exibir todas as transações realizadas.

**Funcionalidades:**
- Lista todas as transações salvas.

- Permite deletar uma transação.

- Inclui um formulário para adicionar novas transações:

**Tipo (depósito ou transferência).**

Valor.

Data.

> Ao adicionar ou deletar, os dados são enviados para o endpoint /api/transactions.

### 📡 Endpoints da API
- GET /api/transactions → Lista todas as transações.

- POST /api/transactions → Adiciona nova transação.

- DELETE /api/transactions → Remove transação pelo id.

- GET /api/saldo → Retorna saldo calculado com base nas transações.
#### GET /api/transactions
Descrição: Retorna todas as transações.

Exemplo de resposta:
```json 
[
  { "id": 1, "tipo": "depósito", "valor": 1000, "data": "2026-05-15" },
  { "id": 2, "tipo": "transferência", "valor": -200, "data": "2026-05-16" }
]
```

#### POST /api/transactions
Descrição: Adiciona uma nova transação.

Body esperado:
```json
{
  "tipo": "depósito",
  "valor": 500,
  "data": "2026-05-16"
}
```
Resposta:
```json
{
  "id": 1652712345678,
  "tipo": "depósito",
  "valor": 500,
  "data": "2026-05-16"
}
```

#### DELETE /api/transactions
Descrição: Remove uma transação pelo id.

Body esperado:
```json
{ "id": 2 }
```
Resposta:
```json
{ "message": "Transação deletada" }
```

#### GET /api/saldo
Descrição: Calcula e retorna o saldo atual com base nas transações.

Exemplo de resposta:
```json
{ "saldo": 800 }
```

## 🛠️ Configuração do Gitignore

Este projeto já inclui um arquivo `.gitignore` para evitar versionar arquivos desnecessários.  
Principais exclusões:
- `node_modules/` → dependências instaladas localmente.
- `.next/` → build gerado pelo Next.js.
- `.env*` → arquivos de variáveis de ambiente (senhas, tokens, etc).
- Logs e caches temporários.

Isso garante que apenas o código-fonte e arquivos relevantes sejam enviados ao repositório.
