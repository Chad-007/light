"use client";
import { AppBar } from "@/components/Appbar";
import { Input } from "@/components/Input";
import { MainButton } from "@/components/buttons/MainButton";
import { useState } from "react";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <AppBar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="card p-8 max-w-md w-full space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Welcome back
            </h1>
            <p className="text-gray-400">
              Sign in to your account
            </p>
          </div>

          <div className="space-y-4">
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="space-y-4">
            <MainButton onClick={() => {}} size="big">
              Sign In
            </MainButton>
            <p className="text-center text-sm text-gray-400">
              Don&apos;t have an account? <span className="text-indigo-500 cursor-pointer hover:underline">Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
