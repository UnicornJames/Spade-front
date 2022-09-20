import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");
  const [navbar, setNavbar] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })

  return (
    <>
      <div className="w-full bg-[#21232f] text-gray-300 py-3">
        <p className="text-center text-xs md:text-sm">
          Spade Borrowing Services are available to qualified institutional
          investors and accredited individuals.
        </p>
      </div>
      <header className="bg-[#2A2D3C] text-white z-20">
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
                    onClick={() => setNavbar(!navbar)}
                >
                    {navbar ? (
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
          <div className={`flex justify-around space-x-2 md:space-x-8 flex-wrap mb-4 lg:mb-0 ${isDesktopOrLaptop ? "block" : "hidden"}`}>
            {isLoggedIn ? (
              <>
                <Link
                  to="/markets"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Markets
                </Link>
                <Link
                  to=""
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Overview
                </Link>
                <Link
                  to=""
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Credit Health
                </Link>
                <Link
                  to="/terminal"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Terminal
                </Link>
                <Link
                  to="/status"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Status
                </Link>
                <a
                  href="https://help.withspade.com/"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Help
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Reserves
                </Link>
                <Link
                  to="/markets"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Markets
                </Link>
                <Link
                  to="/depository"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Depository
                </Link>
                <Link
                  to="/audits"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Audits
                </Link>
                <Link
                  to="/partners"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Partners
                </Link>
                <Link
                  to="/status"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Status
                </Link>
              </>
            )}
          </div>
          <div className={`mb-4 lg:mb-0 lg:hidden flex flex-col ${navbar ? "block" : "hidden"}`}>
            {isLoggedIn ? (
              <>
                <Link
                  to="/markets"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Markets
                </Link>
                <Link
                  to=""
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Overview
                </Link>
                <Link
                  to=""
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Credit Health
                </Link>
                <Link
                  to="/terminal"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Terminal
                </Link>
                <Link
                  to="/status"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Status
                </Link>
                <a
                  href="https://help.withspade.com/"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Help
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Reserves
                </Link>
                <Link
                  to="/markets"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Markets
                </Link>
                <Link
                  to="/depository"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Depository
                </Link>
                <Link
                  to="/audits"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Audits
                </Link>
                <Link
                  to="/partners"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Partners
                </Link>
                <Link
                  to="/status"
                  className="text-white bg-[#00000055] flex w-full mb-1 justify-center hover:text-gray-100 text-xl md:text-xl"
                >
                  Status
                </Link>
              </>
            )}
          </div>
          <div className="space-x-8">
            {isLoggedIn ? (
              <a
                onClick={() => {
                  localStorage.clear();
                  location.href = "/";
                }}
                className="text-white hover:text-gray-100 md:text-base px-3 md:px-6 py-1 md:py-2 border-solid border-white border rounded-full cursor-pointer"
              >
                Logout
              </a>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-white hover:text-gray-100 md:text-base px-3 md:px-6 py-1 md:py-2 border-solid border-white border rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/borrow"
                  className="bg-white text-black ml-8 inline-flex items-center px-4 md:px-6 py-1 md:py-2 border border-transparent rounded-full shadow-sm md:text-base font-medium"
                >
                  Apply
                </Link>
              </>
            )}
          </div>
          </div>
          <div className={`space-x-8 ${isDesktopOrLaptop ? "block" : "hidden"}`}>
            {isLoggedIn ? (
              <a
                onClick={() => {
                  localStorage.clear();
                  location.href = "/";
                }}
                className="text-white hover:text-gray-100 md:text-base px-3 md:px-6 py-1 md:py-2 border-solid border-white border rounded-full cursor-pointer"
              >
                Logout
              </a>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-white hover:text-gray-100 md:text-base px-3 md:px-6 py-1 md:py-2 border-solid border-white border rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/borrow"
                  className="bg-white text-black ml-8 inline-flex items-center justify-center px-4 md:px-6 py-1 md:py-2 border border-transparent rounded-full shadow-sm md:text-base font-medium"
                >
                  Apply
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
