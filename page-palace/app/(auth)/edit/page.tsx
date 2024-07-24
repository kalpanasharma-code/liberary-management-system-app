"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  number: string;
};

const EditProfile = () => {
    const router = useRouter();
  const { handleSubmit, control, register, setValue, watch } =
    useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
        await axios.patch("/api/edit", data);
        router.push("/");
      } catch (error) {
        console.error("Error creating user:", error);
      }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full text-black px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-4 text-black py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number</label>
          <input
            type="number"
            {...register("number", { required: true })}
            className="w-full px-4 text-black py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
