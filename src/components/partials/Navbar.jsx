import React from "react";

export default function Navbar({ handleLogout }) {
  return (
    <div>
      <nav className="bg-[#09090B]  shadow-lg p-4 text-[#fafafa]">
        <div className="text-center sm:flex justify-between space-y-2">
          <h1 className=" text-3xl font-semibold shadow-lg">Joblify</h1>
          <ul className="list-none sm:flex-row sm:flex justify-center items-center space-x-2">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
