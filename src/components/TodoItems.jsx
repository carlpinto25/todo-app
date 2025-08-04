
import React from 'react'
import tick from '../assets/tick.png'
import delete_icon from '../assets/delete.png'
import not_tick from '../assets/not_tick.png'

const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>

     <div onClick={()=>{toggle(id)}} className='flex flex-1 item-center cursor-pointer'> 
        <img src={isComplete ? tick : not_tick} alt="tick" className='w-6 h-6' />
        <p className={`text-slate-700 ml-4 text-[17px] ${isComplete ? "line-through" : ""}`}>{text}</p>
    </div>
     <img onClick={()=>{deleteTodo(id)}} src={delete_icon} className='w-5 cursor-pointer' />
    </div>
  )
}

export default TodoItems
