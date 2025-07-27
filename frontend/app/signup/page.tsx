"use client";
import { AppBar } from "@/components/Appbar";
import { Input } from "@/components/Input";
export default function SignupPage() {
  return (
    <>
      <AppBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            <p className="text-gray-700 mb-6">Please fill in the form to create an account.</p>
        </div>
        <div className="mt-8 text-center">
            <Input
                value=""
                onChange={() => {}}
                placeholder="Username"
            />
            <Input 
                value=""
                onChange={() => {}}
                placeholder="Email"
            />
        
          <Input
            value=""
            onChange={() => {}}
            placeholder="Password"
          />
        </div>
      </div>
    </>
  );
}
 