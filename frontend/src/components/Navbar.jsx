import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { PawPrint } from "lucide-react";
import "../assests/css/style.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logoutUser();
      console.log("Logout successfully");
    } catch (error) {
      console.log(`Error in logout: ${error}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

      {/* Desktop Navigation */}
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
        {/* Logout Button */}
        <div className="ml-6">
          <button
            className="bg-orange-500 text-black font-semibold py-2 px-6 rounded-lg hover:bg-white transition"
            onClick={handleSubmit}
          >
            Log out
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="p-2">
          {isMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-1/2 bg-white shadow-md rounded-lg z-10 p-4">
          <ul className="flex flex-col list-none text-center">
            {navdata.map((data, index) => (
              <NavLink key={index} to={data.path} className="hover:opacity-60">
                <li className="font-semibold text-xl text-black p-2">
                  {data.title}
                </li>
              </NavLink>
            ))}
          </ul>
          {/* Centered Logout Button for Mobile */}
          <div className="w-full flex justify-center mt-4">
            <button
              className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition w-full text-center"
              onClick={handleSubmit}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
