import { create } from 'zustand';

const useBookmarkStore = create((set) => ({
  bookmarks: new Map(),
  addBookmark: (documentId) => {
    set((state) => {
      const updatedBookmarks = new Map(state.bookmarks);
      updatedBookmarks.set(documentId, true);
      return { bookmarks: updatedBookmarks };
    });
  },
  removeBookmark: (documentId) => {
    set((state) => {
      const updatedBookmarks = new Map(state.bookmarks);
      updatedBookmarks.delete(documentId);
      return { bookmarks: updatedBookmarks };
    });
  },
  setBookmarks: (documentIds) => {
    set((state) => {
      const newBookmarks = new Map(documentIds.map((d) => [d, true]));
      return { bookmarks: newBookmarks };
    });
  },
  resetBookmarks: () => {
    set((state) => {
      return { bookmarks: new Map() };
    });
  },
}));

export default useBookmarkStore;
