import React, { useState } from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

const Container = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const editTodo = (e) => {
    const todo = todoList.find((el) => el.id === e.target.getAttribute("for"));
    const newTodos = todoList.map((el) => {
      if (el.id === todo.id) return { todo: e.target.value, id: todo.id };
      else return el;
    });
    setTodoList(newTodos);
  };

  const removeTodo = (e) => {
    const todo = todoList.find(
      (el) =>
        el.id === e.target.closest(".remove-todo-btn").getAttribute("data-id")
    );
    const newTodos = todoList.filter((el) => el.id !== todo.id);
    setTodoList(newTodos);
  };

  return (
    <div className="outer-container flex">
      <section className="container flex-col">
        <div className="input-text">
          <input
            value={todo}
            type="text"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button
            className="add-todo-btn"
            onClick={(e) => {
              if (todo) {
                setTodoList([...todoList, { todo, id: uuidv4() }]);
                setTodo("");
              }
            }}
          >
            ADD
          </button>
        </div>
        <div className="todos flex">
          <ul>
            {todoList.map((el) => (
              <Todo
                key={el.id}
                el={el}
                editTodo={editTodo}
                removeTodo={removeTodo}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Container;
