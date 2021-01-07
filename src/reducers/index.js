import { combineReducers } from "redux";
import BucketReducer from "./BucketReducer";

export default combineReducers({ buckets: BucketReducer });
