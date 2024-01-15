import { useState } from "react";

import AddTaskModal from "./AddTaskModal";
import Search from "./Search";
import TaskAction from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tags: ["web", "react", "js"],
    priority: "Low",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    console.log(newTask);
    setShowAddModal(false);
  };

  const handleEditTask = (editTask) => {
    setTaskToUpdate(editTask);
    setShowAddModal(true);
  };

  const handleClose = () => {
    setTaskToUpdate(null);
    setShowAddModal(false);
  };

  const handleDelete = (taskId) => {
    const taskAfterDelete = tasks.filter((task) => task.id != taskId);
    setTasks(taskAfterDelete);
  };

  const handleAllDelete = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;

    setTasks(newTask);
  };
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          onUpdate={taskToUpdate}
          onCloseClick={handleClose}
        />
      )}

      <div className="container">
        <Search />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            onAllDelete={handleAllDelete}
          />
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDelete}
            onFav={handleFavorite}
          />
        </div>
      </div>
    </section>
  );
}
