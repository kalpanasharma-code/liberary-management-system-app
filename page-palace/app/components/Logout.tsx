"use client";
import * as React from "react";

import { LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      const data = response;
      if (response.status === 200) {
        localStorage.removeItem("authData");
        router.push("/login");
      } else {
        console.log(`Logout failed with status: ${response.status}`);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
}
