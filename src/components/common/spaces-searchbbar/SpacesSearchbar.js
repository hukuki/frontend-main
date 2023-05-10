import React, { useState, useEffect } from 'react';
import styles from './SpacesSearchbar.module.css';
import { SearchIcon } from '@chakra-ui/icons';
import useAuthContext from '../../../context/AuthContextProvider';

function SpacesSearchbar({ onClickSpace }) {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [visibleSpaces, setVisibleSpaces] = useState([]);

  useEffect(() => {
    async function getSpaces() {
      const response = await fetch('/api/get_spaces', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await response.json();
      console.log(error);
      console.log(data);
      if (!error) {
        setSpaces(data);
      }
    }
    if (user) {
      getSpaces();
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const filteredSpaces = spaces.filter((space) => {
        if (space.name.toLowerCase().includes(searchTerm)) {
          return space;
        }
      });
      console.log(filteredSpaces);
      setVisibleSpaces(filteredSpaces);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className={styles.relative}>
      <div className={styles.container}>
        <div className={styles.input__container}>
          <SearchIcon className={styles.search_icon} />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.input} placeholder="Proje ara" />
        </div>
        <div className={styles.spaces__container}>
          {visibleSpaces &&
            visibleSpaces.length > 0 &&
            searchTerm !== '' &&
            visibleSpaces.map((space) => {
              return (
                <div
                  className={styles.space_card__container}
                  onClick={() => {
                    onClickSpace(space);
                  }}
                >
                  <h1 className={styles.space_name}>{space.name}</h1>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SpacesSearchbar;
