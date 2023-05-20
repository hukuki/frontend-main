import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './AddToSpaceModal.module.css';
import SpacesSearchbar from '../spaces-searchbbar/SpacesSearchbar';
import useAuthContext from '../../../context/AuthContextProvider';

export const AddToSpaceModal = ({ setIsOpen, documentId }) => {
  const { user } = useAuthContext();
  const [spacesToAdd, setSpacesToAdd] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToSpaceList = (space) => {
    if (spacesToAdd.length > 0) {
      const filtered = spacesToAdd.filter((old_space) => old_space._id === space._id);
      if (filtered.length === 0) {
        setSpacesToAdd((prev) => {
          return [...prev, space];
        });
      } else {
        const removed = spacesToAdd.filter((old_space) => old_space._id !== space._id);
        setSpacesToAdd(removed);
      }
    } else {
      setSpacesToAdd((prev) => {
        return [...prev, space];
      });
    }
  };

  const removeFromSpaceList = (space) => {
    if (spacesToAdd.length > 0) {
      const ids = spacesToAdd.map((s) => s._id);
      if (ids.includes(space._id)) {
        setSpacesToAdd((prev) => {
          return prev.filter((s) => s._id !== space._id);
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && spacesToAdd.length > 0) {
      const spaceIds = spacesToAdd.map((s) => s._id);
      const res = await fetch('/api/add_document_to_spaces', {
        method: 'POST',
        body: JSON.stringify({
          spaceIds,
          documentId: documentId,
        }),
      });
      const { error, data } = await res.json();
      console.log(error, data);
      if (!error) {
      }
    }
  };
  return (
    <>
      <div className={styles.background} onClick={() => setIsOpen(false)}></div>
      <div className={styles.modal__container}>
        <form action="" onSubmit={handleSubmit} autoComplete="off" className={styles.form__container}>
          <div className={styles.header__container}>
            <h1 className={styles.title}>Projeye Ekle</h1>
            <FaTimes className={styles.header__close_button} onClick={() => setIsOpen(false)} />
          </div>
          <div className={styles.inputs__container}>
            <div className={styles.input__container}>
              <label className={styles.input_label} htmlFor="share">
                Proje
              </label>
              <SpacesSearchbar spaceList={spacesToAdd} onAddToSpaceList={addToSpaceList} onRemoveSpaceFromList={removeFromSpaceList} />
            </div>
          </div>
          <div className={styles.buttons__container}>
            <button type="submit" className={styles.save__button} onClick={handleSubmit}>
              Ekle
            </button>
            <button className={styles.close__button} onClick={() => setIsOpen(false)}>
              Kapat
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddToSpaceModal;
