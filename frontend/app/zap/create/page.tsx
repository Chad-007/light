"use client";
import { AppBar } from "@/components/Appbar";

export default function Create(){
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedAction, setSelectedAction] = useState("");
    const [triggerOptions, setTriggerOptions] = useState([]);
    const [actionOptions, setActionOptions] = useState([]);
    return <div>

        <AppBar />
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="card p-8 max-w-md w-full space-y-6">
                <h1 className="text-3xl font-bold text-white">Create Zap</h1>
                <p className="text-gray-400">This is where you can create your zaps.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Select Trigger</label>
                        <select 
                            value={selectedTrigger} 
                            onChange={(e) => setSelectedTrigger(e.target.value)} 
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {triggerOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Select Action</label>
                        <select 
                            value={selectedAction} 
                            onChange={(e) => setSelectedAction(e.target.value)} 
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {actionOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
            </div>
        </div>
    </div>
    </div>
}