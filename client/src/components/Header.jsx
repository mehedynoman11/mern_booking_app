import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="flex justify-between items-center mx-auto p-3 bg-green-200">
        <h1 className="font-bold text-2xl sm:text-xl flex flex-wrap">
          Arena-State
        </h1>
        <div className="sm:hidden">
          {isMenuOpen ? (
            <FaTimes className="text-2xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
        <div
          className={`hidden sm:flex items-center ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <ul className="flex gap-6 sm:text-xl font-semibold">
            <Link to={"/"} className="text-bgDark hover:underline">
              Home
            </Link>
            <Link to={"/about"} className="text-bgDark hover:underline">
              About
            </Link>

            <Link
              to={currentUser ? "/profile" : "/sign-in"}
              className="text-bgDark hover:underline"
            >
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt=""
                />
              ) : (
                "Sign in"
              )}
            </Link>
          </ul>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center ml-3">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
        </div>
      </div>
      {isMenuOpen && (
        <ul className="sm:hidden bg-green-200 p-3">
          <Link to={"/"} className="text-bgDark block py-2 hover:underline">
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-bgDark block py-2 hover:underline"
          >
            About
          </Link>
          <Link
            to={"/sign-in"}
            className="text-bgDark block py-2 hover:underline"
          >
            Sign In
          </Link>
        </ul>
      )}
    </header>
  );
}
