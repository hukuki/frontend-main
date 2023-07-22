import { create } from 'zustand';

const useSpaceStore = create((set) => ({
  spaces: new Map(),
  addSpace: (space) => {
    set((state) => {
      const updatedSpaces = new Map(state.spaces);
      updatedSpaces.set(space._id, space);
      return { spaces: updatedSpaces };
    });
  },
  updateSpace: (newSpace) => {
    set((state) => {
      const updatedSpaces = new Map(state.spaces);
      updatedSpaces.set(newSpace._id, newSpace);
      return { spaces: updatedSpaces };
    });
  },
  removeSpace: (spaceId) => {
    set((state) => {
      const updatedSpaces = new Map(state.spaces);
      updatedSpaces.delete(spaceId);
      return { spaces: updatedSpaces };
    });
  },
  setSpaces: (spaces) => {
    set((state) => {
      console.log(spaces);
      const newSpaces = new Map(
        spaces.map((space) => {
          return [space._id, space];
        })
      );
      return { spaces: newSpaces };
    });
  },
  resetSpaces: () => {
    set((state) => {
      return { spaces: new Map() };
    });
  },
}));

export default useSpaceStore;
