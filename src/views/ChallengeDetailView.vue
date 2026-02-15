<script setup lang="ts">

import { useRoute } from "vue-router";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { useChallenge } from "../composables/useChallenge"


const route = useRoute();

const { challenge, loading, error } = useChallenge(
  route.params.id as string
)


</script>

<template>
  <div class="p-6">
  <LoadingSpinner v-if="loading" />

  <div
    v-else-if="error"
    class="text-center text-red-500 py-12"
  >
    {{ error }}
  </div>

  <div
    v-else-if="challenge"
    class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6"
  >
    <h1 class="text-3xl font-bold mb-4">
      {{ challenge.title }}
    </h1>

    <p class="mb-6">
      {{ challenge.description }}
    </p>

    <div class="space-y-2">
      <p><strong>Category:</strong> {{ challenge.category }}</p>
      <p><strong>Points:</strong> {{ challenge.points }}</p>
      <p><strong>Difficulty:</strong> {{ challenge.difficulty }}</p>
      <p><strong>Author:</strong> {{ challenge.author }}</p>
    </div>

    <div class="mt-6 flex items-center justify-between">
      <router-link
        to="/challenges"
        class="text-blue-600 hover:underline"
      >
        ← Back to Challenges
      </router-link>

      <button
        class="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
      >
        View Walkthrough
      </button>
    </div>
  </div>
</div>

</template>
