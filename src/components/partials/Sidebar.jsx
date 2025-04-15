import React from "react";
import { FolderKanban, Briefcase, Settings, User } from "lucide-react";

const lists = [
  {
    text: "Category",
    icon: <FolderKanban size={20} />,
  },
  {
    text: "Employer",
    icon: <Briefcase size={20} />,
  },
  {
    text: "Settings",
    icon: <Settings size={20} />,
  },
  {
    text: "Account",
    icon: <User size={20} />,
  },
];

export default function Sidebar({ isSidebarOpen }) {
  return (
    <>
      <aside
        className={` h-screen py-24  space-y-5 fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out shadow-lg ${
          isSidebarOpen
            ? "w-[300px] translate-x-0"
            : "w-0 -translate-x-full overflow-hidden"
        }`}
      >
        <h1 className="text-center text-3xl font-medium">Menu</h1>
        <ul>
          {lists.map((list, index) => (
            <li
              key={index}
              className="p-2 w-full flex items-center justify-center gap-3 hover:text-[#FBBF24] cursor-pointer px-4"
            >
              {list.icon}
              <span>{list.text}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
