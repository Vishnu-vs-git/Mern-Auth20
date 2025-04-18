import React,{useState}from "react"
import axios from "axios"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLoginSuccess } from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";

const AdminLogin = () => {

const [email,setEmail]=useState("");
const[password,setPassword]=useState("")
const dispatch=useDispatch();
const navigate=useNavigate();




const handleLogin =async(e)=>{
  e.preventDefault()

  try{
   const res = await axios.post("/api/admin/login",{email,password},{withCredentials:true});
    dispatch(adminLoginSuccess(res.data.email));
    toast.success("Admin logged in successfully");
    navigate("/admin/dashboard",{ replace: true });
  }catch(error){
     toast.error("Invalid admin Credentials")
  }
}









  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Admin Email"
          className="p-3 bg-slate-100 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 bg-slate-100 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin
