import { combineReducers } from "redux";
import testimonyReducer from "./testimonyReducer";

const reducers = combineReducers({
  testimony: testimonyReducer,
});

export default reducers;
