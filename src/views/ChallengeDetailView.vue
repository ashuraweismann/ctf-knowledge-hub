<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"
import LoadingSpinner from "../components/LoadingSpinner.vue"
import { useChallenge } from "../composables/useChallenge"
import { usePosts } from "../composables/usePosts"

const route = useRoute()
const router = useRouter()

const id = route.params.id as string

const { challenge, loading, error } = useChallenge(id)

const { posts, loading: postsLoading } = usePosts()

const relatedPosts = computed(() => {
  return posts.value.filter(
    (post) => post.challengeId === id
  )
})


const categoryClasses = (category: string) => {
  switch (category) {
    case "Web":
      return "bg-blue-200 text-blue-800"
    case "Crypto":
      return "bg-purple-200 text-purple-800"
    case "Forensics":
      return "bg-green-200 text-green-800"
    default:
      return "bg-gray-200 text-gray-800"
  }
}

const difficultyLabel = computed(() => {
  if (!challenge.value) return ""
  if (challenge.value.difficulty < 3) return "Easy"
  if (challenge.value.difficulty < 4.5) return "Medium"
  return "Hard"
})

const difficultyClasses = computed(() => {
  if (!challenge.value) return ""
  if (challenge.value.difficulty < 3)
    return "bg-green-200 text-green-800"
  if (challenge.value.difficulty < 4.5)
    return "bg-yellow-200 text-yellow-800"
  return "bg-red-200 text-red-800"
})

const goBack = () => {
  router.push("/challenges")
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Back Button -->
    <button
      @click="goBack"
      class="mb-4 text-sm text-blue-600 hover:underline"
    >
      ← Back to Challenges
    </button>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading" />

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500 py-12">
      {{ error }}
    </div>

    <!-- Content -->
    <div
      v-else-if="challenge"
      class="bg-white shadow-lg rounded-xl p-8"
    >
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h1 class="text-3xl font-bold">
          {{ challenge.title }}
        </h1>

        <span
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            categoryClasses(challenge.category)
          ]"
        >
          {{ challenge.category }}
        </span>
      </div>

      <!-- Meta Info -->
      <div class="flex gap-4 mb-6 text-sm font-medium">
        <span
          :class="[
            'px-3 py-1 rounded-full',
            difficultyClasses
          ]"
        >
          {{ difficultyLabel }}
        </span>

        <span class="bg-gray-100 px-3 py-1 rounded-full">
          {{ challenge.points }} Points
        </span>
      </div>

      <!-- Description -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-2">Description</h2>
        <p class="text-gray-700 leading-relaxed">
          {{ challenge.description }}
        </p>
      </div>

      <!-- Walkthrough Section -->
<div class="border-t pt-6">
  <h2 class="text-xl font-semibold mb-4">
    Walkthroughs
  </h2>

  <div v-if="postsLoading">
    <LoadingSpinner />
  </div>

  <div v-else-if="relatedPosts.length === 0" class="text-gray-500">
    No walkthroughs available yet.
  </div>

  <div v-else class="space-y-4">
    <div
      v-for="post in relatedPosts"
      :key="post.id"
      class="bg-gray-50 p-4 rounded-lg"
    >
      <h3 class="font-semibold text-lg">
        {{ post.title }}
      </h3>
      <p class="text-sm text-gray-600 mb-2">
        {{ post.content.slice(0, 120) }}...
      </p>
      <button
        class="text-blue-600 text-sm hover:underline"
      >
        Read More →
      </button>
    </div>
  </div>
</div>

    </div>
  </div>
</template>
