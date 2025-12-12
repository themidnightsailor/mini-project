import React, { useState } from "react";
// import { useRecoilState } from "recoil";
// import { check } from "../../atom/atom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [status, setStatus] = useRecoilState(check);
  const navigate = useNavigate();

  const signup = async () => {
    if (!email || !password) return alert("Fill all fields!");

    try {
      const res = await fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data.message);
      
      if (res.ok) {
        if(data.message === "Email already exists, please login instead"){
          alert("Email alreay registered, try with new Email");
          navigate("/");  
        } else{
          // setStatus(true);
          alert("Account created successfully!");
          navigate("/home");      
        }
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={signup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: "Inter, sans-serif",
    background: "#08131f",
    color: "#eaf4f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    background: "linear-gradient(90deg,#00d1ff,#57ffca)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "#eaf4f9",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    background: "#eaf999",
    color: "#042427",
    cursor: "pointer",
    transition: "0.2s",
  },
};
