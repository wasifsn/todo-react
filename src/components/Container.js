import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Container = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  return (
    <div className="outer-container flex">
      <section className="container flex-col">
        <div className="input-text">
          <input
            type="text"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button
            className="add-todo-btn"
            onClick={(e) => {
              setTodoList([...todoList, { todo, id: uuidv4() }]);
            }}
          >
            ADD
          </button>
        </div>
        <div className="todos flex">
          <ul>
            {todoList.map((el, ind) => (
              <li key={el.id}>
                <input type="checkbox" id={ind} name={el.todo} value="1" />
                <label htmlFor={el.todo} className="strikethrough">
                  {el.todo}
                </label>
                <button
                  data-id={el.id}
                  className="remove-todo-btn"
                  onClick={(e) => {
                    const todo = todoList.find(
                      (el) =>
                        el.id ===
                        e.target
                          .closest(".remove-todo-btn")
                          .getAttribute("data-id")
                    );
                    const newTodos = todoList.filter((el) => el.id !== todo.id);
                    setTodoList(newTodos);
                  }}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Container;
