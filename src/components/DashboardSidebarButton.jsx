import clsx from 'clsx';

function DashboardSidebarButton({ section, divClass, textClass, iconClass, ...props }) {
  return (
    <div
      className={clsx(
        'w-full cursor-pointer group p-2 text-md md:text-xl flex gap-x-3 justify-start items-center bg-transparent hover:bg-slate-100 rounded-lg',
        divClass
      )}
      {...props}
    >
      <section.icon iconClass={iconClass} />
      <span className={clsx('', textClass ? textClass : 'text-slate-500 group-hover:text-blue-500')}>{section.name}</span>
    </div>
  );
}

export default DashboardSidebarButton;
