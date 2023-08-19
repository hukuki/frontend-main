import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Disclosure, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

function Index({ document }) {
  return (
    <div className="max-w-md flex flex-col gap-2 bg-white rounded-lg shadowp-4">
      <div className="">
        <IndexArticle article={document} />
      </div>
    </div>
  );
}

function IndexArticle({ article }) {
  if (article.children && article.children.length > 0) {
    return (
      <div className={clsx('flex flex-col gap-2 ml-2')}>
        <h1 className="text-lg font-semibold tracking-tight text-blue-800">{article && article.articleTitle}</h1>
        <div className="ml-2">{article.children.length > 0 && article.children.map((child) => <IndexArticle article={child} />)}</div>
        <hr className="rounded-lg mb-4"></hr>
      </div>
    );
  }
  return <h1>{article && article.articleTitle}</h1>;
}

function MobileIndexArticle({ article }) {
  if (article.children && article.children.length > 0) {
    return (
      <Disclosure as="div" className="">
        {({ open }) => (
          <>
            <Disclosure.Button className="bg-white w-full mb-2 p-2 rounded-lg shadowtext-start text-lg font-light tracking-tight flex items-center gap-2">
              <h1>{article.articleTitle}</h1>
              <div className={clsx('transition-all text-md text-slate-500', open && 'rotate-180')}>
                <FaChevronDown />
              </div>
            </Disclosure.Button>
            <Transition
              className="overflow-hidden"
              enter="transition-all ease-in-out duration-[500ms]"
              enterFrom="transform  max-h-0"
              enterTo="transform  max-h-[1000px]"
              leave="transition-all ease-in-out duration-[200ms]"
              leaveFrom="transform  max-h-[1000px]"
              leaveTo="transform  max-h-0"
            >
              <Disclosure.Panel as="div" className="">
                {article.children.map((child) => (
                  <MobileIndexArticle article={child} />
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    );
  } else {
    return (
      <div className=" w-full ml-2 text-start text-lg tracking-tight">
        <h1>{article.articleTitle}</h1>
      </div>
    );
  }
}

function MobileIndex({ document }) {
  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <Disclosure.Button className="min-w-full text-start rounded-lg bg-white p-2 shadow flex gap-2 items-center">
            <div className={clsx('transition-all text-md text-slate-500', open && 'rotate-180')}>
              <FaChevronDown />
            </div>
          </Disclosure.Button>
          <Transition
            className="overflow-hidden"
            enter="transition-all ease-in-out duration-[500ms]"
            enterFrom="transform  max-h-0"
            enterTo="transform  max-h-[1000px]"
            leave="transition-all ease-in-out duration-[200ms]"
            leaveFrom="transform  max-h-[1000px]"
            leaveTo="transform  max-h-0"
          >
            <Disclosure.Panel as="div" className="bg-white/80 p-2 mt-2 rounded-lg shadow">
              <div className="box-border">
                {document && document.children.map((child) => <MobileIndexArticle key={child.articleTitle} article={child} />)}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

function DocumentDetailIndex({ document }) {
  useEffect(() => {
    if (document) {
      console.log(document.children);
    }
  }, []);
  // return <h1>Hello World</h1>;
  return (
    <div className="shadow shadow-slate-400">
      <div className="2xl:hidden">
        <MobileIndex document={document} />
      </div>
      <div className="hidden 2xl:block max-h-[1000px] overflow-auto rounded-lg">
        <Index document={document} />
      </div>
    </div>
  );
}

export default DocumentDetailIndex;
