/**
 * AssigneeAvatars Component
 *
 * A reusable component for displaying a list of assignee avatars.
 * This component supports:
 * - Displaying up to three avatars
 * - Showing a "+X" badge for additional assignees
 *
 * Features:
 * - Displays up to three avatars with initials
 * - Shows a count of additional assignees if there are more than three
 * - Provides a compact and visually appealing layout
 *
 * Props:
 * @param {string[]} [assignees] - The list of assignee names
 *
 * @returns {JSX.Element|null} The assignee avatars component, or null if no assignees are provided
 *
 * @example
 * // Basic usage
 * <AssigneeAvatars assignees={['Alice', 'Bob', 'Charlie', 'David']} />
 */

interface AssigneeAvatarsProps {
  assignees?: string[];
}

export function AssigneeAvatars({ assignees }: Readonly<AssigneeAvatarsProps>) {
  if (!assignees || assignees.length === 0) return null;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {assignees.slice(0, 3).map((user) => (
        <div
          key={user[0]}
          className="h-8 w-8 rounded-full bg-gray-300 text-xs flex items-center justify-center border-2 border-white"
        >
          {user[0]}
        </div>
      ))}
      {assignees.length > 3 && (
        <div className="h-8 w-8 rounded-full bg-gray-200 text-xs flex items-center justify-center border-2 border-white">
          +{assignees.length - 3}
        </div>
      )}
    </div>
  );
}
