"use client";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [uid, setUID] = useState(null);
  const signup = async e => {
    e.preventDefault();
    setError(null);
    try {
      const response = signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUID(user.uid);
      } else {
        setUID(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signout = () => {
    signOut(auth);
  };
  return (
    <div>
      <form onSubmit={signup}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} <div>UID: {uid}</div>
      <button onClick={signout}>Sign out</button>
    </div>
  );
};

export default SignIn;
