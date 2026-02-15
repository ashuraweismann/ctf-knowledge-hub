<script setup lang="ts">
import { ref, } from "vue"
import ChallengeCard from "../components/ChallengeCard.vue"
import LoadingSpinner from "../components/LoadingSpinner.vue"
import { useChallenges } from "../composables/useChallenges"

const searchQuery = ref("")
const selectedCategory = ref("All")

const { filteredChallenges, loading, error, categories } = useChallenges(
  searchQuery,
  selectedCategory
)

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

      <select v-model="selectedCategory">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- States -->
    <LoadingSpinner v-if="loading" />
    <div v-else-if="error" class="text-center text-red-500 py-12">
      {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChallengeCard
        v-for="challenge in filteredChallenges"
        :key="challenge.id"
        :challenge="challenge"
      />
    </div>
  </div>
</template>
