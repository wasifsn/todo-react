import { FETCH_BUCKETS, NEW_BUCKET } from "./types";

export const fetchBuckets = (buckets) => async (dispatch) => {
  dispatch({ type: FETCH_BUCKETS, payload: buckets });
};

export const newBucket = ({ todo, id }) => async (dispatch) => {
  dispatch({ type: NEW_BUCKET, payload: { todo, id } });
};
