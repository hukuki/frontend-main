import React, { useState, useEffect, useMemo } from 'react';
import styles from './DashboardBookmarksContainer.module.css';
import DashboardSearchbar from '../dashboard-searchbar/DashboardSearchbar';
import useAuthContext from '../../../context/AuthContextProvider';
import BookmarkCard from '../bookmark-card/BookmarkCard';
import { Flex, SkeletonText, Stack } from '@chakra-ui/react';

function DashboardBookmarksContainer() {
  const [allBookmarks, setAllBookmarks] = useState(new Array(10).fill({}));
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
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
        return bookmark.document.metadata.mevAdi.toLowerCase().includes(filterTerm);
      });
    }
  }, [allBookmarks, filterTerm]);

  const handleFilterTermChanged = (term) => {
    setFilterTerm(term);
  };

  const handleBookmarkRemoved = async () => {
    await getBookmarks();
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_bookmarks__container}>
        <DashboardSearchbar onSubmit={handleFilterTermChanged} onSearchTermChanged={handleFilterTermChanged} />
      </div>
      <>
        {loading ? (
          <div className={styles.skeleton_cards__container}>
            {allBookmarks.map((_, idx) => {
              return (
                <Flex flexDir="column" justifyContent="space-around" boxShadow="lg" className={styles.skeleton__container}>
                  <SkeletonText fadeDuration={2} isLoaded={!loading} mt="4" noOfLines={6} skeletonHeight="2" />
                  <SkeletonText fadeDuration={2} isLoaded={!loading} mt="4" noOfLines={6} skeletonHeight="2" />
                  <SkeletonText fadeDuration={2} isLoaded={!loading} mt="4" noOfLines={6} skeletonHeight="2" />
                </Flex>
              );
            })}
          </div>
        ) : (
          <div className={styles.bookmark_cards__container}>
            {filteredBookmarks &&
              filteredBookmarks.length > 0 &&
              filteredBookmarks.map((bookmark) => {
                console.log(bookmark);
                return <BookmarkCard bookmark={bookmark} onRemove={handleBookmarkRemoved} />;
              })}
          </div>
        )}
      </>
    </div>
  );
}

export default DashboardBookmarksContainer;
