"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Product = () => {
  const [isAuthnticated, setIsAuthnticated] = useState("");

  const router = useRouter();
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
  return (
    <section>
      <div className="min-h-screen flex justify-center items-center">
        {isAuthnticated ? (
          <h1 className="text-[#000000] text-3xl font-bold">
            This is product page
          </h1>
        ) : (
          <div>
            <h1 className="text-[#000000] text-2xl font-bold">
              Please Login first
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;
