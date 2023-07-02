import Navbar from '@/Components/Navbar'
import AddTodo from '@/Components/add-todos'
import Todos from '@/Components/todos'
import React from 'react'
import "./globals.css";
import { RiTodoLine } from "react-icons/ri";
const page = () => {
  return (
    <main>
      <h2><RiTodoLine className="icons" /> TODO NEXT + TYPESCRIPT <RiTodoLine className="icons" /> </h2>
      <Navbar />
      <AddTodo />
      <Todos />
    </main>
  )
}

export default page