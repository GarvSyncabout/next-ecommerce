"use client";

import React, { useEffect } from "react";

const Product = () => {
  useEffect(() => {
    const cookies = document.cookie;
    const token = cookies.replace("token=", "");
    window.localStorage.setItem("token", token);
  }, []);
  return (
    <section>
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-[#000000] text-3xl font-bold">
          This is product page
        </h1>
      </div>
    </section>
  );
};

export default Product;
