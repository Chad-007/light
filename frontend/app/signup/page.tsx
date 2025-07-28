"use client";
import { AppBar } from "@/components/Appbar";
import { Input } from "@/components/Input";
import { MainButton } from "@/components/buttons/MainButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <AppBar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="card p-8 max-w-md w-full space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>
            <p className="text-gray-400">
              Start automating your workflows today
            </p>
          </div>

          <div className="space-y-4">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
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
            <MainButton onClick={async () => {
             const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
              username:email,
              password:password,
              name:username

              })
              router.push("/signin")
              console.log(res)

            }} size="big">
              Create Account
            </MainButton>
            <p className="text-center text-sm text-gray-400">
              Already have an account? <span className="text-indigo-500 cursor-pointer hover:underline">Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
 