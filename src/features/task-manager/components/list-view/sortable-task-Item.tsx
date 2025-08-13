import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MessageSquare, Paperclip } from 'lucide-react';
import { ITask, TPriority } from '../../types/task';
import { StatusCircle } from '../status-circle/status-circle';
import { AssigneeAvatars } from './assignee-avatars';
import { useCardTasks } from '../../hooks/use-card-tasks';
import { useTaskDetails } from '../../hooks/use-task-details';
import { TaskManagerDropdownMenu } from '../task-manager-ui/task-manager-dropdown-menu';
import { TaskManagerBadge } from '../task-manager-ui/task-manager-badge';

/**
 * SortableTaskItem Component
 *
 * A reusable component for rendering a sortable task item in a list view.
 * This component supports:
 * - Drag-and-drop functionality for reordering tasks
 * - Displaying task details such as title, status, priority, due date, assignees, and tags
 * - Interactive actions like toggling completion, deleting, and moving tasks
 *
 * Features:
 * - Integrates with the `@dnd-kit` library for drag-and-drop functionality
 * - Displays task metadata in a structured layout
 * - Provides a dropdown menu for task actions
 *
 * Props:
 * @param {ITask} task - The task object to display
 * @param {(id: string) => void} handleTaskClick - Callback triggered when the task title is clicked
 *
 * @returns {JSX.Element} The sortable task item component
 *
 * @example
 * // Basic usage
 * <SortableTaskItem task={task} handleTaskClick={(id) => console.log('Task clicked:', id)} />
 */

interface SortableTaskItemProps {
  readonly task: ITask;
  readonly handleTaskClick: (id: string) => void;
}

export function SortableTaskItem({ task, handleTaskClick }: SortableTaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `task-${task.id}`,
    data: {
      task,
    },
  });
  const { columns } = useCardTasks();
  const { removeTask, toggleTaskCompletion, updateTaskDetails } = useTaskDetails(task.id);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center min-w-max border-b border-gray-200 hover:bg-surface h-14 ${
        isDragging ? 'bg-blue-50' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="w-12 flex items-center justify-center cursor-grab"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <div className="w-6 flex-shrink-0 flex items-center justify-center">
        <StatusCircle isCompleted={task.isCompleted} />
      </div>

      <div className="w-64 pl-2 mr-4">
        <button
          onClick={() => handleTaskClick(task.id)}
          className="text-sm text-high-emphasis cursor-pointer hover:underline truncate"
        >
          {task.content}
        </button>
      </div>

      <div className="w-24 flex-shrink-0">
        <span className="text-sm text-high-emphasis">{task.status}</span>
      </div>

      {task.priority && (
        <div className="w-24 flex-shrink-0 flex items-center">
          <TaskManagerBadge className="px-2 py-0.5" priority={task.priority as TPriority}>
            {task.priority}
          </TaskManagerBadge>
        </div>
      )}

      <div className="w-28 flex-shrink-0">
        {task.dueDate && (
          <span className="text-sm text-high-emphasis">
            {new Date(task.dueDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        )}
      </div>

      <div className="w-32 flex-shrink-0">
        <AssigneeAvatars assignees={task.assignees} />
      </div>

      <div className="w-32 flex-shrink-0">
        {task.tags && task.tags.length > 0 && (
          <TaskManagerBadge className="px-2 py-0.5">{[task.tags[0]]}</TaskManagerBadge>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto pr-4 text-high-emphasis text-xs">
        {task.comments !== undefined && task.comments > 0 && (
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{task.comments}</span>
          </div>
        )}

        {task.attachments !== undefined && task.attachments > 0 && (
          <div className="flex items-center">
            <Paperclip className="h-4 w-4 mr-1" />
            <span className="text-xs">{task.attachments}</span>
          </div>
        )}

        <button className="p-4 text-medium-emphasis hover:text-high-emphasis">
          <TaskManagerDropdownMenu
            task={task}
            columns={columns}
            onToggleComplete={() => toggleTaskCompletion(!task.isCompleted)}
            onDelete={removeTask}
            onMoveToColumn={(title) => updateTaskDetails({ section: title })}
          />
        </button>
      </div>
    </div>
  );
}
