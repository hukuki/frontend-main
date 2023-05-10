import React, { useState, useEffect } from 'react';
import styles from './CreateSpacePeopleSearchBar.module.css';
import { SearchIcon } from '@chakra-ui/icons';
import useAuthContext from '../../../context/AuthContextProvider';
import { FaTimes } from 'react-icons/fa';

function CreateSpacePeopleSearchBar({ onAddPerson, isDisabled, peopleToShare, onRemovePersonFromShare }) {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (user) {
        const response = await fetch('/api/get_user_by_name', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: user.accessToken,
            query: searchTerm,
            currentUserEmail: user.email,
          }),
        });
        const { error, data } = await response.json();
        if (!error) {
          const ids = peopleToShare.map((p) => p._id);
          const filtered = data.filter((person) => {
            if (!ids.includes(person._id)) {
              return true;
            }
          });
          setPeople(filtered);
        }
      }
    }, 100);
    return () => {
      setPeople([]);
      clearTimeout(timer);
    };
  }, [searchTerm, user]);

  return (
    <div className={styles.relative}>
      <div className={styles.container}>
        <div className={styles.share_list__container}>
          {peopleToShare.map((person) => (
            <div className={styles.share_person_email_card}>
              <p className={styles.share_person_email}>{person.email}</p>
              <FaTimes
                className={styles.share_person_remove_icon}
                onClick={() => {
                  onRemovePersonFromShare(person);
                }}
              />
            </div>
          ))}
        </div>
        <div className={styles.search__container}>
          <div className={styles.input__container}>
            <SearchIcon className={styles.search_icon} />
            <input
              disabled={isDisabled}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.input}
              placeholder="Kişilerde ara"
            />
          </div>
          <div className={styles.people__container}>
            {people &&
              people.length > 0 &&
              searchTerm !== '' &&
              people.map((person) => {
                return (
                  <div
                    className={styles.person_card__container}
                    onClick={() => {
                      if (!isDisabled) {
                        setSearchTerm('');
                        onAddPerson(person);
                      }
                    }}
                  >
                    <h1 className={styles.person_email}>{person.email}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSpacePeopleSearchBar;
