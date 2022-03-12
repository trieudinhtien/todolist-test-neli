import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Addtask from './Component/Addtask'
import Todolist from './Component/Todolist'
import { UpdateTask } from './Component/UpdateTask'
export default function App() {
  const [todolist, setTodolist] = useState([])
  const [taskToUpdate, setTaskToUpdate] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  useEffect(()=> {
    axios.get('http://localhost:8000/api/tasks').then(res => {
      setTodolist(res.data)
    }).catch(err => console.log(err))
  },[])
  
  const addTask = newTask  => {
    setTodolist([...todolist, newTask])
  }

  const TaskComplete = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.isComplete = task.isComplete
      }
    })
    setTodolist(newList)
  }

  const removeTask = task => {
    const newList = todolist.filter(item => !(item._id === task._id))
    setTodolist(newList)
  }
  const updateTask = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.todo = task.todo
      }
    })
    setTodolist(newList)
  }
  return (
    <div>
      <Addtask addTask={addTask}/>
      <Todolist 
        todolist={todolist} 
        TaskComplete={TaskComplete} 
        removeTask={removeTask} 
        taskToUpdate={task => setTaskToUpdate(task)} 
        showPopup={()=>setShowPopup(!showPopup)}
      />
      {showPopup && <UpdateTask 
        task={taskToUpdate} 
        updateTask={updateTask}
        removePopup = {()=> setShowPopup(!showPopup)}
      />}
    </div>
  )
}
