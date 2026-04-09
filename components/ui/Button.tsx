import type {ButtonHTMLAttributes} from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-surface)] border-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] hover:border-[var(--color-accent-dark)]',
  ghost:
    'bg-transparent text-[var(--color-ink)] border-transparent hover:bg-[var(--color-surface)]',
  outline:
    'bg-transparent text-[var(--color-ink)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-dark)]'
};

export function buttonClasses(variant: ButtonVariant = 'primary', fullWidth = false): string {
  return [
    'inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium tracking-[0.03em] transition-colors duration-200',
    variantClasses[variant],
    fullWidth ? 'w-full' : ''
  ]
    .filter(Boolean)
    .join(' ');
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return <button className={`${buttonClasses(variant, fullWidth)} ${className ?? ''}`.trim()} {...props} />;
}
