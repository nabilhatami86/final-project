import React from "react";
import { IoLogIn, IoPersonAddSharp } from "react-icons/io5";

const AuthButtons = ({ navigate }) => (
  <div>
    <button
      onClick={() => navigate("/login")}
      className="btn btn-link text-decoration-none text-success me-3"
    >
      Masuk <IoLogIn />
    </button>
    <button
      onClick={() => navigate("/register")}
      className="btn btn-success text-white px-3 py-1 rounded-pill"
    >
      Daftar <IoPersonAddSharp />
    </button>
  </div>
);

export default AuthButtons;
