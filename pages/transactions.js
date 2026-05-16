import { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [tipo, setTipo] = useState("depósito");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");

  // Carregar do localStorage ou backend
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
      fetch("/api/transactions")
        .then((res) => res.json())
        .then((data) => setTransactions(data));
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Adicionar nova transação
  const salvar = async () => {
    const nova = { tipo, valor: Number(valor), data };
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nova),
    });
    const criada = await res.json();
    setTransactions([...transactions, criada]);
    setTipo("depósito");
    setValor("");
    setData("");
  };

  // Deletar transação
  const deletar = async (id) => {
    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>

      {/* Formulário */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          salvar();
        }}
        className="flex flex-col gap-2 mb-6"
      >
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2"
        >
          <option value="depósito">Depósito</option>
          <option value="transferência">Transferência</option>
        </select>
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </form>

      {/* Lista */}
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className="flex justify-between border-b py-2">
            {t.tipo} - R${t.valor} em {t.data}
            <button
              onClick={() => deletar(t.id)}
              className="text-red-500 ml-4"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
