// components/ui/Input.tsx
import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** you can still override if needed */
  showToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', showToggle, ...props }, ref) => {
    const isPassword = type === 'password';
    const shouldToggle = isPassword && (showToggle ?? true);
    const [visible, setVisible] = useState(false);

    // if it's password+toggle, switch type on visibility
    const actualType =
      isPassword && shouldToggle ? (visible ? 'text' : 'password') : type;

    return (
      <div className="w-full relative">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={actualType}
          className={`w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />

        {shouldToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
