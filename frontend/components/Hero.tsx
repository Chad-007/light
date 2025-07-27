"use client";
import { MainButton } from "./buttons/MainButton"
import { AnotherButton } from "./buttons/AnotherButton";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl w-full text-center space-y-8">
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                        Automate your
                        <br />
                        <span className="text-indigo-500">
                            workflow
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Connect your apps and automate workflows to save time and increase productivity.
                    </p>
                </div>

                <div className="flex justify-center gap-4 pt-8">
                    <MainButton onClick={() => router.push("/signup")} size="big">
                        Get Started
                    </MainButton>
                    <AnotherButton onClick={() => router.push("/signin")} size="big">
                        Sign In
                    </AnotherButton>
                </div>
            </div>
        </div>
    )
}