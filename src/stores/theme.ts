import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: localStorage.getItem("theme") === "dark" || false
  }),

  actions: {
    toggleTheme() {
      console.log("Before toggle - isDark:", this.isDark)
      this.isDark = !this.isDark
      console.log("After toggle - isDark:", this.isDark)
      this.applyTheme()
      console.log("After applyTheme - isDark:", this.isDark)
    },

    applyTheme() {
      const html = document.documentElement
      console.log("applyTheme() called - isDark:", this.isDark)
      console.log("HTML element before:", html.className)

      if (this.isDark) {
        html.classList.add("dark")
        console.log("Added 'dark' class")
      } else {
        html.classList.remove("dark")
        console.log("Removed 'dark' class")
      }

      console.log("HTML element after:", html.className)
      localStorage.setItem("theme", this.isDark ? "dark" : "light")
    },

    initTheme() {
      const html = document.documentElement
      console.log("initTheme() - isDark:", this.isDark)
      if (this.isDark) {
        html.classList.add("dark")
      } else {
        html.classList.remove("dark")
      }
    }
  }
})

