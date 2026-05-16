import { getTransactions } from "./transactions";

export default function handler(req, res) {
  if (req.method === "GET") {
    const transactions = getTransactions();
    const saldo = transactions.reduce((acc, t) => acc + Number(t.valor), 0);
    res.status(200).json({ saldo });
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
