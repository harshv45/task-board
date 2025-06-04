import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import TaskBoard from "./components/TaskBoard";

const App = () => {
  const [user, setUser] = useState(null);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/taskboard" /> : <SignUp />
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/taskboard" /> : <Login />
            }
          />
          <Route
            path="/taskboard"
            element={
              user ? <TaskBoard /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
