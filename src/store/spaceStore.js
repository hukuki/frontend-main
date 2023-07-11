import { create } from 'zustand';

const store = (set) => ({
  spaces: [],
  addSpace: (space) => set((state) => ({ spaces: state.spaces.push(space) })),
  removeSpace: (spaceId) =>
    set((state) => ({
      spaces: state.spaces.filter((space) => {
        if (space._id === spaceId) {
          return false;
        }
        return true;
      }),
    })),
  setSpaces: (spaces) => set({ spaces: spaces }),
  addPeopleToSpace: (spaceId, people) =>
    set((state) => ({
      spaces: state.spaces.map((space) => {
        if (space._id === spaceId) {
          return { ...space, people: space.people.push(people) };
        }
        return space;
      }),
    })),
  removePersonFromSpace: (spaceId, personId) =>
    set((state) => ({
      spaces: state.spaces.map((space) => {
        if (space._id === spaceId) {
          return { ...space, people: space.people.filter((p) => p._id !== personId) };
        }
        return space;
      }),
    })),
});

export default useSpaceStore = create(store);
