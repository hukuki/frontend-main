import { useEffect } from 'react';
import { useBookmarkStore } from '../store/bookmarkStore';
import SearchResultCard from './SearchResultCard';
import { motion } from 'framer-motion';

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
  const bookmarkStates = useBookmarkStore((state) => state.documentBookmarks);
  const initiateBookmarks = useBookmarkStore((state) => state.initiateBookmarks);

  useEffect(() => {
    const ids = results.map((result) => result.meta.doc_id);
    initiateBookmarks(ids);
  }, []);

  return (
    <motion.div layout variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
      {results.map((document, index) => (
        <motion.div key={index} variants={dropUpVariants}>
          <SearchResultCard onCardClick={() => handleCardClick(document.meta.doc_id)} document={document} onAddToSpace={() => {}} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default SearchResultCardsContainer;
