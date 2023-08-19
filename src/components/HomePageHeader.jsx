import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { NavLink } from './NavLink';
import { Logo } from './Logo';
import { Button } from './Button';
import clsx from 'clsx';
import useAuthContext from '../context/AuthContextProvider';

function MobileNavLink({ href, children, ...props }) {
  return (
    <Popover.Button as={href ? Link : Button} href={href && href} className="block w-full p-2" {...props}>
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth={2} strokeLinecap="round">
      <path d="M0 1H14M0 7H14M0 13H14" className={clsx('origin-center transition', open && 'scale-90 opacity-0')} />
      <path d="M2 2L12 12M12 2L2 12" className={clsx('origin-center transition', !open && 'scale-90 opacity-0')} />
    </svg>
  );
}

function MobileNavigation({ user, logout }) {
  return (
    <Popover>
      <Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center outline-none" aria-label="Toggle Navigation">
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#pricing">Product</MobileNavLink>
            <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
            {user ? (
              <>
                <hr className="m-2 border-slate-300/40" />
                <MobileNavLink onClick={() => logout()}>Sign in</MobileNavLink>
              </>
            ) : (
              <>
                <hr className="m-2 border-slate-300/40" />
                <MobileNavLink href="/login">Sign in</MobileNavLink>
              </>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header() {
  const { user, signOutWithGoogle } = useAuthContext();

  const handleLogout = async () => {
    await signOutWithGoogle();
  };

  return (
    <header className="py-6">
      <Container>
        <nav className="relative z-50 flex justify-between items-baseline">
          <div className="flex items-center justify-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo //className="font-light lowercase text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-400 via-violet-700 to-indigo-900" 
              />
            </Link>
          </div>
          <div className="flex items-center justify-end md:gap-x-6">
            <div className="hidden md:flex items-center md:gap-6">
            
            </div>{' '}
            <div className="flex items-center gap-x-5 md:gap-x-6">
              {user ? (
                <>
                  <div className="hidden md:block" onClick={handleLogout}>
                    <NavLink>Çıkış yapın</NavLink>
                  </div>
                  <Button href="/dashboard" color="blue">
                    <span>Projelerime git</span>
                  </Button>
                </>
              ) : (
                <>
                  <div className="hidden md:block">
                    <NavLink href="/login">Giriş Yapın</NavLink>
                    <NavLink href="/register">Kaydolun</NavLink>
                  </div>
                  <Button href="/register" color="blue">
                    <span>Başlayın</span>
                  </Button>
                </>
              )}
              <div className="-mr-1 md:hidden">
                <MobileNavigation user={user} logout={signOutWithGoogle} />
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

/*
  <NavLink href="#features">Features</NavLink>
              <NavLink href="#product">Product</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>

*/