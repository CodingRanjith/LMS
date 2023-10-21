import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
      const value = e.target.value;
      setPassword(value);

      if (value.length < 8) {
          setPasswordError("Password must have at least 8 characters.");
          return;
      }

      if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
          setPasswordError("Password must contain lowercase, uppercase, and numeric characters.");
          return;
      }

      setPasswordError("");  // Clear the error if all checks pass
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
    <div className="formWrapper">
    <span className="logo">Learning Management System</span>
      <form onSubmit={handleSubmit}>
       <div className="form-group">
        <label>Your Name :</label>
        <input required type="text" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label>Email :</label>
        <input required type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
                  <label>Password:</label>
                  <input 
                      type="password" 
                      className="form-control" placeholder="Create a password"
                      value={password}
                      onChange={handlePasswordChange}
                  />
                  {passwordError && <small className="error-text">{passwordError}</small>}
        </div>
        <input required style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add your photo</span>
        </label>
        <button disabled={loading}>Create Account</button>
        {loading && "Uploading and compressing the image please wait..."}
        {err && <span>Registration done successfully</span>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
  );
};

export default Register;



