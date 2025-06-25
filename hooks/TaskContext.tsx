import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '@/constants/types'; // adjust path if needed

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: number, updated: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (id: number, updated: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updated } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};