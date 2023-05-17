import React from 'react';

// Style
import styles from './DocumentDetail.module.scss';

// Components
import Sidebar from './Sidebar';
import Document from './Document';

export const getServerSideProps = async (context) => {
  const backend_url = process.env.BACKEND_URL;
  const { documentId } = context.params;

  try {
    const res = await fetch(`${backend_url}/documents/${documentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return {
      props: { document: data, errors: null },
    };
  } catch (err) {
    return {
      props: { data: {}, errors: { message: err.message } },
    };
  }
};

const index = ({ document }) => {
  return (
    <div className={styles.documentDetailPage}>
      <Sidebar document={document} />
      <Document document={document} />
    </div>
  );
};

export default index;
