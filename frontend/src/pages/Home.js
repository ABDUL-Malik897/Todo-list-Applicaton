import React, { useEffect } from 'react'
import axios from 'axios'


//* Component
import TodoDetails from '../Components/TodoDetails';
import TodoForm from '../Components/TodoForm';
import { useTodosContext } from '../Hooks/useTodoContext';

const BASE_URL = process.env.REACT_APP_API_URL
// console.log(BASE_URL);

const Home = () => {
    const {todos , dispatch , search ,loading , error } = useTodosContext()
    // const [loading ,setLoading] = useState(false)
    useEffect(() => {
        const fetchTODOs = async () => {
            try {
                dispatch({type : "SET_LOADING"})
                let url = `${BASE_URL}/api/todos`;

                if (search) {
                url = `${BASE_URL}/api/todos/search?q=${search}`;
                }
                const response = await axios.get(url);
                // console.log(response.data)
                dispatch({ type: 'SET_TODO', payload: response.data.data});
                } catch (err) {
                    dispatch({type :"SET_ERROR",
                        payload : "Failed to fetch todos" 
                    })
                // console.log(err);
                } 
        };
        fetchTODOs()
    },[dispatch,search])

    if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    if (error) {
    return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;
    }

    return (
        <div className='home'>
            <div className='todos'>
                {
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