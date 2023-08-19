import React from 'react';
import lawBook from '@/images/law-book.png';
import magnifier from '@/images/magnifying-glass.png';
import Image from 'next/image';
function MagnifierBookLoading() {
  return (
    <div className="relative flex items-center justify-center">
      <div>
        <Image src={lawBook} className="max-w-[10rem] aspect-auto" />
      </div>
      <div className="circular_path_animation max-w-[5rem] max-h-[5rem] absolute top-0 left-0 right-0 bottom-0 m-auto">
        <Image src={magnifier} className="max-w-[5rem] aspect-auto" />
      </div>
    </div>
  );
}

export default MagnifierBookLoading;
