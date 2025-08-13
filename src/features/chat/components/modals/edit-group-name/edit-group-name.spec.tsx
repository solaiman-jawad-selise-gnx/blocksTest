import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock Dialog and related UI components
jest.mock('components/ui/dialog', () => ({
  Dialog: ({ open, children }: any) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
  DialogDescription: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('components/ui/button', () => ({
  Button: ({ children, loading, disabled, ...props }: any) => (
    <button disabled={!!loading || disabled} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

import { EditGroupName } from './edit-group-name';

describe('EditGroupName', () => {
  const defaultProps = {
    isOpen: true,
    currentName: 'My Group',
    onClose: jest.fn(),
    onSave: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with current group name', () => {
    render(<EditGroupName {...defaultProps} />);
    expect(screen.getByLabelText('GROUP_NAME')).toBeInTheDocument();
    expect(screen.getByDisplayValue('My Group')).toBeInTheDocument();
    expect(screen.getByText('CANCEL')).toBeInTheDocument();
    expect(screen.getByText('SAVE')).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<EditGroupName {...defaultProps} />);
    fireEvent.click(screen.getByText('CANCEL'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onSave with trimmed value when save is clicked', () => {
    render(<EditGroupName {...defaultProps} />);
    const input = screen.getByLabelText('GROUP_NAME');
    fireEvent.change(input, { target: { value: '  New Name  ' } });
    fireEvent.click(screen.getByText('SAVE'));
    expect(defaultProps.onSave).toHaveBeenCalledWith('New Name');
  });

  it('shows error if group name is empty and does not call onSave', () => {
    render(<EditGroupName {...defaultProps} />);
    const input = screen.getByLabelText('GROUP_NAME');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByText('SAVE'));
    expect(screen.getByText('GROUP_NAME_REQUIRED')).toBeInTheDocument();
    expect(defaultProps.onSave).not.toHaveBeenCalled();
  });

  it('disables input and buttons when loading', () => {
    render(<EditGroupName {...defaultProps} isLoading />);
    expect(screen.getByLabelText('GROUP_NAME')).toBeDisabled();
    expect(screen.getByText('CANCEL')).toBeDisabled();
    expect(screen.getByText('SAVE')).toBeDisabled();
  });

  it('does not render dialog when isOpen is false', () => {
    render(<EditGroupName {...defaultProps} isOpen={false} />);
    expect(screen.queryByLabelText('GROUP_NAME')).not.toBeInTheDocument();
  });
});
