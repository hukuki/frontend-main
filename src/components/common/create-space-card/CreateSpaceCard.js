import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import styles from './CreateSpaceCard.module.css';
import CreateSpaceModal from '../create-space-modal/CreateSpaceModal';

const item = {
  hover: {
    scale: 1.05,
    transition: {
      ease: 'easeIn',
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

export const CreateSpaceCard = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <CreateSpaceModal setIsOpen={setIsOpen} onSubmit={onSubmit} />}
      <motion.div onClick={() => setIsOpen(true)} className={styles.new_space_card} variants={item} whileHover="hover" zIndex={-1}>
        <FaPlus />
        <span className={styles.new_space_card_parag}>Yeni bir proje yarat</span>
      </motion.div>
    </>
  );
};

export default CreateSpaceCard;
