<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import LoadingSpinner from "../components/LoadingSpinner.vue"
import { fetchPostsByChallengeId } from "../api/api"

const route = useRoute()
const router = useRouter()

const challengeId = Number(route.params.id)

const walkthrough = ref<any | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const loadPosts = async () => {
  loading.value = true
  error.value = null

  try {
    const results = await fetchPostsByChallengeId(challengeId)

    if (!results.length) {
      throw new Error("Walkthrough not found")
    }

    walkthrough.value = results[0] // take first match
  } catch (err: any) {
    error.value = err.message || "Failed to load walkthrough"
  } finally {
    loading.value = false
  }
}

onMounted(loadPosts)

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <button
      @click="goBack"
      class="mb-4 text-sm text-blue-600 hover:underline"
    >
      ← Back
    </button>

    <LoadingSpinner v-if="loading" />

    <div v-else-if="error" class="text-center text-red-500 py-12">
      {{ error }}
    </div>

    <div v-else-if="walkthrough" class="bg-white shadow-lg rounded-xl p-8">
      <h1 class="text-3xl font-bold mb-4">
        {{ walkthrough.title }}
      </h1>

      <div class="text-gray-700 leading-relaxed whitespace-pre-line">
        {{ walkthrough.content }}
      </div>
    </div>
  </div>
</template>