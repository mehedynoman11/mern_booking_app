import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit =(e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])
  return (
    <header>
      <div className="flex justify-between items-center mx-auto p-4 bg-[#7fa6ea]">
        <div className="flex items-center">
          
          <Link to={'/'}>
          <h1 className="font-bold text-[#2b3188] text-2xl font-poppins sm:text-xl flex flex-wrap">
            Arena-<span className="text-[#0f1232]">State</span>
          </h1>
          </Link>
        </div>
        <div className="sm:hidden flex gap-3 items-center">
        <Link
            to={currentUser ? "/profile" : "/sign-in"}
            className="text-bgDark hover:underline "
          >
            {currentUser ? (
              <img
                className="rounded-full w-10 h-10"
                src={currentUser.avatar}
                alt=""
              />
            ) : (
              "Sign in"
            )}
          </Link>
          {isMenuOpen ? (
            <FaTimes
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <FaBars
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
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
            className="text-bgDark hover:underline mr-3 hidden sm:inline-block"
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
          <form 
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg 
          flex items-center ml-3">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="text-slate-600" />
            <button></button>
          </form>
        </div>
      </div>

      {isMenuOpen && (
        <ul className="sm:hidden bg-white p-3 text-xl font-bold flex flex-col justify-center items-center">
          <Link to={"/"} className="text-bgDark block py-2 hover:underline">
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-bgDark block py-2 hover:underline"
          >
            About
          </Link>
        </ul>
      )}
    </header>
  );
}
