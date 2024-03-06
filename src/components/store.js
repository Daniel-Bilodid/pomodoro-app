// store.js
import { createStore } from "redux";
import rootReducer from "../components/reducer";

const store = createStore(rootReducer);

export default store;
