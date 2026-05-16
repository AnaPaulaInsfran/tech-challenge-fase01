import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Buscar saldo
    fetch("/api/saldo")
      .then((res) => res.json())
      .then((data) => setSaldo(data.saldo));

    // Buscar transações
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo!</h1>

      {/* Saldo */}
      <p className="text-lg">Saldo atual: R$ {saldo}</p>

      {/* Últimas transações */}
      <h2 className="mt-6 text-xl font-semibold">Últimas transações</h2>
      <ul>
        {transactions.slice(-5).map((t) => (
          <li key={t.id}>
            {t.tipo} - R${t.valor} em {t.data}
          </li>
        ))}
      </ul>

      <Link href="/transactions" className="text-blue-500 underline">
        Ir para Transações
      </Link>
    </div>
  );
}
