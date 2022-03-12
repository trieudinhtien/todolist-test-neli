import './Addtask.css'

import React,{useState} from 'react'
import axios from 'axios';

export default function Addtask(props) {
    const [task, setTask] = useState("")
    const addTask = () => {
        if(task.trim() === ""){
            return
        }else{
            axios.post('http://localhost:8000/api/tasks', {
                todo: task,
                isComplete: false
            }).then(res => {
                setTask('')
                props.addTask(res.data)
            }).catch(err => console.log(err))
        }
    }
  return (
    <div className='addtask'>
        <input 
            type='text' 
            placeholder='Enter name task ...' 
            value={task} 
            onChange={(e) => setTask(e.target.value)}
        />
        <button 
            className='btn-add' 
            onClick={()=> addTask()}
        >Add Task</button>
    </div>
  )
}
