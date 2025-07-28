"use client"
import { AppBar } from "@/components/Appbar";
import { MainButton } from "@/components/buttons/MainButton";
import {  useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { LinkButtons } from "@/components/buttons/LinkButtons";
import { useRouter } from "next/navigation";
interface Zap {
      "id": string,
      "triggerid": string,
      "userId": number,
      "actions": {
          "id": string,
          "zapid": string,
          "actionid": string,
          "order": number,
          "type": {
            "id": string,
            "name": string
          }
        }[] 
        "trigger": {
        "id": string,
        "zapid": string,
        "triggerid": string,
        "type": {
          "id": string,
          "name": string
        }
      }     
}

function  Uselights(){
    const [loading, setLoading] = useState(false);    
    const [lights, setLights] = useState<Zap[]>([]);
    useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/zap`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    }).then((response) => {
        setLights(response.data.zaps);
        setLoading(false);
    }).catch((error) => {
        console.error("Error fetching zaps:", error);
        setLoading(false);
    });
    setLoading(true);
    },[]);

    return {
        loading,
        lights
    }
}
export default function Dashboard(){
    const {loading,lights} = Uselights();
    const router = useRouter();
    return (
        <div className="min-h-screen">
            <AppBar/>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center justify-center px-4 pt-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-white">
                            Dashboard
                        </h1>
                        <p className="text-gray-400">
                            Manage your automation workflows
                        </p>
                    </div>
                    <div className="mt-6">
                        <MainButton onClick={() => {
                            router.push("/zap/create");
                        }}>
                            Create Zap 
                        </MainButton>
                    </div>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-gray-400">Loading...</div>
                    </div>
                ) : (
                    <ZapTable zaps={lights} />
                )}
            </div>
        </div>
    );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();
    if (zaps.length === 0) {
        return (
            <div className="px-4 py-8">
                <div className="card p-12 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No automations yet
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Create your first automation to get started
                    </p>
                    <button 
                        className="btn-primary"
                        onClick={() => alert('Create your first zap')}
                    >
                        Create Your First Zap
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <div className="card overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Trigger ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                User ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {zaps.map(zap => (
                            <tr key={zap.id} className="hover:bg-gray-900/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                    {zap.trigger.type.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {zap.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {zap.triggerid}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {zap.userId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                   {zap.actions.map(action => (
                                        <span key={action.id} className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-400 mr-2 mb-2">
                                            {action.type.name}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <LinkButtons onClick={() => {
                                        router.push("/zap/"+zap.id);
                                    }}>Click</LinkButtons>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
