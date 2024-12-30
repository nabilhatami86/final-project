import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email & Password harus diisi");
      setShowError(true);
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      setError("Email tidak valid");
      setShowError(true);
      return;
    }

    axios
      .post("http://localhost:5000/auth/login", { email, password })
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.user.role);
        localStorage.setItem("userId", result.data.user._id);
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed");
        setShowError(true);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center login-page">
      <div className="card shadow-lg p-4">
        <h1 className="text-center mb-4">LOGIN</h1>
        <label className="form-label">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control mb-3"
            placeholder="email@gmail.com"
          />
        </label>
        <label className="form-label">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control mb-3"
            placeholder="******"
          />
        </label>
        <button onClick={login} className="btn btn-success w-100 btn-lg mb-3">
          LOGIN
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-success">
            Register
          </Link>
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" className="p-3">
        {/* Success Toast */}
        <Toast
          onClose={() => setShowSuccess(false)}
          show={showSuccess}
          delay={3000}
          autohide
          className="toast-success"
        >
          <Toast.Header>
            <strong className="me-auto">🎉 Success</strong>
          </Toast.Header>
          <Toast.Body>Login berhasil! Selamat datang 🎊</Toast.Body>
        </Toast>

        {/* Error Toast */}
        <Toast
          onClose={() => setShowError(false)}
          show={showError}
          delay={3000}
          autohide
          className="toast-error"
        >
          <Toast.Header>
            <strong className="me-auto">❌ Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Login;
