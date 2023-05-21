import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './AddPersonToSpaceModal.module.css';
import useAuthContext from '../../../context/AuthContextProvider';
import { Progress } from '@chakra-ui/react';
import CreateSpacePeopleSearchBar from '../create-space-people-search-bar/CreateSpacePeopleSearchBar';

export const AddPersonToSpaceModal = ({ setIsOpen, spaceId }) => {
  const { user } = useAuthContext();
  const [peopleToAdd, setPeopleToAdd] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToPeopleList = (person) => {
    if (peopleToAdd.length > 0) {
      const filtered = peopleToAdd.filter((old_person) => old_person.email === person.email);
      if (filtered.length === 0) {
        setPeopleToAdd((prev) => {
          return [...prev, person];
        });
      } else {
        const removed = peopleToAdd.filter((old_person) => old_person.email !== person.email);
        setPeopleToAdd(removed);
      }
    } else {
      setPeopleToAdd((prev) => {
        return [...prev, person];
      });
    }
  };

  const removeFromPeopleList = (person) => {
    if (peopleToAdd.length > 0) {
      const emails = peopleToAdd.map((s) => s.email);
      if (emails.includes(person.email)) {
        setPeopleToAdd((prev) => {
          return prev.filter((s) => s.email !== person.email);
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user && peopleToAdd.length > 0) {
      if (peopleToAdd.length === 1) {
        const peopleId = peopleToAdd[0]._id;
        console.log(peopleId);
        const res = await fetch('/api/add_people_to_space', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: user.accessToken,
            spaceId: spaceId,
            peopleIds: peopleId,
          }),
        });
        const { error, data } = await res.json();
        console.log(error);
        console.log(data);
        if (!error) {
          /*
          setIsOpen();
          */
        }
      }
    }
    setLoading(false);
  };
  return (
    <>
      <div className={styles.background} onClick={() => setIsOpen()}></div>
      <div className={styles.modal__container}>
        <form action="" onSubmit={handleSubmit} autoComplete="off" className={styles.form__container}>
          <div className={styles.header__container}>
            <h1 className={styles.title}>Kişilerle Paylaş</h1>
            <FaTimes className={styles.header__close_button} onClick={() => setIsOpen(false)} />
          </div>
          <div className={styles.inputs__container}>
            <div className={styles.input__container}>
              <label className={styles.input_label} htmlFor="share">
                Kişiler
              </label>
              <CreateSpacePeopleSearchBar peopleToShare={peopleToAdd} onAddPerson={addToPeopleList} onRemovePersonFromShare={removeFromPeopleList} />
            </div>
          </div>
          <div className={styles.buttons__container}>
            {loading ? (
              <Progress isIndeterminate height="1rem" width="100%" marginBottom="2rem" />
            ) : (
              <>
                <button type="submit" className={styles.save__button} onClick={handleSubmit}>
                  Ekle
                </button>
                <button className={styles.close__button} onClick={() => setIsOpen()}>
                  Kapat
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPersonToSpaceModal;
