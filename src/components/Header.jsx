import React from "react";
import { Settings } from "lucide-react";
import Button from "./ui/Button";

const Header = ({ onSettingsClick, showSettings }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              WhatsApp Chat Analyzer
            </h1>
            <p className="text-gray-600 mt-2">
              Upload once, get everything you need! 🚀
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onSettingsClick}
            className={`p-2 ${showSettings ? "bg-gray-100" : ""}`}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
