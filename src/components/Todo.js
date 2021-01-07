import React, { useState } from "react";
import TodoList from "./TodoList";
import BucketSelector from "./BucketSelector";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import propTypes from "prop-types";

const Todo = (props) => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [selectBucket, setSelectBucket] = useState("");
  const { buckets } = props;
  const editTodo = (e) => {
    const todo = todoList.find((el) => el.id === e.target.getAttribute("for"));
    const newTodos = todoList.map((el) => {
      if (el.id === todo.id)
        return { todo: e.target.value, id: todo.id, bucket: selectBucket };
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
  const chooseBucket = (bucket_item) => {
    setSelectBucket(bucket_item);
  };
  return (
    <>
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
              if (todo && buckets.length > 0 && selectBucket) {
                setTodoList([
                  ...todoList,
                  { todo, id: uuidv4(), bucket: selectBucket },
                ]);
                setTodo("");
              } else if (!todo) {
                alert("please add some Text to create A TODO");
              } else if (!selectBucket) {
                alert("please select a bucket first before creating a todo");
              }
            }}
          >
            ADD Todo
          </button>
        </div>
        <div className="todos flex">
          <ul>
            {todoList.map((el) => (
              <TodoList
                selectedBucket={el.bucket}
                key={el.id}
                el={el}
                editTodo={editTodo}
                removeTodo={removeTodo}
              />
            ))}
          </ul>
        </div>
      </section>
      <BucketSelector chooseBucket={chooseBucket}></BucketSelector>
    </>
  );
};

Todo.propTypes = {
  buckets: propTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  buckets: state.buckets.items,
});
export default connect(mapStateToProps, {})(Todo);
