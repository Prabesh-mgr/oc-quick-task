"use client"

import React, { useEffect, useState } from "react"
import {
  BookOpen,
  Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import logo from "../assets/logo.png"
import user from "../assets/user.png"
import board from "../assets/board.png"
import { CardWithForm } from "./PopUp/Card_Board"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: logo,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "For you",
      url: "#",
      icon: () => <img src={user} alt="User" className="w-4 h-4 rounded-sm" />,
      isActive: true,
      items: [
        {
          title: "Account",
          url: "#",
        },
      ],
    },
    {
      title: "Boards",
      url: "#",
      icon: () => <img src={board} alt="Board" className="w-4 h-4 rounded-sm" />,
      items: [
        {
          title: "Create Board",
          url: "#",
        },
      ]
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
}

export function AppSidebar(props) {
  const [showPopup, setShowPopup] = useState(false)

  const handleCreateBoardClick = () => {
    setShowPopup(true)
  }
  useEffect(() => {
    const handleCloseModal = () => {
      setShowPopup(false);
    };
    
    document.addEventListener('closeboardmodal', handleCloseModal);
    return () => {
      document.removeEventListener('closeboardmodal', handleCloseModal);
    };
  }, []);

  const updatedNavMain = data.navMain.map((item) => {
    if (item.title === "Boards") {
      return {
        ...item,
        items: item.items.map((subItem) => ({
          ...subItem,
          onClick: (e) => {
            e.preventDefault()
            handleCreateBoardClick()
          }
        }))
      }
    }
    return item
  })

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={updatedNavMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4">
            <CardWithForm />
           
          </div>
        </div>
      )}
    </>
  )
}
