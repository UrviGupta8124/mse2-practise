import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/auth/login`, form);

      if (!res.data?.token) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;