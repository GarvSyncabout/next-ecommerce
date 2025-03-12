"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();

      const data = {
        email,
        password,
      };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/login/product");
        }, 3000);
        toast.success("User login Successful!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error("User Detail Not Submited", err.message);
    }
  };

  return (
    <section>
      <ToastContainer />
      <div className="min-h-screen flex justify-center items-center">
        <form
          onSubmit={loginHandler}
          className="flex justify-center border-[0.5px] border-[#ededed] rounded-md h-fit items-center flex-col gap-4 p-5"
        >
          <h1 className="text-3xl text-[#000000] leading-[40px] font-semibold">
            LOGIN
          </h1>

          <input
            className=" border-2 border-[#EDEDED] px-4 py-2 rounded-md w-full focus:outline-none"
            type="email"
            placeholder={"Your Email"}
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className=" border-2 border-[#EDEDED] px-4 py-2 rounded-md w-full focus:outline-none"
            type="password"
            placeholder={"********"}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-between items-center gap-4">
            <Button
              className="mt-5 bg-green-700 hover:bg-green-600 text-sm text-[#ffffff] font-medium px-5 py-3 rounded-md"
              type={"submit"}
              label={"login"}
            />
            <Button
              handleChange={() => {
                router.push("/signup");
              }}
              className="mt-5 bg-blue-700 hover:bg-blue-600 text-sm text-[#ffffff] font-medium px-5 py-3 rounded-md"
              label={"signup"}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
