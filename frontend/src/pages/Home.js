import React, { useEffect, useState } from 'react'
import axios from 'axios'


//* Component
import TodoDetails from '../Components/TodoDetails';
import TodoForm from '../Components/TodoForm';
import { useTodosContext } from '../Hooks/useTodoContext';

const BASE_URL = process.env.REACT_APP_API_URL
console.log(BASE_URL);

const Home = () => {
    // const [query ,setQuery] = useState("")
    const {todos , dispatch , search  } = useTodosContext()
    const [loading ,setLoading] = useState(false)
    useEffect(() => {
        const fetchTODOs = async () => {
            try {
                setLoading(true)
                let url = `${BASE_URL}/api/todos`;

                if (search) {
                url = `${BASE_URL}/api/todos/search?q=${search}`;
                }
                const response = await axios.get(url);
                console.log(response.data)
                dispatch({ type: 'SET_TODO', payload: response.data.data});
                } catch (err) {
                console.log(err);
                } finally{setLoading(false)}
        };
        fetchTODOs()
    },[dispatch,search])

    return (
        <div className='home'>
            <div className='todos'>
                {loading ? (
                    <div className='loading'><div></div></div>   
                ) :
                todos && todos.length === 0 ? (
                    <p className="error">No todo found</p>
                    ) : (
                    Array.isArray(todos) && todos.map((todo) => (
                    <TodoDetails key={todo?._id} todo={todo} />
                    ))
                )}
                
            </div>
            <TodoForm/>
        </div>
    )
}

export default Home