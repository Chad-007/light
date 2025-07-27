import { ReactNode } from 'react';
export const AnotherButton = ({ children, onClick,size="small" }: { children: ReactNode,onClick: () => void;size?: "big" | "small" }) => {
    return (
        <button onClick={onClick} className={` text-black p-2 rounded ${size === "small" ? "text-sm" : "text-lg"} ${size==="small" ? "px-4 py-2" : "px-6 py-3"}  cursor-pointer p-2 border border-black hover:bg-gray-200 ml-1`}>
            {children}
        </button>
    );  
};
