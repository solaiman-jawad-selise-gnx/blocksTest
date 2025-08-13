import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlignJustify, Columns3, ListFilter, Plus, Search } from 'lucide-react';
import { useIsMobile } from 'hooks/use-mobile';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Tabs, TabsList, TabsTrigger } from 'components/ui/tabs';
import { useTaskContext } from '../../contexts/task-context';
import { TaskManagerFilterSheet } from '../task-manager-filters-sheet/task-manager-filters-sheet';

/**
 * TaskManagerToolbar Component
 *
 * A reusable toolbar component for managing tasks in a task manager application.
 * This component supports:
 * - Switching between board and list views
 * - Searching for tasks
 * - Opening a modal to add new tasks
 * - Managing filters via a filter sheet
 *
 * Features:
 * - Responsive design with separate layouts for mobile and desktop views
 * - Search functionality with a clear button
 * - View mode toggle between "board" and "list"
 * - Integration with the `TaskManagerFilterSheet` for filtering tasks
 *
 * Props:
 * @param {() => void} onOpen - Callback to open the task creation modal
 * @param {string} [viewMode='board'] - The current view mode ('board' or 'list')
 * @param {(view: string) => void} handleViewMode - Callback to change the view mode
 *
 * @returns {JSX.Element} The task manager toolbar component
 *
 * @example
 * // Basic usage
 * <TaskManagerToolbar
 *   onOpen={() => console.log('Open task modal')}
 *   viewMode="board"
 *   handleViewMode={(view) => console.log('View mode changed:', view)}
 * />
 */

interface TaskManagerToolbarProps {
  onOpen: () => void;
  viewMode?: string;
  handleViewMode: (view: string) => void;
}

export default function TaskManagerToolbar({
  onOpen,
  viewMode = 'board',
  handleViewMode,
}: Readonly<TaskManagerToolbarProps>) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const { searchQuery, setSearchQuery } = useTaskContext();

  const [openSheet, setOpenSheet] = useState(false);

  useEffect(() => {
    if (openSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openSheet]);

  const handleTaskModalOpen = () => {
    viewMode === 'board' && onOpen();
  };

  // mobile view
  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between w-full">
          <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">
            {t('TASK_MANAGER')}
          </h3>

          <Button onClick={handleTaskModalOpen} size="sm" className="h-8">
            <Plus className="h-4 w-4" />
            {t('ADD_ITEM')}
          </Button>
        </div>

        <div className="flex items-center w-full mt-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 bg-background" />
            <Input
              placeholder={t('SEARCH')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full rounded-lg bg-background pl-8"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex ml-2 gap-1">
            <Button
              onClick={() => setOpenSheet(true)}
              variant="outline"
              size="sm"
              className="h-8 px-2"
            >
              <ListFilter className="h-4 w-4" />
            </Button>

            <Tabs value={viewMode} onValueChange={(value) => handleViewMode(value)}>
              <TabsList className="border rounded-lg flex h-8">
                <TabsTrigger value="board">
                  <Columns3 className="h-3 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <AlignJustify className="h-3 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <TaskManagerFilterSheet open={openSheet} onOpenChange={setOpenSheet} />
      </div>
    );
  }

  // desktop view
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">
          {t('TASK_MANAGER')}
        </h3>
      </div>
      <div className="flex gap-2">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 bg-background" />
          <Input
            placeholder={t('SEARCH')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded-lg bg-background pl-8"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <Button onClick={() => setOpenSheet(true)} variant="outline" size="sm" className="h-8 px-3">
          <ListFilter className="h-4 w-4" />
        </Button>
        <Tabs value={viewMode} onValueChange={(value) => handleViewMode(value)}>
          <TabsList className="border rounded-lg flex h-8">
            <TabsTrigger value="board">
              <Columns3 className="h-3 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <AlignJustify className="h-3 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={handleTaskModalOpen} size="sm" className="h-8 text-sm font-bold">
          <Plus />
          {t('ADD_ITEM')}
        </Button>
      </div>
      <TaskManagerFilterSheet open={openSheet} onOpenChange={setOpenSheet} />
    </div>
  );
}
