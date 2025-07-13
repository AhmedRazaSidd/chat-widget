import { Maximize, X } from "lucide-react";
import React from "react";

const Header = () => {
  // 🔼 Fullscreen handler
  const handleMaximize = () => {
    window.parent.postMessage({ type: "fullscreen-chatbot" }, "*");
  };

  // ❌ Collapse/Close handler
  const handleClose = () => {
    window.parent.postMessage({ type: "collapse-chatbot" }, "*");
  };

  return (
    <div className="flex justify-between items-center py-2 px-3 bg-purple-700">
      <h4 className="text-white text-[18px] uppercase font-semibold">
        Shark Bot
      </h4>
      <div className="flex items-center gap-2">
        <button
          className="text-white hover:opacity-80 transition"
          onClick={handleMaximize}
          title="Fullscreen"
        >
          <Maximize size={18} />
        </button>
        <button
          className="text-white hover:opacity-80 transition"
          onClick={handleClose}
          title="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Header;
