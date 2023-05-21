import React, { useEffect } from 'react';
import styles from './SpaceDetailBookmarkCard.module.css';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';

function SpaceDetailBookmarkCard({ document }) {
  const router = useRouter();
  useEffect(() => {
    extractDocument();
  });
  const extractContent = (c) => {
    if (c.type === 'header') {
      return c.content;
    }
    if (c.type === 'madde') {
      let cons = c.maddeStr;
      if (c.subsections.length > 0) {
        cons = cons + extractContent(c.subsections);
      }
      return cons;
    }
    return c.content;
  };
  const extractDocument = () => {
    const str = document.content.reduce((str, c) => str + extractContent(c), '');
    return str;
  };

  const handleRemoveDocument = (e) => {
    e.stopPropagation();
  };

  const handleAddDocument = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          router.push(`document/${document._id}`);
        }}
      >
        <div className={styles.card_line}></div>
        <div className={styles.detail_space_card__container}>
          <div className={styles.card_header__container}>
            <h1 className={styles.card_header}>{document.metadata.mevAdi}</h1>
            <div className={styles.card_actions__container}>
              <button className={styles.remove_button} onClick={(e) => handleRemoveDocument(e)}>
                <FaTrashAlt />
              </button>
              <button className={styles.add_space_button} onClick={(e) => handleAddDocument(e)}>
                <FaPlus />
              </button>
            </div>
          </div>
          <div className={styles.metadata__container}>
            <p className={styles.metadata_date}>
              RG. {document.metadata.resmiGazeteTarihi} / {document.metadata.resmiGazeteSayisi}
            </p>
            <p className={styles.metadata_no}>Mevzuat No: {document.metadata.mevzuatNo}</p>
            <p className={styles.metadata_type}>Tür: {document.metadata.mevzuatTurEnumString}</p>
          </div>
          <div className={styles.content__container}>
            <p className={styles.content}>{extractDocument().split('').slice(0, 1000)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpaceDetailBookmarkCard;
