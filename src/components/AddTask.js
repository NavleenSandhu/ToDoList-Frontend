import React, { useContext, useState } from 'react'
import taskContext from '../context/TaskContext';

export default function AddTask() {
    const context = useContext(taskContext);
    const { add, getTasks } = context;
    const [taskDescription, setTaskDescription] = useState("")
    const [dueDate, setDueDate] = useState("")

    async function handleClick(e) {
        e.preventDefault()
        let response
        if (taskDescription.trim() === "") {
            response = await add(null, dueDate)
        } else {
            response = await add(taskDescription, dueDate)
        }
        if (!(response.success === undefined || response.success === null)) {
            getTasks();
            setTaskDescription('');
            setDueDate('')
        }
        else if (!(response.failure === undefined || response.failure === null)) {
            document.querySelector('#error-msg').innerHTML = response.failure
            document.querySelector('#alert').style.display = 'block';
            setTimeout(() => {
                document.querySelector('#error-msg').innerHTML = "";
                document.querySelector('#alert').style.display = 'none';
            }, 3000)
        }

        document.querySelectorAll('input').forEach(e => e.value = '')
    }

    function onChange(e) {
        if (e.target.name === 'dueDate') {
            setDueDate(new Date(e.target.value).toLocaleDateString())
        } else {
            setTaskDescription(e.target.value)
        }
    }
    return (
        <div className="container w-50">
            <form>
                <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">Task Description<span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control" name='taskDescription' id="taskDescription" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date<span style={{ color: 'red' }}>*</span></label>
                    <input type="date" className="form-control" name='dueDate' id="dueDate" min={new Date().toLocaleDateString()} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Task</button>
            </form>
        </div>
    )
}
