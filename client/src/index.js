import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import MessageProvider from "./context/messages/MessageProvider";
import AuthProvider from "./context/Auth/AuthProvider";
import CheckOutProvider from "./context/CheckOut/CheckOutProvider";

ReactDOM.render(
  <React.StrictMode>
    <MessageProvider>
      <AuthProvider>
        <CheckOutProvider>
          <App />
        </CheckOutProvider>
      </AuthProvider>
    </MessageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
