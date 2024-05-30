import { SideBarClients } from "@/components/cliente/sidebar-clients";

export function ClientAccountSettings () {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex">
          <aside>
              <SideBarClients/>
          </aside>
          <main className="bg-[#181818] w-screen text-white font-bodyfooter">
              <h1>Definições Clientes</h1>
          </main>
      </div>
  </div>
  );
};