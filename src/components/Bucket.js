import React, { useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { fetchBuckets, newBucket } from "../actions/BucketActions";
import propTypes from "prop-types";

const Bucket = (props) => {
  const { buckets, ...other } = props;
  const [bucket_item, setTodo] = useState("");
  const editTodo = (e) => {
    const bucket_item = buckets.find(
      (el) => el.id === e.target.getAttribute("for")
    );
    const newTodos = buckets.map((el) => {
      if (el.id === bucket_item.id)
        return { bucket_item: e.target.value, id: bucket_item.id };
      else return el;
    });
    props.fetchBuckets(newTodos);
  };

  const removeTodo = (e) => {
    const bucket_item = buckets.find(
      (el) =>
        el.id === e.target.closest(".remove-todo-btn").getAttribute("data-id")
    );
    const newTodos = buckets.filter((el) => el.id !== bucket_item.id);
    props.fetchBuckets(newTodos);
  };

  return (
    <section className="container flex-col">
      <div className="input-text">
        <input
          value={bucket_item}
          type="text"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className="add-todo-btn"
          onClick={(e) => {
            if (bucket_item) {
              props.newBucket({ bucket_item, id: uuidv4() });
              const bucketAvailable = () => {
                let bucket_item = window.prompt(
                  "bucket_item is already available, please add another Bucket"
                );
                props.fetchBuckets([
                  ...buckets,
                  { bucket_item: bucket_item, id: uuidv4() },
                ]);
                setTodo("");
              };
              const found = buckets.find((el) => {
                return el.bucket_item === bucket_item;
              });
              buckets.length === 0
                ? props.fetchBuckets([
                    ...buckets,
                    { bucket_item, id: uuidv4() },
                  ])
                : found
                ? bucketAvailable()
                : props.fetchBuckets([
                    ...buckets,
                    { bucket_item, id: uuidv4() },
                  ]);
              setTodo("");
            } else {
              alert("please add a Name for the Bucket");
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
              type={"bucket_item"}
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
