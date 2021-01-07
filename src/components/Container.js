import React, { useState } from "react";
import Todo from "./Todo";
import Bucket from "./Bucket";

const Container = () => {
  return (
    <div className="outer-container flex">
      <Todo></Todo>
      <Bucket></Bucket>
    </div>
  );
};

export default Container;
