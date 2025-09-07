// src/Signin.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Signin({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      localStorage.setItem("userId", userId);
      setUser(userId);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      <div className="card auth-card shadow-lg d-flex flex-row">
        {/* Left gradient section */}
        <div className="tlt auth-left d-flex flex-column justify-content-center align-items-center text-white p-5">
          <h1 className="">aug</h1>
          <h2 className="">chat with august</h2>
          {/* <p>Login to continue</p> */}
        </div>

        {/* Right form section */}
        <div className="auth-right p-5">
          <h3 className="mb-4 text-aut">Sign In</h3>
          <div className="mb-3">
            <input
              type="email"
              className="form-control text-aut"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control text-aut"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="text-aut btn-autumn w-100" onClick={handleSignin}>
            Sign In
          </button>
          <p className="mt-3 text-muted text-aut">
            Don’t have an account?{" "}
            <span className="text-autumn fw-bold" role="button" onClick={() => setPage("signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
