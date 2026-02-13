<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchChallenges } from "../api/api";
import type { Challenge } from "../types/challenge";

const challenges = ref<Challenge[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    challenges.value = await fetchChallenges();
  } catch (err) {
    console.error("Failed to fetch challenges", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">CTF Challenges</h1>

    <div v-if="loading">Loading challenges...</div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="challenge in challenges"
        :key="challenge.id"
        class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold mb-2">
          {{ challenge.title }}
        </h2>
        <p class="text-gray-600 text-sm mb-2">
          {{ challenge.description }}
        </p>
        <p class="text-sm font-medium">
          Category: {{ challenge.category }}
        </p>
        <p class="text-sm font-medium">
          Points: {{ challenge.points }}
        </p>
      </div>
    </div>
  </div>
</template>

