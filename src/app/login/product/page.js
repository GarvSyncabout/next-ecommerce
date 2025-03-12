"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Product = () => {
  const router = useRouter();
  useEffect(() => {
    const cookies = document.cookie;
    const token = cookies.replace("token=", "");
    window.localStorage.setItem("token", token);

    const isLogedin = window.localStorage.getItem("token");

    if (!isLogedin) {
      router.replace("/login");
    }
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
