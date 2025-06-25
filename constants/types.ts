// types.ts

export interface Task {
  id: number;
  title: string;
  date: string; // format: 'YYYY-MM-DD'
  time?: string; // optional, e.g., '14:30'
  status: 'New' | 'In Progress' | 'Completed';
  priority?: 'Low' | 'Medium' | 'High';
  category?: string;
  notes?: string;
}