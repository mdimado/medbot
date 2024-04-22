import React, { useState } from 'react';
import { auth, db } from '../firebase.config'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { toast } from 'react-toastify';

function DoctorSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    licenseNumber: '',
    specialization: '',
    practiceName: '',
    department: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, ...profileData } = formData;

    if (!email || !password || !confirmPassword || !profileData.firstName || !profileData.lastName || !profileData.phoneNumber || !profileData.licenseNumber || !profileData.specialization || !profileData.practiceName) {
      toast.error("Please fill in all the fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please confirm your password.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered with email:", user.email);

      // Add the doctor's data to Firestore with the document ID as the UID
      await addDoc(collection(db, "doctors"), {
        ...profileData
      });

      toast.success("Doctor registered successfully!");
      // Clear form or redirect user
    } catch (error) {
      console.error("Error in user registration:", error);
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please provide a valid email.");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("The provided email is already registered. Please use a different email.");
      } else {
        toast.error("An error occurred during sign up. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Doctor Sign Up</h2>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" required />
      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required />
      <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} placeholder="Medical License Number" required />
      <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Specialization" required />
      <input type="text" name="practiceName" value={formData.practiceName} onChange={handleInputChange} placeholder="Practice or Hospital Name" required />
      <input type="text" name="department" value={formData.department} onChange={handleInputChange} placeholder="Department/Unit" />
      <button type="submit">Register</button>
    </form>
  );
}

export default DoctorSignup;
