"use client";
import { MainButton } from "./buttons/MainButton"
import { LinkButtons } from "./buttons/LinkButtons"
import { useRouter } from "next/navigation";
export const AppBar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between">
        <div className="p-4 flex-col justify-center">zapier</div>
        <div className="flex items-center gap-4">
           <LinkButtons onClick={() => {}}>Contact</LinkButtons>
            <LinkButtons onClick={() => {
                router.push("/login")
            }}>Login</LinkButtons>
            <MainButton onClick={() => {
                router.push("/signup")
            }}>Sign Up</MainButton>
        </div>
    </div>
}