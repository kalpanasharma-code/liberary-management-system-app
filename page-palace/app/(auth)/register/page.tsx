"use client";
import { useRouter } from "next/navigation";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    displayName: z
      .string()
      .min(3, { message: "Display name must be at least 3 characters" })
      .max(30, { message: "Display name must be at most 30 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ),
        {
          message:
            "Password must include an uppercase letter, a lowercase letter, a number, and a special character",
        }
      ),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
    number: z
      .string()
      .min(10, { message: "Mobile number must be at least 10 digits" })
      .max(15, { message: "Mobile number must not exceed 15 digits" })
      .refine((value) => /^\d+$/.test(value), {
        message: "Mobile number must contain only digits",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const containerStyle = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/auth/register", data);
      reset();
      router.push("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const router = useRouter();



  const togglePasswordVisibility = () => {
    setViewPassword((prevViewPassword) => !prevViewPassword);
  };

  return (
    <div style={containerStyle}>
      <div className="justify-center items-center hidden min-[484px]:flex">
        <div className="flex login bg-[#313338] h-full w-[30rem] rounded-sm justify-between shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="left flex flex-col w-[30rem] text-[#b5bac1] items-center p-8">
              <div className="top relative -top-2">
                <h1 className="text-center font-semibold text-[1.4rem] text-[#ebebeb]">
                  Create an account
                </h1>
              </div>

              <div className="input w-full relative -top-3">
                <div className="mail space-y-2 my-3">
                  <label className="font-bold text-xs text-[11px]">
                    EMAIL *
                  </label>
                  <input
                    {...register("email")}
                    className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                    type="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {Array.isArray(errors.email.message)
                        ? errors.email.message[0]
                        : errors.email.message || "Validation error"}
                    </p>
                  )}
                </div>

                <div className="mail space-y-2 my-3">
                  <label className="font-bold text-xs text-[11px]">
                    DISPLAY NAME *
                  </label>
                  <input
                    {...register("displayName")}
                    className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                    type="text"
                  />
                  {errors.displayName && (
                    <p className="text-red-500 text-xs mt-1">
                      {Array.isArray(errors.displayName.message)
                        ? errors.displayName.message[0]
                        : errors.displayName.message || "Validation error"}
                    </p>
                  )}
                </div>

                <div className="mail space-y-2 my-3">
                  <label className="font-bold text-xs text-[11px]">
                    Mobile Number
                  </label>
                  <input
                    {...register("number")}
                    className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                    type="text"
                  />
                  {errors.number && (
                    <p className="text-red-500 text-xs mt-1">
                      {Array.isArray(errors.number.message)
                        ? errors.number.message[0]
                        : errors.number.message || "Validation error"}
                    </p>
                  )}
                </div>

                <div className="mail space-y-2 my-3">
                  <label className="font-bold text-xs text-[11px]">
                    PASSWORD *
                  </label>
                  <input
                    {...register("password")}
                    className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                    type={viewPassword ? "text" : "password"}
                  />
                   {!viewPassword ? (
                      <Eye
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeOff
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {Array.isArray(errors.password.message)
                        ? errors.password.message[0]
                        : errors.password.message || "Validation error"}
                    </p>
                  )}
                </div>

                <div className="mail space-y-2 my-3">
                  <label className="font-bold text-xs text-[11px]">
                    CONFIRM PASSWORD *
                  </label>
                  <input
                    {...register("confirmPassword")}
                    className="w-full h-10 rounded-sm bg-[#1e1f22] pl-2"
                    type="password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {Array.isArray(errors.confirmPassword.message)
                        ? errors.confirmPassword.message[0]
                        : errors.confirmPassword.message || "Validation error"}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold"
                >
                  Continue
                </button>

                <p className="text-[13px]">
                  Already Have an account?{" "}
                  <button
                    className="text-[#0a90d3]"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden max-[484px]:flex justify-center bg-[#313338] h-[100vh]">
        <div className="left flex flex-col  w-[30rem] text-[#b5bac1]  items-center p-5">
          <div className="top space-y-4 flex flex-col items-center">
            <img className="h-6 w-32" src="/image/logo.png" alt="" />
            <h1 className="text-center font-semibold text-[1.4rem] text-[#ebebeb]">
              Create an account
            </h1>
          </div>
          <div className="input w-full  relative -top-3">
            <div className="mail space-y-2 my-3">
              <label className="font-bold text-xs text-[11px]">EMAIL *</label>
              <input
                className="w-full h-10 rounded-sm bg-[#1e1f22]"
                type="text"
              />
            </div>
            <div className="mail space-y-2 my-3">
              <label className="font-bold text-xs text-[11px]">
                DISPLAY NAME *
              </label>
              <input
                className="w-full h-10 rounded-sm bg-[#1e1f22]"
                type="text"
              />
            </div>
            <div className="mail space-y-2 my-3">
              <label className="font-bold text-xs text-[11px]">
                PASSWORD *
              </label>
              <input
                className="w-full h-10 rounded-sm bg-[#1e1f22]"
                type="text"
              />
            </div>
            <button className="h-11 w-full rounded-sm bg-[#5865f2] my-2 hover:bg-[#434ece] text-white font-semibold">
              Log in
            </button>
            <p className="text-[13px]">
              Need an account?
              <button
                className="text-[#0a90d3]"
                type="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
