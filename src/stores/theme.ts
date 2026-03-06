import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
  state: () => ({
    darkMode: localStorage.getItem("theme") === "dark"
  }),

  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      this.applyTheme()
    },

    initTheme() {
      this.applyTheme()
    },

    applyTheme() {
      const html = document.documentElement

      html.classList.toggle("dark", this.darkMode)
      localStorage.setItem("theme", this.darkMode ? "dark" : "light")
    }
  }
})
