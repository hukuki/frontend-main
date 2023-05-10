import React, { useState, useEffect, useMemo } from 'react';
import styles from './DashboardBookmarksContainer.module.css';
import DashboardSearchbar from '../dashboard-searchbar/DashboardSearchbar';
import useAuthContext from '../../../context/AuthContextProvider';

function DashboardBookmarksContainer() {
  const [allBookmarks, setAllBookmarks] = useState([]);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getBookmarks() {
      const response = await fetch('/api/get_bookmarks', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await response.json();
      if (!error) {
        setAllBookmarks(data);
      } else {
        setAllBookmarks([]);
      }
      setLoading(false);
    }
    if (user) {
      getBookmarks();
    }
  }, [user]);

  const [filterTerm, setFilterTerm] = useState('');

  const filteredBookmarks = useMemo(() => {
    if (filterTerm === '') {
      return allBookmarks;
    } else {
      return allBookmarks.filter((bookmark) => {
        return true;
      });
    }
  }, [allBookmarks, filterTerm]);

  const handleFilterTermChanged = (term) => {
    setFilterTerm(term);
  };

  return (
    <>
      <div className={styles.search_bookmarks__container}>
        <DashboardSearchbar onSubmit={handleFilterTermChanged} onSearchTermChanged={handleFilterTermChanged} />
      </div>
      <div className={styles.bookmark_cards__container}>
        {loading ? (
          <></>
        ) : (
          <>
            {filteredBookmarks.map((bookmark) => {
              return <h1>{bookmark.document}</h1>;
            })}
          </>
        )}
      </div>
    </>
  );
}

export default DashboardBookmarksContainer;
