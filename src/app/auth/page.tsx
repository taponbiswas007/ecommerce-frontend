"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { login, signup } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("signup");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let success = false;
      if (mode === "signup") {
        success = await signup(
          formData.name,
          formData.email,
          formData.password
        );
      } else {
        success = await login(formData.email, formData.password);
      }

      if (!success) throw new Error("Authentication failed");

      // Redirect on success
      router.push("/main/checkout"); // তোমার পছন্দমত পেইজ
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Dummy social login handlers
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"; // তোমার Google OAuth রুট
  };
  const handleFacebookLogin = () => {
    window.location.href = "/api/auth/facebook"; // তোমার Facebook OAuth রুট
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "signup" ? "Sign Up" : "Login"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="mt-6 flex flex-col space-y-3">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Continue with Google
        </button>
        <button
          onClick={handleFacebookLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Continue with Facebook
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-purple-600 hover:underline"
            >
              Login here
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-purple-600 hover:underline"
            >
              Sign up here
            </button>
          </>
        )}
      </p>
    </div>
  );
}
