import React, { useEffect, useState } from 'react';
import styles from './SpaceDetailBookmarkCard.module.css';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import useAuthContext from '../../../context/AuthContextProvider';
import AddToSpaceModal from '../add-to-space-modal/AddToSpaceModal';
import { motion } from 'framer-motion';

const card = {
  hover: {
    scale: 1.01,
    transition: {
      ease: 'easeIn',
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

function SpaceDetailBookmarkCard({ bookmark, onRemove }) {
  const document = bookmark.document;
  const router = useRouter();
  const { user } = useAuthContext();
  const [isAddToSpaceModalOpen, setIsAddToSpaceModalOpen] = useState(false);

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

  const handleRemoveDocument = async (e) => {
    e.stopPropagation();
    if (user) {
      const res = await fetch('/api/delete_bookmark_from_space', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
          bookmarkId: bookmark._id,
          spaceId: bookmark.space,
        }),
      });
      const { error, data } = await res.json();
      console.log(error);
      console.log(data);
      if (!error) {
        onRemove();
      }
    }
  };

  const handleAddToSpace = (e) => {
    e.stopPropagation();
    setIsAddToSpaceModalOpen(true);
  };
  return (
    <>
      {isAddToSpaceModalOpen && <AddToSpaceModal documentId={document._id} setIsOpen={setIsAddToSpaceModalOpen} />}
      <motion.div
        className={styles.motion_div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        variants={card}
        whileHover="hover"
        whileTap="tap"
        zIndex={-1}
        onClick={() => {}}
      >
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
                <button className={styles.add_space_button} onClick={(e) => handleAddToSpace(e)}>
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
      </motion.div>
    </>
  );
}

export default SpaceDetailBookmarkCard;
