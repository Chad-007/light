"use client";
import React, { ReactNode } from 'react';

export const LinkButtons = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return (
        <button 
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200" 
            onClick={onClick}
        >
            {children}
        </button>
    );
}