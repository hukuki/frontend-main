import React from 'react';
import Link from 'next/link';

// Style
import styles from './DocumentDetailSidebar.module.css';
import { FaShare, FaPlus, FaSave, FaArrowLeft } from 'react-icons/fa';

const Sidebar = ({ document }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar__container}>
        <div className={styles.back_button__container}>
          <Link href="/search" className={styles.back_button}>
            <div className={styles.back_icon}>
              <FaArrowLeft />
            </div>
            Aramaya Dön
          </Link>
        </div>
        <div className={styles.document_actions__container}>
          <button className={styles.add_space_button}>
            <FaPlus className={styles.add_space_icon} />
            <p className={styles.add_space_title}>Projeye Ekle</p>
          </button>
          <button className={styles.save_button}>
            <FaSave className={styles.save_icon} />
            <p className={styles.save_title}>Kaydet</p>
          </button>
          <button className={styles.share_button}>
            <FaShare className={styles.share_icon} />
            <p className={styles.share_title}>Paylaş</p>
          </button>
        </div>
        <div className={styles.sidebar_content__container}>
          <div className={styles.document_info__container}>
            <h1 className={styles.title}>Doküman Bilgileri</h1>
            <p className={styles.info}>RG. {`${document.metadata.resmiGazeteTarihi} / ${document.metadata.resmiGazeteSayisi}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
