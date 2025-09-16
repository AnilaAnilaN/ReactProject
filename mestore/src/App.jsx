import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header visible on all pages */}
        <Header />

        {/* Main content controlled by routes */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Welcome to MeStore</h1>
                  <p>This is where products will be displayed.</p>
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            {/* Add more routes here, e.g. Shop, Contact, etc. */}
          </Routes>
        </main>

        {/* Footer visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
