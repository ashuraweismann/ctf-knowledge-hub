<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../stores/auth"

const auth = useAuthStore()

const emit = defineEmits(["close"])

const username = ref("")
const password = ref("")
const error = ref<string | null>(null)
const loading = ref(false)

const handleLogin = async () => {
  error.value = null
  loading.value = true

  try {
    await auth.login(username.value, password.value)
    emit("close") // close modal on success
  } catch (err: any) {
    error.value = err.message || "Login failed"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white w-full max-w-sm rounded-xl shadow-xl p-6">
      <h2 class="text-xl font-bold mb-4 text-center">
        Login
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full border p-2 rounded"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>

        <p v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </p>
      </form>

      <button
        @click="$emit('close')"
        class="mt-4 text-sm text-gray-500 hover:underline block mx-auto"
      >
        Cancel
      </button>
    </div>
  </div>
</template>