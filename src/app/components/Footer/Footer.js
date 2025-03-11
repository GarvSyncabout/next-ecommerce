import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="fixed w-full bottom-0 p-5">
      <div className="w-full max-w-7xl m-auto flex justify-center items-center">
        <p className="text-sm text-gray-600">
          &copy; 2025 by&nbsp;
          <Link
            href="https://github.com/GarvSyncabout"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            Garv Shah
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
