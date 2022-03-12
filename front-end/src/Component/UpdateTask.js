import React, {useState} from 'react'
import './UpdateTask.css'
import axios from 'axios'
export const UpdateTask = (props) => {
    const [task, setTask] = useState(props.task.todo)
    const updatetoTask = () => {
        if(task.trim() === ""||props.task.todo === task){
            return
        }else{
            axios.put(`http://localhost:8000/api/tasks/${props.task._id}`,{
                _id: props.task._id,
                todo: task,
                isComplete: props.task.isComplete
            }).then(res=> {
                props.removePopup()
                props.updateTask(res.data)
            }).catch(err => console.log(err))
        }
    }
  return (
    <div className='popup'>
        <div className='popup-content'>
            <input type='text' placeholder='update task ...' value={task} onChange={e=>setTask(e.target.value)}/>
            <button onClick={()=> updatetoTask()}>update</button>
        </div>
    </div>
  )
}
