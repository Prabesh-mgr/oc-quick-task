import React, { useState, useEffect } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getUserBoards } from "../../hooks/useBoard/GetBoard/index.js";
import { useBoardColumns } from "../../hooks/useColumn/getColumns/index.js";
import { Plus, Loader2 } from "lucide-react";
import { CardWithForm } from "../../components/PopUp/Card_Board";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useUserAuth/useAuth/index.js";
import deleteIcon from "../../assets/deleteIcon.png";
import edit from "../../assets/edit.png";
import { useDeleteBoard } from "@/hooks/useBoard/DeleteBoard";
import { ConfirmationModal } from "@/components/PopUp/confirmation";
import { EditBoardPopUp } from "@/components/PopUp/EditBoard";
import { ColumnForm } from "@/components/PopUp/ColumnCard";

export const HomePage = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const { boards, isLoadingBoards, boardsError, refetchBoards } = getUserBoards();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);

  const { columnsData: columns, isLoadingColumns, columnsError, refetchColumns } = useBoardColumns(selectedBoard?.boardId);
  const { deleteBoard, isDeleteBookLoading } = useDeleteBoard();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [showEditPopUp, setshowEditPopUp] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState(null);

  const handleEditBoard = (board) => {
    setBoardToEdit(board);
    setshowEditPopUp(true);
  };

  const confirmDeleteBoard = (boardId) => {
    setBoardToDelete(boardId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      deleteBoard(boardToDelete);
      await refetchBoards();
      if (selectedBoard?.boardId === boardToDelete) {
        setSelectedBoard(null);
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    } finally {
      setShowDeletePopup(false);
      setBoardToDelete(null);
    }
  };

  useEffect(() => {
    return () => {
      queryClient.clear();
    };
  }, [queryClient]);

  useEffect(() => {
    setSelectedBoard(null);
    queryClient.resetQueries();
    setTimeout(() => {
      refetchBoards();
    }, 100);
  }, [currentUser, queryClient, refetchBoards]);

  useEffect(() => {
    const handleCloseModal = () => setShowPopup(false);
    document.addEventListener("closeboardmodal", handleCloseModal);
    return () => document.removeEventListener("closeboardmodal", handleCloseModal);
  }, []);

  const handleBoardSelect = async (board) => {
    setSelectedBoard(board);
  };

  const handleBoardCreated = async (newBoard) => {
    await refetchBoards();
    handleBoardSelect(newBoard);
  };

  const renderColumns = () => {
    if (!selectedBoard) {
      return <div className="text-center text-muted-foreground mt-8">Select a board to view its columns</div>;
    }

    if (isLoadingColumns) {
      return (
        <div className="text-center mt-8">
          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          <p className="text-muted-foreground mt-2">Loading columns...</p>
        </div>
      );
    }

    if (columnsError) {
      return (
        <div className="text-center mt-8 text-red-500">
          <p>Failed to load columns</p>
          <button
            onClick={() => refetchColumns()}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!columns || columns.length === 0) {
      return (
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">No columns found for this board</p>
          <button
            onClick={() => setShowAddColumnPopup(true)}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Create Your First Column
          </button>
        </div>
      );
    }

    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">{selectedBoard.boardName} - Columns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.columnId} className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-64">
              <h3 className="font-medium text-gray-600 mb-3">{column.columnName}</h3>
              {column.tasks.length === 0 ? (
                <div className="text-sm text-gray-400">No tasks yet</div>
              ) : (
                <div className="space-y-2">
                  {column.tasks.map((task) => (
                    <div key={task.taskId} className="bg-white p-3 rounded shadow-sm">
                      {task.taskName}
                    </div>
                  ))}
                </div>
              )}
              <button
                className="mt-3 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center">
                <Plus className="w-4 h-4 mr-1" /> Add Task
              </button>
            </div>
          ))}
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
            <button
              onClick={() => setShowAddColumnPopup(true)}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <Plus className="w-5 h-5 mr-1" /> Add Column
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!currentUser) {
      return (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Welcome! Please log in to view your boards.</p>
        </div>
      );
    }

    if (isLoadingBoards) {
      return (
        <div className="text-center text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          <p className="mt-2">Loading boards...</p>
        </div>
      );
    }

    if (!boards || boards.length === 0) {
      return (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No boards found</p>
          <button onClick={() => setShowPopup(true)} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Create Your First Board
          </button>
        </div>
      );
    }

    if (boardsError && currentUser) {
      return (
        <div className="text-red-500 text-center">
          <p>Failed to load boards</p>
          <button onClick={refetchBoards} className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Try Again
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div
              key={board.boardId || board.id}
              className={`bg-white shadow-sm border p-4 rounded-lg hover:shadow-md transition cursor-pointer ${selectedBoard?.boardId === board.boardId ? "border-blue-500 ring-2 ring-blue-200" : "border-muted"}`}
              onClick={() => handleBoardSelect(board)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{board.boardName}</h2>
                  <p className="text-sm text-muted-foreground">Created: {new Date(board.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="hover:bg-blue-50 cursor-pointer p-2 rounded-2xl" onClick={() => confirmDeleteBoard(board.boardId)}>
                    <img src={deleteIcon} alt="img" width={20} className="transition-transform duration-150 hover:scale-110 active:scale-95" />
                  </div>
                  <div className="hover:bg-blue-50 cursor-pointer p-2 rounded-2xl" onClick={() => handleEditBoard(board)}>
                    <img src={edit} alt="img" width={20} className="transition-transform duration-150 hover:scale-110 active:scale-95" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {renderColumns()}
      </>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar onBoardSelected={handleBoardSelect} onCreateBoardSuccess={handleBoardCreated} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 transition group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-bold">Home</h1>
          </div>
        </header>
        <div className="px-4 py-6">{renderContent()}</div>
      </SidebarInset>

      {showDeletePopup && (
        <ConfirmationModal
          isOpen={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this board? This action cannot be undone."
        />
      )}

      {showEditPopUp && boardToEdit && (
        <EditBoardPopUp
          board={boardToEdit}
          onClose={() => setshowEditPopUp(false)}
          onSuccess={() => {
            refetchBoards();
            setshowEditPopUp(false);
          }}
        />
      )}

      {showAddColumnPopup && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur flex items-center justify-center">
          <ColumnForm
            boardId={selectedBoard?.boardId}
            existingColumns={columns?.map(col => col.columnName) || []}
            onClose={() => setShowAddColumnPopup(false)}
            onSuccess={() => {
              refetchColumns();
              setShowAddColumnPopup(false);
            }}
          />
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 z-5 bg-opacity-50 flex items-center justify-center backdrop-blur">
          <CardWithForm setShowPopup={setShowPopup} />
        </div>
      )}
    </SidebarProvider>
  );
};
