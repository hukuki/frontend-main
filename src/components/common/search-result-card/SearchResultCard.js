import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchResultCard.module.css';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

export const SearchResultCard = ({ document, reveal, onBookmarkAdd, onBookmarkRemove }) => {
  const ref = reveal !== undefined ? useRef(null) : null;

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (reveal !== undefined) {
      async function animate() {
        if (ref.current) {
          const sr = (await import('scrollreveal')).default;
          sr().reveal(ref.current, reveal);
        }
      }
      animate();
    }
  }, []);

  const handleBookmarkChange = (e) => {
    e.stopPropagation();
    if (bookmarked) {
      onBookmarkRemove(document);
    } else {
      onBookmarkAdd(document);
    }
    setBookmarked((prev) => !prev);
  };

  return (
    <div ref={ref || null} className={styles['container']}>
      <div className={styles['container__line']}></div>
      <div className={styles['result-card__container']}>
        <div className={styles['result-card__header-container']}>
          <h4 className={styles['result-card__title']}>{document.meta.title}</h4>
          <div className={styles['result-card__bookmark-icons-container']} onClick={handleBookmarkChange}>
            {bookmarked ? <FaBookmark className={styles['bookmark-icon']} /> : <FaRegBookmark className={styles['bookmark-icon']} />}
          </div>
        </div>
        <div className={styles['result-card__metadata-container']}>
          <p className={styles['metadata__date-number']}>
            RG. {document.meta.resmiGazeteTarihi} / {document.meta.resmiGazeteSayisi}
          </p>
          <p className={styles['metadata__mevzuat-no']}>Mevzuat No: {document.meta.mevzuatNo}</p>
          <p className={styles['metadata__document-type']}>Tür: {document.meta.mevzuatTurEnumString}</p>
        </div>
        <div className={styles['result-card__content-container']}>
          <p className={styles['content__paragraph']}>{document.content.split(' ').slice(0, 100).join(' ')} ...</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
