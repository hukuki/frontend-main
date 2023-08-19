import clsx from 'clsx';

function DashboardSidebarButton({ section, divClass, textClass, iconClass, ...props }) {
  return (
    <div
      className={clsx('w-full cursor-pointer group p-2 pl-3 pr-4 text-md md:text-lg lg:text-xl flex gap-x-3 justify-start items-center rounded-lg', divClass)}
      {...props}
    >
      <section.icon iconClass={iconClass}  />
      <span className={clsx('', textClass ? textClass : 'text-slate-500 group-hover:text-slate-600')}>{section.name}</span>
    </div>
  );
}

export default DashboardSidebarButton;
