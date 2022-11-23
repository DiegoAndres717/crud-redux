import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import EditarProducto from "./components/EditarProducto";
import Header from "./components/Header";
import NuevosProductos from "./components/NuevosProductos";
import Productos from "./components/Productos";
//REDUX
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/productos/nuevos" element={<NuevosProductos />} />
            <Route path="/productos/editar/:id" element={<EditarProducto />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
