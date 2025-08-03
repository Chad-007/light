"use client";

export const ZapBox = ({name, index, onClick}:{name?:string, index:number, onClick?: () => void}) => {
   
    return (
        <div 
            className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md cursor-pointer hover:bg-gray-700 transition-colors border border-gray-600"
            onClick={onClick}
        >
            <div className="text-white text-lg font-semibold mb-2">
                {name}
            </div>
            <div className="text-gray-400 text-sm">
                Step {index}
            </div>
        </div>
    )
}