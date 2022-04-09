import { createStore, StoreEnhancer } from "redux";
import rootReducer from "./index";

const store = (preloadedState: StoreEnhancer) =>
  createStore(rootReducer, preloadedState);

export default store;
