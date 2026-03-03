import { defineStore } from "pinia"

interface User {
  id: number
  username: string
  token: string
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.user,
  },

  actions: {
    async login(username: string, password: string) {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials")
      }

      const loggedInUser: User = {
        id: data.id,
        username: data.username,
        token: data.token,
      }

      this.user = loggedInUser
      localStorage.setItem("user", JSON.stringify(loggedInUser))
    },

    logout() {
      this.user = null
      localStorage.removeItem("user")
    },
  },
})