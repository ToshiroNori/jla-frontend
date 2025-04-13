import React from "react";
import { FolderKanban, Briefcase, Settings, User } from "lucide-react";

export default function Sidebar({ isSidebarOpen }) {
  return (
    <>
      <aside
        className={` h-screen py-24 px-2  space-y-5 fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out shadow-lg ${
          isSidebarOpen
            ? "w-[300px] translate-x-0"
            : "w-0 -translate-x-full overflow-hidden"
        }`}
      >
        <h1 className="text-center text-3xl font-medium">Menu</h1>
        <ul className="space-y-4 w-full">
          <li className="w-full flex items-center justify-center gap-3 hover:text-[#FBBF24] cursor-pointer px-4">
            <FolderKanban size={20} />
            <span>Category</span>
          </li>
          <li className="w-full flex items-center justify-center gap-3 hover:text-[#FBBF24] cursor-pointer px-4">
            <Briefcase size={20} />
            <span>Employer</span>
          </li>
          <li className="w-full flex items-center justify-center gap-3 hover:text-[#FBBF24] cursor-pointer px-4">
            <Settings size={20} />
            <span>Settings</span>
          </li>
          <li className="w-full flex items-center justify-center gap-3 hover:text-[#FBBF24] cursor-pointer px-4">
            <User size={20} />
            <span>Account</span>
          </li>
        </ul>
      </aside>
    </>
  );
}
