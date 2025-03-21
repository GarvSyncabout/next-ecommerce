"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Product = () => {
  const [isAuthnticated, setIsAuthnticated] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Access localStorage in useEffect
    setIsAuthnticated(token ? !isAuthnticated : isAuthnticated); // Convert token to boolean (true if exists)

    if (!token) {
      router.push("/login"); // Redirect to login if no token
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
