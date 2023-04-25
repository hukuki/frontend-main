import React, { useRef, useEffect } from 'react';
import styles from './SpaceCard.module.css';
import { FaFolder } from 'react-icons/fa';
import { Avatar, AvatarGroup } from '@chakra-ui/react';

export const SpaceCard = ({ space, reveal }) => {
  const ref = reveal !== undefined ? useRef(null) : null;

  useEffect(() => {
    if (reveal !== undefined) {
      async function animate() {
        if (ref.current) {
          const sr = (await import('scrollreveal')).default;
          sr().reveal(ref.current, reveal);
        }
      }
      animate();
    }
  }, []);

  return (
    <div ref={ref || null} className={styles.container}>
      <div className={styles.content__container}>
        <div className={styles.image__container}>
          <FaFolder className={styles.space_image} />
        </div>
        <div className={styles.information__container}>
          <span className={styles.space_name}>{space.name}</span>
          <span className={styles.description}>{space.description}</span>
          <div className={styles.people__container}>
            <span className={styles.people_title}>Kişiler: </span>
            <div className={styles.avatar__container}>
              <AvatarGroup max={3} size="xl">
                {space.contacts.map((contact, index) => {
                  return <Avatar key={index} name={contact.name} src={contact.photoURL} />;
                })}
              </AvatarGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
