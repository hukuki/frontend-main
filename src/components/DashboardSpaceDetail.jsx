import React, { useState, useEffect } from 'react';
import DashboardSpaceDetailPeople from './DashboardSpaceDetailPeople';
import DashboardSpaceDetailBookmarks from './DashboardSpaceDetailBookmarks';
import useAuthContext from '../context/AuthContextProvider';
import { FaArrowLeft } from 'react-icons/fa';

function DashboardSpaceDetail({ space, onBackClick }) {
  if (space) {
    return (
      <div className="p-2 flex flex-col gap-4">
        <button className="flex items-center justify-start gap-2 text-blue-500 hover:gap-4 transition-all duration-300" onClick={onBackClick}>
          <FaArrowLeft />
          <span>Dashboard</span>
        </button>
        <h1 className="tracking-tight text-xl text-slate-900">{space.name}</h1>
        <div>
          <DashboardSpaceDetailPeople initialSpace={space} />
        </div>
        <div>
          <DashboardSpaceDetailBookmarks bookmarks={space.bookmarks} />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DashboardSpaceDetail;
