import BoardColumn from "../../models/Columns.js";

export const getBoardColumn = async (req, res) => { 
    try {
        const columnId = req.params.column_id;
        const column = await BoardColumn.findByPk(columnId);

        if (!column) {
            return res.status(404).json({ error: 'Column not found' });
        }

        res.json(column);
    } catch (error) {
        console.error("Error fetching column data:", error);
        res.status(500).json({ message: "Internal server error" });


        {
           { column: columnid,
            columnName: columnName,
            tasks:[
                {
                    taskId: task.id,
                    taskName: task.task_name,
                    taskDescription: task.task_description,
                    taskStatus: task.status,
                    taskPriority: task.priority,
                },
                {
                    taskId: task.id,
                    taskName: task.task_name,
                    taskDescription: task.task_description,
                    taskStatus: task.status,
                    taskPriority: task.priority,
                },
            ]},
            {
                columnId: column.id,
                columnName: column.column_name,
                tasks:[
                    {
                        taskId: task.id,
                        taskName: task.task_name,
                        taskDescription: task.task_description,
                        taskStatus: task.status,
                        taskPriority: task.priority,
                        
                    },
                ],
            }
        }
    }
 }