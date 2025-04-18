import React, { useState } from 'react';
import axios from "axios";

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AdminAddUser = () => {
const[formData,setFormData]= useState({
  username:"",
  email:"",
  password:"",
  profilePicture:""
});

const navigate=useNavigate();

const handleChange= (e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
};
const handleSubmit= async(e)=>{

  e.preventDefault();
  if (!validateForm()) return;

  try{
    const res=await axios.post("/api/admin/create-user",formData,{
      withCredentials:true
    })
    toast.success("user added successfully")
    navigate("/admin/dashboard")
  }catch(err){
    toast.error("failed to create user")
  }
}




const validateForm = () => {
  const { username, email, password } = formData;

  // Validate username
  const usernameRegex = /^[A-Za-z]{1}[A-Za-z]*$/; // Starts with a letter, only letters
  if (!username || !usernameRegex.test(username) || username.length > 15) {
    toast.error("Username must be between 1 and 15 characters, only letters, and must not start with a number.");
    return false;
  }

  // Validate email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    toast.error("Please enter a valid email.");
    return false;
  }

  // Validate password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  if (!password || !passwordRegex.test(password)) {
    toast.error("Password must be 8-15 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
    return false;
  }

  return true;
};









  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          
        />
       
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500  text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
        >
          Create User
        </button>
       

<Link to="/admin/dashboard">
  <button 
  className="bg-gradient-to-r from-blue-500 to-purple-500 ml-40 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition">
    Cancel
  </button>
</Link>

       
      </form>
    </div>
  );
}

export default AdminAddUser