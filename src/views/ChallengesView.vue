<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchChallenges } from "../api/api";
import type { Challenge } from "../types/challenge";

const challenges = ref<Challenge[]>([]);
const searchQuery = ref("");
const selectedCategory = ref("All");
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

// Computed filtered challenges
const filteredChallenges = computed(() => {
  return challenges.value.filter((c) => {
    const matchesCategory =
      selectedCategory.value === "All" ||
      c.category.toLowerCase() === selectedCategory.value.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">CTF Challenges</h1>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search challenges..."
        class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
      />

      <select
        v-model="selectedCategory"
        class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4"
      >
        <option>All</option>
        <option>Web</option>
        <option>Crypto</option>
        <option>Forensics</option>
      </select>
    </div>

    <div v-if="loading">Loading challenges...</div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="challenge in filteredChallenges"
        :key="challenge.id"
        class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl font-semibold">{{ challenge.title }}</h2>
          <span
            :class="{
              'bg-blue-200 text-blue-800': challenge.category === 'Web',
              'bg-purple-200 text-purple-800': challenge.category === 'Crypto',
              'bg-green-200 text-green-800': challenge.category === 'Forensics',
              'bg-gray-200 text-gray-800': !['Web','Crypto','Forensics'].includes(challenge.category)
            }"
            class="px-2 py-1 rounded text-sm font-medium"
          >
            {{ challenge.category }}
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-2">{{ challenge.description }}</p>
        <p class="text-sm font-medium">Points: {{ challenge.points }}</p>
        <p class="text-sm font-medium">Difficulty: {{ challenge.difficulty }}</p>
      </div>
    </div>
  </div>
</template>

