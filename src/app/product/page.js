"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Product = () => {
  const router = useRouter();
  useEffect(() => {
    const cookies = document.cookie;
    console.log(cookies);
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
