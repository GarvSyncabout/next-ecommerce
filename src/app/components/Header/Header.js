"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const navItmes = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "About",
    href: "/about",
  },
  {
    id: 3,
    label: "Contact Us",
    href: "/contact",
  },
];

const dropdownOptions = [
  {
    id: 1,
    label: "Profile",
    href: "/profile",
  },
  {
    id: 2,
    label: "Logout",
    href: "",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthnticated, setIsAuthnticated] = useState("");

  useEffect(() => {
    const cookies = document.cookie;

    const token = cookies.replace("token=", "");

    window.localStorage.setItem("token", token);

    const isLogedin = window.localStorage.getItem("token");

    setIsAuthnticated(isLogedin);

    if (!isLogedin) {
      router.replace("/login");
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    document.cookie = "";

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full py-4">
      <nav className=" grid md:grid-cols-4 place-content-between place-items-center  w-full max-w-7xl m-auto">
        <div id="logo">Logo</div>
        <div id="nav-items" className="col-span-2">
          <ul className="flex justify-between items-center gap-10">
            {navItmes.map((item) => (
              <li key={item.id}>
                <Link
                  className="text-[#000000] text-md font-medium leading-0"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {isAuthnticated ? (
            <div id="dropdown" className="relative">
              <div
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                className={isMenuOpen ? "block" : "relative"}
              >
                <span className=" cursor-pointer text-md font-medium relative after:absolute after:content-['\25be'] after:top-0 after:text-xl after:leading-[22px] ">
                  Garv
                </span>
              </div>
              <div
                className={
                  !isMenuOpen
                    ? "hidden"
                    : "absolute z-50 mt-6 top-0 left-0 content-['']"
                }
              >
                {dropdownOptions.map((option) => {
                  return (
                    <Link
                      onClick={() => {
                        option.label = "logout"
                          ? logout()
                          : setIsMenuOpen(!isMenuOpen);
                      }}
                      className="flex mt-1 text-md font-medium"
                      href={option.href}
                      key={option.id}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <Link
              href={"/signup"}
              className="text-blue-500 hover:text-blue-700 text-md font-medium"
            >
              SignUp
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
