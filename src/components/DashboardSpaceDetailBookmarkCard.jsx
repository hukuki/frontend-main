import React, { useEffect, useMemo, useState } from 'react';
import { FaRegBookmark, FaBookmark, FaPlus, FaShare } from 'react-icons/fa';
import useAuthContext from '../context/AuthContextProvider';
import AddDocumentToSpaceModal from './AddDocumentToSpaceModal';

export const DashboardSpaceDetailBookmarkCard = ({ document, onCardClick }) => {
  const { user } = useAuthContext();

  const [bookmarked, setBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const content = useMemo(() => {
    return document.content.map((cont) => cont.content).join('\n');
  }, []);

  useEffect(() => {
    async function fetchBookmarkStatus() {
      const res = await fetch('/api/get_bookmark_status', {
        method: 'POST',
        body: JSON.stringify({
          documentId: document.metadata.doc_id,
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

  const handleAddBookmark = async (e) => {
    e.stopPropagation();
    const res = await fetch('/api/create_bookmark', {
      method: 'POST',
      body: JSON.stringify({
        documentId: document.metadata.doc_id,
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

  const handleRemoveBookmark = async (e) => {
    e.stopPropagation();
    const res = await fetch('/api/delete_bookmark_by_document', {
      method: 'DELETE',
      body: JSON.stringify({
        documentId: document.metadata.doc_id,
        accessToken: user.accessToken,
      }),
    });
    const { error, data } = await res.json();
    if (!error) {
      setBookmarked(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddDocumentToSpaceModal open={isModalOpen} onClose={closeModal} documentId={document.metadata.doc_id} />
      <div
        className="border-l-4 border-blue-500 bg-white rounded-md cursor-pointer shadow-md overflow-hidden aspect-square transition-all duration-300 ease-in hover:scale-[1.02] hover:shadow-lg"
        onClick={onCardClick}
      >
        <div className="flex flex-col gap-2 p-2">
          <div className="flex justify-between items-center">
            <span className="flex-1 text-md font-semibold tracking-tight text-blue-900 inline-block">{document.metadata.mevAdi}</span>
            <div
              className="flex items-center justify-center text-lg text-blue-500 gap-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="hover:text-blue-700" onClick={() => setIsModalOpen(true)}>
                <FaPlus />
              </div>
              <div
                className="hover:text-blue-700"
                onClick={(e) => {
                  if (bookmarked) {
                    handleRemoveBookmark(e);
                  } else {
                    handleAddBookmark(e);
                  }
                }}
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </div>
            </div>
          </div>
          <hr className="w-1/2 h-1/2 bg-blue-100" />
          <div className="flex items-center justify-start gap-2">
            <span className=" max-w-sm font-medium">
              RG. {document.metadata.resmiGazeteTarihi} / {document.metadata.resmiGazeteSayisi}
            </span>
            <span className=" max-w-sm font-medium">Mevzuat No: {document.metadata.mevzuatNo}</span>
            <span className=" max-w-sm font-medium">Tür: {document.metadata.mevzuatTurEnumString}</span>
          </div>
          <p className="text-slate-700 text-md font-normal">{content.split(' ').slice(0, 100).join(' ')}</p>
        </div>
      </div>
    </>
    /*
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
                onClick={(e) => {
                  if (bookmarked) {
                    handleRemoveBookmark(e);
                  } else {
                    handleAddBookmark(e);
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
    */
  );
};

export default DashboardSpaceDetailBookmarkCard;
