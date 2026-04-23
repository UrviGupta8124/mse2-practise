import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food"
  });

  const token = localStorage.getItem("token");

  // 🔹 Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("https://mse2-practise.onrender.com/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setExpenses(res.data);
    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err.message);
    }
  };

  // 🔹 Add expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://mse2-practise.onrender.com/api/expense",
        {
          ...form,
          amount: Number(form.amount) // ✅ FIXED
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
      console.log("Add Expense Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error adding expense");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
  <div className="page">
    <div className="card">

      <h2>💰 Expense Manager</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Add Expense</button>
      </form>

      <hr />

      <h3>Expenses</h3>

      {expenses.map((exp) => (
        <div className="expense" key={exp._id}>
          <span>{exp.title} ({exp.category})</span>
          <strong>₹{exp.amount}</strong>
        </div>
      ))}

    </div>
  </div>
);
}

export default Dashboard;