import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInstart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser= useSelector((state)=>{
    return state.user.currentUser
  })
  console.log(currentUser)

    useEffect(()=>{
      if(currentUser){
        navigate("/")
      }else{
        navigate("/sign-in")
      }
    },[currentUser])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = formData;

    //================================================================> Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    //============================================================================> Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!password || !passwordRegex.test(password)) {
      toast.error(
        "Password must be 8-15 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      console.log("form data is", formData);
      dispatch(signInstart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure());
        toast.error(data.message || "Sign in failed");
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("User signed up successfully");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure());
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 transition-all duration-500">
        <h1 className="text-4xl font-bold text-center mb-6 text-white drop-shadow">
          Welcome Back 👋
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="peer bg-transparent border-b border-gray-300 text-white w-full py-3 px-1 placeholder-transparent focus:outline-none focus:border-cyan-400 transition"
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="absolute left-1 top-3 text-sm text-gray-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-cyan-400"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              className="peer bg-transparent border-b border-gray-300 text-white w-full py-3 px-1 placeholder-transparent focus:outline-none focus:border-cyan-400 transition"
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="absolute left-1 top-3 text-sm text-gray-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-cyan-400"
            >
              Password
            </label>
          </div>

          <button
            disabled={loading}
            className="bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-cyan-400 hover:underline hover:text-cyan-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
