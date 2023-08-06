import { useState, useEffect, useRef, Fragment } from 'react';

import SearchResultsSearchbar from '../../components/SearchResultsSearchbar';
import SearchResultsNavbar from '../../components/SearchResultsNavbar';
import SearchResultsFilters from '../../components/SearchResultsFilters';
import SearchResultCard from '../../components/SearchResultCard';
import { useRouter } from 'next/router';
import { FaAngleDown } from 'react-icons/fa';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import clsx from 'clsx';
import useAuthContext from '../../context/AuthContextProvider';
import SearchResultCardsContainer from '../../components/SearchResultCardsContainer';
import MagnifierBookLoading from '../../components/MagnifierBookLoading';

function SearchMethodsPopover({ onAdvancedClick, onClassicClick, ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-10">
      <button
        className={clsx(
          'ouline-none focus:outline-none flex items-center justify-between p-2 gap-2 hover:bg-slate-100 cursor-pointer rounded-md',
          open && 'bg-slate-100'
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-md font-semibold text-slate-700">Search Methods</span>
        <div className={clsx('transition-all duration-100 ease-in', open ? 'rotate-180' : 'rotate-0')}>
          <FaAngleDown />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="methods"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-5 mt-6 flex origin-top flex-col items-start gap-2 rounded-lg bg-white py-4 px-6 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <button className="group" onAdvancedClick={onAdvancedClick}>
              <span className="advanced_button_animate text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-orange-500 to-purple-900 group-hover:text-blue-500 whitespace-nowrap">
                Advanced / AI
              </span>
            </button>
            <button className="group " onClassicClick={onClassicClick}>
              <span className="group-hover:text-blue-500">Classic</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SearchResultsPage = ({ data, query, algo }) => {
  const [results, setResulsts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchAlgo, setSearchAlgo] = useState(algo);
  const { user } = useAuthContext();

  useEffect(() => {
    if (router.isReady) {
      const timer = setTimeout(() => {
        setResulsts(data.documents);
        setLoading(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const router = useRouter();

  const handleSearchSubmit = (query) => {
    router.push(`/search-results?model=${searchAlgo}&search=${query}`);
  };

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            className="min-w-screen min-h-screen flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MagnifierBookLoading />
          </motion.div>
        ) : (
          <LayoutGroup layout>
            <div className="flex flex-col max-h-content bg-neutral-100 relative">
              <div>
                <SearchResultsNavbar divClass="md:max-w-4xl" />
              </div>
              <div className="relative flex flex-col-reverse lg:flex-row lg:gap-2 p-2 mx-auto md:mt-4 items-start max-w-4xl">
                <div className="flex flex-col gap-2 md:gap-4 max-w-3xl">
                  <div className="flex flex-1 gap-4 items-center justify-center bg-white rounded-lg p-2 sticky top-2 left-0 shadow-md">
                    <div className="flex-1">
                      <SearchResultsSearchbar onSearchChange={setSearchQuery} initialSearch={query} onSubmit={handleSearchSubmit} />
                    </div>
                    <div>
                      <SearchMethodsPopover onAdvancedClick={() => setSearchAlgo('ai')} onClassicClick={() => setSearchAlgo('bm25')} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:gap-4">
                    {!loading && results && (
                      <>
                        <span className="mb text-slate-500 font-medium">All results {`(${results.length})`}</span>
                        <SearchResultCardsContainer results={results} />
                      </>
                    )}
                  </div>
                </div>
                <motion.div className="w-full lg:w-12 lg:h- block lg:sticky lg:left-0 lg:top-2 mb-2 box-border">
                  <SearchResultsFilters />
                </motion.div>
              </div>
            </div>
          </LayoutGroup>
        )}
      </AnimatePresence>
    </>
  );
};

export async function getServerSideProps(context) {
  const backend_url = process.env.BACKEND_URL;
  const search = context.query.search && context.query.search.split('%20').join(' ');
  const algo = context.query.model ? context.query.model : 'ai';
  const body = { query: search };
  try {
    const res = await fetch(`${backend_url}/query?model=${algo}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return {
      props: { data, query: search, algo },
    };
  } catch (err) {
    console.log(err);
    return { props: { data: new Array(10).fill({}), query: search, algo } };
  }
}

export default SearchResultsPage;
