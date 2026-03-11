import styles from "./About.module.css";

function About() {
  const showNote = true;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About This Project</h1>

      <p className={styles.text}>
        The Personal Finance Dashboard is a simple and efficient tool designed
        to help users track their income, expenses, and spending habits. It was
        built using React, React Router, and Airtable for persistent cloud
        storage.
      </p>

      {showNote && (
        <p className={styles.text}>
          This project was created as part of a React final assignment to
          demonstrate routing, state management, CRUD operations, reusable
          components, and clean UI design.
        </p>
      )}

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Key Features</h2>

        <ul className={styles.list}>
          <li>Track income and expenses</li>
          <li>Edit and delete transactions</li>
          <li>Category‑based totals</li>
          <li>Persistent data using Airtable</li>
          <li>Reusable components and modular structure</li>
          <li>React Router navigation across multiple pages</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Technologies Used</h2>

        <ul className={styles.list}>
          <li>React (Vite)</li>
          <li>React Router</li>
          <li>Airtable REST API</li>
          <li>CSS Modules</li>
          <li>JavaScript ES6</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
