import React from 'react';
import { Box, SkeletonText, SkeletonCircle } from '@chakra-ui/react';
import styles from './SkeletonSpaceCard.module.css';

export const SkeletonSpaceCard = () => {
  return (
    <Box>
      <div className={styles.container}>
        <div className={styles.text__container}>
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </div>
        <div className={styles.circles__container}>
          <SkeletonCircle size="50" />
        </div>
      </div>
    </Box>
  );
};

export default SkeletonSpaceCard;
