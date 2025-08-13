import { TPriority } from '../../types/task';
import { Badge } from 'components/ui/badge';
import { cn } from 'lib/utils';

/**
 * TaskManagerBadge Component
 *
 * A reusable badge component for displaying task priority levels.
 * This component supports:
 * - Customizable styles based on priority levels (e.g., High, Medium, Low)
 * - Optional border styling
 * - Clickable functionality for interactive use cases
 *
 * Features:
 * - Dynamically adjusts background, text, and border colors based on priority
 * - Supports additional custom styles via the `className` prop
 * - Allows optional click handling with the `onClick` prop
 *
 * Props:
 * @param {TPriority} [priority='normal'] - The priority level of the task (e.g., 'High', 'Medium', 'Low')
 * @param {boolean} [withBorder=false] - Whether the badge should have a border
 * @param {React.ReactNode} [children] - The content to display inside the badge
 * @param {() => void} [onClick] - Callback triggered when the badge is clicked
 * @param {string} [className] - Additional CSS classes for styling
 * @param {boolean} [asButton=false] - Whether the badge should be rendered as a button
 *
 * @returns {JSX.Element} The task manager badge component
 *
 * @example
 * // Basic usage
 * <TaskManagerBadge priority="High">High Priority</TaskManagerBadge>
 *
 * // With border and click handling
 * <TaskManagerBadge priority="Medium" withBorder onClick={() => console.log('Badge clicked')}>
 *   Medium Priority
 * </TaskManagerBadge>
 */

interface TaskManagerBadgeProps {
  priority?: TPriority;
  withBorder?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  asButton?: boolean;
}

export const TaskManagerBadge: React.FC<TaskManagerBadgeProps> = ({
  priority = 'normal',
  withBorder = false,
  className,
  children,
  onClick,
  asButton = false,
}) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'High':
        return 'bg-error-background text-error border-error';
      case 'Medium':
        return 'bg-warning-background text-[#A66200] border-[#A66200]';
      case 'Low':
        return 'bg-secondary-50 text-secondary border-secondary';
      default:
        return 'bg-surface text-high-emphasis border-low-emphasis';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
  };

  const badgeClasses = cn(
    'text-xs font-normal rounded outline-none focus:border-transparent border-none',
    getPriorityStyles(),
    withBorder && 'border',
    className
  );

  if (asButton) {
    return (
      <Badge variant="outline" className={badgeClasses} onClick={handleClick}>
        {children}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={badgeClasses} onClick={handleClick}>
      {children}
    </Badge>
  );
};
