import { useState } from "react";
import { categories } from "../features/categories";
import styles from "./TransactionsList.module.css";

function TransactionsList({
  transactions,
  onDelete,
  onEdit,
  editing,
  onSaveEdit,
}) {
  function getCategory(id) {
    return (
      categories.find((c) => c.id === id) || { label: "Unknown", color: "#ccc" }
    );
  }

  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  function startEdit(t) {
    onEdit(t);
    setEditForm({
      description: t.description,
      amount: t.amount,
      category: t.category,
      date: t.date,
    });
  }

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function saveEdit() {
    onSaveEdit({
      ...editing,
      ...editForm,
      amount: Number(editForm.amount),
    });
  }

  return (
    <div className={styles.list}>
      {transactions.map((t) => {
        const category = getCategory(t.category);

        const isEditing = editing && editing.id === t.id;

        return (
          <div key={t.id} className={styles.item}>
            {isEditing ? (
              <>
                <input
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                />
                <input
                  name="amount"
                  value={editForm.amount}
                  onChange={handleEditChange}
                />
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  name="date"
                  type="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                />

                <button className={styles.saveBtn} onClick={saveEdit}>
                  Save
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => onEdit(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className={styles.date}>{t.date}</span>
                <span className={styles.description}>{t.description}</span>

                <span
                  className={styles.category}
                  style={{ backgroundColor: category.color }}
                >
                  {category.label}
                </span>

                <span className={t.amount < 0 ? styles.expense : styles.income}>
                  {t.amount < 0 ? `-$${Math.abs(t.amount)}` : `$${t.amount}`}
                </span>

                <button className={styles.editBtn} onClick={() => startEdit(t)}>
                  Edit
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(t.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TransactionsList;
