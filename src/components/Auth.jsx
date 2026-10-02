import React, { useState } from "react";
import { signUp, logIn } from "../firebase";
import "../styles_/Auth.css";

function Auth({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      if (!isLogin) {
        if (!name.trim()) {
          throw new Error("Please enter your name");
        }

        if (!mobile.trim()) {
          throw new Error("Please enter your mobile number");
        }

        if (!/^\d{10}$/.test(mobile.trim())) {
          throw new Error("Please enter a valid 10-digit mobile number");
        }

        const userCredential = await signUp(
          email.trim(),
          password
        );

        localStorage.setItem(
          `user_${userCredential.user.uid}`,
          JSON.stringify({
            uid: userCredential.user.uid,
            email: email.trim(),
            name: name.trim(),
            mobile: mobile.trim(),
          })
        );

        alert("Signup successful! Please login.");

        setIsLogin(true);
        setName("");
        setMobile("");
        setPassword("");
        setError("");
        return;
      }

      const userCredential = await logIn(
        email.trim(),
        password
      );

      const firebaseUser = userCredential.user;
      const isAdmin =
        firebaseUser.email === "admin@prescripto.com";

      if (isAdmin) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: "Admin",
            isAdmin: true,
          })
        );
      } else {
        const storedUser = localStorage.getItem(
          `user_${firebaseUser.uid}`
        );

        let userInfo = null;

        if (storedUser) {
          try {
            userInfo = JSON.parse(storedUser);
          } catch {
            userInfo = null;
          }
        }

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name:
              userInfo?.name ||
              firebaseUser.email.split("@")[0],
            mobile: userInfo?.mobile || "",
            isAdmin: false,
          })
        );
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Authentication error:", err);

      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use. Please login.");
          break;

        case "auth/invalid-email":
          setError("Invalid email format.");
          break;

        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;

        case "auth/user-not-found":
          setError("User not found. Please sign up.");
          break;

        case "auth/wrong-password":
          setError("Wrong password. Please try again.");
          break;

        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;

        default:
          setError(
            err.message || "Authentication failed."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    if (loading) return;

    setIsLogin((prev) => !prev);
    setError("");
  };

  return (
    <div
      className="auth-container"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="auth-card">
        <button
          type="button"
          onClick={onClose}
          className="auth-close-btn"
          disabled={loading}
        >
          ✕
        </button>

        <h2 className="auth-title">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                maxLength={10}
                className="auth-input"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            autoComplete={
              isLogin
                ? "current-password"
                : "new-password"
            }
            required
          />

          <button
            type="submit"
            className={`auth-submit-btn ${
              loading ? "auth-loading" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <button
          type="button"
          onClick={switchMode}
          className="auth-switch-btn"
          disabled={loading}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>

        {isLogin && (
          <div className="auth-admin-info">
            <hr />

            <p>
              Admin: admin@prescripto.com / admin123
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;