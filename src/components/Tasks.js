import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react'
import Task from './Task';
import taskContext from '../context/TaskContext';
import Alert from './Alert';
// TaskState should have api calls to manipulate data in database
// Tasks, AddPage and each task should have access to tasks and setTasks to change on frontend
// change components to addTaskForm, taskTable, updateModal and task 
/*
    App
        addTaskForm - task state (not related to the bottom tasks)
        taskTable
            task - task state
            task - task state
            task - task state
            updateModal - task state
        taskTable
    App
*/
// updateModal should be a component and should have a task and setTask same as each task should have a state task and setTask
//when you open the modal the modal should have data froom the task state of the task clicked which was given by props
// on opening modal task should be set and on submitting the form tasks should be set
export default function Tasks() {
    const context = useContext(taskContext)
    const modal = useRef()
    const { tasks, getTasks, editTask, setTasks } = context
    const [modalTaskId, setModalTaskId] = useState('');
    const [modalTaskDescription, setModalTaskDescription] = useState('');
    const [modalTaskDueDate, setModalTaskDueDate] = useState('');
    const close = useRef();

    const updateModalTask = (task) => {
        setModalTaskId(task.taskId)
        setModalTaskDescription(task.taskDescription)
        setModalTaskDueDate(new Date(task.dueDate).toLocaleDateString())
    }

    async function handleClick(e) {
        e.preventDefault()
        const response = await editTask(modalTaskId, modalTaskDescription, modalTaskDueDate);
        if (!(response.success === undefined || response.success === null)) {
            let newTasks = JSON.parse(JSON.stringify(tasks));
            for (let index = 0; index < newTasks.length; index++) {
                const element = newTasks[index];
                if (element.TASK_ID === modalTaskId) {
                    newTasks[index].TASK_DESCRIPTION = modalTaskDescription;
                    newTasks[index].DUE_DATE = modalTaskDueDate;
                    console.log(newTasks[index])
                    break;
                }
            }
            setTasks(newTasks);
            close.current.click()
            window.location.reload()
        }
        else if (!(response.failure === undefined || response.failure === null)) {
            document.querySelectorAll('#error-msg')[1].innerHTML = response.failure
            document.querySelectorAll('#alert')[1].style.display = 'block';
            setTimeout(() => {
                document.querySelectorAll('#error-msg')[1].innerHTML = "";
                document.querySelectorAll('#alert')[1].style.display = 'none';
            }, 3000)
        }

    }


    function onChange(e) {
        if (e.target.name === 'dueDate') {
            setModalTaskDueDate(new Date(e.target.value).toLocaleDateString())
        } else {
            setModalTaskDescription(e.target.value)
        }
    }

    useEffect
        (() => { getTasks() }, []);
    return (
        <div>
            <button type="button" ref={modal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit task</h1>
                        </div>
                        <Alert />
                        <form>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="taskDescription" className="form-label">Task Description</label>
                                    <input type="text" className="form-control" name='taskDescription' id="taskDescription" value={modalTaskDescription} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                    <input type="date" className="form-control" name='dueDate' id="dueDate" min={new Date().toLocaleDateString()} value={modalTaskDueDate} onChange={onChange} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button ref={close} type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                <button className="btn btn-primary" onClick={handleClick} >Edit Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Task Description</th>
                        <th scope="col">Due Date</th>
                        <th scope="col" colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => { return (<Task key={task.TASK_ID} task={{ taskId: task.TASK_ID, taskDescription: task.TASK_DESCRIPTION, dueDate: task.DUE_DATE }} modal={modal} updateModalTask={updateModalTask} />) })}
                </tbody>
            </table>
        </div >
    )

}