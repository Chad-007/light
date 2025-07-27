
import { MainButton } from "@/components/buttons/MainButton";
import { AnotherButton } from "@/components/buttons/AnotherButton";
export const Feature = ({title,subtitle}:{title:string,subtitle:string}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700 mb-6">{subtitle}</p>
            <AnotherButton onClick={() => alert('Another Button Clicked!')}>Click Me</AnotherButton>
            <MainButton onClick={() => alert('Main Button Clicked!')}>Main Action</MainButton>
        </div>
    );
}
