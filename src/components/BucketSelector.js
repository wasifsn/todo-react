import React, { useState } from "react";

import { connect } from "react-redux";
import propTypes from "prop-types";

const BucketSelector = ({ buckets, chooseBucket }) => {
  const [selectedBucket, setSelectedBucket] = useState("");
  const bucketsList = buckets.map((el) => (
    <li key={el.id}>
      <input
        onChange={(e) => {
          setSelectedBucket(el.bucket_item);
          chooseBucket(el.bucket_item);
        }}
        type="radio"
        id={el.id}
        name={el.bucket_item}
        value={el.bucket_item}
        checked={selectedBucket === el.bucket_item}
      />
      <label for={el.id}>{el.bucket_item}</label>
    </li>
  ));
  return (
    <>
      <section className="bucket-selector">
        <h4>Select a Bucket for The Todo:</h4>
        <ul>{bucketsList}</ul>
      </section>
    </>
  );
};

BucketSelector.propTypes = {
  buckets: propTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  buckets: state.buckets.items,
});
export default connect(mapStateToProps, {})(BucketSelector);
