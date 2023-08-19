import React, { useEffect, useMemo, useState } from 'react';
import { FaRegBookmark, FaBookmark, FaPlus, FaShare } from 'react-icons/fa';
import useAuthContext from '../context/AuthContextProvider';
import AddDocumentToSpaceModal from './AddDocumentToSpaceModal';
import useBookmarkStore from '../store/bookmarkStore';

export const SearchResultCard = ({ document, onCardClick, isBookmarked }) => {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeBookmark = async () => {
    if (user) {
      if (!isBookmarked) {
        const response = await fetch('/api/create_bookmark', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: user.accessToken,
            bookmarks: [document.meta.doc_id],
          }),
        });
        const { error, data } = await response.json();
        console.log(data);
        if (!error) {
          addBookmark(document.meta.doc_id);
        }
      } else {
        const response = await fetch('/api/delete_bookmark', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: user.accessToken,
            bookmarkId: document.meta.doc_id,
          }),
        });
        const { error, data } = await response.json();
        console.log(data);
        if (!error) {
          removeBookmark(document.meta.doc_id);
        }
      }
    }
  };

  return (
    <>
      <AddDocumentToSpaceModal open={isModalOpen} onClose={closeModal} documentId={document.meta.doc_id} />
      <>
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
                    changeBookmark();
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
      </>
    </>
  );
};

export default SearchResultCard;
