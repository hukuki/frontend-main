import React from 'react';
import img404 from '@/images/custom_error.png';
import Image from 'next/image';
import { Logo } from '../components/Logo';
import { Navbar } from '../components/Navbar';
function Custom404() {
  return (
    <div className="bg-slate-100 min-h-screen min-w-screen overflow-hidden flex flex-col relative">
      <div className="min-w-ful">
        <Navbar />
      </div>
      <div className="flex-1">
        <div className=" absolute top-0 left-0 right-0 bottom-0 m-auto flex flex-col justify-center items-center">
          <Image src={img404} className="max-w-lg md:max-w-xl lg:max-w-2xl h-auto" />
          <span className="tracking-tight text-xl text-blue-900">We couldn't find what you are looking for, yet!</span>
        </div>{' '}
      </div>
    </div>
  );
}

export default Custom404;
