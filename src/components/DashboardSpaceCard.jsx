import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup } from '@chakra-ui/react';

function DashboardSpaceCard({ space }) {
  const [people, setPeople] = useState(space.people);
  useEffect(() => {
    function receiveUpdates(event) {
      console.log(event.data);
      if (event.data.space_id !== space._id) {
        return;
      }
      if (event.data.action.type === 'PEOPLE') {
        console.log('HERE');
        setPeople(event.data.action.payload);
      } else {
        console.log('NOPE');
      }
    }
    window.addEventListener('message', receiveUpdates);
  }, []);

  return (
    <div className="z-1 shadow hover:shadow-none hover:scale-[0.98] cursor-pointer transition ease-in duration-100 p-4 bg-gradient-to-b from-purple-200 to-blue-400 rounded-md aspect-square min-w-[10rem] max-w-[16rem]">
      <div className="aspect-square w-full max-h-full rounded-md">
        <div className="flex flex-col gap-2 items-start justify-between">
          <div className="bg-white w-full rounded-md py-1 md:px-1 md:py-2 text-center">
            <span className="tracking-tight font-medium text-md md:text-lg text-slate-700">{space.name}</span>
          </div>
          <div className="bg-white w-full rounded-md px-1 py-1 md:py-2">
            <span className="text-sm text-slate-600 tracking-tight">People: {space.people.length} </span>
            {people.length > 0 && (
              <AvatarGroup max={3} size="sm">
                {people &&
                  people.map((contact, index) => {
                    return <Avatar bg="blue.400" key={index} name={contact.email} src={contact.photoURL || null} />;
                  })}
              </AvatarGroup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSpaceCard;
