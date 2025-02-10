import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import Contact from "./views/Contact";
import AddContact from "./views/AddContact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/add/:id" element={<AddContact />} /> {/* Edit existing contact */}
      </Routes>
    </Router>
  );
};

export default injectContext(App);
