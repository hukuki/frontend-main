import { create } from 'zustand';

const store = (set) => ({
  documentBookmarks: new Map(),
  changeBookmarkState: (documentId, newState) => set((state) => state.documentBookmarks.set(documentId, newState)),
  initiateBookmarks: (documentIds) =>
    set((state) => {
      const newMap = new Map();
      for (let documentId in documentIds) {
        newMap.set(documentId, false);
      }
      return {
        documentBookmarks: newMap,
      };
    }),
});

export const useBookmarkStore = create(store);
