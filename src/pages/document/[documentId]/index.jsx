import React, { useEffect, useState } from 'react';

// Style
import styles from './DocumentDetailPage.module.css';

// Components
import DocumentDetailSidebar from '../../../components/common/document-detail-sidebar/DocumentDetailSidebar';
import DocumentDetail from '../../../components/common/document-detail/DocumentDetail';
import AddToSpaceModal from '../../../components/common/add-to-space-modal/AddToSpaceModal';
import { Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

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
  const [isAddToSpaceModalOpen, setIsAddToSpaceModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (document) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [document]);
  return (
    <div className={styles.page_container}>
      {isAddToSpaceModalOpen && <AddToSpaceModal documentId={document.id} setIsOpen={setIsAddToSpaceModalOpen} />}
      {loading ? (
        <div className={styles.spinner__container}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" height="100px" width="100px" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className={styles.container}>
            <div className={styles.document_detail_page__container}>
              <DocumentDetailSidebar
                document={document}
                onAddToSpace={() => {
                  setIsAddToSpaceModalOpen(true);
                }}
              />
              <DocumentDetail document={document} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default index;
