import React from 'react';

function DocumentDetailContainer({ children }) {
  const [leftChild, middleChild] = children;
  return (
    <div >
      <div className="min-w-full p-2 md:p-4 relative flex items-center justify-center mt-8">
        <div className="flex flex-col 2xl:flex-row gap-4 justify-start items-stretch">
          <div className="flex shadow shadow-black shadow-slate-50">{leftChild}</div>
          <div className="relative">
            <div className="sticky top-2 left-0">{middleChild}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetailContainer;
