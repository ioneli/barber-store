
import React, { useState } from "react";import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if(res.ok){
      alert("Cont creat cu succes!");
      navigate("/");
    } else {
      alert(data.message);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Parola" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Înregistrează-te</button>
    </div>
  );
}

