import React, { useEffect } from 'react';

// Style
import styles from './DocumentDetail.module.css';

const extractContent = (content, idx) => {
  if (content.type === 'header') {
    return (
      <div className={styles.header__container}>
        <h1 className={styles.header}>{content.content}</h1>
        <div className={styles.header_break}></div>
      </div>
    );
  }
  if (content.type === 'madde') {
    return (
      <div className={styles.madde__container}>
        <h1 className={styles.madde_title}>{content.maddeStr}</h1>
        <div className={styles.madde_subsections__container}>
          {content.subsections.map((subsection) => {
            return extractContent(subsection);
          })}
        </div>
        <div className={styles.madde_break}></div>
      </div>
    );
  }
  return <p className={styles.free_text}>{content.content}</p>;
};

const Document = ({ document }) => {
  useEffect(() => {
    console.log(document);
  });
  return (
    <div className={styles.document__container}>
      <div className={styles.content_container}>
        <div className={styles.document_title__container}>
          <h1 className={styles.document_title}>{document.metadata.mevAdi}</h1>
          <div className={styles.title_break}></div>
        </div>
        {document.content.slice(1).map((content, idx) => {
          return extractContent(content, idx);
        })}
      </div>
    </div>
  );
};

export default Document;
