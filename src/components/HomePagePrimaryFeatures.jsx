import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from './Container';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import backgroundImage from '@/images/background-features.jpg';

const features = [
  {
    title: 'Belge Arama',
    description:
      'Hangi anahtar kelimeleri seçeceğinizi düşünmeden arama yapabilirsiniz. ',
  },
  {
    title: 'Case Management',
    description:
      'Monetize the cases in one platform. You can save the documents you need for a case and share them with your collegues. You don\'t need to keep track of email attachments anymore.',
  },
  {
    title: 'Document Upload',
    description:
      'Upload the documents you need. You don\'t need to rely on third party solutions anymore. All documents are kept securely and privately for you.',
  },
];

function HomePagePrimaryFeatures() {
  const [tabOrientation, setTabOrientation] = useState('horizontal');
  useEffect(() => {
    let screenWidthQuery = window.matchMedia('min-width: 1024px');

    function onScreenWidthChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal');
    }
    onScreenWidthChange(screenWidthQuery);
    screenWidthQuery.addEventListener('change', onScreenWidthChange);

    return () => {
      screenWidthQuery.removeEventListener('change', onScreenWidthChange);
    };
  }, []);
  return (
    <section
      id="features"
      className="advanced_button_animate bg-gradient-to-tr from-blue-500 via-violet-700 to-indigo-700 relative overflow-hidden pt-20 pb-28 sm:py-32"
    >
      {/*
      <Image
        src={backgroundImage}
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        width={2245}
        height={1636}
        unoptimized
      />
      */}
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">İhtiyacınız olan belgere daha hızlı erişin</h1>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            İhtiyacınız olan her belgeyi mevcut çözümlerden çok daha hızlı ve doğru bir şekilde saklayabilir ve bulabilirsiniz.
          </p>
        </div>
        <Tab.Group
          as="div"
          vertical={tabOrientation === 'vertical'}
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:gri-cols-12 lg:pt-0"
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-auto sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex justify-center w-full gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, index) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full  py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                        selectedIndex === index
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-md sm:text-lg [&:not(:focus-visible)]:focus:outline-none',
                            selectedIndex === index ? 'text-blue-600 lg:text-white' : 'text-blue-100 hover:text-white lg:text-white'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm md:text-md lg:block',
                          selectedIndex === 0 ? 'text-white' : 'text-blue-100 group-hover:text-white'
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
export default HomePagePrimaryFeatures;
