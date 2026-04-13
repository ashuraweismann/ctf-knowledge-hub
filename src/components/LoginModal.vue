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
  <Teleport to="body">
    <div
      class="fixed inset-0 z-1000 flex items-center justify-center bg-black/40 px-4"
      @click.self="$emit('close')"
    >
      <div class="w-full max-w-sm rounded-xl bg-gray-800 p-6 shadow-xl">
        <h2 class="mb-4 text-center text-xl font-bold">
          Login
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full rounded border p-2"
            required
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full rounded border p-2"
            required
          />

          <button
            type="submit"
            class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            :disabled="loading"
          >
            {{ loading ? "Logging in..." : "Login" }}
          </button>

          <p v-if="error" class="text-center text-sm text-red-500">
            {{ error }}
          </p>
        </form>

        <button
          @click="$emit('close')"
          class="mx-auto mt-4 block text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  </Teleport>
</template>
