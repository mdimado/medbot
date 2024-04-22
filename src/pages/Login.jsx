import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.config';

function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/chatbot');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in with email:", user.email);

      const doctorRef = doc(db, "doctors", user.uid); // Use user's UID as document ID
      const doctorSnap = await getDoc(doctorRef);
      
      if (doctorSnap.exists()) {
        const doctorData = doctorSnap.data();
        console.log("Doctor's details:", doctorData);
      } else {
        console.log("No doctor data found for this user.");
      }

      navigate('/chatbot');

    } catch (error) {
      console.error("Error in user login:", error);
      setError("Login failed: " + error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Doctor Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type="email" name="email" value={email} onChange={handleInputChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default DoctorLogin;
