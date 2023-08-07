import React, { useEffect } from 'react';
import mockResultsDetails from '../../../utils/mocks/mockResultsDetail';
import DocumentDetailLayout from '../layout';
import DocumentDetailContainer from '../../../components/DocumentDetailContainer';
import DocumentDetailIndex from '../../../components/DocumentDetailIndex';
import DocumentDetail from '../../../components/DocumentDetail';
import backgroundImage from '@/images/background-image.png';
import Image from 'next/image';
const result = mockResultsDetails[0];

function Page({ id }) {
  useEffect(() => {
    console.log(backgroundImage);
  }, []);

  return (
    <div>
      <DocumentDetailLayout >
        <DocumentDetailContainer>
          <DocumentDetail document={result} />
          <DocumentDetailIndex document={result} />
        </DocumentDetailContainer>
      </DocumentDetailLayout>
    </div>
  );
}

export default Page;
