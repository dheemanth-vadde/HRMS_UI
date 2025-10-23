// src/layouts/Header.tsx
import React from "react";
import { Menu, Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/uiSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button onClick={() => dispatch(toggleSidebar())} className="p-2 rounded">
          <Menu />
        </button>
        <h1 className="text-lg font-semibold">HRMS</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded"><Bell /></button>
        {/* TODO: add user dropdown/profile */}
      </div>
    </header>
  );
};

export default Header;
