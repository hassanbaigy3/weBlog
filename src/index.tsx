import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store , persistor  } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

import "./index.css";

import "./fonts/DM_Serif_Display/DMSerifDisplay-Regular.ttf";
import "./fonts/Lexend_Deca/LexendDeca-VariableFont_wght.ttf";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

