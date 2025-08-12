"use client";

import { useState } from "react";
import { register } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const [password_confirmation, setPasswordConfirmation] = useState("password");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");
      const data = await register(name, email, password, password_confirmation);
      console.log("Register success:", data);
      router.push("/"); // সফল হলে হোম পেজে পাঠাবে
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
