import React from 'react';
import Link from 'next/link';

// Style
import styles from './DocumentDetail.module.scss';

const Sidebar = ({ document }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.backToSearch}>
        <Link href="/search" className={styles.link}>
          ← Aramaya Dön
        </Link>
      </div>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarDocumentInfo}>
          <h1 className={styles.title}>Doküman Bilgileri</h1>
          <p className={styles.info}>RG. {`${document.metadata.resmiGazeteTarihi} / ${document.metadata.resmiGazeteSayisi}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
