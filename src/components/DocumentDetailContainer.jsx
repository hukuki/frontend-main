import React from 'react';

function DocumentDetailContainer({ children }) {
  const [leftChild, middleChild] = children;
  return (
    <div className="bg-[url('/_next/static/media/background-image.0998aa28.png')] bg-no-repeat bg-fixed">
      <div className="min-w-full p-2 md:p-4 relative flex items-center justify-center">
        <div className="flex flex-col 2xl:flex-row gap-4 justify-start items-stretch">
          <div className="relative">
            <div className="sticky top-2 left-0">{leftChild}</div>
          </div>
          <div className="flex-1">{middleChild}</div>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetailContainer;
