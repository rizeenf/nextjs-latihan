"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <button
      className="p-2 rounded bg-slate-700 text-white"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};

export default Logout;
