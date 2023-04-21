import React, { useEffect, useRef } from 'react';
import styles from './SearchResultCard.module.css';

export const SearchResultCard = ({ document, reveal }) => {
  const ref = reveal !== undefined ? useRef(null) : null;

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

  return (
    <div ref={ref || null} className={styles['container']}>
      <div className={styles['container__line']}></div>
      <div className={styles['result-card__container']}>
        <h4 className={styles['result-card__title']}>{document.meta.title}</h4>
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
