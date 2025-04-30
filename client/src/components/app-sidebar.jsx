"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Settings2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import board from "../assets/board.png";
import { CardWithForm } from "./PopUp/Card_Board";
import { getUserBoards } from "../hooks/useBoard/GetBoard/index";

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
    },
  ],
  navMain: [
    {
      title: "Boards",
      url: "#",
      icon: () => <img src={board} alt="Board" className="w-4 h-4 rounded-sm" />,
      items: [],
    }
  ],
};

export function AppSidebar({ onBoardSelected, onCreateBoardSuccess, ...props }) {
  const [showPopup, setShowPopup] = useState(false);
  const { boards, isLoadingBoards, boardsError, refetchBoards, refreshBoards } = getUserBoards();

  const handleCreateBoardClick = () => setShowPopup(true);

  useEffect(() => {
    refetchBoards();

    const handleCloseModal = () => setShowPopup(false);
    document.addEventListener("closeboardmodal", handleCloseModal);
    return () => document.removeEventListener("closeboardmodal", handleCloseModal);
  }, [refetchBoards]);

  const handleBoardCreated = (newBoard) => {
    refreshBoards();
    setShowPopup(false);

    if (onCreateBoardSuccess) {
      onCreateBoardSuccess(newBoard);
    }
  };

  const updatedNavMain = useMemo(() => {
    return data.navMain.map((item) => {
      if (item.title === "Boards") {
        return {
          ...item,
          items: [
            {
              title: (
                <div className="flex items-center gap-10 px-1 text-sm text-gray-700 font-bold">
                  <div onClick={(e) => {
                        e.preventDefault();
                        handleCreateBoardClick();
                      }}>
                        Create Board
                        </div>
                </div>
               
              ),
              url: "#",
              className: "text-sm py-1",
            },
            ...(isLoadingBoards
              ? [{
                title: "Loading boards...",
                url: "#",
                icon: () => <Loader2 className="w-4 h-4 animate-spin" />,
                className: "text-gray-500 italic text-sm"
              }]
              : []),
            ...(boardsError
              ? [{
                title: "Error loading boards",
                url: "#",
                icon: () => <AlertCircle className="w-4 h-4 text-red-500" />,
                onClick: (e) => {
                  e.preventDefault();
                  refreshBoards();
                },
                className: "text-red-500 text-sm"
              }]
              : []),
            ...(!isLoadingBoards && !boardsError
              ? (Array.isArray(boards) && boards.length > 0
                ? boards.map((board) => ({
                  title: board.boardName || board.name || "Untitled Board",
                  url: `#`,
                  onClick: (e) => {
                    e.preventDefault();
                    if (onBoardSelected) {
                      onBoardSelected(board);
                    }
                  },
                  className: "pl-1 hover:bg-gray-100 text-gray-700"
                }))
                : [{
                  title: "No boards yet",
                  url: "#",
                  className: "text-gray-400 italic text-sm"
                }])
              : []),
          ],
        };
      }
      return item;
    });
  }, [boards, isLoadingBoards, boardsError, refreshBoards, onBoardSelected]);

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
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-0">
          <div className="pointer-events-auto w-full max-w-md p-4">
            <CardWithForm onSuccess={handleBoardCreated} />
          </div>
        </div>
      )}
    </>
  );
}
