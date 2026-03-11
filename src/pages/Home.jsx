import { NavLink } from "react-router-dom";
import SummaryCard from "../components/SummaryCard";
import styles from "./Home.module.css";

function Home() {
  const showMessage = true;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to the Personal Finance Dashboard
      </h1>

      {showMessage && (
        <p className={styles.subtitle}>
          Track your income, expenses, and financial habits in one place.
        </p>
      )}

      <div className={styles.actions}>
        <NavLink to="/dashboard" className={styles.button}>
          Go to Dashboard
        </NavLink>
      </div>

      <section className={styles.features}>
        <h2>What You Can Do</h2>

        <div className={styles.cards}>
          <SummaryCard label="Track Income" value="Add entries" />
          <SummaryCard label="Track Expenses" value="Stay organized" />
          <SummaryCard label="Edit & Delete" value="Full control" />
          <SummaryCard label="Airtable Sync" value="Cloud storage" />
        </div>
      </section>
    </div>
  );
}

export default Home;
