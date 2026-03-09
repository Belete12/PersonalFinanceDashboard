import { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import TransactionsList from "../components/TransactionsList";
import AddTransactionForm from "../components/AddTransactionForm";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  function handleAddTransaction(newTx) {
    setTransactions((prev) => [newTx, ...prev]);
  }

  return (
    <div className={styles.container}>
      <section className={styles.summary}>
        <SummaryCard label="Total Income" value="$0" />
        <SummaryCard label="Total Expenses" value="$0" />
        <SummaryCard label="Balance" value="$0" />
      </section>

      <section className={styles.transactions}>
        <AddTransactionForm onAdd={handleAddTransaction} />
        <TransactionsList transactions={transactions} />
      </section>

      <section className={styles.categories}>
        <div className={styles.panel}>Categories / Budgets</div>
      </section>
    </div>
  );
}

export default Dashboard;
