import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
    <div className="formWrapper">
    <span className="logo">Learning Management System</span>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>What do you do?</label>
        <select className="form-control">
          <option value="I am a..."disabled>I am a...</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" className="form-control" placeholder="Enter your Email"/>
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" className="form-control" placeholder="Enter your password"/>
      </div>
      <div className="form-group remember-me">
                  <input 
                      type="checkbox" 
                      id="rememberMe" 
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)} 
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
              </div>

      <button>Login</button>
        {err && <span>Something went wrong</span>}
      </form>
      <p>don't have an account? <Link to="/register">Create an account</Link></p>
    </div>
    </div>
  );
};

export default Login;
