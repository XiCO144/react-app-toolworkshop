import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import * as React from "react"
import { cn } from "@/lib/utils"

export function HeaderEmployee() {
  const imgHeader = new URL("@/public/images/header_branco.png", import.meta.url).href;
  return (
    <div className="bg-green-500 h-16 grid content-center font-bodyfooter text-white py-2 z-0">
      <button className="absolute max-w-xs max-h-xs -mt-6">
        <img src={imgHeader} alt="Logotipo" onClick={() => (window.location.href = "../index.html")} />
      </button>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
        <NavigationMenuItem>
            <button className="rounded-md border-2 border-white hover:bg-background hover:text-black m-4 px-4 py-2 text-base font-normal">Clientes</button>
          </NavigationMenuItem>
        <NavigationMenuItem>
            <button className="rounded-md border-2 border-white hover:bg-background hover:text-black m-4 px-4 py-2 text-base font-normal">Veículos</button>
          </NavigationMenuItem>
        <NavigationMenuItem>
            <button className="rounded-md border-2 border-white hover:bg-background hover:text-black m-4 px-4 py-2 text-base font-normal">Reparações</button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="text-lg hover:font-bold absolute left-auto right-6 m-2 ">
        <p
          className=""
          onClick={() => (window.location.href = "../login.html")}
        >
          Login
        </p>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
