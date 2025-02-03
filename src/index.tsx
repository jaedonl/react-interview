import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./features/App/App"
import reducer from "./redux/reducer";
import "./index.scss";

const store = createStore(reducer, applyMiddleware(thunk));

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<AppContainer />, document.getElementById("root"));

export default AppContainer;
