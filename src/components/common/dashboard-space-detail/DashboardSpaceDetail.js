import React, { useEffect, useState } from 'react';
import styles from './DashboardSpaceDetail.module.css';
import useAuthContext from '../../../context/AuthContextProvider';
import { Avatar } from '@chakra-ui/react';
import SpaceDetailBookmarkCard from '../space-detail-bookmark-card/SpaceDetailBookmarkCard';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import AddPersonToSpaceModal from '../add-person-to-space-modal/AddPersonToSpaceModal';

function DashboardSpaceDetail({ spaceId, onBackClick }) {
  const { user } = useAuthContext();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
  const [render, setRender] = useState(false);

  const getBookmarks = async () => {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getBookmarks();
    }
  }, [user]);

  const handleBookmarkRemoved = async () => {
    await getBookmarks();
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        space && (
          <>
            {isAddPersonModalOpen && <AddPersonToSpaceModal setIsOpen={() => setIsAddPersonModalOpen(false)} spaceId={spaceId} />}
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
                  <div className={styles.add_person_button__container}>
                    <button className={styles.add_person_button} onClick={() => setIsAddPersonModalOpen(true)}>
                      <FaUserPlus />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.bookmarks__container}>
                <h1 className={styles.bookmarks_header}>Paylaşılan Belgeler</h1>
                <div className={styles.bookmark_cards__container}>
                  {space.bookmarks.map((bookmark, idx) => {
                    return <SpaceDetailBookmarkCard onRemove={handleBookmarkRemoved} key={idx} bookmark={bookmark} />;
                  })}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default DashboardSpaceDetail;
