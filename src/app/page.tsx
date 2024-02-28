'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  timestamp: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      document.title = "Home - AppTodo"
      const storedTodos = localStorage.getItem("todos")
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos) as Todo[]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const addTodo = (e: any) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      description: description,
      completed: false,
      timestamp: formatTimestamp(new Date().toISOString())
    }

    todos.push(newTodo)

    localStorage.setItem("todos", JSON.stringify(todos));

    setTitle("");
    setDescription("");
  }

  const checkTodo = (id: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[todoIndex].completed = !updatedTodos[todoIndex].completed;

      setTodos(updatedTodos);

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      console.error("Todo with ID", id, "not found");
    }
  };

  const deleteAllTodos = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: 'Want to delete all todos?',
      icon: "warning",
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.setItem("todos", "");
        setTodos([])
      }
    })
  }

  const deleteTodo = (id: string) => {
    Swal.fire({
      title: 'Want to delete this todo?',
      icon: "warning",
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex !== -1) {
          const updatedTodos = [...todos];

          updatedTodos.splice(todoIndex, 1);

          setTodos(updatedTodos);
          localStorage.setItem("todos", JSON.stringify(updatedTodos));
        } else {
          console.error("Todo with ID", id, "not found");
        }
      }
    })
  };

  const formKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo(e);
    }
  }

  return (
    <>
      <div className="justify-end mb-4 hidden md:flex">
        <button onClick={deleteAllTodos} className="bg-red-500 p-2 rounded text-white transition-colors hover:bg-red-600">Delete All</button>
      </div>
      <div className="grid grid-cols-[20%_80%] space-x-4 max-md:grid-cols-1 max-md:space-x-0 max-md:space-y-8">
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
            <button type="submit" className="bg-green-500 text-white py-2 rounded transition-colors hover:bg-green-600 focus:outline-blue-500">
              Add Todo
            </button>
          </form>
        </div>
        <div className="flex flex-col">
          <div className="justify-end mb-4 hidden max-md:flex">
            <button onClick={deleteAllTodos} className="bg-red-500 p-2 rounded text-white transition-colors hover:bg-red-600">Delete All</button>
          </div>
          <div className="flex flex-col gap-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className="border border-stone-200 p-2 rounded flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-500">{todo.timestamp}</span>
                    <h3 className="text-xl font-semibold line-clamp-1">{todo.title}</h3>
                    <p className="line-clamp-4">{todo.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {todo.completed ? (
                      <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 p-2 rounded transition-colors hover:bg-red-600 text-white">Delete</button>
                    ) : null}
                    <button onClick={() => checkTodo(todo.id)} className={todo.completed ? "bg-green-500 p-2 rounded transition-colors hover:bg-green-600 text-white" : "bg-gray-500 p-2 rounded transition-colors hover:bg-gray-600 text-white"}>
                      {todo.completed ? "Checked" : "Check"}
                    </button>
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
