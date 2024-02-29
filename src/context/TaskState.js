import { useState } from 'react';
import TaskContext from './TaskContext'

const TaskState = (props) => {
    const [tasks, setTasks] = useState([]);
    async function getTasks() {
        const response = await fetch('http://srv485884.hstgr.cloud:5000/tasks', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setTasks(json);
    }

    async function add(taskDescription, dueDate) {
        const response = await fetch('http://srv485884.hstgr.cloud:5000/tasks', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ taskDescription: taskDescription, dueDate: dueDate })
        })
        const json = await response.json();
        return json
    }

    async function editTask(id, taskDescription, dueDate) {
        const response = await fetch(`http://srv485884.hstgr.cloud:5000/tasks/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ taskDescription: taskDescription, dueDate: dueDate })
        })
        const json = await response.json();
        return json
    }

    async function deleteTask(id) {
        await fetch(`http://srv485884.hstgr.cloud:5000/tasks/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        })
    }



    return (
        <TaskContext.Provider value={{ tasks, setTasks, getTasks, add, editTask, deleteTask }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState