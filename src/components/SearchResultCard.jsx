import React, { useEffect, useMemo, useState } from 'react';
import { FaRegBookmark, FaBookmark, FaPlus, FaShare } from 'react-icons/fa';
import useAuthContext from '../context/AuthContextProvider';
import AddDocumentToSpaceModal from './AddDocumentToSpaceModal';

export const SearchResultCard = ({ document, onCardClick }) => {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isBookmarked = useMemo(() => {
    if (bookmarkStates) {
      return bookmarkStates.get(document.meta.doc_id);
    }
  }, [bookmarkStates]);

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
        console.log('DATA');
        console.log(data);
        changeBookmarkState(document.meta.doc_id, data);
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
        documentId: document.meta.doc_id,
        accessToken: user.accessToken,
      }),
    });
    const { error, data } = await res.json();
    console.log(data);
    console.log(error);
    if (!error) {
      changeBookmarkState(document.meta.doc_id, true);
    }
  };

  const handleRemoveBookmark = async (e) => {
    e.stopPropagation();
    const res = await fetch('/api/delete_bookmark_by_document', {
      method: 'DELETE',
      body: JSON.stringify({
        documentId: document.meta.doc_id,
        accessToken: user.accessToken,
      }),
    });
    const { error, data } = await res.json();
    if (!error) {
      changeBookmarkState(document.meta.doc_id, false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddDocumentToSpaceModal open={isModalOpen} onClose={closeModal} documentId={document.meta.doc_id} />
      <a target="_blank" href={`https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?${document.meta.url.slice(8)}`}>
        <div className="border-l-4 p-2 border-blue-500 bg-white rounded-md cursor-pointer shadow-md" onClick={() => {}}>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex justify-between items-center">
              <span className="flex-1 text-md font-semibold tracking-tight text-blue-900 inline-block">{document.meta.mevAdi}</span>
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
                    if (isBookmarked) {
                      handleRemoveBookmark(e);
                    } else {
                      handleAddBookmark(e);
                    }
                  }}
                >
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </div>
              </div>
            </div>
            <hr className="w-1/2 h-1/2 bg-blue-100" />
            <div className="flex items-center justify-start gap-2">
              <span className=" max-w-sm font-medium">
                RG. {document.meta.resmiGazeteTarihi} / {document.meta.resmiGazeteSayisi}
              </span>
              <span className=" max-w-sm font-medium">Mevzuat No: {document.meta.mevzuatNo}</span>
              <span className=" max-w-sm font-medium">Tür: {document.meta.mevzuatTurEnumString}</span>
            </div>
            <p className="text-slate-700 text-md font-normal">{document.content.split(' ').slice(0, 100).join(' ')}...</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default SearchResultCard;
