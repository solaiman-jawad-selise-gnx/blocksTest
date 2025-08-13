import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from 'components/ui/dialog';

/**
 * AddColumnDialog Component
 *
 * A reusable dialog component for adding a new column in a task manager.
 * This component supports:
 * - Entering a column title
 * - Adding the column to the task manager
 *
 * Features:
 * - Provides an input field for entering the column title
 * - Includes buttons for adding or canceling the column creation
 *
 * Props:
 * @param {(title: string) => void} onAddColumn - Callback triggered when the column is added
 *
 * @returns {JSX.Element} The add column dialog component
 *
 * @example
 * // Basic usage
 * <AddColumnDialog onAddColumn={(title) => console.log('Column added:', title)} />
 */

interface AddColumnDialogProps {
  onAddColumn: (title: string) => void;
}

export function AddColumnDialog({ onAddColumn }: Readonly<AddColumnDialogProps>) {
  const { t } = useTranslation();
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      onAddColumn(newColumnTitle);
      setNewColumnTitle('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center bg-white hover:bg-white w-80">
          <Plus className="h-4 w-4" />
          {t('ADD_LIST')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('ADD_NEW_LIST')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder={t('LIST_TITLE')}
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="mr-2">
              {t('CANCEL')}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleAddColumn}>{t('ADD_LIST')}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
