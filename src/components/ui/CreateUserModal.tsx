import { toast } from 'react-toastify';
import { authService } from '@/lib/services/authService';
import { UserForm, UserFormValues } from '@/components/forms/UserForm';
import { FormModal } from './FormModal';

interface CreateUserModalProps {
  title: string;
  onClose: () => void;
  refreshUsers: () => void;
}

export function CreateUserModal({ title, onClose, refreshUsers }: CreateUserModalProps) {
  const handleCreate = async (data: UserFormValues) => {
    try {
      await authService.register(data);
      toast.success('User created!');
      refreshUsers();
      onClose();
    } catch (err) {
      toast.error('Failed to create user');
    }
  };

  return (
    <FormModal
      title={title}
      setOpen={onClose}
      modalClassName="max-w-md"
    >
      <UserForm
        onSubmit={handleCreate}
        onCancel={onClose}
        submitLabel="Create User"
      />
    </FormModal>
  );
}
