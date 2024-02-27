'use client'

import Image from "next/image";
import { todo } from "node:test";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos")
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos) as Todo[]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [todos])

  const addTodo = (e: any) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      description: description,
      completed: false
    }

    todos.push(newTodo)

    localStorage.setItem("todos", JSON.stringify(todos));

    setTitle("");
    setDescription("");
  }

  const deleteAllTodos = (e: any) => {
    e.preventDefault();

    localStorage.setItem("todos", "");
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button onClick={deleteAllTodos} className="bg-red-500 p-2 rounded text-white transition-colors hover:bg-red-600">Delete All</button>
      </div>
      <div className="grid grid-cols-[20%_80%] space-x-4">
        <div>
          <form onSubmit={addTodo} className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="font-semibold">Title</label>
              <input
                type="text"
                placeholder="Enter title..."
                name="title"
                className="border border-stone-200 rounded p-2 focus:outline-2 focus:outline-blue-500"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-semibold">Description</label>
              <textarea
                placeholder="Enter description..."
                name="description"
                rows={5}
                className="border border-stone-200 rounded p-2 focus:outline-2 focus:outline-blue-500"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 rounded transition-colors hover:bg-green-600">
              Add Todo
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className="bg-stone-200 p-2 rounded">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold line-clamp-1">{todo.title}</h3>
                    <p className="line-clamp-3">{todo.description}</p>
                  </div>
                </div>
              ))) : (
              <p className="text-center mt-4">No todos yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
