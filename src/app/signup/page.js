"use client";
import React, { useState } from "react";
import Button from "../components/Button/Button";
import { useRouter } from "next/navigation";

const signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };
    try {
      const response = await fetch("api/signup", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      } else {
        await response.json();
        router.push("/login");
      }
    } catch (error) {
      alert(error.message);
      s;
    }
  };

  const loginHandler = () => {
    router.push("/login");
  };

  return (
    <section>
      <div className="min-h-screen flex justify-center items-center">
        <form
          onSubmit={submitHandler}
          className="flex justify-center border-[0.5px] border-[#ededed] rounded-md h-fit items-center flex-col gap-4 p-5"
        >
          <h1 className="text-3xl text-[#000000] leading-[40px] font-semibold">
            SIGNUP
          </h1>
          <div className="mt-7 flex justify-between items-center gap-4">
            <input
              className="border-2 border-[#EDEDED] px-4 py-2 rounded-md w-full focus:outline-none"
              type="text"
              placeholder={"First Name"}
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="border-2 border-[#EDEDED] px-4 py-2 rounded-md w-full focus:outline-none"
              type="text"
              placeholder={"Last Name"}
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <input
            className=" border-2 border-[#EDEDED] px-4 py-2 rounded-md w-full focus:outline-none"
            type="tel"
            placeholder={"Phone Number"}
            required
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
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
              className="mt-5 bg-blue-700 hover:bg-blue-600 text-sm text-[#ffffff] font-medium px-5 py-3 rounded-md"
              type={"submit"}
              label={"SignUp"}
            />
            <Button
              handleChange={loginHandler}
              className="mt-5 bg-green-700 hover:bg-green-600 text-sm text-[#ffffff] font-medium px-5 py-3 rounded-md"
              label={"SignIn"}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default signup;
