import useAuthContext from '@/context/AuthContextProvider';
import { useEffect, useState } from 'react';
import { FaSearch, FaPlus, FaUserAlt } from 'react-icons/fa';
import * as Avatar from '@radix-ui/react-avatar';

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState(null);
  return (
    <div className="bg-[#f4f4f4] rounded-md flex items-center justify-start shadow-sm gap-x-5 py-2 px-3">
      <span className="text-[#6f767e] flex items-center justify-center h-6 w-6">
        <FaSearch />
      </span>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ara"
        className="placeholder:text-[#6f767e] text-slate-800 text-xl bg-transparent focus:outline-none"
      />
    </div>
  );
}

function Navbar() {
  return (
    <div className="w-full py-3 px-10 bg-[#fcfcfc] shadow-md flex justify-between items-center">
      <Searchbar />
      <div className="flex gap-x-4 items-center justify-center">
        <CreateButton />
      </div>
    </div>
  );
}

function CreateButton() {
  return (
    <button className="flex items-center justify-center gap-x-3 bg-[#33aaff] rounded-md py-1 px-2 shadow-lg">
      <span className="text-[#fcfcfc] h-5 w-5 flex items-center justify-center">
        <FaPlus />
      </span>
      <span className="text-[#fcfcfc] text-xl">Yeni</span>
    </button>
  );
}

function Card({ icon, title, number }) {
  return (
    <div className="flex items-start justify-start gap-x-2.5 p-5 shadow-md rounded-md border-[#2a85ff] bg-[#fcfcfc] border-2 w-48">
      <div className="w-10 h-10 bg-[#2a85ff] rounded-full flex items-center justify-center">
        <span className="text-[#fcfcfc] text-xl">
          <FaPlus />
        </span>
      </div>
      <div className="flex flex-col gap-y-3 items-start">
        <span className="text-[#6f767e] text-sm font-semibold">{title}</span>
        <span className="text-[#2a85ff] text-4xl">{number}</span>
      </div>
    </div>
  );
}

function Spaces() {
  const { user } = useAuthContext();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [spaces, setSpaces] = useState([]);

  const getSpaces = async () => {
    try {
      const res = await fetch('/api/get_spaces', {
        method: 'POST',
        body: JSON.stringify({
          accessToken: user.accessToken,
        }),
      });
      const { error, data } = await res.json();
      if (!error) {
        setLoading(false);
        setSpaces(data);
      } else {
        setLoading(false);
        setIsErrorModalOpen(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setIsErrorModalOpen(true);
    }
  };

  useEffect(() => {
    if (user) {
      getSpaces();
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-y-2.5 bg-[#fcfcfc] rounded-md">
      {loading ? (
        <></>
      ) : (
        <>
          {spaces.length === 0 ? (
            <h1>Yeni bir proje oluşturun</h1>
          ) : (
            <div className="flex flex-wrap gap-x-2.5">
              {spaces.map((space) => (
                <SpaceCard space={space} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SpaceCard({ space }) {
  return (
    <div className="w-64 h-64 flex flex-col gap-y-5 items-start justify-between bg-[#fcfcfc] border-4 border-[#ff6c3e] rounded-md px-5 py-2.5">
      <div className="flex flex-col gap-y-1 items-start">
        <h3 className="text-[#1a1d1f] text-xl tracking-tight">{space.name}</h3>
        <span className="text-[#6f767e] text-base">{space.description}</span>
      </div>
      <div className="flex flex-col gap-y-1 items-start">
        <span className="text-[#6f767e] text-base">Kişiler</span>
        <ProfileBadges people={space.people} />
      </div>
    </div>
  );
}

function ProfileBadges({ people }) {
  if (people.length > 3) {
    return (
      <div className="flex gap-x-1">
        {people.slice(0, 3).map((person) => (
          <ProfileBadge person={person} />
        ))}
        <Avatar.Root className="inline-flex items-center justify-center overflow-hidden w-11 h-11 rounded-full">
          <Avatar.Fallback
            className="w-full h-full flex items-center justify-center border-2 border-[#2a85ff] text-[#2a85ff] rounded-full text-base font-medium"
            delayMs={0}
          >
            +{people.length - 3}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
    );
  } else {
    return (
      <div className="flex gap-x-1">
        {people.map((person) => (
          <ProfileBadge person={person} />
        ))}
      </div>
    );
  }
}

function ProfileBadge({ person }) {
  return (
    <Avatar.Root className="inline-flex items-center justify-center overflow-hidden w-11 h-11 rounded-full">
      <Avatar.Image className="w-full h-full object-cover rounded-full" src={person.imageURL} alt={person.email} />
      <Avatar.Fallback
        className="w-full h-full flex items-center justify-center border-2 border-[#2a85ff] rounded-full text-[#2a85ff] text-base font-medium"
        delayMs={600}
      >
        TA
      </Avatar.Fallback>
    </Avatar.Root>
  );
}

function OverviewPanel() {
  return (
    <div className="flex flex-col gap-y-5 p-10 bg-[#efefef] flex-1 items-start">
      <h1 className="text-black text-4xl font-semibold">Paneliniz</h1>
      <div className="flex gap-x-8 items-center justify-center">
        <Card title="Aktif Projeler" number={82} />
        <Card title="Kaydedilenler" number={42} />
        <Card title="Yüklenen" number={62} />
      </div>
      <Spaces />
    </div>
  );
}

function DashboardMainPanel() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <OverviewPanel />
    </div>
  );
}

export default DashboardMainPanel;
