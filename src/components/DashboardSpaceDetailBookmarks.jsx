import { useState, useEffect, useMemo } from 'react';
import useAuthContext from '../context/AuthContextProvider';
import DashboardSpaceDetailBookmarkCard from './DashboardSpaceDetailBookmarkCard';

function DashboardSpaceDetailBookmarks({ bookmarks, onRemove }) {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-xl shadow">
      <h3 className="font-medium text-slate-900 tracking-tight text-lg">Documents</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookmarks &&
          bookmarks.map((bookmark, index) => {
            return <DashboardSpaceDetailBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
          })}
      </div>
    </div>
  );
}

export default DashboardSpaceDetailBookmarks;
