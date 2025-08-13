import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/ui/button';
import { ChevronDown, PenLine } from 'lucide-react';
import { Label } from 'components/ui/label';
import { useTaskDetails } from '../../hooks/use-task-details';

/**
 * EditableDescription Component
 *
 * A reusable component for displaying and editing task descriptions.
 * This component supports:
 * - Inline editing of descriptions with a rich text editor
 * - Saving or canceling changes
 * - Automatically focusing the editor when editing starts
 * - Showing or hiding additional lines of content
 *
 * Features:
 * - Allows users to edit descriptions inline
 * - Dynamically loads a custom text editor to reduce initial bundle size
 * - Saves changes on button click
 * - Cancels editing and reverts to the original description
 * - Displays a "Show More" or "Show Less" button for long descriptions
 *
 * Props:
 * @param {string} [taskId] - The ID of the task associated with the description
 * @param {string} [initialContent] - The initial content of the description
 * @param {(content: string) => void} [onContentChange] - Callback triggered when the description is saved
 *
 * @returns {JSX.Element} The editable description component
 *
 * @example
 * // Basic usage
 * <EditableDescription
 *   taskId="123"
 *   initialContent="This is a task description."
 *   onContentChange={(newContent) => console.log('Saved description:', newContent)}
 * />
 */

interface EditableDescriptionProps {
  readonly taskId?: string;
  readonly initialContent?: string;
  readonly onContentChange?: (content: string) => void;
}

type EditorComponentType = React.ComponentType<any> | null;

export function EditableDescription({
  initialContent,
  onContentChange,
  taskId,
}: EditableDescriptionProps) {
  const { task, updateTaskDetails } = useTaskDetails(taskId);
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState<boolean>(!initialContent);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [editorComponent, setEditorComponent] = useState<EditorComponentType>(null);
  const { t } = useTranslation();

  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    if (isEditing) {
      import('../../../../components/blocks/custom-text-editor/custom-text-editor')
        .then((module) => {
          setEditorComponent(() => module.default);
        })
        .catch((error) => {
          console.error('Error loading editor:', error);
        });
    }
  }, [isEditing]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    if (onContentChange) {
      content && onContentChange(content);
    }

    if (content && task) {
      updateTaskDetails({ description: content });
    }

    setEditorComponent(null);

    setIsEditing(false);

    setForceRender((prev) => prev + 1);
  };

  const handleCancel = () => {
    setContent(initialContent);

    setEditorComponent(null);

    setIsEditing(false);

    setForceRender((prev) => prev + 1);
  };

  const [showMore, setShowMore] = useState(false);
  const [hasMoreLines, setHasMoreLines] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkLines = () => {
      if (contentRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight) || 20;
        const height = contentRef.current.scrollHeight;
        const lineCount = Math.ceil(height / lineHeight);

        setHasMoreLines(lineCount > 5);
      }
    };

    checkLines();

    window.addEventListener('resize', checkLines);
    window.addEventListener('load', checkLines);

    return () => {
      window.removeEventListener('resize', checkLines);
      window.removeEventListener('load', checkLines);
    };
  }, [content]);

  const renderContent = () => {
    if (!content) return null;

    return (
      <div className="relative">
        <div
          ref={contentRef}
          className="ql-editor text-sm formatted-content"
          style={{
            maxHeight: !showMore && hasMoreLines ? '7.5em' : 'none',
            overflow: !showMore && hasMoreLines ? 'hidden' : 'visible',
            padding: '0',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {hasMoreLines && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-sm font-semibold border"
            onClick={() => setShowMore(!showMore)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
            />
            {showMore ? t('SHOW_LESS') : t('SHOW_MORE')}
          </Button>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!isEditing) {
      const styleTag = document.createElement('style');
      styleTag.id = 'hide-quill-toolbar';
      document.head.appendChild(styleTag);

      return () => {
        const existingStyle = document.getElementById('hide-quill-toolbar');
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, [isEditing, forceRender]);

  // Extract the editor content rendering into a separate function
  const renderEditorContent = () => {
    if (!isMounted || !editorComponent) {
      return <div className="border rounded-md p-4">{t('LOADING_EDITOR')}</div>;
    }

    const EditorComponent = editorComponent;
    return (
      <div>
        <EditorComponent
          key={`editor-instance-${forceRender}`}
          value={content}
          onChange={handleContentChange}
          showIcons={false}
        />
        <div className="flex justify-end mt-4">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-semibold border"
              onClick={handleCancel}
            >
              {t('CANCEL')}
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-sm font-semibold ml-2"
              onClick={handleSave}
            >
              {t('SAVE')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative" key={`editor-container-${forceRender}`}>
      <button
        type="button"
        className="flex items-center gap-1 h-9 focus:outline-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Label className="text-high-emphasis text-base font-semibold">{t('DESCRIPTION')}</Label>
        {isHovering && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            aria-label={t('EDIT_DESCRIPTION')}
            variant="ghost"
          >
            <PenLine className="h-4 w-4 text-primary" />
          </Button>
        )}
      </button>

      {isEditing ? renderEditorContent() : <div className="text-sm">{renderContent()}</div>}
    </section>
  );
}
