import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Asn </span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4">
          <Link className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </Link>
          <Link className="hidden sm:inline text-slate-700 hover:underline">
            About
          </Link>
          {currentUser?.avatar ? (
            <img
              className="object-cover rounded-full w-8 h-8"
              src={currentUser.avatar}
              alt="Profile"
            />
          ) : (
            <Link to={"/sign-in"} className="text-slate-700 hover:underline">
              SignIn
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
