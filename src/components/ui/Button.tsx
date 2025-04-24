import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' ;
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'rounded-lg font-medium transition-colors duration-200 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<Required<ButtonProps>['variant'], string> = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-600',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-200',
    ghost: 'text-gray-600 hover:bg-gray-100 disabled:text-gray-400',
  };

  const sizes: Record<Required<ButtonProps>['size'], string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
