import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <div className="bg-[#E9762B]">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-3 text-gray-800">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-black">
            Auth App
          </h1>
        </Link>
        <ul className="flex gap-6 items-center text-sm sm:text-base font-medium">
          <Link to="/" className="hover:text-blue-500 transition duration-200">
            <li className="text-black font-extrabold">Home</li>
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-500 transition duration-200"
          >
            <li className="text-black font-extrabold">About</li>
          </Link>
          {currentUser ? (
            <Link
              to="/profile"
              className="hover:scale-105 transition-transform duration-200"
            >
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border border-blue-500"
              />
            </Link>
          ) : (
            <Link
              to="/sign-in"
              className="text-black font-extrabold hover:text-blue-500 transition duration-200"
            >
              Sign In
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
