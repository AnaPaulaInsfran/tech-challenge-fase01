// Inicializa dados em memória global
if (!global.transactions) {
  global.transactions = [
    { id: 1, tipo: "depósito", valor: 1000, data: "2026-05-15" },
    { id: 2, tipo: "transferência", valor: -200, data: "2026-05-16" },
  ];
}

// Função auxiliar para acessar transações
export function getTransactions() {
  return global.transactions;
}

// Handler da rota /api/transactions
export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(global.transactions);
  } else if (req.method === "POST") {
    const { tipo, valor, data } = req.body;
    const nova = { id: Date.now(), tipo, valor, data };
    global.transactions.push(nova);
    res.status(201).json(nova);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    global.transactions = global.transactions.filter((t) => t.id !== id);
    res.status(200).json({ message: "Transação deletada" });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
