import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalTrigger } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Task 1", description: "Description 1", project: "Inbox", completed: false },
  { id: 2, title: "Task 2", description: "Description 2", project: "Inbox", completed: false },
];

export const Inbox = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    setAddModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <Button onClick={() => setAddModalOpen(true)}>Add Task</Button>
      </header>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center space-x-2">
              <Checkbox checked={task.completed} onCheckedChange={() => handleToggleComplete(task.id)} />
              <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => { setCurrentTask(task); setEditModalOpen(true); }}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleDeleteTask(task.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Task Modal */}
      <Modal open={isAddModalOpen} onOpenChange={setAddModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add Task</ModalTitle>
          </ModalHeader>
          <ModalDescription>
            <TaskForm onSubmit={handleAddTask} />
          </ModalDescription>
          <ModalFooter>
            <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Task Modal */}
      {currentTask && (
        <Modal open={isEditModalOpen} onOpenChange={setEditModalOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Task</ModalTitle>
            </ModalHeader>
            <ModalDescription>
              <TaskForm task={currentTask} onSubmit={handleEditTask} />
            </ModalDescription>
            <ModalFooter>
              <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

const TaskForm = ({ task = {}, onSubmit }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [project, setProject] = useState(task.project || "Inbox");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, title, description, project });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" />
      <Select value={project} onValueChange={setProject}>
        <SelectTrigger>
          <SelectValue placeholder="Select Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Inbox">Inbox</SelectItem>
          {/* Add more projects here */}
        </SelectContent>
      </Select>
      <Button type="submit">Save</Button>
    </form>
  );
};