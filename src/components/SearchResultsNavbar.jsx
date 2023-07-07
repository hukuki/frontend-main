import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';
import clsx from 'clsx';
function SearchResultsNavbar({ divClass }) {
  return (
    <div className="p-2 bg-white shadow-md rounded-b-lg">
      <div className={clsx('mx-auto', divClass)}>
        <Link href="/">
          <Logo className="ml-2 cursor-pointer lowercase text-transparent bg-clip-text bg-gradient-to-r inline-block from-blue-400 to-indigo-900 text-3xl font-light" />
        </Link>
      </div>
    </div>
  );
}

export default SearchResultsNavbar;
