import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase"; // 🔥 Adjust to relative path!
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";




const TaskBoard = () => {

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const statuses = ["todo", "inProgress", "done"];
  const navigate = useNavigate();
  const handleLogout = async () => {
  await signOut(auth);
  navigate("/");
};


  // Fetch tasks
  const fetchTasks = async () => {
    const q = query(collection(db, "tasks"), orderBy("order"));
    const snapshot = await getDocs(q);
    const tasksData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      title: newTaskTitle.trim(),
      status: "todo",
      order: tasks.length,
    };
    const docRef = await addDoc(collection(db, "tasks"), newTask);
    setTasks([...tasks, { id: docRef.id, ...newTask }]);
    setNewTaskTitle("");
  };

  // Update task
  const updateTask = async (taskId, updates) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updates);
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  // Delete task
  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Move task between statuses
  const moveTask = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
        <button
  onClick={handleLogout}
  className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
>
  Logout
</button>
      {/* Input field to add a new task */}
      <div className="flex gap-2">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title..."
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Task columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className="bg-gray-100 rounded p-2">
            <h2 className="text-lg font-bold capitalize mb-2">
              {status === "inProgress" ? "In Progress" : status}
            </h2>
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white shadow rounded p-2 flex flex-col gap-2"
                  >
                    <div className="font-semibold">{task.title}</div>
                    <div className="flex gap-1">
                      {status !== "todo" && (
                        <button
                          onClick={() =>
                            moveTask(
                              task.id,
                              status === "inProgress" ? "todo" : "inProgress"
                            )
                          }
                          className="text-xs bg-gray-200 rounded px-2 py-1"
                        >
                          ←
                        </button>
                      )}
                      {status !== "done" && (
                        <button
                          onClick={() =>
                            moveTask(
                              task.id,
                              status === "todo" ? "inProgress" : "done"
                            )
                          }
                          className="text-xs bg-gray-200 rounded px-2 py-1"
                        >
                          →
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-xs bg-red-200 text-red-600 rounded px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
