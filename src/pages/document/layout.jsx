import React from 'react';
import SearchResultsNavbar from '../../components/SearchResultsNavbar';

function DocumentDetailLayout({ children }) {
  return (
    <div id="page" className="flex flex-col min-w-full min-h-screen">
      <div id="navigation">
        <SearchResultsNavbar divClass="p-4" />
      </div>
      <div id="body" className="flex-1 min-w-full bg-slate-200">
        {children}
      </div>
    </div>
  );
}

export default DocumentDetailLayout;
