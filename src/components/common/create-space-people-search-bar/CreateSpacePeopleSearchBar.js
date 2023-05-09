import React, { useState, useEffect } from 'react';
import styles from './CreateSpacePeopleSearchBar.module.css';
import { SearchIcon } from '@chakra-ui/icons';
import useAuthContext from '../../../context/AuthContextProvider';

function CreateSpacePeopleSearchBar({ onClickPerson }) {
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
          }),
        });
        const { error, data } = await response.json();
        if (!error) {
          setPeople(data);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, user]);

  return (
    <div className={styles.relative}>
      <div className={styles.container}>
        <div className={styles.input__container}>
          <SearchIcon className={styles.search_icon} />
          <input
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
                    onClickPerson(person);
                  }}
                >
                  <h1 className={styles.person_email}>{person.email}</h1>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CreateSpacePeopleSearchBar;
