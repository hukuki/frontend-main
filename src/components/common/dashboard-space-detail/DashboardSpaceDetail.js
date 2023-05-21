import React, { useEffect, useState } from 'react';
import styles from './DashboardSpaceDetail.module.css';
import useAuthContext from '../../../context/AuthContextProvider';
import { Avatar } from '@chakra-ui/react';
import SpaceDetailBookmarkCard from '../space-detail-bookmark-card/SpaceDetailBookmarkCard';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

function DashboardSpaceDetail({ spaceId, onBackClick }) {
  const { user } = useAuthContext();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpaceDetails() {
      const res = await fetch('/api/get_space_by_id', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
          spaceId: spaceId,
        }),
      });
      const { error, data } = await res.json();
      console.log(error);
      console.log(data);
      if (!error) {
        setSpace(data);
      }
    }
    if (user) {
      fetchSpaceDetails();
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        space && (
          <div className={styles.container}>
            <div className={styles.back_button__container}>
              <button className={styles.back_button} onClick={onBackClick}>
                <div className={styles.back_icon}>
                  <FaArrowLeft />
                </div>
                Projelere geri dön
              </button>
            </div>
            <div className={styles.header__container}>
              <h1 className={styles.header}>{space.name}</h1>
              <div className={styles.header_break}></div>
            </div>
            <div className={styles.people__container}>
              <div className={styles.creator__container}>
                <h1 className={styles.creator_header}>Oluşturan</h1>
                <p className={styles.creator_email}>{space.user.email}</p>
              </div>
              <div className={styles.shared__container}>
                <h1 className={styles.shared_header}>Kişiler</h1>
                <div className={styles.shared_contacts__container}>
                  {space.people &&
                    space.people.length > 0 &&
                    space.people.map((person, idx) => {
                      return <Avatar key={idx} name={person.name} />;
                    })}
                </div>
              </div>
            </div>
            <div className={styles.bookmarks__container}>
              <h1 className={styles.bookmarks_header}>Paylaşılan Belgeler</h1>
              <div className={styles.bookmark_cards__container}>
                {space.bookmarks.map((bookmark, idx) => {
                  return <SpaceDetailBookmarkCard key={idx} document={bookmark.document} />;
                })}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default DashboardSpaceDetail;
