"use client";
export const ZapBox = ({name,index}:{name?:string,index:number})=>{
   
    return <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md">
        <div>
            <div className="text-white text-lg font-semibold mb-2">
            {name}
        </div>
        <div>
            {index}
        </div>
        </div>
    </div>
}