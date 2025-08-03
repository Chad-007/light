"use client";
import { AppBar } from "@/components/Appbar";
import { ZapBox } from "@/components/ZapBox";
import { MainButton } from "@/components/buttons/MainButton";
import { Input } from "@/components/Input";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface MetadataType {
    email?: string;
    body?: string;
    amount?: string;
    address?: string;
    [key: string]: string | undefined;
}

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState<{id: string, name: string, image: string;}[]>([]);
    const [availableTriggers, setAvailableTriggers] = useState<{id: string, name: string, image: string;}[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTriggers))
            .catch(err => console.error('Error fetching triggers:', err));

        axios.get(`${BACKEND_URL}/api/v1/action/available`)
            .then(x => setAvailableActions(x.data.availableActions))
            .catch(err => console.error('Error fetching actions:', err));
    }, [])

    return {
        availableActions,
        availableTriggers
    }
}

export default function Create(){
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: MetadataType;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    return (
        <div>
            <AppBar />
            <div className="flex justify-end p-4">
                <MainButton onClick={async () => {
                    if (!selectedTrigger?.id) {
                        return;
                    }

                    try {
                        await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                            "availableTriggerId": selectedTrigger.id,
                            "triggerMetadata": {},
                            "actions": selectedActions.map(a => ({
                                availableActionId: a.availableActionId,
                                actionMetadata: a.metadata
                            }))
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        
                        router.push("/dashboard");
                    } catch (error) {
                        console.error('Error creating zap:', error);
                    }
                }}>
                    Publish
                </MainButton>
            </div>
            
            <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
                <div className="flex justify-center w-full">
                    <ZapBox 
                        onClick={() => setSelectedModalIndex(1)} 
                        name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} 
                        index={1} 
                    />
                </div>
                
                <div className="w-full pt-2 pb-2">
                    {selectedActions.map((action) => (
                        <div key={action.index} className="pt-2 flex justify-center">
                            <ZapBox 
                                onClick={() => setSelectedModalIndex(action.index)} 
                                name={action.availableActionName ? action.availableActionName : "Action"} 
                                index={action.index} 
                            />
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-center">
                    <MainButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            index: a.length + 2,
                            availableActionId: "",
                            availableActionName: "",
                            metadata: {}
                        }])
                    }}>
                        <div className="text-2xl">+</div>
                    </MainButton>
                </div>
            </div>

            {selectedModalIndex && (
                <Modal 
                    availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} 
                    onSelect={(props: null | { name: string; id: string; metadata: MetadataType; }) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }
                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name
                            })
                        } else {
                            setSelectedActions(a => {
                                const newActions = [...a];
                                newActions[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    metadata: props.metadata
                                }
                                return newActions
                            })
                        }
                        setSelectedModalIndex(null);
                    }} 
                    index={selectedModalIndex} 
                />
            )}
        </div>
    );
}

function Modal({ index, onSelect, availableItems }: { 
    index: number, 
    onSelect: (props: null | { name: string; id: string; metadata: MetadataType; }) => void, 
    availableItems: {id: string, name: string, image: string;}[] 
}) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();
    const isTrigger = index === 1;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 flex">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative card rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-700 rounded-t">
                        <div className="text-xl text-white">
                            Select {index === 1 ? "Trigger" : "Action"}
                        </div>
                        <button 
                            onClick={() => onSelect(null)} 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {step === 1 && selectedAction?.id === "email" && (
                            <EmailSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                })
                            }} />
                        )}

                        {(step === 1 && selectedAction?.id === "send-sol") && (
                            <SolanaSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                })
                            }} />
                        )}

                        {step === 0 && (
                            <div>
                                {availableItems.map(({id, name, image}) => {
                                    return (
                                        <div 
                                            key={id}
                                            onClick={() => {
                                                if (isTrigger) {
                                                    onSelect({
                                                        id,
                                                        name,
                                                        metadata: {}
                                                    })
                                                } else {
                                                    setStep(s => s + 1);
                                                    setSelectedAction({
                                                        id,
                                                        name
                                                    })
                                                }
                                            }} 
                                            className="flex border border-gray-700 p-4 cursor-pointer hover:bg-gray-800 rounded-lg mb-2"
                                        >
                                            <Image src={image} width={30} height={30} alt={name} className="rounded-full" /> 
                                            <div className="flex flex-col justify-center ml-3 text-white"> 
                                                {name} 
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}                    
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmailSelector({setMetadata}: {
    setMetadata: (params: MetadataType) => void;
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
                <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Body</label>
                <Input 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter email body"
                />
            </div>
            <div className="pt-2">
                <MainButton onClick={() => {
                    setMetadata({
                        email,
                        body
                    })
                }}>
                    Submit
                </MainButton>
            </div>
        </div>
    );
}

function SolanaSelector({setMetadata}: {
    setMetadata: (params: MetadataType) => void;
}) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");    

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">To Address</label>
                <Input 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Solana address"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                <Input 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <div className="pt-4">
                <MainButton onClick={() => {
                    setMetadata({
                        amount,
                        address
                    })
                }}>
                    Submit
                </MainButton>
            </div>
        </div>
    );
}