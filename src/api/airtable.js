const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

export async function fetchTransactions() {
  const res = await fetch(AIRTABLE_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await res.json();

  return data.records.map((r) => ({
    id: r.id,
    ...r.fields,
  }));
}

export async function createTransaction(tx) {
  const res = await fetch(AIRTABLE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: tx }),
  });

  const data = await res.json();
  return { id: data.id, ...data.fields };
}

export async function deleteTransaction(id) {
  await fetch(`${AIRTABLE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
}

export async function updateTransaction(id, fields) {
  const res = await fetch(`${AIRTABLE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  const data = await res.json();
  return { id: data.id, ...data.fields };
}
