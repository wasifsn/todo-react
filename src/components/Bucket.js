import React, { useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { fetchBuckets, newBucket } from "../actions/BucketActions";
import propTypes from "prop-types";

const Bucket = (props) => {
  console.log(props);
  const { buckets, ...other } = props;
  const [todo, setTodo] = useState("");
  const editTodo = (e) => {
    const todo = buckets.find((el) => el.id === e.target.getAttribute("for"));
    const newTodos = buckets.map((el) => {
      if (el.id === todo.id) return { todo: e.target.value, id: todo.id };
      else return el;
    });
    props.fetchBuckets(newTodos);
  };

  const removeTodo = (e) => {
    const todo = buckets.find(
      (el) =>
        el.id === e.target.closest(".remove-todo-btn").getAttribute("data-id")
    );
    const newTodos = buckets.filter((el) => el.id !== todo.id);

    props.fetchBuckets(newTodos);
  };

  return (
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
              props.newBucket({ todo, id: uuidv4() });
              const bucketAvailable = () => {
                let bucket = window.prompt(
                  "bucket is already available, please add another Bucket"
                );
                props.fetchBuckets([
                  ...buckets,
                  { todo: bucket, id: uuidv4() },
                ]);
                setTodo("");
              };
              const found = buckets.find((el) => {
                console.log(el.todo === todo);
                return el.todo === todo;
              });
              buckets.length === 0
                ? props.fetchBuckets([...buckets, { todo, id: uuidv4() }])
                : found
                ? bucketAvailable()
                : props.fetchBuckets([...buckets, { todo, id: uuidv4() }]);
              setTodo("");
            }
          }}
        >
          ADD Bucket
        </button>
      </div>
      <div className="todos flex">
        <ul>
          {buckets.map((el) => (
            <TodoList
              key={el.id}
              el={el}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

Bucket.propTypes = {
  fetchBuckets: propTypes.func.isRequired,
  newBucket: propTypes.func.isRequired,
  buckets: propTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  buckets: state.buckets.items,
});

export default connect(mapStateToProps, { fetchBuckets, newBucket })(Bucket);
