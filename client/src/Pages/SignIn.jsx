import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInstart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const {loading,error}=useSelector((state)=> state.user)
  // const[errorMessage,setErrorMessage]=useState("");
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.id]: e.target.value });



  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setErrorMessage("")

      dispatch(signInstart())  

      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
     
    dispatch(signInSuccess(data))
      if (data.success===false) {
        // setErrorMessage(data.message)
      dispatch(signInFailure(data.message))
        return;
      }
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "SIGN IN"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
        </div>
        {error&&
        <p className="text-red-700 mt-5">{error||"Something went wrong"}</p>
        
        }
    </div>
  );
};

export default SignIn;
