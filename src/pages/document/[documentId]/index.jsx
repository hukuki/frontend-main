import React from 'react';

// Style
import styles from './DocumentDetailPage.module.css';

// Components
import DocumentDetailSidebar from '../../../components/common/document-detail-sidebar/DocumentDetailSidebar';
import DocumentDetail from '../../../components/common/document-detail/DocumentDetail';

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
    <div className={styles.container}>
      <div className={styles.document_detail_page__container}>
        <DocumentDetailSidebar document={document} />
        <DocumentDetail document={document} />
      </div>
    </div>
  );
};

export default index;
