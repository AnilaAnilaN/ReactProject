import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";

import { UserProvider } from "./context/UserProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";

import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </>
);
