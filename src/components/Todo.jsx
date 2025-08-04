import { useEffect, useState } from 'react'
import React, {useRef} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems.jsx'

export const Todo = () => {
  const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if(inputText === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false, };

    setTodos((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  }
  const toggle = (id) => {
    setTodos((prev) => {
      return prev.map(todo => {
        if(todo.id === id) {
          return {...todo, isComplete: !todo.isComplete};
        }
        return todo; 
      });
    });
  }
  useEffect(() => {
  const incompleteTodos = todos.filter(todo => !todo.isComplete); 
  localStorage.setItem('todos', JSON.stringify(incompleteTodos)); 
}, [todos]);
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl p-7'>
      
      <div className='flex items-center mt-7 gap-2'>
        <img src={todo_icon} alt="todo_icon" className='w-8' />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      <div className='flex items-center my-7 rounded-full bg-gray-200'>
        <input 
          ref={inputRef} 
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 placeholder:text-slate-600' 
          type="text" 
          placeholder='Add a new task'/>
        <button 
          onClick={add} 
          className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>
          ADD +
        </button>
      </div>

      <div>
        {todos.map((item, index) => (
          <TodoItems 
            key={index} 
            text={item.text} 
            id={item.id} 
            isComplete={item.isComplete} 
            deleteTodo={deleteTodo} 
            toggle={toggle}/>
        ))}
      </div>
    </div>
  );
}
