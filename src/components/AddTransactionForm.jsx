import { useState } from "react";
import { categories } from "../features/categories";
import styles from "./AddTransactionForm.module.css";

function AddTransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  function handleSubmit(e) {
    e.preventDefault();

    const numericAmount = parseFloat(amount);

    const finalAmount =
      type === "expense" ? -Math.abs(numericAmount) : Math.abs(numericAmount);

    const newTx = {
      id: crypto.randomUUID(),
      description,
      amount: finalAmount,
      category,
      date: new Date().toISOString().slice(0, 10),
    };

    onAdd(newTx);

    setDescription("");
    setAmount("");
    setCategory("");
    setType("expense");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.descriptionField}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.categoryField}
        required
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      <button type="submit" className={styles.submitButton}>
        Add
      </button>
    </form>
  );
}

export default AddTransactionForm;
