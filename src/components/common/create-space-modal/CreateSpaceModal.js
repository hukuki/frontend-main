import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './CreateSpaceModal.module.css';
import useAuthContext from '../../../context/AuthContextProvider';
import CreateSpacePeopleSearchBar from '../create-space-people-search-bar/CreateSpacePeopleSearchBar';

export const CreateSpaceModal = ({ setIsOpen }) => {
  const { user } = useAuthContext();
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [peopleToShare, setPeopleToShare] = useState([]);

  useEffect(() => {
    console.log(peopleToShare);
  }, [peopleToShare]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectName = nameRef.current.value;
    const description = descriptionRef.current.value;
    const peopleIds = peopleToShare.map((person) => person._id);
    const response = await fetch('/api/create_space', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: user.accessToken,
        name: projectName,
        description,
        peopleIds,
      }),
    });
    console.log(response);
    const { error, data } = await response.json();
    console.log(error);
    console.log(data);
    if (!error) {
      console.log(data);
    }
    setIsOpen(false);
  };

  const addToShareList = (person) => {
    if (peopleToShare.length > 0) {
      const filtered = peopleToShare.filter((pers) => pers.email === person.email);
      if (filtered.length === 0) {
        setPeopleToShare((prev) => {
          return [...prev, person];
        });
      } else {
        const removed = peopleToShare.filter((pers) => pers.email !== person.email);
        setPeopleToShare(removed);
      }
    } else {
      setPeopleToShare((prev) => {
        return [...prev, person];
      });
    }
  };

  return (
    <>
      <div className={styles.background} onClick={() => setIsOpen(false)}></div>
      <div className={styles.modal__container}>
        <form action="" onSubmit={handleSubmit} autoComplete="off" className={styles.form__container}>
          <div className={styles.header__container}>
            <h1 className={styles.title}>Yeni Proje Yarat</h1>
            <FaTimes className={styles.header__close_button} onClick={() => setIsOpen(false)} />
          </div>
          <div className={styles.inputs__container}>
            <div className={styles.input__container}>
              <label className={styles.input_label} htmlFor="name">
                Proje İsmi
              </label>
              <input className={styles.input} name="description" type="text" ref={nameRef} placeholder="Projenize bir isim verin" required />
            </div>
            <div className={styles.input__container}>
              <label className={styles.input_label} htmlFor="description">
                Özet
              </label>
              <input
                className={styles.input}
                name="description"
                type="text"
                ref={descriptionRef}
                placeholder="Diğer çalışanlar için projenize bir açıklama girin"
                required
              />
            </div>
            <div className={styles.input__container}>
              <label className={styles.input_label} htmlFor="share">
                Paylaş
              </label>
              <CreateSpacePeopleSearchBar onClickPerson={(person) => addToShareList(person)} />
            </div>
          </div>
          <div className={styles.buttons__container}>
            <button type="submit" className={styles.save__button} onClick={handleSubmit}>
              Kaydet
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

export default CreateSpaceModal;
