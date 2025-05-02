import React, { useState, useEffect } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { CardWithForm } from "../../components/PopUp/Card_Board";
import { EditBoardPopUp } from "@/components/PopUp/EditBoard";
import { ConfirmationModal } from "@/components/PopUp/confirmation";
import { ColumnForm } from "@/components/PopUp/ColumnCard";
import { CreateTaskForm } from "../../components/TaskForms/index.jsx";
import { WelcomePopUp } from "../../components/PopUp/WelcomePopUp/index.jsx";
import { TaskListView } from "../../components/TaskListView/index.jsx";

import { getUserBoards } from "../../hooks/useBoard/GetBoard/index.js";
import { useBoardColumns } from "../../hooks/useColumn/getColumns/index.js";
import { useAuth } from "../../hooks/useUserAuth/useAuth/index.js";
import { useDeleteBoard } from "@/hooks/useBoard/DeleteBoard";
import { useEditColumn } from "../../hooks/useColumn/editColumns/index.js";
import { useDeleteColumn } from "../../hooks/useColumn/deleteColumns/index.js";
import { useUpdateTaskColumn } from "../../hooks/useTask/updateTaskColumn/index.js";

import { BoardHeader } from "../../components/BoardHeader/index.jsx";
import { ColumnList } from "../../components/ColumnList/index.jsx";
import { DndContextProvider } from "../../components/DndContextProvider/index.jsx";

export const HomePage = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);
  

  const [viewMode, setViewMode] = useState(location.pathname.endsWith('/list') ? "list" : "board");

  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState(null);

  const [columnToDelete, setColumnToDelete] = useState(null);
  const [columnToEdit, setColumnToEdit] = useState(null);
  const [showDeleteColumnPopup, setShowDeleteColumnPopup] = useState(false);
  const [showEditColumnPopup, setShowEditColumnPopup] = useState(false);

  const { 
    boards, 
    isLoadingBoards, 
    boardsError, 
    refetchBoards, 
    refreshBoards 
  } = getUserBoards();
  const {
    columnsData: columns,
    isLoadingColumns,
    columnsError,
    refetchColumns,
  } = useBoardColumns(selectedBoard?.boardId);

  const { deleteBoard } = useDeleteBoard();
  const { editColumn, isEditColumnLoading } = useEditColumn();
  const { deleteColumn, isDeleteColumnLoading } = useDeleteColumn();
  const { updateTaskColumn } = useUpdateTaskColumn();

  useEffect(() => {
    setViewMode(location.pathname.endsWith('/list') ? "list" : "board");
  }, [location]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setIsFirstLogin(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const handleEditBoard = (board) => {
    setBoardToEdit(board);
    setShowEditPopUp(true);
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

  const handleDeleteColumn = (columnId) => {
    setColumnToDelete(columnId);
    setShowDeleteColumnPopup(true);
  };

  const confirmDeleteColumn = async () => {
    try {
      await deleteColumn(columnToDelete);
      refetchColumns();
    } catch (error) {
      console.error("Error deleting column:", error);
    } finally {
      setShowDeleteColumnPopup(false);
      setColumnToDelete(null);
    }
  };

  const handleEditColumn = (column) => {
    setColumnToEdit(column);
    setShowEditColumnPopup(true);
  };

  const handleColumnEditSuccess = (columnData) => {
    if (columnToEdit) {
      editColumn({
        columnId: columnToEdit.columnId,
        columnData: columnData,
      });
      refetchColumns();
    }
    setShowEditColumnPopup(false);
    setColumnToEdit(null);
  };

  const handleAddTask = (columnId) => {
    setActiveColumnId(columnId);
    setShowAddTaskPopup(true);
  };

  const handleTaskCreated = () => {
    refetchColumns();
    setShowAddTaskPopup(false);
    setActiveColumnId(null);
  };

  const handleTaskDetailsClick = (taskId) => {
    if (selectedBoard) {
      navigate(`/task/${selectedBoard.boardId}/${taskId}`);
    }
  };

  const handleBoardSelect = async (board) => {
    setSelectedBoard(board);
    navigate(`/home/${board.boardId}`);
  };

  const handleBoardCreated = async (newBoard) => {
    await refreshBoards();
    await refetchBoards();
    navigate(`/home/${newBoard.boardId}`);
  };

  const handleCreateBoard = () => {
    setShowPopup(true);
  };

  const handleToggleView = () => {
    const newViewMode = viewMode === "board" ? "list" : "board";
    setViewMode(newViewMode);
    
    if (selectedBoard) {
      if (newViewMode === "list") {
        navigate(`/home/${selectedBoard.boardId}/list`);
      } else {
        navigate(`/home/${selectedBoard.boardId}`);
      }
    }
  };
  
  useEffect(() => {
    return () => {
      queryClient.clear();
    };
  }, [queryClient]);

  useEffect(() => {
  }, [currentUser, boards, isLoadingBoards]);
  
  useEffect(() => {
    if (currentUser) {
      refreshBoards();
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (currentUser && !isLoadingBoards && (!boards || boards.length === 0)) {
      setIsFirstLogin(true);
      
      if (boardId) {
        navigate('/home');
      }
    } else {
      setIsFirstLogin(false);
    }
  }, [currentUser, boards, isLoadingBoards, boardId, navigate]);

  useEffect(() => {
    if (boardId && Array.isArray(boards) && boards?.length > 0) {
      const matchedBoard = boards.find((b) => b.boardId === boardId);
      setSelectedBoard(matchedBoard || null);
    } else if (boards?.length === 0) {
      setSelectedBoard(null);
    }
  }, [boardId, boards]);

  useEffect(() => {
    const handleCloseModal = () => setShowPopup(false);
    document.addEventListener("closeboardmodal", handleCloseModal);
    return () => document.removeEventListener("closeboardmodal", handleCloseModal);
  }, []);

  const handleDragEnd = async (taskId, newColumnId) => {
    if (!columns) return;

    const sourceColumn = columns.find((col) =>
      (col.tasks || []).some((task) => task?.taskId === taskId)
    );

    if (!sourceColumn || sourceColumn.columnId === newColumnId) return;

    try {
      const taskToMove = sourceColumn.tasks.find(t => t.taskId === taskId);

      const updatedColumns = columns.map((col) => {
        if (col.columnId === sourceColumn.columnId) {
          return {
            ...col,
            tasks: (col.tasks || []).filter((t) => t.taskId !== taskId),
          };
        }
        if (col.columnId === newColumnId) {
          return {
            ...col,
            tasks: [...(col.tasks || []), taskToMove],
          };
        }
        return col;
      });

      queryClient.setQueryData(
        ["columns", selectedBoard.boardId],
        updatedColumns
      );

      await updateTaskColumn({
        taskId,
        columnId: newColumnId,
        boardId: selectedBoard.boardId,
      });

      await refetchColumns();
    } catch (error) {
      console.error("Error moving task:", error);
      refetchColumns();
    }
  };

  const renderBoardContent = () => {
    if (currentUser && isFirstLogin) {
      return <WelcomePopUp onCreateBoard={handleCreateBoard} />;
    }

    if (isLoadingBoards) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      );
    }
    
    if (currentUser && (!boards || boards.length === 0)) {
      return <WelcomePopUp onCreateBoard={handleCreateBoard} />;
    }

    if (!selectedBoard) {
      return (
        <div className="text-center text-muted-foreground mt-8">
          Select a board to view its columns
        </div>
      );
    }

    if (isLoadingColumns) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
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

    return (
      <div className="board-container">
        <BoardHeader
          selectedBoard={selectedBoard}
          onDelete={confirmDeleteBoard}
          onEdit={handleEditBoard}
          viewMode={viewMode}
          onToggleView={handleToggleView}
        />

        {viewMode === "board" ? (
          <DndContextProvider onDragEnd={handleDragEnd}>
            <ColumnList
              columns={columns}
              onAddTask={handleAddTask}
              onTaskClick={handleTaskDetailsClick}
              onEditColumn={handleEditColumn}
              onDeleteColumn={handleDeleteColumn}
              onAddColumn={() => setShowAddColumnPopup(true)}
            />
          </DndContextProvider>
        ) : (
          <TaskListView 
            columns={columns}
            onTaskClick={handleTaskDetailsClick}
            isLoading={isLoadingColumns}
            refetchColumns={refetchColumns}
          />
        )}
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
        <div className="flex-1 overflow-y-auto px-4 py-2">{renderBoardContent()}</div>
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
          onClose={() => setShowEditPopUp(false)}
          onSuccess={() => {
            refetchBoards();
            setShowEditPopUp(false);
          }}
        />
      )}

      {showDeleteColumnPopup && (
        <ConfirmationModal
          isOpen={showDeleteColumnPopup}
          onClose={() => setShowDeleteColumnPopup(false)}
          onConfirm={confirmDeleteColumn}
          message="Are you sure you want to delete this column? All tasks within this column will also be deleted."
          isLoading={isDeleteColumnLoading}
        />
      )}

      {showEditColumnPopup && columnToEdit && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <ColumnForm
            boardId={selectedBoard?.boardId}
            existingColumns={
              columns
                ?.filter((col) => col.columnId !== columnToEdit.columnId)
                .map((col) => col.columnName) || []
            }
            editMode={true}
            columnToEdit={columnToEdit}
            onClose={() => {
              setShowEditColumnPopup(false);
              setColumnToEdit(null);
            }}
            onSuccess={handleColumnEditSuccess}
            isLoading={isEditColumnLoading}
          />
        </div>
      )}

      {showAddColumnPopup && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <ColumnForm
            boardId={selectedBoard?.boardId}
            existingColumns={columns?.map((col) => col.columnName) || []}
            onClose={() => setShowAddColumnPopup(false)}
            onSuccess={() => {
              refetchColumns();
              setShowAddColumnPopup(false);
            }}
          />
        </div>
      )}

      {showAddTaskPopup && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button
                onClick={() => setShowAddTaskPopup(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                &times;
              </button>
            </div>

            <CreateTaskForm
              columnId={activeColumnId}
              onTaskCreated={handleTaskCreated}
            />
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <CardWithForm setShowPopup={setShowPopup} />
        </div>
      )}
    </SidebarProvider>
  );
};