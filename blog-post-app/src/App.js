import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AddPost from "./components/AddPost";
import BlogList from "./components/BlogList";
import EditPost from "./components/EditPost";
import ViewPost from "./components/ViewPost";
import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <Router>
      <FormProvider>
        <div className="App">
          <h1>Blog Post App</h1>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/view/:id" element={<ViewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </FormProvider>
    </Router>
  );
}

export default App;
