import React, { useState, useEffect } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getUserBoards } from "../../hooks/useBoard/GetBoard/index.js";
import { useBoardColumns } from "../../hooks/useColumn/getColumns/index.js";
import { Plus, Loader2, MoreVertical, Trash, Edit } from "lucide-react";
import { CardWithForm } from "../../components/PopUp/Card_Board";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useUserAuth/useAuth/index.js";
import deleteIcon from "../../assets/deleteIcon.png";
import edit from "../../assets/edit.png";
import { useDeleteBoard } from "@/hooks/useBoard/DeleteBoard";
import { ConfirmationModal } from "@/components/PopUp/confirmation";
import { EditBoardPopUp } from "@/components/PopUp/EditBoard";
import { ColumnForm } from "@/components/PopUp/ColumnCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEditColumn } from "../../hooks/useColumn/editColumns/index.js";
import { useDeleteColumn } from "../../hooks/useColumn/deleteColumns/index.js";
import { CreateTaskForm } from "../../components/TaskForms/index"; 

export const HomePage = () => {
  const queryClient = useQueryClient();

  const { boardId } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { boards, refetchBoards } = getUserBoards();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false); // New state for task form popup
  const [activeColumnId, setActiveColumnId] = useState(null); // Track which column's "Add Task" was clicked
  
  const [activeColumnMenu, setActiveColumnMenu] = useState(null);

  const {
    columnsData: columns,
    isLoadingColumns,
    columnsError,
    refetchColumns,
  } = useBoardColumns(selectedBoard?.boardId);

  const { deleteBoard } = useDeleteBoard();
  const { editColumn, isEditColumnLoading } = useEditColumn();
  const { deleteColumn, isDeleteColumnLoading } = useDeleteColumn();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState(null);
  
  const [columnToDelete, setColumnToDelete] = useState(null);
  const [columnToEdit, setColumnToEdit] = useState(null);
  const [showDeleteColumnPopup, setShowDeleteColumnPopup] = useState(false);
  const [showEditColumnPopup, setShowEditColumnPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeColumnMenu && !event.target.closest('.column-menu')) {
        setActiveColumnMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeColumnMenu]);

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
  
  const toggleColumnMenu = (columnId) => {
    if (activeColumnMenu === columnId) {
      setActiveColumnMenu(null);
    } else {
      setActiveColumnMenu(columnId);
    }
  };

  const handleEditColumn = (column) => {
    setColumnToEdit(column);
    setShowEditColumnPopup(true);
    setActiveColumnMenu(null);
  };
  
  const handleDeleteColumn = (columnId) => {
    setColumnToDelete(columnId);
    setShowDeleteColumnPopup(true);
    setActiveColumnMenu(null);
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

  // New function to handle task creation
  const handleAddTask = (columnId) => {
    setActiveColumnId(columnId);
    setShowAddTaskPopup(true);
  };

  // Handle task creation success
  const handleTaskCreated = () => {
    refetchColumns();
    setShowAddTaskPopup(false);
    setActiveColumnId(null);
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
    if (boardId && Array.isArray(boards) && boards.length > 0) {
      const matchedBoard = boards.find((b) => b.boardId === boardId);
      setSelectedBoard(matchedBoard || null);
    }
  }, [boardId, boards]);

  useEffect(() => {
    const handleCloseModal = () => setShowPopup(false);
    document.addEventListener("closeboardmodal", handleCloseModal);
    return () => document.removeEventListener("closeboardmodal", handleCloseModal);
  }, []);

  const handleBoardSelect = async (board) => {
    setSelectedBoard(board);
    navigate(`/home/${board.boardId}`);
  };

  const handleBoardCreated = async (newBoard) => {
    await refetchBoards();
    handleBoardSelect(newBoard);
  };
  
  const handleColumnEditSuccess = (columnData) => {
    if (columnToEdit) {
      editColumn({
        columnId: columnToEdit.columnId,
        columnData: columnData
      });
      refetchColumns();
    }
    setShowEditColumnPopup(false);
    setColumnToEdit(null);
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
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold">{selectedBoard.boardName} - Columns</h2>
          <div className="flex items-center">
            <button
              onClick={() => confirmDeleteBoard(selectedBoard.boardId)}
              className="text-sm px-3 py-1 rounded-md"
            >
              <div className="hover:bg-blue-50 cursor-pointer p-2 rounded-2xl">
                <img src={deleteIcon} alt="img" width={20} className="transition-transform duration-150 hover:scale-110 active:scale-95" />
              </div>
            </button>
            <span>||</span>
            <button
              onClick={() => handleEditBoard(selectedBoard)}
              className="text-sm px-3 py-1 text-yellow-700 rounded-md"
            >
              <div className="hover:bg-blue-50 cursor-pointer p-2 rounded-2xl">
                <img src={edit} alt="img" width={20} className="transition-transform duration-150 hover:scale-110 active:scale-95" />
              </div>
            </button>

          </div>
        </div>
        <div className="flex overflow-x-auto p-4 space-x-4">
          {columns.map((column) => (
            <div key={column.columnId} className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-64 flex-shrink-0 w-60">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-600 mb-3">{column.columnName}</h3>
                </div>
                <div className="column-menu relative">
                  <button 
                    onClick={() => toggleColumnMenu(column.columnId)}
                    className="font-bold hover:bg-blue-100 p-1 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {activeColumnMenu === column.columnId && (
                    <div className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-md border border-gray-200 z-10 py-1">
                      <button 
                        onClick={() => handleEditColumn(column)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteColumn(column.columnId)}
                        className="flex items-center px-4 py-2 text-sm text-red-600 w-full text-left hover:bg-gray-100"
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
                onClick={() => handleAddTask(column.columnId)}
                className="mt-3 w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center">
                <Plus className="w-4 h-4 mr-1" /> Add Task
              </button>
            </div>
          ))}
          <div className="border h-fit p-0.5 flex relative">
            <button
              onClick={() => setShowAddColumnPopup(true)}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <Plus className="w-5 h-5 mr-1" />
              <span className="absolute left-full ml-2 opacity-0 hover:opacity-100 transition-opacity duration-300">Add Column</span>
            </button>
          </div>
        </div>
      </div>
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
        <div className="px-4 py-6">{renderColumns()}</div>
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
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur flex items-center justify-center">
          <ColumnForm
            boardId={selectedBoard?.boardId}
            existingColumns={columns?.filter(col => col.columnId !== columnToEdit.columnId).map((col) => col.columnName) || []}
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
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur flex items-center justify-center">
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

      {/* New Task Form Popup */}
      {showAddTaskPopup && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button 
                onClick={() => setShowAddTaskPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            {/* Pass the activeColumnId to pre-fill the columnId field */}
            <CreateTaskForm 
              onSuccess={() => {
                handleTaskCreated();
              }} 
              initialValues={{ columnId: activeColumnId }}
            />
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center backdrop-blur">
          <CardWithForm setShowPopup={setShowPopup} />
        </div>
      )}
    </SidebarProvider>
  );
};