import React, { useContext, useState } from 'react'
import taskContext from '../context/TaskContext';

export default function Task(props) {
    const context = useContext(taskContext);
    const { tasks, setTasks, deleteTask } = context;
    const { updateModalTask, modal } = props;
    const [task] = useState(props.task);
    const deleteCurrentTask = () => {
        deleteTask(task.taskId);
        const newTasks = tasks.filter((t) => t.TASK_ID !== task.taskId);
        setTasks(newTasks)
    }
    const openModal = () => {
        updateModalTask(task)
        modal.current.click();
    }
    return (
        <>
            <tr>
                <td>{task.taskDescription}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td><button className='btn btn-primary mx3' onClick={openModal}>Edit</button></td>
                <td><button className='btn btn-primary mx3' onClick={deleteCurrentTask}>Delete</button></td>
            </tr>
        </>
    )
}
