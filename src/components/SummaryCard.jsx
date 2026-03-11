import styles from "./SummaryCard.module.css";

function SummaryCard({ label, value, icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
      </div>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export default SummaryCard;
