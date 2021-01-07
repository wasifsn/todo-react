import { FETCH_BUCKETS, NEW_BUCKET } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BUCKETS:
      return { ...state, items: action.payload };
    case NEW_BUCKET:
      return { ...state, item: action.payload };
    default:
      return state;
  }
}
