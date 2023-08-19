export function Logo({ className, ...props }) {
  return (
    <h1 className={className + ' font-light lowercase text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-400  to-indigo-900' } {...props}>
      casevisor
    </h1>
  );
}
