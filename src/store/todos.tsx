"use client"
import { ReactNode, createContext, useContext, useState } from "react";

export type Todos = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todos[];
    handleAddTodo: (task: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    handleTodoDelete: (id: string) => void;
}


const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({ children }: { children: ReactNode }) => {

    const [todos, setTodos] = useState<Todos[]>(() => {
        const newTodos = localStorage.getItem("todos") || "[]";
        return JSON.parse(newTodos) as Todos[]
    });
    const handleAddTodo = (task: string) => {
        setTodos((prev: Todos[]) => {
            const newTodos: Todos[] = [
                {
                    id: Math.random().toString(),
                    task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev: Todos[]) => {
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed }

                }
                return task;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }

    const handleTodoDelete = (id: string) => {
        setTodos((prev: Todos[]) => {
            const newTodos = prev.filter((task) => task.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete }}>
            {children}
        </todosContext.Provider>
    )

}

export function useTodos() {
    const todosContextValue = useContext(todosContext)
    if (!todosContextValue) {
        throw new Error('ÚseTodos used outside of Provider')
    }
    return todosContextValue;
}