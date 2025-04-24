import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom";

export function TeamSwitcher() {
  const navigation = useNavigate()
  const handelRefresh=()=>{
    navigation('/home')
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div
          className=" data-[state=open]:text-sidebar-accent-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handelRefresh}
        >
          <div
            className=" text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg"
          >
            <img src={logo} alt="Team Logo" className="size-8"  />
          </div>
          <div className="grid flex-1 text-left text-lg leading-tight">
            <h1 className="truncate font-bold">FlowBoard</h1>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
