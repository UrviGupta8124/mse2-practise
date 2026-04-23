import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food"
  });

  const token = localStorage.getItem("token");

  // =========================
  // FETCH EXPENSES
  // =========================
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${API}/api/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setExpenses(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  // =========================
  // ADD EXPENSE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        `${API}/api/expense`,
        {
          ...form,
          amount: Number(form.amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Expense Added");

      setForm({
        title: "",
        amount: "",
        category: "Food"
      });

      fetchExpenses();

    } catch (err) {
      console.log("ADD EXPENSE ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || err.response?.data?.error || "Failed to add expense");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // LOAD DATA ON MOUNT
  // =========================
  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, []);

  return (
    <div className="page">
      <div className="card">

        <h2>💰 Expense Manager</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">Add Expense</button>
        </form>

        <hr />

        <h3>Expenses</h3>

        {expenses.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          expenses.map((exp) => (
            <div className="expense" key={exp._id}>
              <span>
                {exp.title} ({exp.category})
              </span>
              <strong>₹{exp.amount}</strong>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Dashboard;