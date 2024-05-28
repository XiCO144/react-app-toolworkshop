import { useContext } from "react";
import { SideBarEnterprise } from "./sidebar-enterprise";
import { AuthContext } from "@/data/AuthContext";

export function OwnerPageMain(){
    return (
        <div className="h-screen flex flex-col">
            <div className="flex">
                <aside>
                    <SideBarEnterprise/>
                </aside>
                <main className="bg-[#181818] w-screen text-white font-bodyfooter">
                    <h1>Dono</h1>
                </main>
            </div>
        </div>
    )
}