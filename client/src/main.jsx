import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";
import { SocketContextProvider } from "./components/context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
