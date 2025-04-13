import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import {
  Mail,
  Briefcase,
  Users,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const lists = [
  { text: "Messages", icon: <Mail size={20} /> },
  { text: "Hiring", icon: <Briefcase size={20} /> },
  { text: "Community", icon: <Users size={20} /> },
  { text: "Faq", icon: <HelpCircle size={20} /> },
  { text: "Logout", icon: <LogOut size={20} /> },
];

export default function Navbar({ handleToggleSidebar, isSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-[#09090B] shadow-lg p-4 text-[#fafafa] fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-between items-center gap-3">
          {isSidebarOpen ? (
            <ChevronRight
              onClick={handleToggleSidebar}
              className="cursor-pointer"
            />
          ) : (
            <ChevronLeft
              onClick={handleToggleSidebar}
              className="cursor-pointer"
            />
          )}

          <h1 className="text-3xl font-semibold">Joblify</h1>
        </div>

        {/* Navigation Links in a Row */}
        <ul className="flex flex-row items-center justify-center space-x-6">
          {lists.map((list, index) => (
            <li
              key={index}
              onClick={() => list.text === "Logout" && handleLogout()}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:text-[#FBBF24] transition-colors"
            >
              {list.icon}
              <span className="text-xs">{list.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
