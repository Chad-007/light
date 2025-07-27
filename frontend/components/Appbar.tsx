"use client";
import { MainButton } from "./buttons/MainButton"
import { LinkButtons } from "./buttons/LinkButtons"
import { useRouter } from "next/navigation";

export const AppBar = () => {
    const router = useRouter();
    return (
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <div className="flex items-center">
                <h1 className="text-4xl font-bold text-white">
                    Light
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <LinkButtons onClick={() => {}}>
                    Contact
                </LinkButtons>
                <LinkButtons onClick={() => router.push("/signin")}>
                    Login
                </LinkButtons>
                <MainButton onClick={() => router.push("/signup")}>
                    Sign Up
                </MainButton>
            </div>
        </div>
    )
}