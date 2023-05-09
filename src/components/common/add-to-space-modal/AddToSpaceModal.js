import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './AddToSpaceModal.module.css';
import SpacesSearchbar from '../spaces-searchbbar/SpacesSearchbar';
import useAuthContext from '../../../context/AuthContextProvider';

export const AddToSpaceModal = ({ setIsOpen, documentId }) => {
  const { user } = useAuthContext();
  const [spacesToAdd, setSpacesToAdd] = useState([]);

  const onClickSpace = (space) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
              <SpacesSearchbar onClickSpace={onClickSpace} />
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
