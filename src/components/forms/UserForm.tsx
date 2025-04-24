import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/Input';
import { Selector } from '@/components/ui/Selector';
import { Button } from '@/components/ui/Button';

const userSchema = z.object({
  username:  z.string().min(3,  'At least 3 characters'),
  password:  z.string().min(6,  'At least 6 characters'),
  role:      z.enum(['USER','ADMIN']),
  firstName: z.string().min(2),
  lastName:  z.string().min(2),
  sex:       z.enum(['Male','Female']),
  age:       z.number().min(1,  'Age must be positive'),
  email:     z.string().email()
});
export type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: SubmitHandler<UserFormValues>;
  submitLabel?: string;
  onCancel?: () => void;
}

export function UserForm({
  defaultValues,
  onSubmit,
  submitLabel = 'Submit',
  onCancel,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Username"
          {...register('username')}
          error={errors.username?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <Selector
        label="Role"
        {...register('role')}
        error={errors.role?.message}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </Selector>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Selector
          label="Sex"
          {...register('sex')}
          error={errors.sex?.message}
        >
          <option value="Male">MALE</option>
          <option value="Female">FEMALE</option>
        </Selector>
        <Input
          label="Age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          error={errors.age?.message}
        />
      </div>

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
