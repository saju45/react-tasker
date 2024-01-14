import { useState } from "react";

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

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <Search />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction />
          <TaskList tasks={tasks} />
        </div>
      </div>
    </section>
  );
}
