import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Style
import styles from './DocumentDetailSidebar.module.css';
import { FaShare, FaPlus, FaRegBookmark, FaBookmark, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import useAuthContext from '../../../context/AuthContextProvider';

const DocumentDetailSidebar = ({ document, onAddToSpace }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    async function fetchBookmark(documentId) {
      const res = await fetch('/api/get_bookmark_status', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
          documentId: documentId,
        }),
      });
      const { error, data } = await res.json();
      if (!error && data.isBookmarked) {
        setIsBookmarked(true);
        setBookmarkId(data.bookmarkId);
      }
    }
    if (user) {
      fetchBookmark(router.query.documentId);
    }
  }, [user]);

  const handleAddBookmark = async () => {
    if (user) {
      const res = await fetch('/api/create_bookmark', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
          documentId: router.query.documentId,
        }),
      });
      const { error, data } = await res.json();
      console.log(data);
      console.log(error);
      if (!error) {
        setIsBookmarked(true);
        setBookmarkId(data._id);
      }
    }
  };

  const handleRemoveBookmark = async () => {
    if (user) {
      const res = await fetch('/api/delete_bookmark', {
        method: 'DELETE',
        body: JSON.stringify({
          accessToken: user.accessToken,
          bookmarkId: bookmarkId,
        }),
      });
      const { error, data } = await res.json();
      console.log(data);
      if (!error) {
        setIsBookmarked(false);
        setBookmarkId(null);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar__container}>
        <div className={styles.back_button__container}>
          <button className={styles.back_button} onClick={() => router.back()}>
            <div className={styles.back_icon}>
              <FaArrowLeft />
            </div>
            Aramaya Dön
          </button>
        </div>
        <div className={styles.document_actions__container}>
          <button className={styles.add_space_button} onClick={onAddToSpace}>
            <FaPlus className={styles.add_space_icon} />
            <p className={styles.add_space_title}>Projeye Ekle</p>
          </button>
          <button
            className={styles.save_button}
            onClick={async () => {
              if (isBookmarked) {
                await handleRemoveBookmark();
              } else {
                await handleAddBookmark();
              }
            }}
          >
            {isBookmarked ? (
              <>
                <FaBookmark className={styles.save_icon} />
                <p className={styles.save_title}>Kaldır</p>
              </>
            ) : (
              <>
                <FaRegBookmark className={styles.save_icon} />
                <p className={styles.save_title}>Kaydet</p>
              </>
            )}
          </button>
          <button className={styles.share_button}>
            <FaShare className={styles.share_icon} />
            <p className={styles.share_title}>Paylaş</p>
          </button>
        </div>
        <div className={styles.sidebar_content__container}>
          <div className={styles.document_info__container}>
            <h1 className={styles.title}>Doküman Bilgileri</h1>
            <p className={styles.info}>RG. {`${document.metadata.resmiGazeteTarihi} / ${document.metadata.resmiGazeteSayisi}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailSidebar;
