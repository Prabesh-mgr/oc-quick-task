import React, { useState, useEffect } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getUserBoards } from "../../hooks/useBoard/GetBoard/index.js";
import { Plus, Loader2 } from "lucide-react";
import { CardWithForm } from "../../components/PopUp/Card_Board";

const fetchBoardColumns = async (boardId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "To Do", cards: [] },
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Done", cards: [] },
      ]);
    }, 500);
  });
};

export const HomePage = () => {
  const { boards, isLoadingBoards, boardsError, refetchBoards } = getUserBoards();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoadingColumns, setIsLoadingColumns] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleBoardSelect = async (board) => {
    setSelectedBoard(board);
    setIsLoadingColumns(true);
    try {
      const boardColumns = await fetchBoardColumns(board.boardId);
      setColumns(boardColumns);
    } catch (error) {
      console.error("Error fetching columns:", error);
    } finally {
      setIsLoadingColumns(false);
    }
  };

  const handleBoardCreated = async (newBoard) => {
    await refetchBoards();
    handleBoardSelect(newBoard);
  };

  const renderColumns = () => {
    if (!selectedBoard) {
      return (
        <div className="text-center text-muted-foreground mt-8">
          Select a board to view its columns
        </div>
      );
    }

    if (isLoadingColumns) {
      return (
        <div className="text-center mt-8">
          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          <p className="text-muted-foreground mt-2">Loading columns...</p>
        </div>
      );
    }

    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">{selectedBoard.boardName} - Columns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div 
              key={column.id} 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-64"
            >
              <h3 className="font-medium text-gray-900 mb-3">{column.title}</h3>
              {column.cards.length === 0 ? (
                <div className="text-sm text-gray-500">No cards yet</div>
              ) : (
                <div className="space-y-2">
                  {column.cards.map((card) => (
                    <div key={card.id} className="bg-white p-3 rounded shadow-sm">
                      {card.title}
                    </div>
                  ))}
                </div>
              )}
              <button 
                className="mt-3 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Card
              </button>
            </div>
          ))}
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
            <button className="text-gray-600 hover:text-gray-900 flex items-center">
              <Plus className="w-5 h-5 mr-1" /> Add Column
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar 
        onBoardSelected={handleBoardSelect}
        onCreateBoardSuccess={handleBoardCreated}
      />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 transition group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-bold">Home</h1>
          </div>
        </header>
        <div className="px-4 py-6">
          {isLoadingBoards && (
            <div className="text-center text-muted-foreground">Loading boards...</div>
          )}
          {boardsError && (
            <div className="text-red-500 text-center">Failed to load boards</div>
          )}
          {!isLoadingBoards && !boardsError && boards?.length === 0 && (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No boards found</p>
              <button
                onClick={() => setShowPopup(true)}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Create Your First Board
              </button>
            </div>
          )}
          {!isLoadingBoards && !boardsError && boards?.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {boards.map((board) => (
                  <div
                    key={board.boardId || board.id}
                    className={`bg-white shadow-sm border p-4 rounded-lg hover:shadow-md transition cursor-pointer ${
                      selectedBoard?.boardId === board.boardId ? "border-blue-500 ring-2 ring-blue-200" : "border-muted"
                    }`}
                    onClick={() => handleBoardSelect(board)}
                  >
                    <h2 className="text-lg font-semibold">{board.boardName}</h2>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(board.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                <div
                  className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  onClick={() => setShowPopup(true)}
                >
                  <div className="text-center">
                    <Plus className="w-6 h-6 mx-auto text-gray-500" />
                    <p className="mt-2 text-sm font-medium text-gray-600">Create New Board</p>
                  </div>
                </div>
              </div>

              {renderColumns()}
            </>
          )}
        </div>
      </SidebarInset>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 shadow-xl">
            <CardWithForm onSuccess={handleBoardCreated} />
          </div>
        </div>
      )}
    </SidebarProvider>
  );
};