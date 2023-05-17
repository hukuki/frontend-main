import React from 'react';

// Style
import styles from './DocumentDetail.module.scss';

const extractContent = (content) => {
  if (content.type === 'header') {
    return (
      <>
        <h1 className={styles.header}>{content.content}</h1>
        <hr className={styles.hr} />
      </>
    );
  }
  if (content.type === 'madde') {
    return (
      <div className={styles.madde}>
        <h2 className={styles.maddeTitle}>{content.maddeStr}</h2>
        {content.subsections.map((subsection) => {
          return extractContent(subsection);
        })}
      </div>
    );
  }
  return <p className={styles.paragraph}>{content.content}</p>;
};

const Document = ({ document }) => {
  return (
    <div className={styles.document}>
      <div className={styles.documentHeader}>
        <h1 className={styles.title}>{document.metadata.mevAdi}</h1>
      </div>
      <div className={styles.content}>
        {document.content.map((content) => {
          return extractContent(content);
        })}
      </div>
    </div>
  );
};

export default Document;
