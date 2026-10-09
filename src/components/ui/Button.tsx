import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    isLoading = false, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-yellow-500 text-gray-900 hover:bg-yellow-600",
      secondary: "bg-gray-900 text-white hover:bg-gray-800",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900",
      ghost: "hover:bg-gray-100 text-gray-900",
      link: "underline-offset-4 hover:underline text-yellow-500 p-0 h-auto"
    };
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5 text-base",
      lg: "h-12 px-8 text-lg"
    };
    
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;