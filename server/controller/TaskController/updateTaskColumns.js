import Task from '../../models/Tasks.js';

export const updateTaskColumn = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { columnId, boardId } = req.body;
     
      if (!columnId || !boardId) {
        return res.status(400).json({
          success: false,
          message: 'Column ID and Board ID are required'
        });
      }
      
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      task.columnId = columnId;
      task.boardId = boardId;
     
      await task.save();
     
      return res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      console.error('Error updating task column:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error while updating task column',
        error: error.message
      });
    }
  };