import { useEffect } from 'react';
import SearchResultCard from './SearchResultCard';
import { motion } from 'framer-motion';
import useBookmarkStore from '../store/bookmarkStore';
import useAuthContext from '../context/AuthContextProvider';

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0, // this will set a delay before the children start animating
      staggerChildren: 0.3, // this will set the time inbetween children animation
    },
  },
};
export const dropUpVariants = {
  hidden: {
    x: '100vw',
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
    },
  },
};

function SearchResultCardsContainer({ results }) {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);
  const setBookmarks = useBookmarkStore((state) => state.setBookmarks);
  const { user } = useAuthContext();

  const getBookmarkStatus = async () => {
    try {
      const response = await fetch('/api/get_bookmarks', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await response.json();
      if (!error) {
        setBookmarks(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getBookmarkStatus();
    }
  }, [user]);

  useEffect(() => {
    console.log(bookmarks);
  }, [bookmarks]);

  return (
    <motion.div layout variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
      {results.map((document) => (
        <motion.div key={document._id} variants={dropUpVariants}>
          <SearchResultCard
            onCardClick={() => handleCardClick(document.meta.doc_id)}
            document={document}
            onAddToSpace={() => {}}
            isBookmarked={bookmarks.get(document.meta.doc_id) ? true : false}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default SearchResultCardsContainer;
