
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosConfig } from "../../config/axiosConfig";

export const BoardView=()=> {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        setLoading(true);

        const boardResponse = await axiosConfig.get(`/board/${boardId}`);
        setBoard(boardResponse.data);
        

        const columnsResponse = await axiosConfig.get(`/board/${boardId}/columns`);
        setColumns(columnsResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching board details:", err);
        setError("Failed to load board details");
        setLoading(false);
      }
    };

    if (boardId) {
      fetchBoardDetails();
    }
  }, [boardId]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading board...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!board) return <div className="text-center mt-10">Board not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{board.boardName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div 
            key={column.columnId} 
            className="bg-gray-100 rounded-lg p-4 min-h-[300px]"
          >
            <h2 className="font-semibold text-lg mb-3">{column.columnName}</h2>
            <div className="space-y-2">
   
              <div className="bg-white p-3 rounded shadow text-sm">
                No tasks yet. Add your first task!
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}