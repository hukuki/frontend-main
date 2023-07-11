import { create } from 'zustand';

const store = (set) => ({
  bookmarks: [],
  addBookmark: (bookmark) => set((state) => ({ bookmarks: state.bookmarks.push(bookmark) })),
  removeBookmark: (bookmarkId) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => {
        if (bookmark._id === bookmarkId) {
          return false;
        }
        return true;
      }),
    })),
  setBookmarks: (bookmarks) => set({ bookmarks: bookmarks }),
});

export const useBookmarkStore = create(store);
