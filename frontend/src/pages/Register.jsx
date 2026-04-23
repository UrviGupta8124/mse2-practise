import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ frontend validation
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://mse2-practise.onrender.com/api/auth/register",
        form
      );

      console.log("REGISTER SUCCESS:", res.data);

      alert(res.data.msg || "Registered Successfully");

      // redirect to login
      navigate("/");

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);

      alert(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;