import { useState, useEffect, useCallback } from "react";
import SummaryCard from "../components/SummaryCard";
import TransactionsList from "../components/TransactionsList";
import AddTransactionForm from "../components/AddTransactionForm";
import { categories } from "../features/categories";
import styles from "./Dashboard.module.css";

import {
  fetchTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../api/airtable";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchTransactions();
      setTransactions(data);
    }
    load();
  }, []);

  useEffect(() => {
    document.title = "Personal Finance Dashboard";
  }, []);

  const handleAddTransaction = useCallback(async (newTx) => {
    const saved = await createTransaction(newTx);
    setTransactions((prev) => [saved, ...prev]);
  }, []);

  async function handleDeleteTransaction(id) {
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleSaveEdit(updatedTx) {
    const saved = await updateTransaction(updatedTx.id, updatedTx);

    setTransactions((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));

    setEditing(null);
  }

  const incomeTotal = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = incomeTotal - expenseTotal;

  const categoryTotals = categories.map((cat) => {
    const total = transactions
      .filter((t) => t.category === cat.id)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return { ...cat, total };
  });

  return (
    <div className={styles.container}>
      <section className={styles.summary}>
        <SummaryCard
          label="Total Income"
          value={`$${incomeTotal.toFixed(2)}`}
        />
        <SummaryCard
          label="Total Expenses"
          value={`$${expenseTotal.toFixed(2)}`}
        />
        <SummaryCard label="Balance" value={`$${balance.toFixed(2)}`} />
      </section>

      <section className={styles.transactions}>
        <AddTransactionForm onAdd={handleAddTransaction} />

        <TransactionsList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          onEdit={setEditing}
          editing={editing}
          onSaveEdit={handleSaveEdit}
        />
      </section>

      <section className={styles.categories}>
        <div className={styles.panel}>
          {categoryTotals.map((cat) => (
            <div key={cat.id} className={styles.categoryRow}>
              <span
                className={styles.categoryBadge}
                style={{ backgroundColor: cat.color }}
              >
                {cat.label}
              </span>
              <span className={styles.categoryAmount}>
                ${cat.total.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
