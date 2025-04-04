"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, loginUser } from "@/redux/slice/authSlice";


const Login = () => {
  const dispatch = useDispatch();
  const { email, password, error, user } = useSelector((state) => state.auth);

  const router = useRouter();

  const loginHandler = (e) => {
    try {
      e.preventDefault();

      dispatch(loginUser({ email, password }));

      if (user.message != "") {
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        router.push("/login/product");

        toast.success("User login Successful!", {
          autoClose: 2000,
        });
      } else if (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Unauthorized User", error.message, {
        autoClose: 2000,
      });
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
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <input
            className=" border-2 border-[#EDEDED] px-4 py-2 rounded-md w-full focus:outline-none"
            type="password"
            placeholder={"********"}
            required
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
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
