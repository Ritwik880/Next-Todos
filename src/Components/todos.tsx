"use client"

import React from 'react'
import { useState } from 'react';
import { useTodos } from '@/store/todos'
import { useSearchParams } from 'next/navigation';
import { ColorRing } from 'react-loader-spinner';

const Todos = () => {
    const [loading, setLoading] = useState(false);
    const { todos, toggleTodoAsCompleted, handleTodoDelete } = useTodos();
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos');
    let filterTodos = todos;

    if (todosFilter === "active") {
        filterTodos = filterTodos.filter((todo) => !todo.completed);
        setLoading(false);
    }
    else if (todosFilter === "completed") {
        filterTodos = filterTodos.filter((todo) => todo.completed);
        setLoading(false);
    }
    return (
        <ul className="main-task">
            {

                filterTodos.map((todo) => {
                    return <li key={todo.id}>

                        <input type="checkbox" name="" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)} />
                        <label htmlFor={`todo-${todo.id}`}>
                            {
                                todo.task
                            }
                        </label>
                        {
                            todo.completed && (
                                <button type='button' onClick={() => handleTodoDelete(todo.id)}>Delete</button>
                            )
                        }

                    </li>
                })


            }

        </ul>
    )
}

export default Todos