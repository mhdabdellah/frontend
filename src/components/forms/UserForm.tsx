// components/forms/UserForm.tsx
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';                             // RHF core :contentReference[oaicite:3]{index=3}
import { zodResolver } from '@hookform/resolvers/zod';                                // Zod resolver :contentReference[oaicite:4]{index=4}
import * as z from 'zod';

import { Input } from '@/components/ui/Input';
import { Selector } from '@/components/ui/Selector';
import { Button } from '@/components/ui/Button';

// 1️⃣ Shared schema for all user fields
const userSchema = z.object({
  username:  z.string().min(3,  'At least 3 characters'),                              // RHF + Zod example :contentReference[oaicite:5]{index=5}
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
  defaultValues?: Partial<UserFormValues>;                                            // Pre-fill for “edit” or admin form :contentReference[oaicite:6]{index=6}
  onSubmit: SubmitHandler<UserFormValues>;                                            // Callback to invoke registration or admin API call :contentReference[oaicite:7]{index=7}
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
      {/* Username & Password */}
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

      {/* Role selector */}
      <Selector
        label="Role"
        {...register('role')}
        error={errors.role?.message}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </Selector>

      {/* Name fields */}
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

      {/* Sex & Age */}
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

      {/* Email */}
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      {/* Actions */}
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
