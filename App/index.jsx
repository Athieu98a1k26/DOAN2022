import "./start";
import 'antd/dist/antd.css';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { persistStore } from "redux-persist";
// import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import apiCall from "./lib/ajax";
// import thunk from "redux-thunk";
import reducers from "./reducers";
// import { OptionProvider } from "./context";
import store from "./store";

persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/**
    <OptionProvider>
      <App />
    </OptionProvider>
     */}
  </Provider>,
  document.getElementById("root")
);
