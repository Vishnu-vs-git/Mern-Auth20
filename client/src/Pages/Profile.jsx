import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { uploadImageToClodinary } from "../utils/cloudinaryUpload";
import axios from "axios";
import { toast } from "react-toastify";
import {
  imageUpdate,
  profileInfoUpdate,
  userLogout,
} from "../redux/user/userSlice";
import { persistor } from "../redux/Store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [userName, setUserName] = useState(currentUser.username);
  const [userEmail, setUserEmail] = useState(currentUser.email);

  const dispatch = useDispatch();
  const navigate=useNavigate()

  console.log("current user is", currentUser);
  const [imageUrl, setImageUrl] = useState(currentUser?.profilePicture || "");

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const uploadedUrl = await uploadImageToClodinary(selectedFile);
    if (uploadedUrl) {
      setImageUrl(uploadedUrl);
      console.log(uploadedUrl);

      try {
        console.log("helllllo");
        const response = await axios.put(
          `/api/auth/update-profile-pic/${currentUser._id}`,
          {
            profilePicture: uploadedUrl,
          },{

            withCredentials: true,
          }
        );
        dispatch(imageUpdate(response.data?.profilePicture));

        toast.success("Profile image updated successfully");
      } catch (error) {
        toast.error("Failed to update profile image",error);
      }
    }
  };

  const validateForm = () => {
    //======================================================> Validate username
    const usernameRegex = /^[A-Z][a-zA-Z]{0,14}$/; // Starts with a letter, only letters
    if (
      !userName ||
      !usernameRegex.test(userName) ||
      userName.length > 15 ||
      userName.length <= 2
    ) {
      toast.error(
        "Username must be between 3 and 15 characters, only letters, and must not start with a number."
      );
      return false;
    }

    // ====================================================>Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!userEmail || !emailRegex.test(userEmail)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      console.log("helloooooooo");
      const response = await axios.put(
        `/api/auth/update-profile-info/${currentUser._id}`,
        {
          username: userName,
          email: userEmail,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response isss", response);
      dispatch(
        profileInfoUpdate({
          username: response.data.username,
          email: response.data.email,
        })
      );
      toast.success("Profile data updated successfully");
      console.log("response is", response);
    } catch (error) {
      console.log("error",error);
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/sign-in")
    toast.success("User loggedOut successfully");
    persistor.purge(); //===================================================> clear persisted user state
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        <img
          className="w-23 h-23 rounded-full  object-cover mt-2 cursor-pointer  self-center "
          src={imageUrl}
          alt="Profile-image"
          onClick={() => fileRef.current.click()}
        />
        <input
          // defaultValue={currentUser.username}
          type="text"
          id="username"
          value={userName}
          placeholder="username"
          className="bg-slate-100 rounded-lg p-3 "
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          // defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          value={userEmail}
          className="bg-slate-100 rounded-lg p-3 "
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  disabled:opacity-80 "
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">

        <span onClick={handleLogout} className="text-red-700 cursor-pointer">
          {" "}
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
