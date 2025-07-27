"use client"
export const Input = ({ value, onChange, placeholder }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}
export default Input;