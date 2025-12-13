import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'size-full bg-transparent text-zinc-100 placeholder:text-zinc-600 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 text-base outline-none border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
          className,
        )}
        {...props}
      />
    );
  },
);

const rootVariants = cva(
  'py-1 px-2 flex items-center gap-1 rounded transition duration-200',
  {
    variants: {
      variant: {
        default:
          'border border-zinc-800 ',

        underlined:
          'border-b border-zinc-800  rounded-none px-0',

        filled:
          'bg-zinc-900 text-zinc-100 ',

        ghost:
          'bg-transparent text-zinc-100 ',

        neubrutalism:
          'border border-zinc-700 rounded-sm shadow-[2px_2px_0px_rgb(113,113,122)] ',
      },
      size: {
        sm: 'h-8',
        default: 'h-10',
        lg: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type InputBlockProps = {
  className?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  children: React.ReactNode;
} & VariantProps<typeof rootVariants>;

const InputBlock = ({
  size,
  variant,
  className,
  leftSection,
  rightSection,
  children,
}: InputBlockProps) => (
  <div className={cn('w-full', rootVariants({ variant, size }), className)}>
    {leftSection}
    {children}
    {rightSection}
  </div>
);

Input.displayName = 'Input';
InputBlock.displayName = 'InputBlock';

export { Input, InputBlock };
