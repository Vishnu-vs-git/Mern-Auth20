import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../../redux/admin/adminSlice";
import Cookies from "js-cookie";
  import axios from "axios";
import { toast } from "react-toastify";
import { persistor } from "../../redux/Store";

const AdminHeader = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("/api/admin/logout", { withCredentials: true });
    dispatch(adminLogout());
    persistor.purge()
    toast.success("Admin loggedout successfully")
    navigate("/admin/login");
  };
  
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App Admin</h1>
        </Link>
        <ul className="flex gap-4 items-center">
          {currentAdmin ? (
            <>
              <img
                src="https://static.vecteezy.com/system/resources/previews/035/624/129/non_2x/user-profile-person-icon-in-flat-isolated-in-suitable-for-social-media-man-profiles-screensavers-depicting-male-face-silhouettes-for-apps-website-vector.jpg"
                alt="admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <li>
              <Link to="/admin/login">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
