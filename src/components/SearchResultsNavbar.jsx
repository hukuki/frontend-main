import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';
import clsx from 'clsx';
import useAuthContext from '../context/AuthContextProvider';
import { useRouter } from 'next/router';
function SearchResultsNavbar({ divClass }) {
  const router = useRouter();
  const { user } = useAuthContext();
  return (
    <div className="bg-white shadow-md rounded-b-lg w-full p-2">
      <div className={clsx('flex justify-between mx-auto', divClass)}>
        <div>
          <Link href="/">
            <Logo className="cursor-pointer lowercase text-transparent bg-clip-text bg-gradient-to-r inline-block from-blue-400 to-indigo-900 text-3xl font-light" />
          </Link>
        </div>
        {user ? (
          <button className="bg-blue-500 py-2 px-4 rounded-full text-sm text-white hover:bg-blue-600" onClick={() => router.push('/dashboard')}>
            Go to dashboard
          </button>
        ) : (
          <div className="flex items-center justify-start gap-2">
            <button className="text-lg font-medium hover:text-blue-500" onClick={() => router.push('/register')}>
              Register
            </button>
            <button className="text-lg font-medium hover:text-blue-500" onClick={() => router.push('/login')}>
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultsNavbar;
