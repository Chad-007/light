
import { ReactNode } from 'react';
export const MainButton = ({ children, onClick,size="small" }: { children: ReactNode,onClick: () => void;size?: "big" | "small" }) => {
    return (
        <button onClick={onClick} className={` text-white p-2 rounded ${size === "small" ? "text-sm" : "text-lg"} ${size==="small" ? "px-4 py-2" : "px-6 py-3"} bg-amber-700`}>
            {children}
        </button>
    );  
};
