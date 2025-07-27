"use client";
import { MainButton } from "./buttons/MainButton"
import { AnotherButton } from "./buttons/AnotherButton";
import { useRouter } from "next/navigation";
export const Hero = () => {
    const router = useRouter();
    return <div>
        <div>
            <h1 className="text-4xl font-bold text-center max-w-2xl mx-auto">Welcome to the website</h1>
        </div>

        <div className="flex justify-center mt-8">
            <MainButton onClick={() => router.push("/signup")}>
                click me
            </MainButton>
            <AnotherButton onClick={() => alert("Another button clicked!")}>
                another button
            </AnotherButton>
        </div>
    </div>
}