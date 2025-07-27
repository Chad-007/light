"use client";
import { ReactNode } from 'react';

export const AnotherButton = ({ children, onClick, size = "small" }: { children: ReactNode, onClick: () => void; size?: "big" | "small" }) => {
    return (
        <button 
            onClick={onClick} 
            className={`btn-secondary ${size === "small" ? "text-sm px-4 py-2" : "text-base px-6 py-3"}`}
        >
            {children}
        </button>
    );  
};
