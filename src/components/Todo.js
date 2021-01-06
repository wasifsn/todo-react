import React from "react";

const Todo = ({ el, editTodo, removeTodo }) => {
  const { id, todo } = el;

  return (
    <>
      <li>
        <input type="checkbox" id={id} name={todo} />
        <input
          defaultValue={todo}
          type="text"
          htmlFor={id}
          className="strikethrough"
          onChange={(e) => {
            editTodo(e);
          }}
        ></input>
        <button
          data-id={id}
          className="remove-todo-btn"
          onClick={(e) => {
            removeTodo(e);
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </li>
    </>
  );
};

export default Todo;
