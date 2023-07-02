import Link from 'next/link';
import clsx from 'clsx';

const baseStyle = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline: 'group inline-flex ring-2 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none',
};

const variantStyles = {
  solid: {
    blue: 'bg-blue-600 text-white hover:bg-blue-500 hover:text-slate-100 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    violet:
      'bg-violet-600 text-white hover:text-slate-100 hover:bg-violet-500 active:bg-violet-800 active:text-violet-100 focus-visible:outline-violet-600',
    white: 'bg-white text-slate-900 hover:bg-sky-500 active:bg-sky-200 active:text-slate-600 focus-visible:outline-white',
  },
  outline: {
    blue: 'ring-blue-100 text-slate-700 hover:text-slate-900 hover:ring-blue-300 active:bg-blue-300 active:text-slate-900 focus-visible:outline-blue-600 focus-visible:ring-blue-300',
    white: 'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
  },
};

export function Button({ variant = 'solid', color = 'blue', className, href, ...props }) {
  className = clsx(baseStyle[variant], variantStyles[variant][color], className);

  return href ? <Link href={href} className={className} {...props} /> : <button className={className} {...props}></button>;
}
