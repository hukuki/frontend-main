import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchResultCard.module.css';
import { FaRegBookmark, FaBookmark, FaPlus, FaShare } from 'react-icons/fa';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import useAuthContext from '../../../context/AuthContextProvider';
import AddToSpaceModal from '../add-to-space-modal/AddToSpaceModal';

export const SearchResultCard = ({ document, reveal, onAddToSpace }) => {
  const { user } = useAuthContext();

  useEffect(() => {
    /*
    console.log(document);
    */
  });

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

  useEffect(() => {
    console.log(document);
  });

  useEffect(() => {
    async function fetchBookmarkStatus() {
      const res = await fetch('/api/get_bookmark_status', {
        method: 'POST',
        body: JSON.stringify({
          documentId: document.meta.doc_id,
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await res.json();
      console.log(data);
      if (!error && data.length > 0) {
        setBookmarked(true);
      }
    }
    if (user) {
      fetchBookmarkStatus();
    }
  }, [user]);

  const handleAddBookmark = async () => {
    console.log(document.id);
    const res = await fetch('/api/create_bookmark', {
      method: 'POST',
      body: JSON.stringify({
        documentId: document.meta.doc_id,
        accessToken: user.accessToken,
      }),
    });
    const { error, data } = await res.json();
    console.log(data);
    console.log(error);
    if (!error) {
      setBookmarked(true);
    }
  };

  const handleRemoveBookmark = async () => {
    const res = await fetch('/api/delete_bookmark_by_document', {
      method: 'DELETE',
      body: JSON.stringify({
        documentId: document.meta.doc_id,
        accessToken: user.accessToken,
      }),
    });
    const { error, data } = await res.json();
    console.log(error);
    console.log(data);
    if (!error) {
      setBookmarked(false);
    }
  };

  return (
    <>
      <div ref={ref || null} className={styles['container']}>
        <div className={styles['container__line']}></div>
        <div className={styles['result-card__container']}>
          <div className={styles['result-card__header-container']}>
            <h4 className={styles['result-card__title']}>{document.meta.mevAdi}</h4>
            <div className={styles.action_icons__container}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Menu
                  className={styles.space_button__container}
                  menuButton={
                    <MenuButton className={styles.space_button}>
                      <FaPlus />
                    </MenuButton>
                  }
                  transition
                >
                  <MenuItem
                    value="space"
                    onClick={(e) => {
                      onAddToSpace();
                    }}
                    className={styles.space_button_item}
                  >
                    Projeye Ekle
                  </MenuItem>
                </Menu>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={styles.share_button}
              >
                <FaShare />
              </button>
              <div
                className={styles['result-card__bookmark-icons-container']}
                onClick={() => {
                  if (bookmarked) {
                    handleRemoveBookmark();
                  } else {
                    handleAddBookmark();
                  }
                }}
              >
                {bookmarked ? <FaBookmark className={styles['bookmark-icon']} /> : <FaRegBookmark className={styles['bookmark-icon']} />}
              </div>
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
    </>
  );
};

export default SearchResultCard;
