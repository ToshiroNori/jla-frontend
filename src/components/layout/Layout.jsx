import React, { useState } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex">
        <main
          className={`pt-24  flex-1  transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "pl-[300px]" : "pl-0"
          }`}
        >
          <section>{children}</section>
        </main>
      </div>
    </div>
  );
}
