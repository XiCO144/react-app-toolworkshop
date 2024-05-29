import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Search, User, Wrench, AreaChart, Car, LogOut } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '@/data/AuthContext';

export function SideBarEnterprise() {
  const { userRole } = useContext(AuthContext);
  const logo = new URL("@/public/images/header.png", import.meta.url).href;
  return (
    <div className="text-white top-0 bottom-0 lg:left-0 p-2 w-72 overflow-y-auto text-center bg-[#282828] h-screen font-bodyfooter flex flex-col justify-between">
      <Link to = {`/empresa/${userRole}page`}><img src={logo} alt="Logotipo" /></Link>
      <div className="text-gray-100 text-xl">
        Gestão de Empresa
        <div className="p-2 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 ml-3">
            {userRole === 'owner'? 'Administrador' : 'Empregado'}
          </h1>
        </div>
        <hr className="my-2"/>
      </div>
      <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer">
        <Search />
        <Input type="text" placeholder="Pesquisar" className="ml-4 w-full bg-transparent focus:outline-none"/>
      </div>
      {userRole === 'owner' && (
        <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
          <AreaChart />
            <Link to ="/empresa/geral"><span className="text-[15px] ml-4">Visão Geral</span></Link>
        </div>
      )}
      <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <User />
        <Link to="/empresa/clients"><span className="text-[15px] ml-4">Clientes</span></Link>
      </div>
      <div className="p-2 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <Wrench />
        <Link to="/empresa/carRepairs"><span className="text-[15px] ml-4">Reparações</span></Link>
      </div>
      <hr className="my-4"/>
      <div className="mt-auto p-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#151515]">
        <LogOut />
        <span className="text-[15px] ml-4">LogOut</span>
      </div>
    </div>
  );
}