import React from 'react'
import './Todolist.css'
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'
export default function Todolist(props) {
    const todoList = props.todolist.map((task, index)=>{
        const taskcomplete = task => {
            axios.put(`http://localhost:8000/api/tasks/${task._id}`, {
                _id: task._id,
                todo: task.todo,
                isComplete: !task.isComplete
            })
            .then(res => props.TaskComplete(res.data))
            .catch(err => console.log(err))
        }

        const removeTask = (id) => {
            axios.delete(`http://localhost:8000/api/tasks/${id}`)
            .then(res => props.removeTask(res.data))
            .catch(err => console.log(err))
        }
        return <li key={index}>
            <div style={{display: 'flex'}}>
                <CheckIcon className = {task.isComplete ? "isComplete" : "checkicon"} />
                <p className={task.isComplete? 'taskcomplete': ""} 
                onClick={()=>{
                    taskcomplete(task)
                }}>{task.todo}</p>
            </div>
            <div>
                <EditIcon className='edit' onClick={()=> {
                    props.taskToUpdate(task)
                    props.showPopup()
                }}/>
                <CloseIcon className='close' onClick={()=> removeTask(task._id)} />
            </div>
        </li>
    });
  return (
    <div className='tasklist'>
        <ul>
            {todoList}
        </ul>
    </div>
  )
}
