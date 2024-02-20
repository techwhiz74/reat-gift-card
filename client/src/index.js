import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./bootstrap.min.css";
import "./index.css";
import "./auth.css";
import "./admin.css";
import "./modify.css";
import App from "./App";
import configStore from "./store/configStore";

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
