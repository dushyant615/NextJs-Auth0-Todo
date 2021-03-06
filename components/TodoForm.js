import React, {useState, useContext} from 'react'
import { TodosContext } from '../contexts/TodosContext';

export default function TodoForm() {
    const [todo, setTodo] = useState('');
    const { addTodo } = useContext(TodosContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todo);
        setTodo('')
    }
    return (
        <form className="form my-6" onSubmit={handleSubmit}>
            <div className="flex flex-col text-sm mb-2">
                <label className="font-bold mb-2 text-gray-800" htmlFor="todo">Add a Checklist Item</label>
                <input 
                    type="text" 
                    name="todo" 
                    id="todo" 
                    value={todo}
                    onChange={(e)=> setTodo(e.target.value)}
                    placeholder="Add a new item"
                    className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
                />
            </div>
            <button 
                type="submit"
                disabled={!todo.trim()} 
                className={`w-full rounded text-white py-2 px-4 focus:outline-none ${!todo.trim() ? 'bg-gray-500 hover: cursor-not-allowed':'bg-blue-500 hover:bg-blue-600'}`}>Submit</button>
        </form>
    )
}
