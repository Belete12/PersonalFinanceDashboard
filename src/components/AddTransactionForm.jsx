import { useState } from "react";
import { categories } from "../features/categories";
import styles from "./AddTransactionForm.module.css";

function AddTransactionForm({ onAdd }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      date,
      description,
      amount: parseFloat(amount),
      category,
    };

    onAdd(newTransaction);

    setDate("");
    setDescription("");
    setAmount("");
    setCategory("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      <button type="submit">Add</button>
    </form>
  );
}

export default AddTransactionForm;
