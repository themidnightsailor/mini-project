import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:3002/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.ok) setUser(data.user);
    else alert("Invalid credentials");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}