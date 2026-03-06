import { defineStore } from "pinia"

export const useBookmarkStore = defineStore("bookmarks", {
  state: () => ({
    bookmarks: JSON.parse(localStorage.getItem("bookmarks") || "[]"),
  }),

  actions: {
    toggleBookmark(id: number) {
      if (this.bookmarks.includes(id)) {
        this.bookmarks = this.bookmarks.filter((b: number) => b !== id)
      } else {
        this.bookmarks.push(id)
      }

      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks))
    }
  },

  getters: {
    isBookmarked: (state) => (id: number) =>
      state.bookmarks.includes(id)
  }
})