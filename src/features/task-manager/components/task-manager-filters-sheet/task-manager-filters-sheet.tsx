import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from 'components/ui/sheet';
import { Button } from 'components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';
import { Checkbox } from 'components/ui/checkbox';
import { Label } from 'components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Calendar } from 'components/ui/calendar';
import { useTaskContext } from '../../contexts/task-context';
import { Badge } from 'components/ui/badge';

/**
 * TaskManagerFilterSheet Component
 *
 * A reusable component for managing task filters in a task manager application.
 * This component allows users to:
 * - Filter tasks by due date, priority, status, assignees, and tags
 * - Apply or reset filters
 * - Dynamically update the task list based on selected filters
 *
 * Features:
 * - Provides a sheet-based UI for managing filters
 * - Supports filtering by multiple criteria (e.g., due date, priority, status)
 * - Allows users to clear all filters with a single button
 * - Displays selected filters as badges
 *
 * Props:
 * @param {boolean} open - Whether the filter sheet is open
 * @param {(open: boolean) => void} onOpenChange - Callback triggered when the sheet's open state changes
 *
 * @returns {JSX.Element} The task manager filter sheet component
 *
 * @example
 * // Basic usage
 * <TaskManagerFilterSheet
 *   open={isFilterSheetOpen}
 *   onOpenChange={(isOpen) => setFilterSheetOpen(isOpen)}
 * />
 */
interface TaskManagerFiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskManagerFilterSheet = ({
  open,
  onOpenChange,
}: Readonly<TaskManagerFiltersSheetProps>) => {
  const { t } = useTranslation();
  const { assignees, tags, priorities, statuses, updateFilter, resetFilters } = useTaskContext();

  const [selectedDueDate, setSelectedDueDate] = useState<DateRange | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const applyFilters = () => {
    updateFilter({
      dueDate: selectedDueDate
        ? {
            from: selectedDueDate.from || null,
            to: selectedDueDate.to || null,
          }
        : undefined,
      priorities: selectedPriorities,
      statuses: selectedStatuses,
      assignees: selectedAssignees,
      tags: selectedTags,
    });
    onOpenChange(false);
  };

  const resetAllFilters = () => {
    resetFilters();
    setSelectedDueDate(null);
    setSelectedPriorities([]);
    setSelectedStatuses([]);
    setSelectedAssignees([]);
    setSelectedTags([]);
    onOpenChange(false);
  };

  const handlePrioritySelect = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority]
    );
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleAssigneeSelect = (assigneeId: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(assigneeId) ? prev.filter((a) => a !== assigneeId) : [...prev, assigneeId]
    );
  };

  const handleTagSelect = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent className="flex flex-col h-screen sm:h-[calc(100dvh-48px)] justify-between w-full sm:min-w-[450px] md:min-w-[450px] lg:min-w-[450px] sm:fixed sm:top-[57px]">
        <div className="flex-1 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="!text-left">{t('FILTERS')}</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-6">
            {/* Due Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed justify-start">
                  <PlusCircle />
                  {t('DUE_DATE')}
                  {selectedDueDate?.from && selectedDueDate?.to && (
                    <Badge className="ml-2 bg-surface">
                      {' '}
                      {selectedDueDate?.from.toLocaleDateString()} -{' '}
                      {selectedDueDate?.to.toLocaleDateString()}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={selectedDueDate ?? undefined}
                  numberOfMonths={2}
                  onSelect={(range) => setSelectedDueDate(range ?? null)}
                />
                <div className="p-2 border-t">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      resetAllFilters();
                    }}
                    className="w-full"
                    size="sm"
                  >
                    {t('CLEAR_FILTER')}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Priority Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed justify-start">
                  <PlusCircle />
                  {t('PRIORITY')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="sm:max-w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={t('SEARCH_PRIORITIES')} />
                  <CommandList>
                    <CommandEmpty>{t('NO_PRIORITIES_FOUND')}</CommandEmpty>
                    <CommandGroup>
                      {priorities.map((priority) => (
                        <CommandItem
                          key={priority}
                          onSelect={() => handlePrioritySelect(priority)}
                          className="flex items-center gap-2"
                        >
                          <Checkbox checked={selectedPriorities.includes(priority)} />
                          <span>{priority}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Status Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed justify-start">
                  <PlusCircle />
                  {t('STATUS')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="sm:max-w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={t('SEARCH_STATUSES')} />
                  <CommandList>
                    <CommandEmpty>{t('NO_STATUSES_FOUND')}</CommandEmpty>
                    <CommandGroup>
                      {statuses.map((status) => (
                        <CommandItem
                          key={status}
                          onSelect={() => handleStatusSelect(status)}
                          className="flex items-center gap-2"
                        >
                          <Checkbox checked={selectedStatuses.includes(status)} />
                          <span>{status}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Assignee Filter */}
            <div>
              <Label>{t('ASSIGNEE')}</Label>
              <div className="border rounded-lg max-h-52 overflow-y-auto">
                <Command>
                  <CommandInput placeholder={t('SEARCH_ASSIGNEES')} />
                  <CommandList>
                    <CommandEmpty>{t('NO_ASSIGNEES_FOUND')}</CommandEmpty>
                    <CommandGroup>
                      {assignees.map((assignee) => (
                        <CommandItem
                          key={assignee.id}
                          onSelect={() => handleAssigneeSelect(assignee.id)}
                          className="flex items-center gap-2"
                        >
                          <Checkbox checked={selectedAssignees.includes(assignee.id)} />
                          <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-sm border-2 border-white">
                            {assignee.name[0]}
                          </div>
                          <span>{assignee.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <Label>{t('TAGS')}</Label>
              <div className="border rounded-lg max-h-44 overflow-y-auto">
                <Command>
                  <CommandInput placeholder={t('SEARCH_TAGS')} />
                  <CommandList>
                    <CommandEmpty>{t('NO_TAGS_FOUND')}</CommandEmpty>
                    <CommandGroup>
                      {tags.map((tag) => (
                        <CommandItem
                          key={tag.id}
                          onSelect={() => handleTagSelect(tag.id)}
                          className="flex items-center gap-2"
                        >
                          <Checkbox checked={selectedTags.includes(tag.id)} />
                          <span>{tag.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-1/2" onClick={resetAllFilters}>
            {t('RESET')}
          </Button>
          <Button className="w-full sm:w-1/2" onClick={applyFilters}>
            {t('APPLY')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
