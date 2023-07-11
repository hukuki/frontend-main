import Link from 'next/link';

export function NavLink({ href, children, ...props }) {
  if (href) {
    return (
      <Link href={href} className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <div className="cursor-pointer inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" {...props}>
        {children}
      </div>
    );
  }
}
