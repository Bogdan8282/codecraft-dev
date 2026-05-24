import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full min-h-[78px] mt-auto mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between items-center gap-6 border-t border-(--border)">
      <p>Copyright © 2026 CodeCraft</p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/contact" className="hover:text-white">
          Зв'язок
        </Link>
        <Link to="/privacy" className="hover:text-white">
          Приватність
        </Link>
        <Link to="/tos" className="hover:text-white">
          Умови
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
