import { categories } from "../features/categories";
import styles from "./TransactionsList.module.css";

function TransactionsList({ transactions }) {
  function getCategoryLabel(id) {
    const found = categories.find((c) => c.id === id);
    return found ? found.label : "Unknown";
  }

  return (
    <div className={styles.list}>
      {transactions.map((t) => (
        <div key={t.id} className={styles.item}>
          <span className={styles.date}>{t.date}</span>
          <span className={styles.description}>{t.description}</span>
          <span className={styles.category}>
            {getCategoryLabel(t.category)}
          </span>
          <span className={t.amount < 0 ? styles.expense : styles.income}>
            {t.amount < 0 ? `-$${Math.abs(t.amount)}` : `$${t.amount}`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
