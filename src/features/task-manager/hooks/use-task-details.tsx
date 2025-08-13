import { useTaskContext } from '../contexts/task-context';
import { TaskDetails } from '../services/task-service';

/**
 * useTaskDetails Hook
 *
 * A custom hook for managing the details of a specific task.
 * This hook supports:
 * - Retrieving task details
 * - Updating task properties
 * - Adding and removing comments, attachments, assignees, and tags
 * - Toggling task completion status
 * - Deleting tasks
 *
 * Features:
 * - Provides utility functions for task management
 * - Integrates with the task context for centralized state management
 * - Supports CRUD operations for task-related entities
 *
 * @param {string} [taskId] - The ID of the task to manage (optional)
 *
 * @returns {Object} An object containing task details and management functions
 *
 * @example
 * // Basic usage
 * const {
 *   task,
 *   updateTaskDetails,
 *   toggleTaskCompletion,
 *   addNewComment,
 *   deleteComment,
 *   addNewAttachment,
 *   deleteAttachment,
 *   addNewAssignee,
 *   deleteAssignee,
 *   addNewTag,
 *   deleteTag,
 *   removeTask,
 * } = useTaskDetails(taskId);
 */

export function useTaskDetails(taskId?: string) {
  const {
    taskDetails,
    updateTask,
    deleteTask,
    updateTaskStatus,
    addComment,
    addAttachment,
    addAssignee,
    addTag,
    removeComment,
    removeAttachment,
    removeAssignee,
    removeTag,
  } = useTaskContext();

  const task = taskId ? taskDetails.find((task) => task.id === taskId) : null;

  const getAllTasks = () => taskDetails;

  const updateTaskDetails = (updates: Partial<TaskDetails>) => {
    if (taskId) {
      updateTask(taskId, updates);
    }
  };

  const removeTask = () => {
    if (taskId) {
      deleteTask(taskId);
    }
  };

  const toggleTaskCompletion = (isCompleted: boolean) => {
    if (taskId) {
      updateTaskStatus(taskId, isCompleted);
    }
  };

  const addNewComment = (author: string, text: string) => {
    if (taskId) {
      addComment(taskId, author, text);
    }
  };

  const deleteComment = (commentId: string) => {
    if (taskId) {
      removeComment(taskId, commentId);
    }
  };

  const addNewAttachment = (name: string, size: string, type: 'pdf' | 'image' | 'other') => {
    if (taskId) {
      addAttachment(taskId, name, size, type);
    }
  };

  const deleteAttachment = (attachmentId: string) => {
    if (taskId) {
      removeAttachment(taskId, attachmentId);
    }
  };

  const addNewAssignee = (name: string, avatar: string) => {
    if (taskId) {
      addAssignee(taskId, name, avatar);
    }
  };

  const deleteAssignee = (assigneeId: string) => {
    if (taskId) {
      removeAssignee(taskId, assigneeId);
    }
  };

  const addNewTag = (label: string) => {
    if (taskId) {
      addTag(taskId, label);
    }
  };

  const deleteTag = (tagId: string) => {
    if (taskId) {
      removeTag(taskId, tagId);
    }
  };

  return {
    task,
    tasks: taskDetails,
    getAllTasks,
    updateTaskDetails,
    removeTask,
    toggleTaskCompletion,
    addNewComment,
    deleteComment,
    addNewAttachment,
    deleteAttachment,
    addNewAssignee,
    deleteAssignee,
    addNewTag,
    deleteTag,
  };
}
