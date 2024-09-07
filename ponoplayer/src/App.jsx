import React from "react";
import { Routes, Route } from "react-router-dom";

import "./styles.css";

import About from "./components/About";
import Customers from "./components/Customers";
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import NavBar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/gallery" exact element={<Gallery />} />
        <Route path="/customers" exact element={<Customers />} />
        <Route path="/about" exact element={<About />} />
      </Routes>
    </div>
  );
}
