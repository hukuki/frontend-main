import React, { useState, useEffect } from 'react';
import DashboardSpaceDetailPeople from './DashboardSpaceDetailPeople';
import DashboardSpaceDetailBookmarks from './DashboardSpaceDetailBookmarks';
import useAuthContext from '../context/AuthContextProvider';
import { FaArrowLeft } from 'react-icons/fa';
function DashboardSpaceDetail({ spaceId, onBackClick }) {
  const { user } = useAuthContext();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);

  const getSpace = async () => {
    const res = await fetch('/api/get_space_by_id', {
      method: 'POST',
      body: JSON.stringify({
        accessToken: user.accessToken,
        spaceId: spaceId,
      }),
    });
    const { error, data } = await res.json();
    console.log(error);
    console.log(data);
    if (!error) {
      setSpace(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getSpace();
    }
  }, [user]);

  if (space) {
    return (
      <div className="p-2 flex flex-col gap-4">
        <button className="flex items-center justify-start gap-2 text-blue-500 hover:gap-4 transition-all duration-300" onClick={onBackClick}>
          <FaArrowLeft />
          <span>Dashboard</span>
        </button>
        <h1 className="tracking-tight text-xl text-slate-900">{space.name}</h1>
        <div>
          <DashboardSpaceDetailPeople space={space} />
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
