import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Menu, SubMenu, Item } from "burger-menu";
import "burger-menu/lib/index.css";
import { createRoot } from "react-dom/client";
import { Slide } from "react-toastify";

function Header() {
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");
  const [isOpen, setIsOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <>
      <div className="w-full bg-[#21232f] text-gray-300 py-3">
        <p className="text-center text-xs md:text-sm">
          Spade Borrowing Services are available to qualified institutional
          investors and accredited individuals.
        </p>
      </div>
      <header className="bg-[#2A2D3C] z-20">
        <div className="lg:container md:mx-auto relative lg:flex justify-between items-center px-4 py-8 sm:px-6">
          <div className="mb-4 lg:mb-0 flex justify-between">
            <Link to="/" className="flex">
              <span className="sr-only">Spade</span>
              <img className="w-32" src="/spade.png" alt="Spade" />
            </Link>
            {/* ================================================ */}
            <div className="lg:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            {/* ================================================ */}
          </div>
          <div
            className={`flex justify-around space-x-2 md:space-x-8 flex-wrap mb-4 lg:mb-0 ${
              isDesktopOrLaptop ? "block" : "hidden"
            }`}
          >
            {isLoggedIn ? (
              <>
                <Link
                  to="/markets"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Markets
                </Link>
                <Link
                  to=""
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Overview
                </Link>
                <Link
                  to=""
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Credit Health
                </Link>
                <Link
                  to="/terminal"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Terminal
                </Link>
                <Link
                  to="/status"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Status
                </Link>
                <a
                  href="https://help.withspade.com/"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Help
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Reserves
                </Link>
                <Link
                  to="/markets"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Markets
                </Link>
                <Link
                  to="/depository"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Depository
                </Link>
                <Link
                  to="/audits"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Audits
                </Link>
                <Link
                  to="/partners"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Partners
                </Link>
                <Link
                  to="/status"
                  className="text-white hover:text-gray-500 text-xs md:text-base"
                >
                  Status
                </Link>
              </>
            )}
          </div>

          <div
            className={`space-x-8 ${isDesktopOrLaptop ? "block" : "hidden"}`}
          >
            {isLoggedIn ? (
              <a
                onClick={() => {
                  localStorage.clear();
                  location.href = "/";
                }}
                className="text-white hover:text-black hover:text-white md:text-base px-4 py-2 border-solid border-white border rounded-full cursor-pointer"
              >
                Logout
              </a>
            ) : (
              <div>
                <Link
                  to="/signin"
                  className="text-white hover:text-black hover:text-white md:text-base px-4 py-2 border-solid border-white border rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/borrow"
                  className="text-black bg-white md:text-base ml-5 px-4 py-2 border-solid border-white border rounded-full"
                >
                  Apply
                </Link>
              </div>
            )}
          </div>
        </div>
        <Menu
          selectedKey={"entry"}
          onClose={() => setIsOpen(false)}
          width={300}
          className="pt-5"
          isOpen={isOpen}
        >
          {isLoggedIn ? (
            <>
              <Link
                to="/markets"
                className="flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Markets
              </Link>
              <Link
                to=""
                className="flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Overview
              </Link>
              <Link
                to=""
                className="flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Credit Health
              </Link>
              <Link
                to="/terminal"
                className="flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Terminal
              </Link>
              <Link
                to="/status"
                className="flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Status
              </Link>
              <a
                href="https://help.withspade.com/"
                className="flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Help
              </a>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Reserves
              </Link>
              <Link
                to="/markets"
                className="text-white flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Markets
              </Link>
              <Link
                to="/depository"
                className="text-white flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Depository
              </Link>
              <Link
                to="/audits"
                className="text-white flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Audits
              </Link>
              <Link
                to="/partners"
                className="text-white flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Partners
              </Link>
              <Link
                to="/status"
                className="text-white flex w-full mb-1 justify-center hover:text-gray-500 text-xl md:text-xl"
              >
                Status
              </Link>
            </>
          )}
          <div className="space-x-8">
            {isLoggedIn ? (
              <a
                onClick={() => {
                  localStorage.clear();
                  location.href = "/";
                }}
                className="text-white hover:text-black hover: md:text-base px-4 py-2 border-solid border-white border rounded-full cursor-pointer"
              >
                Logout
              </a>
            ) : (
              <div className="flex justify-center mt-5">
                <Link
                  to="/signin"
                  className="text-white hover:text-black hover: md:text-base px-4 py-2 border-solid border-white border rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/borrow"
                  className="text-black bg-white md:text-base ml-5 px-4 py-2 border-solid border-white border rounded-full"
                >
                  Apply
                </Link>
              </div>
            )}
          </div>
        </Menu>
      </header>
    </>
  );
}

export default Header;
