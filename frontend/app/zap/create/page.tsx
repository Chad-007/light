"use client";
import { AppBar } from "@/components/Appbar";
import { ZapBox } from "@/components/ZapBox";
import { LinkButtons } from "@/components/buttons/LinkButtons";
import {  useState } from "react";
export default function Create(){
    const [selectedTrigger, setSelectedTrigger] = useState("");
    const [selectedAction, setSelectedAction] = useState<{
        availableActionId:string,
        availableActionName:string
    }[]>([]);

    const handleTriggerSelect = (trigger: string) => {
        setSelectedTrigger(trigger);
    };
    const handleActionSelect = (action: { availableActionId: string, availableActionName: string }) => {
        setSelectedAction(prevActions => [...prevActions, action]);
    };

    return ( 
    <div>
            <AppBar />
            <div className="w-full min-h-screen bg-slate flex-col justify-center ">
                <ZapBox name={selectedTrigger? selectedTrigger : "Trigger"} index={1} />
            </div>
            <div className="w-full min-h-screen bg-slate flex-col justify-center ">
               {/* {selectedAction.map((action, index) => (
                    <ZapBox name={action?action.availableActionName:"Action"} index={index + 2} />
               ))}  */}
            </div>
            <LinkButtons onClick={() => {
                setSelectedAction(a=>[...a, { availableActionId: "newActionId", availableActionName: "New Action" }]);
             
            }}>
             hey
            </LinkButtons>
        </div>
    );
}