import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { MdOutgoingMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import pageLogin from "../../assets/login.jpg";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const registerUser = () => {
    if (!email || !password || !full_name) {
      setError("Data form User harus di isi semua");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      setError("Email tidak valid");
      return;
    }

    const data = {
      email,
      password,
      full_name,
    };

    axios
      .post("http://localhost:5000/auth/register", data)
      .then(() => {
        // Simpan cache
        localStorage.setItem("welcomeMessage", `Selamat datang, ${full_name}!`);
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setError("Registrasi gagal, coba lagi.");
        console.log(err);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        <span className="text-secondary">Take</span>
        <span className="text-success">Cart</span>
      </h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={pageLogin}
            alt="Your"
            className="img-fluid"
            style={{ maxWidth: "1000px", height: "660px" }}
          />
        </div>
        <div className="col-md-6 mx-auto">
          <div
            className="card p-4 shadow"
            style={{
              maxWidth: "500px",
              width: "100%",
              height: "550px",
            }}
          >
            <h2 className="text-center fw-bold">Daftar Sekarang</h2>
            <p className="text-center">
              Sudah Punya Akun TakeCart?
              <Link to="/login" className="text-success fw-bold ms-2">
                Login here
              </Link>
            </p>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="full_name" className="form-label">
                <MdDriveFileRenameOutline className="ms-2" /> Full Name
              </label>
              <input
                type="full_name"
                className="form-control"
                id="full_name"
                placeholder="Nama Panjang"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required="required"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <MdOutgoingMail className="ms-2" /> Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required="required"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <RiLockPasswordFill className="ms-2" />
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required="required"
              />
            </div>
            <button
              className="btn btn-success w-100 btn-lg"
              onClick={registerUser}
            >
              Register
            </button>
            <p className="text-center mt-4">
              Dengan Mendaftar, saya menyetujui
            </p>
            <p className="text-center">
              <span className="text-success">Syarat & Ketentuan</span> serta{" "}
              <span className="text-success">Kebijakan Privasi TakeCart</span>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" className="p-3">
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
          <Toast.Body>Registrasi berhasil! Selamat bergabung 🎊</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Register;
