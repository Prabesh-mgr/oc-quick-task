import React from "react";
import { useBoard } from "../../hooks/useBoard/CreateBoard/index.js"; 
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export const HomePage = () => {
  const { boards, isLoadingBoards, boardsError } = useBoard();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 transition group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-bold">Home</h1>
          </div>
        </header>

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Boards</h2>

          {isLoadingBoards && (
            <p className="text-gray-500">Loading your boards...</p>
          )}

          {boardsError && (
            <p className="text-red-500">Failed to load boards. Try again later.</p>
          )}

          {boards && boards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {boards.map((board) => (
                <div
                  key={board.boardId}
                  className="bg-white rounded shadow p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => (window.location.href = `/boards/${board.boardId}`)}
                >
                  <h3 className="font-semibold text-lg">{board.boardName}</h3>
                </div>
              ))}
            </div>
          ) : !isLoadingBoards && (
            <p className="text-gray-500">No boards found. Create your first board!</p>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
