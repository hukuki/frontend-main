import React, { Fragment, useRef, useState, useEffect, useId } from 'react';
import useAuthContext from '../../context/AuthContextProvider';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Logo } from '../../components/Logo';
import DashboardSidebarButton from '../../components/DashboardSidebarButton';
import { FaRegFolderOpen, FaBookmark, FaUserAlt, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import DashboardSearchbar from '../../components/DashboardSearchbar';
import DashboardSpacesContainer from '../../components/DashboardSpacesContainer';

const sections = [
  {
    name: 'Profile',
    icon: function ProfileIcon({ divClass, iconClass }) {
      let id = useId();
      return (
        <div id={id} className={clsx('group', divClass)}>
          <FaUserAlt className={clsx('', iconClass ? iconClass : 'h-6 w-6 text-slate-500 group-hover:text-blue-500')} />
        </div>
      );
    },
  },
  {
    name: 'Projects',
    icon: function ProjectsIcon({ divClass, iconClass }) {
      let id = useId();
      return (
        <div id={id} className={clsx('group', divClass)}>
          <FaRegFolderOpen className={clsx('', iconClass ? iconClass : 'h-6 w-6 text-slate-500 group-hover:text-blue-500')} />
        </div>
      );
    },
  },
  {
    name: 'Saved Documents',
    icon: function SavedDocumentsIcon({ divClass, iconClass }) {
      let id = useId();
      return (
        <div className={clsx('group', divClass)}>
          <FaBookmark className={clsx('', iconClass ? iconClass : 'h-6 w-6 text-slate-500 group-hover:text-blue-500')} />
        </div>
      );
    },
  },
  {
    name: 'Search on DeepLex',
    icon: function SearchIcon({ divClass, iconClass }) {
      let id = useId();
      return (
        <div id={id} className={clsx('group', divClass)}>
          <FaSearch className={clsx('', iconClass ? iconClass : 'h-6 w-6 text-slate-500 group-hover:text-blue-500')} />
        </div>
      );
    },
  },
  {
    name: 'Logout',
    icon: function LogoutIcon({ divClass, iconClass }) {
      let id = useId();
      return (
        <div id={id} className={('group', divClass)}>
          <FaSignOutAlt className={clsx('', iconClass ? iconClass : 'h-6 w-6 text-slate-500 group-hover:text-blue-500')} />
        </div>
      );
    },
  },
];

function MobileSidebarIcon({ open }) {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth={2} strokeLinecap="round">
      <path d="M0 1H14M0 7H14M0 13H14" className={clsx('origin-center transition', open && 'scale-90 opacity-0')} />
      <path d="M2 2L12 12M12 2L2 12" className={clsx('origin-center transition', !open && 'scale-90 opacity-0')} />
    </svg>
  );
}

function MobileSidebar() {
  return (
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
            className="absolute inset-x-0 mt-6 mx-2 flex origin-top flex-col rounded-lg bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            {sections.map((section, index) => {
              if (index === 3) {
                return (
                  <>
                    <hr className="m-2 border-slate-300/40" />
                    <DashboardSidebarButton
                      divClass="search_on_deeplex_animate bg-gradient-to-r from-blue-500/20 hover:from-blue-500/30 to-violet-500/20 hover:to-violet-500/30 bg-opacity-10"
                      section={section}
                      textClass="search_on_deeplex_animate text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500"
                    />
                  </>
                );
              }
              if (index === 4) {
                return (
                  <>
                    <hr className="m-2 border-slate-300/40" />
                    <DashboardSidebarButton section={section} />
                  </>
                );
              }
              return <DashboardSidebarButton section={section} />;
            })}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

function DashboardPage() {
  const { user, signOutWithGoogle } = useAuthContext();
  const [activeLink, setActiveLink] = useState('spaces');
  const router = useRouter();

  const changeActiveLink = (name) => {
    switch (name) {
      case 'spaces':
        setActiveLink('spaces');
        break;
      case 'people':
        setActiveLink('people');
        break;
      case 'shared_spaces':
        setActiveLink('shared_spaces');
        break;
      case 'saved':
        setActiveLink('saved');
        break;
    }
  };

  const handleLogout = async () => {
    await signOutWithGoogle();
    router.push('/');
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="group/outer transition-all duration-300 hidden bg-slate-100 md:inline-flex flex-col sticky top-0 left-0 md:w-20 md:hover:w-56 lg:hover:w-64 lg:w-64 h-[98vh] box-border rounded-xl m-2 p-4">
          <div className="h-64 whitespace-nowrap hidden group-hover/outer:block lg:block">
            <Logo className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 text-3xl lowercase" />
            <hr className="mt-4 border-slate-500/30" />
          </div>
          <div className="h-64 group-hover/outer:hidden block text-center lg:hidden">
            <span className="text-4xl text-blue-500">dL</span>
            <hr className="mt-4 border-slate-500/30" />
          </div>
          <div className="flex-1 w-full flex flex-col gap-y-4">
            {sections.map((section, index) => {
              if (index === 3) {
                return (
                  <>
                    <DashboardSidebarButton
                      divClass="search_on_deeplex_animate bg-gradient-to-r from-blue-500/30 hover:from-blue-500/40 to-violet-500 hover:to-violet-500/40 justify-center group-hover/outer:justify-start transition lg:justify-start"
                      section={section}
                      textClass="text-slate-100 whitespace-nowrap group-hover:text-slate-600 hidden group-hover/outer:block group-hover/outer:text-base lg:block"
                      iconClass="text-slate-500 group-hover:text-slate-900"
                    />
                  </>
                );
              }
              if (index === 4) {
                return (
                  <div className="mt-auto">
                    <hr />
                    <DashboardSidebarButton
                      divClass="mt-2 justify-center group-hover/outer:justify-start lg:justify-start"
                      section={section}
                      textClass="text-slate-500 whitespace-nowrap group-hover:text-slate-900 hidden group-hover/outer:block group-hover/outer:text-base lg:block"
                      iconClass="text-slate-500 group-hover:text-slate-900"
                    />
                  </div>
                );
              }
              return (
                <DashboardSidebarButton
                  divClass="bg-transparent hover:bg-blue-300 justify-center group-hover/outer:justify-start lg:justify-start"
                  section={section}
                  textClass="text-slate-500 whitespace-nowrap group-hover:text-slate-900 hidden group-hover/outer:block group-hover/outer:text-base lg:block"
                  iconClass="text-slate-500 group-hover:text-slate-900"
                />
              );
            })}
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-x-4 p-2 md:hidden">
          <div className="ml-2">
            <MobileSidebar />
          </div>
          {activeLink == 'spaces' && (
            <div className="flex-1">
              <DashboardSearchbar onSearchTermChanged={() => {}} onSubmit={() => {}} placeholder="Search in projects" />
            </div>
          )}
          <div>
            <Logo className="mr-2 text-transparent bg-gradient-to-r bg-clip-text text-3xl from-blue-500 to-violet-500 font-light lowercase" />
          </div>
        </div>
        <div className="block">
          {activeLink == 'spaces' && (
            <>
              <DashboardSpacesContainer />
            </>
          )}
        </div>
      </div>
    </>
    /*
    <>
      <div className={styles.page__container}>
        <div className={styles.container}>
          <div className={styles.sidebar__container}>
            {user && (
              <div className={styles.avatar__container}>
                <Avatar size="2xl" src={user.photoURL} />
                <span className={styles.user_name}>{user.displayName}</span>
                <span className={styles.user_email}>{user.email}</span>
              </div>
            )}
            <div className={styles.links__container}>
              <button
                onClick={() => changeActiveLink('spaces')}
                className={`${styles.spaces_sidebar_button} ${activeLink === 'spaces' && styles.active}`}
              >
                Projeler
              </button>
              <button
                onClick={() => changeActiveLink('saved')}
                className={`${styles.saved_documents_button} ${activeLink === 'saved' && styles.active}`}
              >
                Kaydedilenler
              </button>
              <button className={styles.search_button} onClick={() => router.push('/search')}>
                DeepLex'te Arayın
              </button>
              <button className={styles.logout_button} onClick={handleLogout}>
                Çıkış Yap
              </button>
            </div>
            <div className={styles.footer}>&copy; 2023. All rights reserved.</div>
          </div>
          {activeLink === 'spaces' && (
            <div className={styles.spaces__container}>
              <DashboardSpacesContainer />
            </div>
          )}
          {activeLink === 'saved' && (
            <div className={styles.spaces__container}>
              <DashboardBookmarksContainer />
            </div>
          )}
        </div>
      </div>
    </>
    */
  );
}

export default DashboardPage;
