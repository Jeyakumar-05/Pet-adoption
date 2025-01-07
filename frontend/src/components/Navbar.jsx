import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { getToken, logout } from "../services/api";
import { PawPrint } from "lucide-react";
import "../assests/css/style.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      // You can fetch user details with the token here if needed
      setUserName("John Doe"); // Replace with actual user info after login
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserName("");
  };

  const navdata = [
    { title: "Home", path: "/home" },
    { title: "Adopt", path: "/adopt" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <div className="w-full h-[4rem] flex items-center justify-between bg-slate-200 shadow-md px-4">
      <div className="flex items-center">
        <PawPrint color="#f1603b" className="mr-2" />
        <div className="font-bold text-3xl text-orange-500">PawNest</div>
      </div>

      <div className="hidden md:flex justify-end items-center">
        <ul className="flex list-none flex-row justify-end gap-6">
          {navdata.map((data, index) => (
            <NavLink key={index} to={data.path} className="hover:opacity-60">
              <li className="font-semibold text-2xl text-black p-2">
                {data.title}
              </li>
            </NavLink>
          ))}
        </ul>
        <div className="ml-6 flex gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <FaUserCircle size={30} className="text-orange-500" />
                <span className="font-semibold text-lg">{userName}</span>
                <div className="absolute top-10 right-0 bg-white shadow-md rounded-lg hidden group-hover:block">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 w-full"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <NavLink to="/signup">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:opacity-70">
                  Create Account
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:opacity-70">
                  Login
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="p-2">
          {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-1/2 bg-white shadow-md rounded-lg z-10">
          <ul className="flex flex-col list-none">
            {navdata.map((data, index) => (
              <NavLink key={index} to={data.path} className="hover:opacity-60">
                <li className="font-semibold text-xl text-black p-2">
                  {data.title}
                </li>
              </NavLink>
            ))}
          </ul>
          <div className="p-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/signup">
                  <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:opacity-70 mb-2">
                    Create Account
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:opacity-70">
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
