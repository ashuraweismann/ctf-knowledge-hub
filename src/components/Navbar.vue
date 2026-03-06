<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../stores/auth"
import LoginModal from "./LoginModal.vue"
import { useThemeStore } from "../stores/theme"

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}



const auth = useAuthStore()
const showLogin = ref(false)
</script>

<template>
  <nav class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-4 flex justify-between items-center">

    <h1 class="font-bold text-lg">CTF Hub</h1>

    <div class="space-x-4 flex items-center">
      <router-link to="/">Home</router-link>
      <router-link to="/challenges">Challenges</router-link>
      <router-link to="/resources">Resources</router-link>
      <router-link to="/bookmarks">Bookmarks</router-link>
         <button
          @click="toggleTheme()"
          class="bg-gray-700 px-3 py-1 rounded"
          >
          {{ themeStore.darkMode ? "☀️" : "🌙" }}
        </button>

      <!-- If NOT logged in -->
      <button
        v-if="!auth.isAuthenticated"
        @click="showLogin = true"
        class="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <!-- If logged in -->
      <div v-else class="flex items-center space-x-3">
        <span class="text-sm text-gray-300">
          👤 {{ auth.user?.username }}
        </span>

        <button
          @click="auth.logout()"
          class="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <LoginModal v-if="showLogin" @close="showLogin = false" />
</template>