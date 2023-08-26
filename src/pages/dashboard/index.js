import React, { Fragment, useState, useMemo, createContext, useContext } from 'react';
import useAuthContext from '../../context/AuthContextProvider';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Logo } from '../../components/Logo';
import { FaHome, FaBriefcase, FaUpload, FaBookmark, FaUserTie, FaUserAlt, FaCog, FaQuestion, FaSignOutAlt } from 'react-icons/fa';
import DashboardSearchbar from '../../components/DashboardSearchbar';
import DashboardSpacesContainer from '../../components/DashboardSpacesContainer';

const sections = [
  {
    name: 'Ana Sayfa',
    icon: FaHome,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
  {
    name: 'Projeler',
    icon: FaBriefcase,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
  {
    name: 'Yüklenenler',
    icon: FaUpload,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
  {
    name: 'Kaydedilenler',
    icon: FaBookmark,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
  {
    name: 'Partnerler',
    icon: FaUserTie,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
  {
    name: 'Profil',
    icon: FaUserAlt,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
  {
    name: 'Ayarlar',
    icon: FaCog,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
  {
    name: 'Çıkış Yap',
    icon: FaSignOutAlt,
    onClick({ signOutWithGoogle, router }) {
      return async () => {
        await signOutWithGoogle();
        router.push('/');
      };
    },
  },
  {
    name: 'Yardım',
    icon: FaQuestion,
    onClick({ setActiveTab }) {
      return () => {
        setActiveTab(this.name);
      };
    },
  },
];

function Sidebar() {
  const { activeTab, setActiveTab } = useContext(DashboardContext);
  const router = useRouter();
  return (
    <div className="group/outer transition-all duration-300 hidden bg-[#fcfcfc] shadow md:inline-flex flex-col sticky top-0 left-0 md:w-56 box-border p-4 overflow-hidden">
      <div className="h-20 whitespace-nowrap text-center">
        <Logo onClick={() => router.push('/')} className="cursor-pointer" />
        <hr className="mt-4 border-slate-900/30" />
      </div>
      <div className="flex-1 w-full flex flex-col gap-y-2.5">
        {sections.map((section, _) => {
          if (section.name === 'Yardım') {
            return (
              <div className="mt-auto w-full border-t-2 border-slate-200">
                <SidebarButton section={section} />
              </div>
            );
          } else {
            return <SidebarButton section={section} />;
          }
        })}
      </div>
    </div>
  );
}

function SidebarButton({ section, ...props }) {
  const { activeTab, setActiveTab } = useContext(DashboardContext);
  const selected = activeTab === section.name;
  const router = useRouter();
  const { signOutWithGoogle } = useAuthContext();
  return (
    <div
      className={clsx(
        'w-full cursor-pointer group p-3 text-base flex gap-x-2.5 justify-start items-center rounded-xl',
        selected ? 'bg-[#efefef]' : 'bg-transparent hover:bg-[#efefef]'
      )}
      onClick={section.onClick({ setActiveTab, router, signOutWithGoogle })}
      {...props}
    >
      <span className={clsx('font-semibold group-hover:text-[#1a1d1f]', selected ? 'text-[#1a1d1f]' : 'text-[#6f767e]')}>{<section.icon />}</span>
      <span className={clsx('group-hover/outer:block font-semibold group-hover:text-[#1a1d1f]', selected ? 'text-[#1a1d1f]' : 'text-[#6f767e]')}>
        {section.name}
      </span>
    </div>
  );
}

function MobileSidebarIcon({ open }) {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth={2} strokeLinecap="round">
      <path d="M0 1H14M0 7H14M0 13H14" className={clsx('origin-center transition', open && 'scale-90 opacity-0')} />
      <path d="M2 2L12 12M12 2L2 12" className={clsx('origin-center transition', !open && 'scale-90 opacity-0')} />
    </svg>
  );
}

function MobileSidebar() {
  const { activeTab, setActiveTab } = useContext(DashboardContext);
  const { user, signOutWithGoogle } = useAuthContext();
  const router = useRouter();

  return (
    <div className="w-full flex items-center gap-x-4 p-2 md:hidden bg-white shadow">
      <div className="ml-2">
        <Popover>
          <Popover.Button className="relative z-10 flex justify-center items-center outline-none">
            {({ open }) => <MobileSidebarIcon open={open} />}
          </Popover.Button>
          <Transition.Root>
            <Transition.Child
              as={Fragment}
              enter="duration-300 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-300 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-300 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-300 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                as="div"
                className="absolute z-10 inset-x-0 mt-6 mx-2 flex origin-top flex-col rounded-lg bg-white p-4 text-lg tracking-tight text-slate-900 shadow ring-1 ring-slate-900/5"
              >
                {({ close }) => (
                  <div className="flex flex-col gap-y-2.5">
                    {sections.map((section, _) => {
                      return <SidebarButton section={section} />;
                    })}
                  </div>
                )}
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </Popover>
      </div>
      <div className="ml-5">
        <Logo className="cursor-pointer" onClick={() => router.push('/')} />
      </div>
    </div>
  );
}

export const DashboardContext = createContext();

function DashboardPage() {
  const { user, signOutWithGoogle } = useAuthContext();
  const [activeTab, setActiveTab] = useState('Projeler');
  const router = useRouter();

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col md:flex-row bg-[#fcfcfc] h-full">
        <Sidebar />
        <MobileSidebar />
        <div className="block m-2 flex-1">
          {activeTab === 'Projeler' && (
            <>
              <DashboardSpacesContainer />
            </>
          )}
        </div>
      </div>
    </DashboardContext.Provider>
  );
}

export default DashboardPage;
