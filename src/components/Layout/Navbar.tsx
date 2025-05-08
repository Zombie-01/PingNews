import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Search, User } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <img src={"/icons/mask-icon.svg"} className="w-6 h-6 object-cover" />
        </button>

        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search news..."
            className="ml-2 bg-transparent outline-none text-sm w-full"
          />
        </div>

        {isAuthenticated ? (
          <img
            src={
              user?.picture ||
              "https://api.dicebear.com/7.x/avatars/svg?seed=John"
            }
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => navigate("/settings")}
          />
        ) : (
          <button
            onClick={() => navigate("/settings")}
            className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
