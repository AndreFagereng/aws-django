"use client";

import { cn } from "../../@/lib/utils";

export const Sidebar = () => {
  const routes = [
    {
      //icon: Home,
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      //icon: Home,
      href: "/app",
      label: "App",
      pro: true,
    },
    {
      //icon: Home,
      href: "/settings",
      label: "Settings",
      pro: false,
    },
  ];
  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              key={route.href}
              className="bg-primary text-muted-foreground text-xs group flex 
              p-3 w-full justify-start font-medium cursor-pointer hover:text-primary 
              hover:bg-primary/10 rounded-lg transition"
            >
              <div className="flex flex-col gap-y-2 items-center flex-1 white">{route.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
