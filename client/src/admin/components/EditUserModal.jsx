// src/admin/components/EditUserModal.jsx
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const validateForm = () => {
    const { username, email } = formData;
  
   
    const usernameRegex = /^[A-Z][a-zA-Z]{0,14}$/; 
    if (!username || !usernameRegex.test(username)) {
      toast.error(
        "Username must start with a capital letter, contain only letters, and be up to 15 characters."
      );
      return false;
    }
  
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      toast.error("Email is required.");
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
  
    
  
    return true;
  };
  



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(user._id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md border">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};


export default EditUserModal;
