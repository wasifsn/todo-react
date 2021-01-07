import React from "react";
import ReactTooltip from "react-tooltip";

const TodoList = ({ el, editTodo, removeTodo, type, selectedBucket }) => {
  const { id, todo, bucket_item } = el;

  return (
    <>
      <li>
        <input
          hidden={type === "bucket" ? false : true}
          type="checkbox"
          id={id}
          name={todo || bucket_item}
        />
        <input
          data-tip={selectedBucket ? `BUCKET: ${selectedBucket}` : ""}
          defaultValue={todo || bucket_item}
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
      <ReactTooltip effect="solid" />
    </>
  );
};

export default TodoList;
