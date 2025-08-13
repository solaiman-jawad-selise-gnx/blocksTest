import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { X } from 'lucide-react';
import {
  FileType,
  getFileTypeDisplayName,
  getFileTypeIcon,
  getFileTypeInfo,
  getSharedUsers,
  SharedUser,
} from 'features/file-manager/utils/file-manager';
import { useIsMobile } from 'hooks/use-mobile';
import { CustomtDateFormat } from 'lib/custom-date-formatter';

export interface IFileDataWithSharing {
  id: string;
  name: string;
  fileType: FileType;
  size: string;
  lastModified: string | Date;
  isShared: boolean;
  sharedWith?: SharedUser[];
  sharePermissions?: { [key: string]: string };
}

export interface BaseFileDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  file: IFileDataWithSharing | null;
  t: (key: string) => string;
  variant?: 'default' | 'trash';
}

const getCreationDate = (lastModified: Date | string): Date => {
  const creationDate = new Date(lastModified);
  const randomArray = new Uint32Array(1);
  crypto.getRandomValues(randomArray);
  const hoursBack = (randomArray[0] % 721) + 24;
  creationDate.setHours(creationDate.getHours() - hoursBack);
  return creationDate;
};

const getOwnerName = (sharedUsers: SharedUser[], variant: 'default' | 'trash'): string => {
  if (variant === 'trash') {
    return 'Luca Meier';
  }
  return sharedUsers.find((user) => user.role === 'Owner')?.name ?? '';
};

const getDateCreated = (file: IFileDataWithSharing, variant: 'default' | 'trash'): Date => {
  if (variant === 'trash' && file.lastModified instanceof Date) {
    return getCreationDate(file.lastModified);
  }
  return new Date(file.lastModified);
};

const FallbackAvatar: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => <div className={`rounded-full overflow-hidden ${className}`}>{children}</div>;

const FallbackAvatarImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  if (!src) return null;
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
};

const FallbackAvatarFallback: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`w-full h-full flex items-center justify-center ${className}`}>{children}</div>
);

// Main shared component
const FileDetailsSheet: React.FC<BaseFileDetailsSheetProps> = ({
  isOpen,
  onClose,
  file,
  t,
  variant = 'default',
}) => {
  const isMobile = useIsMobile();

  if (!isOpen || !file) return null;

  const IconComponent = getFileTypeIcon(file.fileType);
  const { iconColor, backgroundColor } = getFileTypeInfo(file.fileType);

  const sharedUsers =
    variant === 'trash'
      ? getSharedUsers({
          ...file,
          lastModified:
            file.lastModified instanceof Date ? file.lastModified : new Date(file.lastModified),
        })
      : file.sharedWith || [];
  const ownerName = getOwnerName(sharedUsers, variant);
  const creationDate = getDateCreated(file, variant);
  const fileTypeDisplayName = getFileTypeDisplayName(file.fileType);

  const containerClasses = isMobile
    ? 'fixed inset-0 z-50 bg-white flex flex-col'
    : 'w-80 bg-white border-l border-gray-200 flex flex-col h-full rounded-lg shadow-lg ml-4';

  const headerClasses = isMobile
    ? 'p-4 pb-3 border-b border-gray-100 bg-white'
    : 'p-6 pb-4 border-b border-gray-100';

  const contentClasses = isMobile
    ? 'flex-1 overflow-y-auto p-4 space-y-6'
    : 'flex-1 overflow-y-auto p-6 space-y-6';

  const AvatarComponent = Avatar || FallbackAvatar;
  const AvatarImageComponent = AvatarImage || FallbackAvatarImage;
  const AvatarFallbackComponent = AvatarFallback || FallbackAvatarFallback;

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{t('DETAILS')}</h2>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-1"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>

      <div className={contentClasses}>
        <div className="flex flex-col items-center space-y-3 py-4">
          <div
            className={`w-16 h-16 rounded-lg flex items-center justify-center ${backgroundColor}`}
          >
            <IconComponent className={`w-8 h-8 ${iconColor}`} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 text-center break-all">{file.name}</h3>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-900">{t('PROPERTIES')}</h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">{t('TYPE')}</label>
              <div className="flex items-center gap-3">
                <div
                  className={`h-6 w-6 rounded flex items-center justify-center ${backgroundColor}`}
                >
                  <IconComponent className={`w-4 h-4 ${iconColor}`} />
                </div>
                <span className="text-sm font-medium text-gray-900">{fileTypeDisplayName}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">{t('SIZE')}</label>
              <div className="text-sm font-medium text-gray-900">{file.size}</div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">{t('OWNER')}</label>
              <div className="text-sm font-medium text-gray-900">{ownerName}</div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">{t('LAST_MODIFIED')}</label>
              <div className="text-sm font-medium text-gray-900">
                {CustomtDateFormat(file.lastModified)}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">{t('DATE_CREATED')}</label>
              <div className="text-sm font-medium text-gray-900">
                {CustomtDateFormat(creationDate)}
              </div>
            </div>

            {file.fileType !== 'Folder' && (
              <div className="space-y-1">
                <label className="text-sm text-gray-600">{t('LOCATION')}</label>
                <div className="text-sm font-medium text-gray-900">/Documents/</div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm text-gray-600">{t('SHARING')}</label>
              <div className="text-sm font-medium text-gray-900">
                {file.isShared ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {t('SHARED')}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                    {t('PRIVATE')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {sharedUsers.length > 0 && (
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <h3 className="text-base font-medium text-gray-900">
              {t('SHARED_WITH')} ({sharedUsers.length})
            </h3>

            <div className="space-y-3">
              {sharedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <AvatarComponent className="h-9 w-9">
                    <AvatarImageComponent src={user.avatar} alt={user.name} />
                    <AvatarFallbackComponent className="text-xs bg-gray-100">
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallbackComponent>
                  </AvatarComponent>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                      {user.role === 'Owner' && (
                        <span className="text-gray-500 font-normal"> (you)</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {(user.role ?? '').toLowerCase()}
                    </div>
                  </div>
                  {user.role !== 'Owner' && <div className="text-xs text-gray-400"></div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDetailsSheet;
