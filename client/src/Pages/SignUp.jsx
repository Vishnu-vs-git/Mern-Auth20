import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };




const validateForm = () => {
  const { username, email, password } = formData;

  // ===================================================================>Validate username
  const usernameRegex = /^[A-Z][a-zA-Z]{0,14}$/; ; // Starts with a letter, only letters
  if (!username || !usernameRegex.test(username) || username.length > 15||username.length<3) {
    toast.error("Username must be between 3and 15 characters, only letters, and must not start with a number.");
    return false;
  }

  //=================================================================================> Validate email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    toast.error("Please enter a valid email.");
    return false;
  }

  // ======================================================================================>Validate password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  if (!password || !passwordRegex.test(password)) {
    toast.error("Password must be 8-15 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
    return false;
  }

  return true;
};












  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setErrorMessage("");
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setErrorMessage(data.message);
        setError(true);
        toast.error(data.message)
        return;
      }
      toast.success("User signUp successful")

      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error("error in signup")
    }
  };

  return (
    <div className="min-h-screen bg-[#000000]  flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 transition-all duration-500">
      <h1 className="text-3xl text-center font-bold text-white mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
  type="text"
  placeholder="Username"
  id="username"
  className="bg-transparent border-b border-gray-300 text-white w-full py-3 px-1 focus:outline-none focus:border-cyan-400 transition"
  onChange={handleChange}
/>
<input
  type="email"
  placeholder="Email"
  id="email"
  className="bg-transparent border-b border-gray-300 text-white w-full py-3 px-1 focus:outline-none focus:border-cyan-400 transition"
  onChange={handleChange}
/>
<input
  type="password"
  placeholder="Password"
  id="password"
  className="bg-transparent border-b border-gray-300 text-white w-full py-3 px-1 focus:outline-none focus:border-cyan-400 transition"
  onChange={handleChange}
/>

          <button
            disabled={loading}
            className="bg-red-700 text-white p-3 rounded-lg font-semibold hover:bg-red-400 transition duration-300 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>
        </form>

        <div className="flex justify-center mt-6 text-sm text-gray-600">
          <p className="mr-1">Already have an account?</p>
          <Link to="/sign-in" className="text-blue-500 font-medium hover:underline">
            Sign in
          </Link>
        </div>

        {error && (
          <p className="text-red-600 text-center mt-4 text-sm">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
