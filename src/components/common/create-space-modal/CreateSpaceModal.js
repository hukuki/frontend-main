import React, { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './CreateSpaceModal.module.css';
import useAuthContext from '../../../context/AuthContextProvider';
import CreateSpacePeopleSearchBar from '../create-space-people-search-bar/CreateSpacePeopleSearchBar';
import { Progress } from '@chakra-ui/react';
import { SpaceSchema } from '../../../form-schemas';
import { useFormik } from 'formik';

export const CreateSpaceModal = ({ setIsOpen, onSubmit }) => {
  const { user } = useAuthContext();
  const [peopleToShare, setPeopleToShare] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreateSpace = async (values, actions) => {
    setLoading(true);
    const projectName = values.name;
    const description = values.description;
    const peopleIds = peopleToShare.map((person) => person._id);
    const response = await fetch('/api/create_space', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: user.accessToken,
        name: projectName,
        description,
        people: peopleIds,
      }),
    });
    console.log(response);
    const { error, data } = await response.json();
    console.log(error);
    console.log(data);
    if (!error) {
      console.log(data);
    }
    onSubmit();
    setIsOpen(false);
    setLoading(false);
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

  const removeFromShareList = (person) => {
    if (peopleToShare.length > 0) {
      const ids = peopleToShare.map((p) => p._id);
      if (ids.includes(person._id)) {
        setPeopleToShare((prev) => {
          return prev.filter((p) => p._id !== person._id);
        });
      }
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: SpaceSchema,
    onSubmit: handleCreateSpace,
  });

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
              <input
                disabled={loading}
                className={styles.input}
                name="name"
                type="text"
                id="name"
                values={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Projenize bir isim verin"
                required
              />
            </div>
            <div className={styles.input__container}>
              <label className={styles.input_label} htmlFor="description">
                Özet
              </label>
              <input
                disabled={loading}
                className={styles.input}
                name="description"
                id="description"
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Diğer çalışanlar için projenize bir açıklama girin"
                required
              />
            </div>
            <div className={styles.input__container}>
              <label className={styles.input_label} htmlFor="share">
                Paylaş
              </label>
              <CreateSpacePeopleSearchBar
                onRemovePersonFromShare={removeFromShareList}
                isDisabled={loading}
                peopleToShare={peopleToShare}
                onAddPerson={(person) => addToShareList(person)}
              />
            </div>
          </div>
          {loading ? (
            <div className={styles.progress_bar__container}>
              <Progress isIndeterminate height="1rem" width="100%" marginBottom="2rem" marginTop="2rem" />
            </div>
          ) : (
            <div className={styles.buttons__container}>
              <button type="submit" className={styles.save__button} onClick={handleSubmit}>
                Kaydet
              </button>
              <button className={styles.close__button} onClick={() => setIsOpen(false)}>
                Kapat
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateSpaceModal;
