import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");

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
          <div className="mb-4 lg:mb-0">
            <Link to="/" className="flex">
              <span className="sr-only">Spade</span>
              <img className="w-32" src="/spade.png" alt="Spade" />
            </Link>
          </div>
          <div className="flex justify-around space-x-2 md:space-x-8 flex-wrap mb-4 lg:mb-0">
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
          <div className="space-x-8">
            {isLoggedIn ? (
              <a
                onClick={() => {
                  localStorage.clear();
                  location.href = "/";
                }}
                className="text-white hover:text-gray-100 text-xs md:text-base cursor-pointer"
              >
                Logout
              </a>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-white hover:text-gray-100 text-xs md:text-base"
                >
                  Sign In
                </Link>
                <Link
                  to="/borrow"
                  className="bg-white text-black ml-8 inline-flex items-center justify-center px-2 md:px-6 py-1 md:py-2 border border-transparent rounded-md shadow-sm text-xs md:text-base font-medium"
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
