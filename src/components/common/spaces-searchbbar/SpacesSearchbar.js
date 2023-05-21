import React, { useState, useEffect } from 'react';
import styles from './SpacesSearchbar.module.css';
import { SearchIcon } from '@chakra-ui/icons';
import useAuthContext from '../../../context/AuthContextProvider';
import { FaTimes } from 'react-icons/fa';

function SpacesSearchbar({ onAddToSpaceList, onRemoveSpaceFromList, isDisabled, spaceList }) {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState(null);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (user) {
        const res = await fetch('/api/get_space_by_name', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: user.accessToken,
            query: searchTerm,
          }),
        });
        const { error, data } = await res.json();
        if (!error) {
          const ids = spaceList.map((s) => s._id);
          const filtered = data.filter((space) => {
            if (!ids.includes(space._id)) {
              return true;
            }
          });
          setSpaces(filtered);
        }
      }
    }, 100);
    return () => {
      setSpaces([]);
      clearTimeout(timer);
    };
  }, [user, searchTerm]);

  return (
    <div className={styles.relative}>
      <div className={styles.container}>
        <div className={styles.share_spaces_list__container}>
          {spaceList.map((space) => (
            <div className={styles.share_space_card}>
              <p className={styles.share_space_name}>{space.name}</p>
              <FaTimes
                className={styles.share_space_remove_icon}
                onClick={() => {
                  onRemoveSpaceFromList(space);
                }}
              />
            </div>
          ))}
        </div>
        <div className={styles.search__container}>
          <div className={styles.input__container}>
            <SearchIcon className={styles.search_icon} />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.input} placeholder="Proje ara" />
          </div>
          <div className={styles.spaces__container}>
            {spaces &&
              spaces.length > 0 &&
              searchTerm !== '' &&
              spaces.map((space) => {
                return (
                  <div
                    className={styles.space_card__container}
                    onClick={() => {
                      onAddToSpaceList(space);
                    }}
                  >
                    <h1 className={styles.space_name}>{space.name}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpacesSearchbar;
