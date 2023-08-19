import { useState } from 'react';
import { useRouter } from 'next/router';
// Components
import Searchbar from '../../components/Searchbar';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import clsx from 'clsx';
import useAuthContext from '../../context/AuthContextProvider';
import Head from 'next/head';

const SearchPage = () => {
  const [searchAlgo, setSearchAlgo] = useState('ai');
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSubmit = (query) => {
    router.push(`/search-results?search=${query}&model=${searchAlgo}`);
  };

  return (
    <>
      <Head>
        <title>casevisor | Arama Yapın </title>
      </Head>
      <div className="flex flex-col overflow-hidden max-h-screen">
        <div className="flex items-center justify-start gap-4 p-4 shadow-md">
          {user ? (
            <>
              <button className="hover:text-blue-500" onClick={() => router.push('/dashboard')}>
              Projelerim
              </button>
            </>
          ) : (
            <>
              <button className="hover:text-blue-500" onClick={() => router.push('/register')}>
              Kaydol
              </button>
              <button className="hover:text-blue-500" onClick={() => router.push('/login')}>
              Giriş Yap
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-6 items-center justify-center h-screen w-screen p-6">
          <div className="w-full flex justify-center">
            <Logo className="text-transparent text-5xl md:text-6xl font-semibold lowercase bg-clip-text bg-gradient-to-r from-blue-500 to-fuchsia-900" />
          </div>
          <div className="min-w-full">
            <Searchbar onSubmit={handleSubmit} />
          </div>
          <div className="flex justify-center gap-x-4">
            <Button
              variant={searchAlgo === 'ai' ? 'solid' : 'outline'}
              className={clsx('text-lg', searchAlgo === 'ai' ? 'bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-500 advanced_button_animate' : '')}
              onClick={() => setSearchAlgo('ai')}
            >
              <span>Gelişmiş Arama</span>
            </Button>
            <Button color="blue" variant={searchAlgo === 'bm25' ? 'solid' : 'outline'} className="text-lg" onClick={() => setSearchAlgo('bm25')}>
            Klasik Arama
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
