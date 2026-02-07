import { Request, Response } from 'express';

// Mock data for demonstration
let mockTasks = [
  {
    id: 1,
    name: 'Backup Database',
    description: 'Daily backup of production database',
    schedule: '0 2 * * *',
    status: 'active',
    lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 23 * 60 * 60 * 1000),
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 2,
    name: 'Security Scan',
    description: 'Weekly security vulnerability scan',
    schedule: '0 3 * * 0',
    status: 'active',
    lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000)),
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: 3,
    name: 'System Update',
    description: 'Monthly system updates',
    schedule: '0 4 1 * *',
    status: 'inactive',
    lastRun: null,
    nextRun: new Date(),
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-01-25')
  }
];

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { status, type } = req.query;
    
    let filteredTasks = [...mockTasks];
    
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    
    res.json({ tasks: filteredTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// Get scheduled tasks
export const getScheduledTasks = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const scheduledTasks = mockTasks.filter(task => 
      task.status === 'active' && task.nextRun && task.nextRun > now
    );
    
    res.json({ tasks: scheduledTasks });
  } catch (error) {
    console.error('Error fetching scheduled tasks:', error);
    res.status(500).json({ message: 'Server error while fetching scheduled tasks' });
  }
};

// Get task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);
    
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, description, schedule, status } = req.body;

    if (!name || !schedule) {
      return res.status(400).json({ message: 'Name and schedule are required' });
    }

    const newTask = {
      id: mockTasks.length + 1,
      name,
      description: description || '',
      schedule,
      status: status || 'active',
      lastRun: null,
      nextRun: calculateNextRun(schedule),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockTasks.push(newTask);

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);
    const { name, description, schedule, status } = req.body;

    const taskIndex = mockTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task properties
    if (name) mockTasks[taskIndex].name = name;
    if (description) mockTasks[taskIndex].description = description;
    if (schedule) mockTasks[taskIndex].schedule = schedule;
    if (status) mockTasks[taskIndex].status = status;
    
    // If schedule changed, recalculate next run
    if (schedule) {
      mockTasks[taskIndex].nextRun = calculateNextRun(schedule);
    }
    
    mockTasks[taskIndex].updatedAt = new Date();

    res.json({
      message: 'Task updated successfully',
      task: mockTasks[taskIndex]
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);

    const taskIndex = mockTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    mockTasks.splice(taskIndex, 1);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};

// Run a task immediately
export const runTaskNow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);

    const task = mockTasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update last run time
    task.lastRun = new Date();
    task.updatedAt = new Date();

    // Return success response
    res.json({
      message: 'Task executed successfully',
      task
    });
  } catch (error) {
    console.error('Error running task:', error);
    res.status(500).json({ message: 'Server error while running task' });
  }
};

// Helper function to calculate next run based on cron expression
// For simplicity, this is a mock implementation
function calculateNextRun(schedule: string): Date {
  // In a real implementation, we would parse the cron expression
  // and calculate the next execution time
  // For now, we'll just return a date 1 hour from now
  return new Date(Date.now() + 60 * 60 * 1000);
}